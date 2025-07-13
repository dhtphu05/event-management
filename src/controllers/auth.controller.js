import AuthService from '../services/auth.service.js';

class AuthController {
    async register(req, res) {
        try {
        
            const { username, email, password } = req.body;
            
            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'username, email and password is empty'
                });
            }
            const result = await AuthService.register(username, email, password);
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            });
            
            
        } catch (error) {
            console.error( error);
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'username and password is empty'
                });
            }
            
            const result = await AuthService.login(username, password);
            
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            console.error( error);
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
    async forgotPassword(req, res) {
        try{
            const {email} =req.body;
            if(!email){
                return res.status(400).json({
                    success: false,
                    message: 'email is empty'
                });
            }
            const result = await AuthService.forgotPassword(email);
            return res.status(200).json({
                success: true,
                message: 'Reset token generated',
                data: result
            });
        }
        catch(error){
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async resetPassword(req, res) {
        try{
            const {token} = req.params;
            const {password} = req.body;
            if(!token || !password){
                return res.status(400).json({
                    success: false,
                    message: 'token and new password is empty'
                });
            }
            const result = await AuthService.resetPassword(token, password);
            return res.status(200).json({
                success: true,
                message: 'Password reset successfully',
                data: result
            });
        }
        catch(error){
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new AuthController();