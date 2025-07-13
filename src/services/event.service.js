import Event from '../models/Event.js';

class EventService {
    async createEvent(eventInfo){
        try {
            const newEvent = await Event.create(eventInfo);
            return newEvent;
        } catch (error) {
            throw new Error('Failed to create event: ' + error.message);
        }
    }
    async getAllEvents() {
        try {
            const events = await Event.find().populate('createdBy', 'title');
            return events;
        } catch (error) {
            throw new Error('Failed to retrieve events: ' + error.message);
        }
    }
    async getEventById(eventId) {
        try {
            const event = await Event.findById(eventId).populate('createdBy', 'username email');
            if (!event) {
                throw new Error('Event not found');
            }
            return event;
        } catch (error) {
            throw new Error('Failed to retrieve event: ' + error.message);
        }
    }
    async updateEvent(eventId, updateData) {
        try {
            const event = await Event.findByIdAndUpdate(
                eventId,
                updateData
            ).populate('createdBy', 'username email');
            
            if (!event) {
                throw new Error('Event not found');
            }
            
            return event;
        } catch (error) {
            throw new Error('Failed to update event: ' + error.message);
        }
    }
    async lockEvent(eventId){
        try {
            const event = await Event.findByIdAndUpdate(
                eventId,
                { isLocked: true }
            ).populate('createdBy', 'username email');
            
            if (!event) {
                throw new Error('Event not found');
            }
            
            return event;
        } catch (error) {
            throw new Error('Failed to lock event: ' + error.message);
        }
    }
    async unlockEvent(eventId){
        try {
            const event = await Event.findByIdAndUpdate(
                eventId,
                { isLocked: false }
            ).populate('createdBy', 'username email');

            if (!event) {
                throw new Error('Event not found');
            }
            
            return event;
        } catch (error) {
            throw new Error('Failed to unlock event: ' + error.message);
        }
    }
}
export default new EventService();