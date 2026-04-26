import { useState } from "react";

const DAYS_LABEL = ["M", "T", "W", "T", "F", "S", "S"];
const START_DAY = 2;
const TOTAL_DAYS = 30;
const TODAY = 26;
const HAS_DOT = [3, 7, 10, 12, 15, 17, 19, 22, 24];

const HABITS = [
  { id: 1, name: "Morning run", status: "done" },
  { id: 2, name: "Read 20 mins", status: "missed" },
  { id: 3, name: "No junk food", status: "done" },
  { id: 4, name: "Meditate", status: "done" },
  { id: 5, name: "Evening walk", status: "pending" },
];

const Badge = ({ status }) => {
  const styles = {
    done: "bg-green-50 text-green-600 border border-green-200",
    missed: "bg-red-50 text-red-500 border border-red-200",
    pending: "bg-amber-50 text-amber-600 border border-amber-200",
  };
  return (
    <span
      className={`font-mono text-[10px] font-semibold tracking-widest px-3 py-0.5 rounded ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const AccentBar = ({ status }) => {
  const color = status === "done" ? "bg-red-500" : "bg-gray-200";
  return <div className={`w-[3px] h-[22px] rounded-full ${color}`} />;
};

export function DesktopCalander() {
  const [selectedDay, setSelectedDay] = useState(TODAY);

  const blanks = Array(START_DAY).fill(null);
  const days = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);

  return (
    <div className=" w-full h-fit max-w-4xl bg-white m-auto">
      <div className="bg-white border w-full items-center min-h-[500px] flex justify-between border-gray-100 rounded-2xl shadow-sm">

        <div className="p-7 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-baseline gap-2">
              <span
                className="text-[32px] leading-none font-black tracking-wide text-gray-900 uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                April
              </span>
              <span
                className="text-[32px] leading-none font-black tracking-wide text-red-500 uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                2026
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {DAYS_LABEL.map((d, i) => (
              <div
                key={i}
                className="font-mono text-[10px] text-gray-300 text-center tracking-widest py-1"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} className="aspect-square" />
            ))}
            {days.map((d) => {
              const isFuture = d > TODAY;
              const isSelected = d === selectedDay;
              const showDot = HAS_DOT.includes(d);
              return (
                <button
                  key={d}
                  onClick={() => !isFuture && setSelectedDay(d)}
                  disabled={isFuture}
                  style={{
                    borderColor:
                      !isSelected && !isFuture ? "#ebebeb" : undefined,
                  }}
                  className={`
                      aspect-square rounded-xl flex flex-col items-center justify-center border transition-all duration-150
                      ${isFuture ? "opacity-20 cursor-default border-gray-100" : "cursor-pointer"}
                      ${
                        isSelected
                          ? "bg-red-500 border-red-500 shadow-[0_4px_16px_rgba(229,62,62,0.3)]"
                          : "bg-white hover:border-red-400 hover:bg-red-50"
                      }
                    `}
                >
                  <span
                    className={`font-mono text-xs font-medium ${isSelected ? "text-white" : "text-gray-800"}`}
                  >
                    {d}
                  </span>
                  {showDot && !isSelected && (
                    <span className="w-1 h-1 rounded-full bg-red-500 mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(229,62,62,0.4), #e53e3e, rgba(229,62,62,0.4), transparent)",
          }}
        />

        <div className="p-7 w-full">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-baseline gap-2">
              <span
                className="text-red-500 text-xl tracking-wide font-black uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Apr {selectedDay}
              </span>
              <span className="font-mono text-[11px] text-gray-300 tracking-widest">
                {selectedDay === TODAY ? "— today" : ""}
              </span>
            </div>
          </div>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            {HABITS.map((habit, i) => (
              <div
                key={habit.id}
                className={`flex items-center justify-between px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors ${
                  i < HABITS.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <AccentBar status={habit.status} />
                  <span className="text-sm font-medium text-gray-900">
                    {habit.name}
                  </span>
                </div>
                <Badge status={habit.status} />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
