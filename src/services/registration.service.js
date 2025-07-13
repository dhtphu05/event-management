import Registration from '../models/Registration.js';

class RegistrationService {
    async createRegistration(registrationData) {
        try {
            const newRegistration = await Registration.create(registrationData);
            return newRegistration;
        } catch (error) {
            throw error;
        }
    }

    async getAllRegistrations() {
        try {
            const registrations = await Registration.find();
            return registrations;
        } catch (error) {
            throw error;
        }
    }

    async getRegistrationById(registrationId) {
        try {
            const registration = await Registration.findById(registrationId);
            return registration;
        } catch (error) {
            throw error;
        }
    }

    async cancelRegistration(registrationId) {
        try {
            await Registration.findByIdAndDelete(registrationId);
        } catch (error) {
            throw error;
        }
    }
}

export default new RegistrationService();
