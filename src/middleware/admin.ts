import { Request, Response, NextFunction } from 'express'
import { IUser } from '../models/User'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser
  
  // Add your admin check logic here
  // For example: if (user.role === 'admin')
  
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Admin only'
    })
  }
  
  next()
};