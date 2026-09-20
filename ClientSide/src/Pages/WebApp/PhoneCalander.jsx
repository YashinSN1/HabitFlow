import api from "../../api/api";
import { DateTime } from "luxon";
import { useState, useEffect, useRef } from "react";

const Seven_Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const Badge = ({ status }) => {
    const styles = {
        completed: "bg-green-50 text-green-600 border border-green-200",
        skipped: "bg-red-50 text-red-500 border border-red-200",
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
    const color =
        status === "completed"
            ? "bg-green-500"
            : status === "skipped"
                ? "bg-red-500"
                : "bg-gray-200";

    return <div className={`w-[3px] h-[22px] rounded-full ${color}`} />;
};

function PhoneCalander({ handleCurentDay }) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = DateTime.now().setZone(timezone).toISODate();

    const [selectedDay, setSelectedDay] = useState(today);
    const todayRef = useRef(null);
    const [AllHabits, SetAllHabits] = useState([]);

    useEffect(() => {
        const fetchTrackData = async () => {
            try {
                const response = await api.get(`/api/app/habit/tracking`, {
                    params: {
                        selectedDay,
                        timezone,
                    },
                });

                if (response.data.success) {
                    SetAllHabits(response.data.TrackData);
                }
            } catch (error) {
                if (error.response) {
                    console.log("Status:", error.response.status);
                    console.log(
                        "Backend Message:",
                        error.response.data.message
                    );
                } else if (error.request) {
                    console.log("No response received from server.");
                } else {
                    console.log("Error:", error.message);
                }
            }
        };

        fetchTrackData();
    }, [selectedDay, timezone]);

    useEffect(() => {
        todayRef.current?.scrollIntoView({
            behavior: "auto",
            inline: "center",
            block: "nearest",
        });
    }, []);

    const GenBeforeDays = () => {
        const currentDate = DateTime.now().setZone(timezone);
        const AllPastDays = [];

        for (let i = 0; i < 20; i++) {
            const pastDate = currentDate.minus({ days: i });

            AllPastDays.push({
                date: pastDate.toISODate(),
                dayNumber: pastDate.day,
                dayOfWeek: Seven_Days[pastDate.weekday % 7],
            });
        }

        AllPastDays.reverse();

        return AllPastDays;
    };

    useEffect(() => {
        if (selectedDay === today) {
            handleCurentDay(true);
        } else {
            handleCurentDay(false);
        }
    }, [selectedDay, today, handleCurentDay]);

    const GenAfterDays = () => {
        const currentDate = DateTime.now().setZone(timezone);
        const AllFutureDays = [];

        for (let i = 1; i < 7; i++) {
            const futureDate = currentDate.plus({ days: i });

            AllFutureDays.push({
                date: futureDate.toISODate(),
                dayNumber: futureDate.day,
                dayOfWeek: Seven_Days[futureDate.weekday % 7],
                locked: true,
            });
        }

        return AllFutureDays;
    };

    const pastDays = GenBeforeDays();
    const futureDays = GenAfterDays();

    const allDays = [
        ...futureDays.reverse(),
        ...pastDays.reverse(),
    ].reverse();

    const currentDate = DateTime.now().setZone(timezone);

    const currentMonth = currentDate.toFormat("LLLL");
    const currentYear = currentDate.year;

    const selectedDayNumber = selectedDay
        ? DateTime.fromISO(selectedDay).day
        : "";

    const isToday = selectedDay === today;

    return (
        <>
            <div className="w-full h-fit min-h-full max-w-5xl lg:hidden block lg:m-auto bg-white border border-gray-100 rounded-2xl mb-3 py-2 shadow-sm">
                <div className="flex w-full h-full gap-5 items-center overflow-x-auto scrollbar-hide justify-between">
                    <div className="flex gap-1.5 w-max h-fit justify-between">
                        {allDays.map((day, index) => {
                            const isSelected = day.date === selectedDay;

                            return (
                                <button
                                    key={index}
                                    ref={
                                        day.date === today ? todayRef : null
                                    }
                                    onClick={() =>
                                        !day.locked &&
                                        setSelectedDay(day.date)
                                    }
                                    disabled={day.locked}
                                    className={`
                                        aspect-square rounded-xl
                                        flex flex-col items-center justify-center
                                        border shrink-0 transition-all duration-150
                                        px-4 md:px-5

                                        ${day.locked
                                            ? "opacity-20 cursor-default border-gray-100"
                                            : "cursor-pointer"
                                        }

                                        ${isSelected
                                            ? "bg-red-500 border-red-500 shadow-[0_4px_16px_rgba(229,62,62,0.3)]"
                                            : "bg-white hover:border-red-400 hover:bg-red-50"
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            font-mono text-xs font-medium
                                            ${isSelected
                                                ? "text-white"
                                                : "text-gray-800"
                                            }
                                        `}
                                    >
                                        {day.dayNumber}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div
                className={`
                    w-full h-full bg-white border border-gray-100 rounded-2xl
                    ${isToday ? "hidden" : "block"}
                    mb-3 py-6 shadow-sm
                `}
            >
                <div className="p-7 w-full">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-baseline gap-2">
                            <span
                                className="text-red-500 text-xl tracking-wide font-black uppercase"
                                style={{
                                    fontFamily:
                                        "'Bebas Neue', sans-serif",
                                }}
                            >
                                {currentMonth} {selectedDayNumber}
                            </span>

                            <span className="font-mono text-[11px] text-gray-300 tracking-widest">
                                {isToday ? "— today" : ""}
                            </span>
                        </div>
                    </div>

                    {AllHabits.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center mt-10">
                            No habits tracked for this day
                        </p>
                    ) : (
                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                            {AllHabits.map((habit, i) => (
                                <div
                                    key={habit._id}
                                    className={`
                                        flex items-center justify-between
                                        px-5 py-3.5 bg-white
                                        hover:bg-gray-50 transition-colors
                                        ${i < AllHabits.length - 1
                                            ? "border-b border-gray-50"
                                            : ""
                                        }
                                    `}
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
        </>
    );
}

export default PhoneCalander;