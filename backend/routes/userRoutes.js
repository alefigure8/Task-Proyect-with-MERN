import {Router} from 'express';
const router = Router();
import {registerUser, autenticateUser} from '../controllers/usersControllers.js'

/* Autenticate, Register and Confirmation */
router.post('/', registerUser); // Create a new user
router.post('/login', autenticateUser); // Autenticate user


export default router;