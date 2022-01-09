import express from 'express';
import {
  login,
  register,
  changePassword,
} from '../controllers/adminController.js';
import authJWT from '../utils/authJWT.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.patch('/changePassword', authJWT, changePassword);
router.put('/changePassword', authJWT, changePassword);

export default router;
