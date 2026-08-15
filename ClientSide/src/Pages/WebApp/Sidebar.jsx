import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ MenuClicked }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Dashboard", path: "/app" },
    { label: "Habits", path: "/app/habits" },
    { label: "Analytics", path: "/app/analytics" },
    { label: "Settings", path: "/app/settings" },
  ];

  return (
    <div
      className={`w-full ${MenuClicked ? "lg:max-w-2/12" : ""} h-full py-6 hidden ${MenuClicked ? "lg:block" : ""} bg-white border-r border-gray-100 transition-all duration-300 ease-in-out`}
    >
      <nav className="flex flex-col gap-1.5 h-full py-2 px-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors duration-150 ${
                isActive
                  ? "bg-red-50 text-red-500"
                  : "text-black hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-red-500" : "bg-gray-300"}`}
              />
              <span
                className={`md:text-[15px] font-semibold ${MenuClicked ? "block" : "hidden"} ${
                  isActive ? "text-red-500" : "text-black"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
