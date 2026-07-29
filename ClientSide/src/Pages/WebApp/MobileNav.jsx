import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MobileNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: "Dashboard", path: "/app" },
        { label: "Habits", path: "/app/habits" },
        { label: "Analytics", path: "/app/analytics" },
        { label: "Calendar", path: "/app/calendar" },
        { label: "Settings", path: "/app/settings" },
    ];

    return (
        <>
        </>

    );
}

export default MobileNav;