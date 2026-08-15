import { useState, useEffect } from "react";
import Habit from "./Habit.jsx";
import React from "react";
import assets from "@/assets/assets.js";
import axios from "axios";
import MobileNav from "./MobileNav.jsx";
import { DateTime } from "luxon";

function Hero() {
  const [HabitMode, SetHabitMode] = useState("");
  const [AllHabits, SetAllHabits] = useState([]);
  const [HabitId, SetHabitId] = useState("");
  const [todayDate, setTodayDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  let [HabitTrackData, SetHabitTrackData] = useState({});
  let [isLoading, SetIsLoading] = useState({});

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const GetHabit = await axios.get("/api/app/habits");
        if (GetHabit.data.success) {
          console.log("Fetched Habits:", GetHabit.data.habits);
        }

        SetAllHabits(GetHabit.data.habits);
      } catch (error) {
        console.error("Error fetching habits:", error.message);
        console.log("Error fetching habits");
      }
    };

    const fetchTrackData = async () => {
      try {
        const getTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await axios.get("/api/app/habit/tracking", {
          params: {
            timezone: getTimezone,
          },
        });

        if (response.data.success) {
          const trackingData = response.data.TrackData;
          const trackDataMap = {};
          trackingData.forEach((item) => {
            if (!item._id) {
              console.warn("Skipping orphaned tracking record:", item._id);
              return;
            }

            trackDataMap[item.habitId._id] = item;
            console.log(trackDataMap);
          });

          SetHabitTrackData(trackDataMap);
        } else {
          const HabitId = response.data?.habitId;
          deleteHabit(HabitId);
        }
      } catch (error) {
        if (error.response) {
          console.log("Status:", error.response.status);
          console.log("Backend Message:", error.response.data.message);
          console.log("Full Backend Data:", error.response.data);
        } else if (error.request) {
          console.log(
            "No response received from server. Check your backend/proxy.",
          );
        } else {
          console.log("Error setting up request:", error.message);
        }
      }
    };

    fetchHabits();
    fetchTrackData();
  }, []);

  let CancelMode = () => {
    SetHabitMode("");
    ResetHabitData();
    SetHabitId("");
  };

  let [HabitData, SetHabitData] = React.useState({
    HabitId: "",
    title: "",
    description: "",
    category: {
      icon: "",
      name: "",
    },
    priority: "",
    frequency: {
      frequencyType: "",
      days: [],
      months: {
        DaysInMonths: [],
      },
    },
    reminder: false,
  });
  
  const toggleStatus = async (habitId) => {
  if (isLoading[habitId]) return;

  const currentStatus = HabitTrackData[habitId]?.status || "pending";

  let newStatus;

  if (currentStatus === "pending") {
    newStatus = "completed";
  } else if (currentStatus === "completed") {
    newStatus = "skipped";
  } else {
    newStatus = "pending";
  }

  SetIsLoading((prev) => ({ ...prev, [habitId]: true }));

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const localDate = DateTime.now()
      .setZone(timezone)
      .toISODate();

    const response = await axios.patch(
      `/api/app/habit/updateTracking/${habitId}`,
      {
        status: newStatus,
        date: localDate,
        timezone,
        type: "log",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.success) {
      console.log(response.data);

      SetHabitTrackData((prev) => ({
        ...prev,
        [habitId]: {
          ...prev[habitId],
          status: newStatus,
        },
      }));
    }
  } catch (error) {
    console.error(
      "Error updating tracking data:",
      error.response?.data || error
    );
  } finally {
    SetIsLoading((prev) => ({
      ...prev,
      [habitId]: false,
    }));
  }
};

  const createTrackData = async (habitId, status) => {
    try {
      const response = await axios.post(
        `/api/app/habit/createTracking/${habitId}`,
        {
          date: todayDate,
          type: "create",
          status: status,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.data.success) {
        SetHabitTrackData((prev) => ({
          ...prev,
          [habitId]: response.data.TrackData,
        }));
      } else {
        deleteHabit(habitId);
        console.log("Failed to create/update tracking data");
      }
    } catch (error) {
      console.error("Error creating/updating tracking data:", error.response);
    }
  };

  let ResetHabitData = () => {
    SetHabitData({
      HabitId: "",
      title: "",
      description: "",
      category: {
        icon: "",
        name: "",
      },
      priority: "",
      frequency: {
        frequencyType: "",
        days: [],
        months: {
          DaysInMonths: [],
        },
      },
      reminder: false,
    });
  };

  let handleHabitClick = (habitId) => {
    SetHabitMode("Edit");

    let getHabit = AllHabits.find((habit) => habit._id === habitId);

    if (getHabit) {
      SetHabitData(getHabit);
    }
  };

  let createHabit = async () => {
    if (HabitData.title === "" || HabitData.category === "") {
      return alert(`Title and Category are required fields.`);
    }
    try {
      let response = await axios.post(
        "/api/app/newhabit",
        {
          title: HabitData?.title,
          description: HabitData?.description,
          category: HabitData?.category,
          priority: HabitData?.priority,
          frequency: HabitData?.frequency,
          reminder: HabitData?.reminder,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.data.success) {
        createTrackData(response.data.Habit._id, "pending");

        alert("Habit Created Successfully");
        const ressponseHabit = response.data.Habit;
        SetAllHabits((prev) => [...prev, ressponseHabit]);
        console.log(response.data.Habit._id);
        ResetHabitData();
        CancelMode();
      }
    } catch (error) {
      console.error("Error response:", error.response);
    }
  };

  let editInBackend = async () => {
    if (!HabitId) return;

    try {
      let response = await axios.patch(`/api/app/habits/${HabitId}`, HabitData);

      if (response.data.success) {
        alert("Habit Updated Successfully");
      } else {
        alert("Failed to update habit");
      }
    } catch (error) {
      console.error("Error updating habit:", error.response);
      alert("Error updating habit");
    }
  };

  let editHabit = async () => {
    if (!HabitId) return;

    const updatedHabit = { ...HabitData };

    SetAllHabits((prev) =>
      prev.map((habit) => (habit._id === HabitId ? updatedHabit : habit)),
    );

    ResetHabitData();
    CancelMode();
    SetHabitId("");

    await editInBackend();
  };

  let deleteInBackend = async (DeleteHabitId) => {
    const idToDelete = DeleteHabitId || HabitId;
    if (!idToDelete) return;

    try {
      let response = await axios.delete(`/api/app/habits/${idToDelete}`);
    } catch (error) {
      console.error("Error deleting habit:", error.response);
      alert("Error deleting habit");
    }
  };

  let deleteHabit = async (DeleteHabitId) => {
    const idToDelete = DeleteHabitId || HabitId;
    if (!idToDelete) return;

    SetAllHabits((prev) => prev.filter((habit) => habit._id !== idToDelete));

    await deleteInBackend(DeleteHabitId);

    ResetHabitData();
    CancelMode();
  };

  return (
    <>
      <div className="w-full relative min-h-screen py-6 bg-white flex flex-col items-start justify-start px-4 md:px-8">
        <Habit
          CancelMode={CancelMode}
          CurrentMode={HabitMode}
          HabitData={HabitData}
          SetHabitData={SetHabitData}
          createHabit={createHabit}
          editHabit={editHabit}
          deleteHabit={deleteHabit}
        />

        <div className="w-full h-fit min-h-[88%] max-w-5xl lg:m-auto bg-white border border-gray-100 rounded-2xl px-4 md:px-6 py-5 shadow-sm">
          <div className="flex w-full h-full gap-5 items-center justify-between mb-5 flex-wrap">
            <h1 className="text-xl md:text-2xl font-black text-black">
              Your Habits Today
            </h1>
            <button
              onClick={() => {
                SetHabitMode("Create");
                ResetHabitData();
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 max-w-50 w-full sm:w-auto px-4 rounded-xl transition-colors shadow-sm shadow-red-200"
            >
              Create Habit
            </button>
          </div>

          <div className="flex flex-col w-full h-full gap-3">
            {AllHabits.length > 0 ? (
              AllHabits.map((habit) => (
                <div
                  key={habit._id}
                  onClick={() => {
                    SetHabitId(() => habit._id);
                    handleHabitClick(habit._id);
                  }}
                  className="w-full bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:border-red-200 hover:bg-red-50/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base md:text-lg text-black">
                        {habit.title}
                      </p>
                      <p className="text-sm text-gray-400">
                        {typeof habit.category === "object"
                          ? habit.category.name
                          : habit.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={!!isLoading[habit._id]}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(habit._id);
                        }}
                        className="border-2 border-gray-100 text-black w-11 h-11 flex items-center justify-center rounded-xl hover:border-red-300 transition-colors"
                      >
                        {HabitTrackData[habit._id]?.status === "completed" ? (
                          <img
                            className="w-5 text-red-500"
                            src={assets.checkmark}
                            alt="checked"
                          />
                        ) : HabitTrackData[habit._id]?.status === "skipped" ? (
                          <img className="w-5" src={assets.cross} alt="cross" />
                        ) : null}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-gray-400">
                No habits found — start by creating your first habit and it will
                appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
