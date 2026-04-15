import jwt from "jsonwebtoken";
import env from "dotenv";
import User from "../models/User.js";
env.config();

export const AuthenticateUser = async (req, res, next) => {
    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Server configuration error",
                errorReference: "JWT_SECRET_MISSING",
                details: "JWT secret key is not configured on the server"
            });
        }
        let token = null;

        const authHeader = req.header('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.replace('Bearer ', '').trim();
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
                errorReference: "NO_TOKEN_PROVIDED",
                details: "No authentication token found in Authorization header or cookies"
            });
        }

        let decodedUser;
        try {
            decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            let errorMessage = "Invalid authentication token";
            let errorReference = "TOKEN_VERIFICATION_FAILED";
            let errorDetails = "Token verification failed";

            if (jwtError.name === 'TokenExpiredError') {
                errorMessage = "Authentication token has expired";
                errorReference = "TOKEN_EXPIRED";
                errorDetails = `Token expired at: ${jwtError.expiredAt}`;
            } else if (jwtError.name === 'JsonWebTokenError') {
                errorMessage = "Invalid authentication token";
                errorReference = "INVALID_TOKEN";
                errorDetails = "Token signature or format is invalid";
            } else if (jwtError.name === 'NotBeforeError') {
                errorMessage = "Authentication token not yet valid";
                errorReference = "TOKEN_NOT_ACTIVE";
                errorDetails = `Token becomes valid at: ${jwtError.date}`;
            }

            return res.status(401).json({
                success: false,
                message: errorMessage,
                errorReference: errorReference,
                details: errorDetails,
                timestamp: new Date().toISOString()
            });
        }

        if (!decodedUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload",
                errorReference: "INVALID_TOKEN_PAYLOAD",
                details: "Token verification succeeded but returned invalid user data"
            });
        }

        if (!decodedUser.id || !decodedUser.email) {
            return res.status(401).json({
                success: false,
                message: "Incomplete token data",
                errorReferebnce: "INCOMPLETE_TOKEN_DATA",
                details: "Token payload is missing required user identification fields"
            });
        }

        const user = await User.findById(decodedUser.id).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                errorReference: "USER_NOT_FOUND",
                details: `No user found with ID '${decodedUser.id}' in the database`
            });
        }

        req.user = decodedUser;
        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Authentication system error",
            errorReference: "AUTH_SYSTEM_ERROR",
            details: "An unexpected error occurred during authentication",
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                fullError: error
            })
        });
    }
}

export default AuthenticateUser;