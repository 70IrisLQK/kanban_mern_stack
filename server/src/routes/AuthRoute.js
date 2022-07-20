import { Router } from 'express';
import authController from '../controllers/AuthController.js';
import { body } from 'express-validator';
import { validate } from '../utils/ValidationUtil.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';
import userModel from '../models/UserModel.js';

const authRoute = Router();

// TODO: User register
// * /api/v1/register
// ! access public
authRoute.post(
  '/register',
  body('username')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('confirmPassword')
    .isLength({ min: 8 })
    .withMessage('Confirm password must be at least 8 characters'),
  body('username').custom((value) => {
    return userModel.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('Username already used');
      }
    });
  }),
  validate,
  authController.register
);

// TODO: User login
// * /api/v1/login
// ! access public
authRoute.post(
  '/login',
  body('username')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validate,
  authController.login
);

// TODO: User verify-token
// * /api/v1/verify-token
// ! access public
authRoute.post('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default authRoute;
