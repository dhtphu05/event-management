import User from '../models/User.js';
import authController from './auth.controller.js';
import UserService from '../services/user.service.js';
import { UserRepository } from '../repositories/users.repository.js';

class UserController{
    async createUser(req, res){
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || 'Invalid user data'
            });
        }
    }
    async getUser(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message 
            });
        }
    }
    async getAllUsers(req, res) {
        try {
            const {page= 1, limit = 10} = req.query;
            const users = await UserService.getAllUsers(Number(page), Number(limit));
            res.status(200).json({
                success: true,
                message: 'Get all users successfully',
                data: {
                    users,
                    page: Number(page),
                    limit: Number(limit)
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message 
            });
        }
    }
    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message 
            });
        }
    }
    async deleteUser(req,res){
        try{
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            await UserService.deleteUser(req.params.id);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}