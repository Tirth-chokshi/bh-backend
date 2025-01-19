import { Request, Response } from "express";
import { User, IUser } from "../models/User";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
};

// Handle successful Google OAuth callback
export const googleCallback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.redirect(
        "http://localhost:3000/auth?error=authentication_failed"
      );
    }
    // Redirect to dashboard on success
    res.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    console.error("Google callback error:", error);
    res.redirect("http://localhost:3000/auth?error=server_error");
  }
};

// Handle user logout
export const logout = async (req: Request, res: Response) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error logging out",
        });
      }
      res.json({
        success: true,
        message: "Logged out successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during logout",
    });
  }
};

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    const userProfile = await User.findById(user._id).select("-googleId -__v");

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    res.json({
      success: true,
      data: userProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
    });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
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
    ).select("-googleId -__v");

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user profile",
    });
  }
};
