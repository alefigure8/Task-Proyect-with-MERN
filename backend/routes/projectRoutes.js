import express from 'express';
import { getProject, newProject, allProject, editProject, deleteProject, addColaborator, removeColaborator } from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
  .get(checkAuth, allProject)
  .post(checkAuth, newProject);

router.route('/:id')
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.post('/add-colaborator/:id', checkAuth, addColaborator);
router.post('/delete-colaborator/:id', checkAuth, removeColaborator);

export default router;