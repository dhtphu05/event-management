import Registration from '../models/Registration.js';

class RegistrationService {
    async createRegistration(registrationData) {
        try {
            const existingRegistration = await Registration.findOne({
                user: registrationData.userId,
                event: registrationData.eventId,
                status: 'registered'
            });

            if (existingRegistration) {
                throw new Error('User already registered for this event');
            }

            const newRegistration = await Registration.create({
                ...registrationData,
                user: registrationData.userId,
                event: registrationData.eventId,
                status: 'registered'
            });

            return await this.getRegistrationById(newRegistration._id);
        } catch (error) {
            throw error;
        }
    }
    async getRegistrationsByEventId(eventId) {
        try {
            
            const { status = 'registered', includeUser = true } = options;
            const filter = { event: eventId, status };

            let query = Registration.find(filter);
            
            if (includeUser) {
                query = query.populate('user', 'username email');
            }

            const registrations = await query.sort({ createdAt: -1 }).lean();
            return registrations;
        } catch (error) {
            throw error;
        }
    }

    async updateRegistrationStatus(registrationId, status) {
        try {
            
            const updatedRegistration = await Registration.findByIdAndUpdate(
                registrationId,
                { 
                    status,
                    updatedAt: new Date()
                },
            ).populate('user')
             .populate('event');

            if (!updatedRegistration) {
                throw new Error('Registration not found');
            }

            return updatedRegistration;
        } catch (error) {
            throw error;
        }
    }
    async getRegistrationById(registrationId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(registrationId)) {
                throw new Error('Invalid registration ID format');
            }

            const registration = await Registration.findById(registrationId)
                .populate('user')
                .populate('event')
                .lean();

            return registration;
        } catch (error) {
            throw new Error(`Failed to retrieve registration: ${error.message}`);
        }
    }

    async cancelRegistration(registrationId) {
        try {
            const registration = await this.getRegistrationById(registrationId);
            
            if (!registration) {
                throw new Error('Registration not found');
            }

            if (registration.status === 'cancelled') {
                throw new Error('Registration already cancelled');
            }

            return await this.updateRegistrationStatus(registrationId, 'cancelled');
        } catch (error) {
            throw error;
        }
    }
}

export default new RegistrationService();
