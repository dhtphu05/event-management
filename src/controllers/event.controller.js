import Event from '../models/Event.js';
import EventService from '../services/event.service.js';

class EventController{
    async createEvent(req, res){
        try{
            const eventInfo = {...req.body, createdBy: req.user.id};
            
            const newEvent = await EventService.createEvent(eventInfo);
            return res.status(201).json({
                success: true,
                message: 'Event created successfully',
                data: newEvent
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: 'Failed to create event',
                error: error.message
            });
        }
    }
    async getAllEvents(req, res){
        try{
            const events = await EventService.getAllEvents();
            return res.status(200).json({
                success: true,
                data: events
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve events',
                error: error.message
            });
        }
    }
    async getEventById(req, res){
        try{
            const eventId = req.params.id;
            const event = await EventService.getEventById(eventId);
            if(!event){
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: event
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
    async updateEvent(req, res){
        try{
            const eventId = req.params.id;
            const updatedData = req.body;
            const updatedEvent = await EventService.updateEvent(eventId, updatedData);
            if(!updatedEvent){
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: updatedEvent
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: 'Failed to update event',
                error: error.message
            });
        }
    }
    async deleteEvent(req, res){
        try{
            const eventId = req.params.id;
            const deletedEvent = await EventService.deleteEvent(eventId);
            if(!deletedEvent){
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Event deleted successfully'
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: 'Failed to delete event',
                error: error.message
            });
        }
    }
    async lockEvent(req, res){
        try{
            const eventId = req.params.id;
            const lockedEvent = await EventService.lockEvent(eventId);
            if(!lockedEvent){
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: lockedEvent
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: 'Failed to lock event',
                error: error.message
            });
        }
    }
    async unlockEvent(req, res){
        try{
            const eventId = req.params.id;
            const unlockedEvent = await EventService.unlockEvent(eventId);
            if(!unlockedEvent){
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: unlockedEvent
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: 'Failed to unlock event',
                error: error.message
            });
        }
    }
}

export default new EventController();