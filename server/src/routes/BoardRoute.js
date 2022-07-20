import { Router } from 'express';
import boardController from '../controllers/BoardController.js';
import { param } from 'express-validator';
import { validate } from '../utils/ValidationUtil.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const boardRoute = Router();

// TODO: User create board
// * /api/v1/board
// ! access private
boardRoute.post('/board', verifyToken, boardController.createBoard);

// TODO: User get all board
// * /api/v1/boards
// ! access private
boardRoute.get('/boards', verifyToken, boardController.getAllBoard);

// TODO: User update position
// * /api/v1/board
// ! access private
boardRoute.put('/board', verifyToken, boardController.updatePosition);

// TODO: User get board by id
// * /api/v1/board/:boardId
// ! access private
boardRoute.get(
  '/board/:boardId',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  boardController.getOneBoard
);

// TODO: User update board by id
// * /api/v1/board/:boardId
// ! access private
boardRoute.put(
  '/board/:boardId',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  boardController.updateBoard
);

// TODO: User delete board by id
// * /api/v1/board/:boardId
// ! access private
boardRoute.delete(
  '/board/:boardId',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  boardController.deleteBoard
);

// TODO: User get favorite
// * /api/v1/board/favorites
// ! access private
boardRoute.get('/favorites', verifyToken, boardController.getFavorite);

export default boardRoute;
