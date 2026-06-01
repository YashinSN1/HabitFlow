import { useState, useEffect } from "react";
import axios from "axios";

const Days_Label = ["S", "M", "T", "W", "T", "F", "S"];
const Seven_Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Badge = ({ status }) => {
  const styles = {
    completed: "bg-green-50 text-green-600 border border-green-200",
    skipped: "bg-red-50 text-red-500 border border-red-200",
    pending: "bg-amber-50 text-amber-600 border border-amber-200",
  };
  return (
    <span className={`font-mono text-[10px] font-semibold tracking-widest px-3 py-0.5 rounded ${styles[status]}`}>
      {status}
    </span>
  );
};

const AccentBar = ({ status }) => {
  const color = status === "completed" ? "bg-green-500" : status === "skipped" ? "bg-red-500" : "bg-gray-200";
  return <div className={`w-[3px] h-[22px] rounded-full ${color}`} />;
};

export function DesktopCalander() {
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split("T")[0]);
  const [AllHabits, SetAllHabits] = useState([]);

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const response = await axios.get(`/api/app/habit/tracking/${selectedDay}`);
        if (response.data.success) {
          SetAllHabits(response.data.TrackData);
        }
      } catch (error) {
        if (error.response) {
          console.log("Status:", error.response.status);
          console.log("Backend Message:", error.response.data.message);
        } else if (error.request) {
          console.log("No response received from server.");
        } else {
          console.log("Error:", error.message);
        }
      }
    };
    fetchTrackData();
  }, [selectedDay]);

  const GenBeforeDays = () => {
    const currentDate = new Date();
    const AllPastDays = [];

    for (let i = 0; i < 20; i++) {
      const pastDate = new Date(currentDate);
      pastDate.setDate(pastDate.getDate() - i);
      AllPastDays.push({
        date: pastDate.toISOString().split("T")[0],
        dayNumber: pastDate.getDate(),
        dayOfWeek: Seven_Days[pastDate.getDay()]
      });
    }

    AllPastDays.reverse();

    const firstDay = AllPastDays[0].dayOfWeek;
    const daysToAdd = Seven_Days.indexOf(firstDay);

    for (let i = 0; i < daysToAdd; i++) {
      AllPastDays.unshift({ date: "", dayNumber: "", dayOfWeek: "", isempty: true });
    }

    return AllPastDays;
  };

  const GenAfterDays = () => {
    const currentDate = new Date();
    const AllFutureDays = [];

    for (let i = 1; i < 7; i++) {
      const futureDate = new Date(currentDate);
      futureDate.setDate(futureDate.getDate() + i);
      AllFutureDays.push({
        date: futureDate.toISOString().split("T")[0],
        dayNumber: futureDate.getDate(),
        dayOfWeek: Seven_Days[futureDate.getDay()],
        locked: true
      });
    }
    return AllFutureDays;
  };

  const pastDays = GenBeforeDays();
  const futureDays = GenAfterDays();
  const allDays = [...futureDays.reverse(), ...pastDays.reverse()].reverse();

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const selectedDayNumber = selectedDay ? new Date(selectedDay).getDate() : "";

  return (
    <div className="w-full h-fit max-w-4xl bg-white m-auto">
      <div className="bg-white border w-full items-center min-h-[500px] flex justify-between border-gray-100 rounded-2xl shadow-sm">
        <div className="p-7 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] leading-none font-black tracking-wide text-gray-900 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {currentMonth}
              </span>
              <span className="text-[32px] leading-none font-black tracking-wide text-red-500 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {currentYear}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {Days_Label.map((d, i) => (
              <div key={i} className="font-mono text-[10px] text-gray-300 text-center tracking-widest py-1">
                {d}
              </div>
            ))}

            {allDays.map((day, index) => {
              const isSelected = day.date === selectedDay;

              return (
                <button
                  key={index}
                  onClick={() => !day.locked && !day.isempty && setSelectedDay(day.date)}
                  disabled={day.locked}
                  className={`
                    ${day.isempty ? "cursor-default opacity-0" : ""}
                    aspect-square rounded-xl flex flex-col items-center justify-center border transition-all duration-150
                    ${day.locked ? "opacity-20 cursor-default border-gray-100" : "cursor-pointer"}
                    ${isSelected ? "bg-red-500 border-red-500 shadow-[0_4px_16px_rgba(229,62,62,0.3)]" : "bg-white hover:border-red-400 hover:bg-red-50"}
                  `}
                >
                  <span className={`font-mono text-xs font-medium ${isSelected ? "text-white" : "text-gray-800"}`}>
                    {day.dayNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(229,62,62,0.4), #e53e3e, rgba(229,62,62,0.4), transparent)" }} />

        <div className="p-7 w-full">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-baseline gap-2">
              <span className="text-red-500 text-xl tracking-wide font-black uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {currentMonth} {selectedDayNumber}
              </span>
              <span className="font-mono text-[11px] text-gray-300 tracking-widest">
                {selectedDay === new Date().toISOString().split("T")[0] ? "— today" : ""}
              </span>
            </div>
          </div>

          {AllHabits.length === 0 ? (
            <p className="text-sm text-gray-400 text-center mt-10">No habits tracked for this day</p>
          ) : (
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              {AllHabits.map((habit, i) => (
                <div
                  key={habit._id}
                  className={`flex items-center justify-between px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors ${i < AllHabits.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <AccentBar status={habit.status} />
                    <span className="text-sm font-medium text-gray-900">
                      {habit.habitId.title}
                    </span>
                  </div>
                  <Badge status={habit.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}