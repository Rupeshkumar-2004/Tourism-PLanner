import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        fullName : {
            type: String,
            required: [true, 'Full Name is required'], 
            trim: true, 
            minLength: [3, 'Name must be at least 3 characters'],
            maxLength: [50, 'Name cannot exceed 50 characters']
        }, 

        email: {
            type: String, 
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email'
            ]
        }, 

        password: {
            type: String, 
            required: [true, 'Password is required'], 
            minLength: [6 , 'Password must be at least 6 characters']
        }, 

        phone: {
            type: String,
            match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
        }, 

        ProfilePicture: {
            type: String, 
            default: ''
        },

        role: {
            type: String, 
            enum: ["admin", "user", "guide"], 
            default: "user"
        }, 

        refreshToken: {
            type: String, 
            default: null
        }
    }, 
    {
        timestamps: true
    }
);

// METHOD: Compare password for login
userSchema.methods.comparePassword =async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// METHOD: Generate Access Token (short-lived)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
    }
  );
};

// METHOD: Generate Refresh Token (long-lived)
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
    }
  );
};

const User = mongoose.model('User', userSchema);

export default User;