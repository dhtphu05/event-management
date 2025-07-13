import EventController from '../controllers/event.controller.js';
import {authenticateToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import express from 'express';

const eventRoutes = express.Router();

eventRoutes.post('/', authenticateToken, authorizeRoles('admin'), EventController.createEvent);
eventRoutes.get('/',  EventController.getAllEvents);
eventRoutes.get('/:id', EventController.getEventById);
eventRoutes.put('/:id', authenticateToken, authorizeRoles('admin'), EventController.updateEvent);
eventRoutes.delete('/:id', authenticateToken, authorizeRoles('admin'), EventController.deleteEvent);
eventRoutes.patch('/:id/lock', authenticateToken, authorizeRoles('admin'), EventController.lockEvent);
eventRoutes.patch('/:id/unlock', authenticateToken, authorizeRoles('admin'), EventController.unlockEvent);

export default eventRoutes;
