import {Router} from 'express';
const router = Router();
import {registerUser} from '../controllers/usersControllers.js'

/* Autenticate, Register and Confirmation */
router.post('/', registerUser); // Create a new user


export default router;