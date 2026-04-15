import { request } from "express";

export const AppController = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({
            success: true,
            message: "User verified successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status || 'active'
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