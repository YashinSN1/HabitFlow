import { useNavigate } from "react-router-dom";

function Sidebar({ MenuClicked }) {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full ${MenuClicked ? "lg:max-w-2/12" : ""} h-full py-6 hidden ${MenuClicked ? "lg:block" : ""} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out `}
    >
      <nav className="flex flex-col gap-3 h-full py-2">
        <button
          onClick={() => navigate("/app")}
          className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="w-5 h-5 bg-gray-300 rounded" />
          <span
            className={`md:text-[16px] font-medium ${MenuClicked ? "block" : "hidden"}`}
          >
            Dashboard
          </span>
        </button>

        <button
          onClick={() => navigate("/app/habits")}
          className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="w-5 h-5 bg-gray-300 rounded" />
          <span
            className={`md:text-[16px] font-medium ${MenuClicked ? "block" : "hidden"}`}
          >
            Habits
          </span>
        </button>

        <button className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-gray-100 transition">
          <div className="w-5 h-5 bg-gray-300 rounded" />
          <span
            className={`md:text-[16px] font-medium ${MenuClicked ? "block" : "hidden"}`}
          >
            Analytics
          </span>
        </button>

        <button className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-gray-100 transition">
          <div className="w-5 h-5 bg-gray-300 rounded" />
          <span
            className={`md:text-[16px] font-medium ${MenuClicked ? "block" : "hidden"}`}
          >
            Settings
          </span>
        </button>

        <button className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-gray-100 transition">
          <div className="w-5 h-5 bg-gray-300 rounded" />
          <span
            className={`md:text-[16px] font-medium ${MenuClicked ? "block" : "hidden"}`}
          >
            Calander
          </span>
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;
