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
        <nav
            className="fixed bottom-0 left-0 right-0 lg:hidden bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)]
                 flex items-center justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] z-50"
        >
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-lg transition"
                    >
                        <div
                            className={`w-5 h-5 rounded ${isActive ? "bg-black" : "bg-gray-300"
                                }`}
                        />
                        <span
                            className={`text-xs ${isActive ? "text-black font-medium" : "text-gray-500"
                                }`}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}

export default MobileNav;