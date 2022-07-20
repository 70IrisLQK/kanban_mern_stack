import bcrypt from 'bcrypt';
import userModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { createToken } from '../utils/JWTUtils.js';

const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check user exist
      const isUser = await userModel.findOne({ username: username });
      if (isUser) {
        return res.status(400).json({ msg: 'Username is already exist' });
      }

      // Hash user password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        username,
        password: hashedPassword,
      });

      // Save user to DB
      const savedUser = await newUser.save();

      // Create token jwt
      const token = await createToken({ id: savedUser._id });

      return res.status(201).json({
        msg: 'User register successfully',
        user: savedUser,
        token: token,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check user doesn't exist
      const isUser = await userModel.findOne({ username: username });
      if (!isUser) {
        return res.status(400).json({
          errors: [
            {
              param: 'username',
              msg: 'Invalid username or password',
            },
          ],
        });
      }

      const isPassword = await bcrypt.compare(password, isUser.password);

      // Check user and password
      if (isUser && isPassword) {
        const token = await createToken({ id: isUser._id });

        return res.status(200).json({
          msg: 'User login successfully',
          user: isUser,
          token: token,
        });
      }

      return res.status(400).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid username or password',
          },
        ],
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default authController;
