import { Router } from 'express';
import sectionController from '../controllers/SectionController.js';
import { param } from 'express-validator';
import { validate } from '../utils/ValidationUtil.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const sectionRoute = Router();

// TODO: User create section
// * /api/v1/section/:sectionId
// ! access private
sectionRoute.post(
  '/board/:boardId/section',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  sectionController.createSection
);

// TODO: User delete board by id
// * /api/v1/section/:sectionId
// ! access private
sectionRoute.put(
  '/board/:boardId/section/:sectionId',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  param('sectionId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  sectionController.updateSection
);

// TODO: User delete board by id
// * /api/v1/section/:sectionId
// ! access private
sectionRoute.delete(
  '/board/:boardId/section/:sectionId',
  param('boardId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  param('sectionId').custom((value) => {
    if (!validate.isObjectId(value)) {
      return Promise.reject('Invalid id');
    } else {
      return Promise.resolve();
    }
  }),
  verifyToken,
  sectionController.deleteSection
);

export default sectionRoute;
