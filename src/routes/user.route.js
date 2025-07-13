import UserController from '../controllers/user.controller.js';
import express from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', authenticateToken, authorizeRoles('admin'), UserController.createUser);
userRoutes.get('/me', authenticateToken, UserController.getProfile);
userRoutes.get('/', authenticateToken, authorizeRoles('admin'), UserController.getAllUsers);
userRoutes.put('/me', authenticateToken, UserController.updateProfile);
userRoutes.delete('/:id', authenticateToken, authorizeRoles('admin'), UserController.deleteUser);

export default userRoutes;