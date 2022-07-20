import { Router } from 'express';
import taskController from '../controllers/TaskController.js';
import { param, body } from 'express-validator';
import { validate } from '../utils/ValidationUtil.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const taskRoute = Router();

// TODO: User create task
// * /api/v1/boards/:boardId/task
// ! access private
taskRoute.post(
  '/board/:boardId/task',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  body('sectionId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  taskController.createTask
);

// TODO: User update position's task
// * /api/v1/boards/:boardId/task/update-position
// ! access private
taskRoute.put(
  '/board/:boardId/task/update-position',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  taskController.updatePosition
);

// TODO: User delete task by id
// * /api/v1/boards/:boardId/task/:taskId
// ! access private
taskRoute.delete(
  '/board/:boardId/task/:taskId',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  param('taskId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  taskController.deleteTask
);

// TODO: User update task by id
// * /api/v1/section/:sectionId
// ! access private
taskRoute.put(
  '/board/:boardId/task/:taskId',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  param('taskId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  taskController.updateTask
);

export default taskRoute;
