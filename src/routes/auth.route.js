import AuthController from "../controllers/auth.controller.js";
import express from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);
authRoutes.post('/forgot-password', AuthController.forgotPassword);
authRoutes.post('/reset-password/:token', AuthController.resetPassword);

export default authRoutes;