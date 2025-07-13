import Registration from '../models/Registration.js';
import RegistrationService from '../services/registration.service.js';

class RegistrationController {
    async createRegistration(req, res) {
        try {
            const registrationData = { ...req.body, userId: req.user.id };
            const newRegistration = await RegistrationService.createRegistration(registrationData);
            return res.status(201).json({
                success: true,
                message: 'Registration created successfully',
                data: newRegistration
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create registration',
                error: error.message
            });
        }
    }

    async getAllRegistrations(req, res) {
        try {
            const registrations = await RegistrationService.getAllRegistrations();
            return res.status(200).json({
                success: true,
                data: registrations
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve registrations',
                error: error.message
            });
        }
    }
    async cancelRegistration(req, res) {
        try {
            const registrationId = req.params.id;
            const registration = await RegistrationService.getRegistrationById(registrationId);
            if (!registration) {
                return res.status(404).json({
                    success: false,
                    message: 'Registration not found'
                });
            }
            await RegistrationService.cancelRegistration(registrationId);
            return res.status(200).json({
                success: true,
                message: 'Registration cancelled successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to cancel registration',
                error: error.message
            });
        }
    }
}

export default new RegistrationController();
