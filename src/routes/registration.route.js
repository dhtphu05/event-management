import RegistrationController from "../controllers/registration.controller";
import express from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware.js';
const registrationRoutes = express.Router();

registrationRoutes.post('/:id/register', authenticateToken, RegistrationController.createRegistration);
registrationRoutes.delete('/:id/register', authenticateToken, RegistrationController.cancelRegistration);
registrationRoutes.get('/:id/registrations', authenticateToken, authorizeRoles('admin'), RegistrationController.getAllRegistrationsByEventId);

export default registrationRoutes;