import { useState, useEffect } from "react";
import Habit from "./Habit.jsx";
import React from "react";
import assets from "@/assets/assets.js";
import axios from "axios";

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
        const response = await axios.get("/api/app/habit/tracking");
        if (response.data.success) {
          const trackingData = response.data.TrackData;
          const trackDataMap = {};

          trackingData.forEach((item) => {
            if (!item.habitId) {
              console.warn("Skipping orphaned tracking record:", item._id);
              return;
            }

            trackDataMap[item.habitId._id] = item;
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
    if (currentStatus === "pending") newStatus = "completed";
    else if (currentStatus === "completed") newStatus = "skipped";
    else newStatus = "pending";
    SetIsLoading((prev) => ({ ...prev, [habitId]: true }));

    try {
      const response = await axios.patch(
        `/api/app/habit/updateTracking/${habitId}`,
        { status: newStatus, date: todayDate, type: "log" },
        { headers: { "Content-Type": "application/json" } },
      );
      if (response.data.success) {
        let newHabitTrackData = { ...HabitTrackData, [habitId]: { status: newStatus } };
        SetHabitTrackData(newHabitTrackData);
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
                        {HabitTrackData[habit._id]?.status === "completed" && HabitTrackData[habit._id]?.status !== "skipped" && HabitTrackData[habit._id]?.status !== "pending" ? (
                          <img
                            className="w-5"
                            src={assets.checkmark}
                            alt="checked"
                          />
                        ) : HabitTrackData[habit._id]?.status === "skipped" && HabitTrackData[habit._id]?.status !== "completed" && HabitTrackData[habit._id]?.status !== "pending" ? (
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
