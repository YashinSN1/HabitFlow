import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MobileNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: "Dashboard", path: "/app", icon: null },  // null for now
        { label: "Habits", path: "/app/habits", icon: null },
        { label: "Analytics", path: "/app/analytics", icon: null },
        { label: "Calendar", path: "/app/calendar", icon: null },
        { label: "Settings", path: "/app/settings", icon: null },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 block lg:hidden shadow-lg z-50">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors duration-200 ${
                                isActive 
                                    ? "text-red-600" 
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {item.icon && (
                                <span className="text-xl">{item.icon}</span>
                            )}
                            
                            <span className={`text-xs ${
                                item.icon ? "mt-0.5" : "text-sm font-medium"
                            } ${
                                isActive ? "font-semibold" : "font-medium"
                            }`}>
                                {item.label}
                            </span>
                            
                            {isActive && (
                                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-red-600 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default MobileNav;