import boardModel from '../models/BoardModel.js';
import taskModel from '../models/TaskModel.js';
import sectionModel from '../models/SectionModel.js';

const boardController = {
  createBoard: async (req, res) => {
    try {
      const boardCount = await boardModel.find().count();
      const board = await boardModel.create({
        user: req.user._id,
        position: boardCount > 0 ? boardCount : 0,
      });
      return res.status(201).json(board);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllBoard: async (req, res) => {
    try {
      console.log(req.user._id);
      const boards = await boardModel
        .find({ user: req.user._id })
        .sort('-position');
      return res.status(200).json(boards);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePosition: async (req, res) => {
    const { boards } = req.body;
    try {
      for (const key in boards.reverse()) {
        const board = boards[key];
        await boardModel.findByIdAndUpdate(board._id, {
          $set: { position: key },
        });
      }
      return res.status(200).json({ msg: 'Update position' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getOneBoard: async (req, res) => {
    const { boardId } = req.params;
    try {
      const board = await boardModel.findOne({
        user: req.user._id,
        _id: boardId,
      });

      if (!board) return res.status(400).json({ msg: 'Board not found' });

      const sections = await sectionModel.find({ board: boardId });
      for (const key in sections) {
        const tasks = await taskModel
          .find({ section: key._id })
          .populate('section')
          .sort('-position');
        key._doc.tasks = tasks;
      }

      board._doc.sections = sections;
      return res.status(200).json(board);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateBoard: async (req, res) => {
    const { boardId } = req.params;
    const { title, description, favorite } = req.body;
    try {
      if (title === '') req.body.title = 'Untitled';
      if (description === '') req.body.description = 'Add description here';

      const currentBoard = await boardModel.findById(boardId);

      if (!currentBoard)
        return res.status(400).json({ msg: 'Board not found!' });
      if (favorite !== undefined && currentBoard.favorite !== favorite) {
        const favorites = await boardModel
          .find({
            user: currentBoard.user,
            favorite: true,
            _id: { $ne: boardId },
          })
          .sort('favoritePosition');

        if (favorite) {
          req.body.favoritePosition =
            favorites.length > 0 ? favorites.length : 0;
        } else {
          for (const key in favorites) {
            const element = favorites[key];
            await boardModel.findByIdAndUpdate(element._id, {
              $set: { favoritePosition: key },
            });
          }
        }
      }

      const board = await boardModel.findByIdAndUpdate(boardId, {
        $set: req.body,
      });
      return res.status(200).json(board);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getFavorite: async (req, res) => {
    try {
      const favorites = await boardModel
        .find({
          user: req.user._id,
          favorite: true,
        })
        .sort('-favoritePosition');
      console.log(favorites);

      return res.status(200).json(favorites);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteBoard: async (req, res) => {
    const { boardId } = req.params;
    try {
      const sections = await sectionModel.find({ board: boardId });
      for (const section of sections) {
        await taskModel.deleteMany({ section: section._id });
      }
      await sectionModel.deleteMany({ board: boardId });

      const currentBoard = await boardModel.findById(boardId);

      if (currentBoard.favorite) {
        const favorites = await boardModel
          .find({
            user: currentBoard.user,
            favorite: true,
            _id: { $ne: boardId },
          })
          .sort('favoritePosition');

        for (const key in favorites) {
          const element = favorites[key];
          await boardModel.findByIdAndUpdate(element._id, {
            $set: { favoritePosition: key },
          });
        }
      }

      await boardModel.deleteOne({ _id: boardId });

      const boards = await boardModel.find().sort('position');

      for (const key in boards) {
        const board = boards[key];
        await boardModel.findByIdAndUpdate(board._id, {
          $set: { position: key },
        });
      }
      return res.status(200).json({ msg: 'Deleted successfully' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default boardController;
