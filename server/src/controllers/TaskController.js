import sectionModel from '../models/SectionModel.js';
import taskModel from '../models/TaskModel.js';

const taskController = {
  createTask: async (req, res) => {
    const { sectionId } = req.body;
    try {
      const section = await sectionModel.find({ _id: sectionId });

      const taskCount = await taskModel.find({ section: sectionId }).count();

      const task = await taskModel.create({
        section: sectionId,
        position: taskCount > 0 ? taskCount : 0,
      });

      task._doc.section = section;

      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateTask: async (req, res) => {
    const { taskId } = req.params;

    try {
      const task = await taskModel.findByIdAndUpdate(taskId, {
        $set: req.body,
      });
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteTask: async (req, res) => {
    const { taskId } = req.params;

    try {
      const currentTask = await taskModel.findById(taskId);
      await taskModel.deleteOne({ _id: taskId });
      const tasks = await taskModel.find({ section: currentTask.section });
      for (const key in tasks) {
        await taskModel.findByIdAndUpdate(tasks[key]._id, {
          $set: { position: key },
        });
      }
      return res.status(201).json('Delete successfully');
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePosition: async (req, res) => {
    const {
      resourceList,
      destinationList,
      resourceSectionId,
      destinationSectionId,
    } = req.body;
    const resourceListReverse = resourceList.reverse();
    const destinationListReverse = destinationList.reverse();
    try {
      if (resourceSectionId !== destinationSectionId) {
        for (const key in resourceListReverse) {
          await taskModel.findByIdAndUpdate(resourceListReverse[key]._id, {
            $set: {
              section: resourceSectionId,
              position: key,
            },
          });
        }
      }
      for (const key in destinationListReverse) {
        await taskModel.findByIdAndUpdate(destinationListReverse[key]._id, {
          $set: {
            section: destinationSectionId,
            position: key,
          },
        });
      }
      return res.status(200).json('Updated position');
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default taskController;
