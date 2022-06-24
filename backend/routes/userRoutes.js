import {Router} from 'express';
const router = Router();
import {registerUser, autenticateUser, confirm, forgotPassword, resetPassword} from '../controllers/usersControllers.js'

/* Autenticate, Register and Confirmation */
router.post('/', registerUser); // Create a new user
router.post('/login', autenticateUser); // Autenticate user
router.get('/confirm/:token', confirm); // Confirm user
router.post('/forgot', forgotPassword); // Forgot password
router.route('/forgot/:token').get(confirm).post(resetPassword); //  Reset password

export default router;