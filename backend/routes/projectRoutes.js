import express from 'express';
import { getProjects, newProject, allProject, editProject, deleteProject, addColaborator, removeColaborator, getTask } from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/', checkAuth)
  .get(getProjects)
  .post(newProject);

router.route('/:id', checkAuth)
  .get(allProject)
  .put(editProject)
  .delete(deleteProject);

router.get('/tasks/:id', checkAuth, getTask);
router.post('/add-colaborator/:id', checkAuth, addColaborator);
router.post('/delete-colaborator/:id', checkAuth, removeColaborator);

export default router;