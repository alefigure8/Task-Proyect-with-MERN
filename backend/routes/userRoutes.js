import {Router} from 'express';
const router = Router();
import {registerUser, autenticateUser, confirm, forgotPassword, resetPassword, perfil} from '../controllers/usersControllers.js'
import checkAuth from '../middleware/checkAuth.js'

/* Publics */
router.post('/', registerUser); // Create a new user
router.post('/login', autenticateUser); // Autenticate user
router.get('/confirm/:token', confirm); // Confirm user
router.post('/forgot', forgotPassword); // Forgot password
router.route('/forgot/:token').get(confirm).post(resetPassword); //  Reset password

/* Privates */
router.get('/perfil', checkAuth, perfil);

export default router;