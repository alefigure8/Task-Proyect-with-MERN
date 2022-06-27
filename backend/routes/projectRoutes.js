import express from 'express';
import { getProjects, newProject, allProject, editProject, deleteProject, addColaborator, removeColaborator, getTask } from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
  .get(checkAuth, getProjects)
  .post(checkAuth, newProject);

router.route('/:id')
  .get(checkAuth, allProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.get('/tasks/:id', checkAuth, getTask);
router.post('/add-colaborator/:id', checkAuth, addColaborator);
router.post('/delete-colaborator/:id', checkAuth, removeColaborator);

export default router;