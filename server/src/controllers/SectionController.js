import sectionModel from '../models/SectionModel.js';
import taskModel from '../models/TaskModel.js';

const sectionController = {
  createSection: async (req, res) => {
    const { boardId } = req.params;
    try {
      const section = await sectionModel.create({ board: boardId });
      section._doc.tasks = [];
      return res.status(201).json(section);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateSection: async (req, res) => {
    const { sectionId } = req.params;

    try {
      const section = await sectionModel.findByIdAndUpdate(sectionId, {
        $set: req.body,
      });
      section._doc.tasks = [];
      return res.status(200).json(section);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteSection: async (req, res) => {
    const { sectionId } = req.params;

    try {
      await sectionModel.deleteMany({ _id: sectionId });
      await taskModel.deleteMany({ section: sectionId });
      return res.status(200).json({ msg: 'Delete successfully' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default sectionController;
