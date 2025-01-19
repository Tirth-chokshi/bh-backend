import { Request, Response } from 'express';
import { User, IUser } from '../models/User';

export class AuthController {
  // Get current authenticated user
  static async getCurrentUser(req: Request, res: Response) {
    try {
      const user = req.user as IUser;
      res.json({
        success: true,
        data: {
          id: user._id,
          email: user.email,
          displayName: user.displayName,
          profilePhoto: user.profilePhoto,
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user data'
      });
    }
  }

  // Handle successful Google OAuth callback
  static async googleCallback(req: Request, res: Response) {
    try {
      res.redirect('/');
    } catch (error) {
      res.redirect('/login?error=authentication_failed');
    }
  }

  // Handle user logout
  static async logout(req: Request, res: Response) {
    try {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error logging out'
          });
        }
        res.json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error during logout'
      });
    }
  }

  // Get user profile
  static async getProfile(req: Request, res: Response) {
    try {
      const user = req.user as IUser;
      const userProfile = await User.findById(user._id)
        .select('-googleId -__v');

      if (!userProfile) {
        return res.status(404).json({
          success: false,
          message: 'User profile not found'
        });
      }

      res.json({
        success: true,
        data: userProfile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user profile'
      });
    }
  }

  // Update user profile
  static async updateProfile(req: Request, res: Response) {
    try {
      const user = req.user as IUser;
      const { displayName, firstName, lastName } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          displayName,
          firstName,
          lastName,
        },
        { new: true, runValidators: true }
      ).select('-googleId -__v');

      res.json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating user profile'
      });
    }
  }
}
