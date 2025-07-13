import User from '../models/user.model.js';

class UserService {
    async getAllUsers(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const users = await User.find().skip(skip).limit(limit).select('-password');
            const total = await User.countDocuments();
            return { users, total };
        } catch (error) {
            console.error('Error fetching users:', error.message);
            throw error;
        }
    }
    async getUserById(id) {
        try {
            const user = await User.findById(id).select('-password');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
    async updateUser(id, userData) {
        try {
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            const { name, email, role } = userData;
            if (name) user.name = name;
            if (email) user.email = email;
            if (role) user.role = role;

            const updatedUser = await user.save();

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    }
}
export default new UserService();