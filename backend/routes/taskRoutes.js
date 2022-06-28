import express from 'express';
import {
  addTask,
  getTask,
  updateTask,
  delteTask,
  changeStateTask} from '../controllers/taskControllers.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', checkAuth, addTask);

router.route('/:id')
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, delteTask);

router.post('/change-state/:id', checkAuth, changeStateTask);

export default router;