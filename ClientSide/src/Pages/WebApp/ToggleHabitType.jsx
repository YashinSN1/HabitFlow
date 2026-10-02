
const HabitTypes = ["Time Bound", "Non Time Bound"];

function ToggleHabitType({ HabitData, SetHabitData, Toggle, Cancel, SetToggle, onCreate }) {
    const setType = (type) => {
        SetHabitData((prev) => ({
            ...prev,
            habitType: type,
        }));
    };


    return (
        <div
            className={`fixed inset-0 z-100 flex items-center justify-center p-4 ${Toggle ? "" : "hidden"}`}
            style={{ background: "rgba(0,0,0,0.6)" }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100">
                <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
                    <h2 className="text-black text-lg font-black tracking-tight">
                        Habit Type
                    </h2>
                    <button
                        onClick={() => {
                            Cancel();
                            SetToggle(false);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-300 hover:text-white transition-colors text-gray-500 text-lg font-light leading-none"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-5 flex flex-col gap-5">
                    <div className="flex flex-col rounded-xl border-none gap-5  ">
                        {HabitTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    setType(type);
                                    if (type === "Non Time Bound") {
                                        SetToggle(false);
                                        onCreate();
                                    }
                                }}
                                className="flex-1 py-3 hover:bg-red-300 hover:text-white w-full h-full text-sm border-gray-300 border font-bold transition-all duration-200"
                                style={{
                                    background: HabitData.habitType === type ? "#ef4444" : "#ffffff",
                                    color: HabitData.habitType === type ? "#ffffff" : "#000000",
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className={`flex flex-col ${HabitData.habitType === "Time Bound" ? "" : "hidden"} gap-1.5`}>

                        <div className="flex lg:flex-row justify-between flex-col gap-2">
                            <span className="flex flex-col  gap-1.5">
                                <label className="text-xs font-bold tracking-widest uppercase text-gray-400">
                                    Duration
                                </label>

                                <input
                                    className="w-full border-gray-200 border-2 rounded-xl px-4 py-2 h-full outline-none focus:border-black text-sm transition-colors max-w-[60%]"
                                    type="number"
                                    placeholder="2"
                                    label="Duration"
                                    name="duration"
                                    min={0}
                                    value={HabitData.duration?.value}
                                    onChange={(e) =>
                                        SetHabitData((prev) => ({
                                            ...prev,
                                            duration: { ...prev.duration, value: e.target.value },
                                        }))
                                    }
                                />

                            </span>

                            <div>

                                <div className="flex flex-col gap-1.5 w-full h-full">
                                    <label className="text-xs font-bold tracking-widest uppercase text-gray-400">
                                        Duration Unit
                                    </label>

                                    <select className="w-full border-gray-200 border-2 rounded-xl px-4 py-2 h-full outline-none focus:border-black text-sm transition-colors"
                                        value={HabitData.duration?.unit}
                                        placeholder="Select Duration Unit"
                                        onChange={(e) =>
                                            SetHabitData((prev) => ({
                                                ...prev,
                                                duration: { ...prev.duration, unit: e.target.value },
                                            }))
                                        }
                                    >
                                        <option value="minutes">Minutes</option>
                                        <option value="hours">Hours</option>
                                        <option value="seconds">Seconds</option>
                                    </select>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className={`flex justify-end gap-3`}>
                        <button
                            onClick={() => {
                                SetToggle(false);
                                onCreate();
                            }}
                            className="bg-black text-white rounded-xl text-sm font-bold py-2.5 px-4 hover:bg-red-500 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToggleHabitType;