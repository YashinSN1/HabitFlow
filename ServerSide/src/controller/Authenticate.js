import jwt from 'jsonwebtoken'
import env from 'dotenv'
import bcrypt from 'bcrypt'
import User from '../models/User.js';

env.config();

export const RegisterUser = async (req, res) => {
    let { name, email, password } = req.body;
    try {
        let FindUser = await User.findOne({ email });
        if (FindUser) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists. Try Logging In.",
                errorReference: "USER_EXISTS",
                details: `User with email '${email}' already exists in the database`
            });
        }

        const CreateUser = new User({ name, email, password });
        const SaveUser = await CreateUser.save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully.",
            user: { id: CreateUser._id, name: CreateUser.name, email: CreateUser.email }
        });
    } catch (error) {
        let errorMessage = "Internal Server Error";
        let errorReference = "REGISTRATION_FAILED";
        let errorDetails = error.message;

        if (error.name === 'ValidationError') {
            errorMessage = "Validation Error: Invalid user data provided";
            errorReference = "VALIDATION_ERROR";
            errorDetails = `MongoDB validation failed: ${error.message}`;
        } else if (error.name === 'MongoServerError') {
            errorMessage = "Database Error: Unable to save user data";
            errorReference = "DATABASE_ERROR";
            errorDetails = `MongoDB error (code: ${error.code}): ${error.message}`;
        } else if (error.name === 'CastError') {
            errorMessage = "Data Type Error: Invalid data format provided";
            errorReference = "CAST_ERROR";
            errorDetails = `Data casting failed: ${error.message}`;
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
            errorReference: errorReference,
            details: errorDetails,
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                fullError: error
            })
        });
    }
}

export const LoginUser = async (req, res) => {
    let { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
                errorReference: "MISSING_CREDENTIALS",
                details: `Missing required fields: ${!email ? 'email' : ''} ${!password ? 'password' : ''}`.trim()
            });
        }
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                errorReference: "USER_NOT_FOUND",
                details: `No user found with email '${email}' in the database`
            });
        }

        const ComparePassword = await bcrypt.compare(password, user.password);
        if (!ComparePassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
                errorReference: "INVALID_PASSWORD",
                details: `Password provided does not match the stored password for user '${email}'`
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' || false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });

    } catch (error) {
        console.error("LoginUser - Error occurred:", error);

        let errorMessage = "Internal Server Error";
        let errorReference = "LOGIN_FAILED";
        let errorDetails = error.message;

        if (error.name === 'JsonWebTokenError') {
            errorMessage = "Authentication Error: Invalid token configuration";
            errorReference = "JWT_ERROR";
            errorDetails = `JWT token generation failed: ${error.message}`;
        } else if (error.name === 'MongoServerError') {
            errorMessage = "Database Error: Unable to query user data";
            errorReference = "DATABASE_ERROR";
            errorDetails = `MongoDB error (code: ${error.code}): ${error.message}`;
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
            errorReference: errorReference,
            details: errorDetails,
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                fullError: error
            })
        });
    }
}