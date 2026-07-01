import { request } from "express";
import User from "../models/User.js";

export const AppController = async (req, res) => {
    try {
        const { timezone } = req.body;

        if (!timezone) {
            return res.status(400).json({
                success: false,
                message: "Timezone is required",
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { timezone },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Timezone updated successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status || 'active',
                timezone: user.timezone
            },
            verifiedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error("AppController - Unexpected error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            errorReference: "APP_CONTROLLER_ERROR",
            details: error.message,
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                fullError: error
            })
        });
    }
}

export default AppController;