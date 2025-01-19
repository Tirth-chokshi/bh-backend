import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  profilePhoto?: string;
  createdAt: Date;
  lastLogin: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<IUser>('User', userSchema);