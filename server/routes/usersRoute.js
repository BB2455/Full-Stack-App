import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersBySearch,
} from '../controllers/usersController.js';
import authJWT from '../utils/authJWT.js';

const router = express.Router();

router.get('/search', getUsersBySearch);
router.get('/id/:id', getUser);
router.get('/:page', getUsers);
router.post('/', authJWT, createUser);
router.patch('/id/:id', authJWT, updateUser);
router.put('/id/:id', authJWT, updateUser);
router.delete('/id/:id', authJWT, deleteUser);

export default router;
