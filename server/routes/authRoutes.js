import express from 'express'
import AuthController from '../controllers/authCRUD.js';
import { requireAuth } from '../middleware/authMiddleware.js';


const authRouter = express.Router()

authRouter.post('/signup', AuthController.createUserSignUp);
authRouter.post('/login', AuthController.createUserLogin);
authRouter.get('/user', requireAuth, AuthController.getUser);


export default authRouter;
