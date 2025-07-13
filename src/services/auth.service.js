import { UserRepository } from '../../repositories/users.repository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import { sendResetPasswordEmail } from '../email.service.js'; 

const userRepo = new UserRepository();
const JWT_SECRET = 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '24h';

class AuthService {
    async register(username, email, password) {
        try {
            const existingUser = await userRepo.findByUsername(username);
            if (existingUser) {
                throw new Error('Username already exists');
            }

            const existingEmail = await userRepo.findByEmail(email);
            if (existingEmail) {
                throw new Error('Email already existing');
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                role: 'user',
                createdAt: new Date().toISOString()
            });

            const token = this._generateToken(newUser);

            const userResponse = {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            };

            return {
                user: userResponse,
                token
            };
        } catch (error) {
            console.error('Registration error:', error.message);
            throw error;
        }
    }

    async login(username, password) {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            const token = this._generateToken(user);

            const userResponse = {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            };

            return {
                user: userResponse,
                token
            };
        } catch (error) {
            console.error('Login error:', error.message);
            throw error;
        }
    }

    _generateToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
    }

    
    async forgotPassword(email){
        try{
            const user = await User.findOne({email});

            if(!user) {
                throw new Error('User not found');
            }
            else{
                const resetToken = this._generateToken(user);

                user.resetToken = resetToken;
                user.resetTokenExpires = Date.now() + 3600000;
                console.log('Reset token in DB:', resetToken); 
                await user.save();

                const resetLink= ` 'http://localhost:3000/auth/reset-password/${resetToken}`;
                console.log(`Reset link: ${resetLink}`);
                
                await sendResetPasswordEmail(user.email, resetLink);
                console.log(`Reset password email sent to ${user.email}`);
                return {
                    message: 'Reset password email sent',
                    resetLink
                };
            
            }
        }
        catch(error){
            console.error('Forgot password error:', error.message);
            throw error;
        }
    }
    async resetPassword(resetToken, newPassword){
        try{
            console.log('Reset token:', resetToken);
            const user = await User.findOne({ resetToken: resetToken});
            if(!user){
                throw new Error('Invalid or expired reset token');
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.resetTokenExpires = undefined;
            await user.save();
            return {
                message: 'Password reset successfully'
            };
        }
        catch(error){
            console.error('Reset password error:', error.message);
            throw error;
        }
    }
}

export default new AuthService();