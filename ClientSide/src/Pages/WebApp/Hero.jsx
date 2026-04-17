import { useState, useEffect, useRef } from "react";
import Habit from "./Habit.jsx";
import React from "react";
import assets from "@/assets/assets.js";
import axios from "axios";

function Hero() {
  const [HabitMode, SetHabitMode] = useState("");
  const [AllHabits, SetAllHabits] = useState([]);
  const [HabitId, SetHabitId] = useState("");

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const GetHabit = await axios.get("/api/app/habits");
        if (GetHabit.data.success) {
          SetAllHabits(GetHabit.data.habits);
        }
      } catch (error) {
        console.error("Error fetching habits:", error.message);
        console.log("Error fetching habits");
      }
    };

    const fetchTrackData = async () => {
      try {
        const response = await axios.get("/api/app/habit/tracking");

        if (response.data.success) {
          const trackingData = response.data.TrackData;
          const trackDataMap = {};

          trackingData.forEach((item) => {
            trackDataMap[item.habitId] = item;
          });

          SetHabitTrackData(trackDataMap);
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

  let [HabitTrackData, SetHabitTrackData] = useState({});
  let [isLoading, SetIsLoading] = useState({});

  const toggleStatus = async (habitId) => {
    if (isLoading[habitId]) return;

    const currentStatus = HabitTrackData[habitId]?.status || "pending";
    let newStatus;

    if (currentStatus === "pending") newStatus = "completed";
    else if (currentStatus === "completed") newStatus = "skipped";
    else newStatus = "pending";
    SetIsLoading((prev) => ({ ...prev, [habitId]: true }));

    try {
      const response = await axios.patch(
        `/api/app/habit/updateTracking/${habitId}`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } },
      );

      if (response.data.success) {
        SetHabitTrackData((prev) => ({
          ...prev,
          [habitId]: { ...prev[habitId], status: newStatus },
        }));
      }
    } catch (error) {
      console.error("Error updating tracking data:", error.response);
    } finally {
      SetIsLoading((prev) => ({ ...prev, [habitId]: false }));
    }
  };

  const createTrackData = async (habitId, status) => {
    try {
      const response = await axios.post(
        `/api/app/habit/createTracking/${habitId}`,
        {
          habitId,
          status,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.data.success) {
        console.log("Tracking data created/updated successfully");

        SetHabitTrackData((prev) => ({
          ...prev,
          [habitId]: response.data.TrackData,
        }));
      } else {
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
        alert("Habit Created Successfully");
        const ressponseHabit = response.data.Habit;
        SetAllHabits((prev) => [...prev, ressponseHabit]);
        createTrackData(response.data.Habit._id, "pending");
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

  let deleteInBackend = async () => {
    if (!HabitId) return;

    try {
      let response = await axios.delete(`/api/app/habits/${HabitId}`);
    } catch (error) {
      console.error("Error deleting habit:", error.response);
      alert("Error deleting habit");
    }
  };

  let deleteHabit = async () => {
    if (!HabitId) return;

    SetAllHabits((prev) => prev.filter((habit) => habit._id !== HabitId));

    await deleteInBackend();

    ResetHabitData();
    CancelMode();
  };

  return (
    <>
      <div className="w-full h-full bg-yellow-200 flex items-center justify-center px-3">
        <Habit
          CancelMode={CancelMode}
          CurrentMode={HabitMode}
          HabitData={HabitData}
          SetHabitData={SetHabitData}
          createHabit={createHabit}
          editHabit={editHabit}
          deleteHabit={deleteHabit}
        />

        <div className="w-full h-12/13 bg-red-400 rounded-xl px-4 py-5 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Your Habit Today</h1>
            <button
              onClick={() => {
                SetHabitMode("Create");
                ResetHabitData();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Create Your Habit
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {AllHabits.length > 0 ? (
              AllHabits.map((habit) => (
                <div
                  key={habit._id}
                  onClick={() => {
                    SetHabitId(() => habit._id);
                    handleHabitClick(habit._id);
                  }}
                  className="w-full bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={` flex items-center justify-between border-b pb-3`}
                  >
                    <div>
                      <p className="font-medium text-lg">{habit.title}</p>
                      <p className="text-sm text-gray-500">
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
                        className=" border border-gray-300 text-black px-3 py-3 rounded-xl hover:bg-gray-100"
                      >
                        {HabitTrackData[habit._id]?.status === "completed" ? (
                          <img
                            className="w-5"
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
              <div className="text-center py-10 text-white opacity-80">
                No habits found start by creaiting your first habit and it will
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
