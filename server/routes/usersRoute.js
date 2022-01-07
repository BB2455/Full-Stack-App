import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersBySearch,
} from '../controllers/usersController.js';
import auth from '../utils/auth.js';

const router = express.Router();

router.get('/search', getUsersBySearch);
router.get('/id/:id', getUser);
router.get('/:page', getUsers);
router.post('/', auth, createUser);
router.patch('/id/:id', auth, updateUser);
router.put('/id/:id', auth, updateUser);
router.delete('/id/:id', auth, deleteUser);

export default router;
