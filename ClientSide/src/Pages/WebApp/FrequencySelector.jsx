const Days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const Month_Days = Array.from({ length: 31 }, (_, i) => i + 1);
const Frequency_Types = ["Daily", "Monthly"];

function FrequencySelector({ HabitData, SetHabitData, onClose }) {
  const frequencyType = HabitData?.frequency?.frequencyType;
  const selectedDays = HabitData?.frequency?.days || [];
  const selectedMonthDays = HabitData?.frequency?.monthDays || [];

  const setType = (type) => {
    SetHabitData((prev) => ({
      ...prev,
      frequency: {
        ...prev.frequency,
        frequencyType: type,
        days: [],
        monthDays: [],
      },
    }));
  };

  const toggleDay = (day) => {
    SetHabitData((prev) => {
      const days = prev.frequency.days || [];
      return {
        ...prev,
        frequency: {
          ...prev.frequency,
          days: days.includes(day)
            ? days.filter((d) => d !== day)
            : [...days, day],
        },
      };
    });
  };

  const toggleMonthDay = (num) => {
    SetHabitData((prev) => {
      const monthDays = prev.frequency.monthDays || [];
      return {
        ...prev,
        frequency: {
          ...prev.frequency,
          monthDays: monthDays.includes(num)
            ? monthDays.filter((d) => d !== num)
            : [...monthDays, num].sort((a, b) => a - b),
        },
      };
    });
  };

  const toggleAll = (e) => {
    SetHabitData((prev) => ({
      ...prev,
      frequency: {
        ...prev.frequency,
        days: e.target.checked ? [...Days] : [],
      },
    }));
  };

  const allSelected = selectedDays.length === Days.length;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{ border: "1.5px solid #fee2e2" }}
      >
        <div className="bg-red-500 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-black tracking-tight">
              Frequency
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white opacity-70 hover:opacity-100 transition-opacity text-2xl font-light leading-none"
          >
            x
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            {Frequency_Types.map((type) => (
              <button
                key={type}
                onClick={() => setType(type)}
                className="flex-1 py-2.5 text-sm font-bold transition-all duration-200"
                style={{
                  background:
                    frequencyType === type ? "#ef4444" : "transparent",
                  color: frequencyType === type ? "#fff" : "#374151",
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {frequencyType === "Daily" && (
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-between border border-dashed border-red-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-red-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-black">Every Day</p>
                  <p className="text-xs text-gray-400">
                    Select all days at once
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-checked:bg-red-500 rounded-full transition-colors duration-200" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5" />
                </div>
              </label>

              <div className="grid grid-cols-4 gap-2">
                {Days.map((day) => {
                  const active = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className="flex flex-col items-center py-2.5 px-1 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 border"
                      style={{
                        background: active ? "#ef4444" : "#fff",
                        color: active ? "#fff" : "#374151",
                        borderColor: active ? "#ef4444" : "#e5e7eb",
                        boxShadow: active
                          ? "0 2px 8px rgba(239,68,68,0.3)"
                          : "none",
                        transform: active ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      {day.slice(0, 3).toUpperCase()}
                    </button>
                  );
                })}
              </div>

              {selectedDays.length > 0 && (
                <p className="text-xs text-gray-400 text-center">
                  {selectedDays.length} day{selectedDays.length > 1 ? "s" : ""}{" "}
                  selected
                </p>
              )}
            </div>
          )}

          {frequencyType === "Monthly" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 font-medium">
                  Pick days of the month
                </p>
                {selectedMonthDays.length > 0 && (
                  <span className="text-xs font-bold text-red-500">
                    {selectedMonthDays.length} selected
                  </span>
                )}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {Month_Days.map((num) => {
                  const active = selectedMonthDays.includes(num);
                  return (
                    <button
                      key={num}
                      onClick={() => toggleMonthDay(num)}
                      className="flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-150 border aspect-square"
                      style={{
                        background: active ? "#ef4444" : "#fff",
                        color: active ? "#fff" : "#374151",
                        borderColor: active ? "#ef4444" : "#e5e7eb",
                        boxShadow: active
                          ? "0 2px 6px rgba(239,68,68,0.35)"
                          : "none",
                        transform: active ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {selectedMonthDays.length > 0 && (
                <p className="text-xs text-gray-400 leading-relaxed">
                  Days: {selectedMonthDays.join(", ")}
                </p>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-black text-white text-sm font-bold tracking-wider hover:bg-red-500 transition-colors duration-200"
          >
            Save Frequency
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrequencySelector;
