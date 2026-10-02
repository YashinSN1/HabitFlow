import React from "react";
import assets from "@/assets/assets.js";
import FrequencySelector from "./FrequencySelector.jsx";
import CategorySelector from "./CategorySelector.jsx";
import { useState } from "react";

function Habit({
  CurrentMode,
  CancelMode,
  HabitData,
  SetHabitData,
  createHabit,
  editHabit,
  deleteHabit,
  IsCreateOrEdit,
  SetIsCreateOrEdit,
}) {
  if (!CurrentMode) return null;

  const [EditFrequency, SetEditFrequency] = useState(false);
  const [EditCategory, SetEditCategory] = useState(false);

  const frequencyDefault = () => {
    const type = HabitData?.frequency?.frequencyType;
    const days = HabitData?.frequency?.days || [];
    const DaysInMonths = HabitData?.frequency?.months?.DaysInMonths || [];

    if (!type) return "Not set";
    if (type === "Monthly") {
      if (DaysInMonths.length === 0) return "Monthly - no days set";
      return `Monthly - day${DaysInMonths.length > 1 ? "s" : ""} ${DaysInMonths.join(", ")}`;
    }
    if (days.length === 0) return `${type} — no days set`;
    if (days.length === 7) return `${type} — Every Day`;
    return `${type} — ${days.map((d) => d.slice(0, 3)).join(", ")}`;
  };

  const CreateOrEdit = (e) => {
    e.preventDefault();
    if (IsCreateOrEdit) return;

    SetIsCreateOrEdit(true);
    Promise.resolve(CurrentMode === "Edit" ? editHabit() : createHabit())
      .finally(() => SetIsCreateOrEdit(false));
  };

  const CategoryDefault = () => {
    const name = HabitData?.category?.name;
    const icon = HabitData?.category?.icon;
    if (!name) return "Not set";
    return (
      <div className="flex items-center gap-2">
        {icon && <img src={icon} alt={name} className="w-5 h-5" />}
        <span className="text-sm">{name}</span>
      </div>
    );
  };

  return (
    <>
      {EditFrequency && (
        <FrequencySelector
          HabitData={HabitData}
          SetHabitData={SetHabitData}
          onClose={() => SetEditFrequency(false)}
        />
      )}

      {EditCategory && (
        <CategorySelector
          HabitData={HabitData}
          SetHabitData={SetHabitData}
          onClose={() => SetEditCategory(false)}
        />
      )}

      <div
        className={`fixed inset-0 z-50 flex items-center w-full pb-20 justify-center overflow-y-scroll ${CurrentMode === "Create" || CurrentMode === "Edit" ? "" : "hidden"} p-4`}
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between shrink-0 border-b border-gray-100">
            <h2 className="text-black text-xl md:text-2xl font-black tracking-tight">
              {CurrentMode === "Create" ? "Create Habit" : "Edit Habit"}
            </h2>

            <button
              onClick={CancelMode}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors shrink-0"
            >
              <img src={assets.cross} className="w-4 h-4" alt="close" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-5 text-black overflow-y-auto">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-400">
                Title
              </label>
              <input
                type="text"
                placeholder="eg. Coding 2 Hours"
                onChange={(e) =>
                  SetHabitData((prev) => ({ ...prev, title: e.target.value }))
                }
                value={HabitData.title}
                className="h-11 border border-gray-200 rounded-xl px-4 outline-none focus:border-black text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-400">
                Description
              </label>
              <textarea
                placeholder="What's the goal?"
                onChange={(e) =>
                  SetHabitData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                value={HabitData.description}
                className="h-24 border border-gray-200 rounded-xl px-4 py-3 resize-none outline-none focus:border-black text-sm transition-colors"
              />
            </div>


            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-400">
                Priority{" "}
                <span className="text-gray-300 normal-case font-normal">
                  (1 to 10)
                </span>
              </label>
              <input
                type="number"
                min={1}
                max={10}
                placeholder="1"
                value={HabitData.priority}
                onChange={(e) =>
                  SetHabitData((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }))
                }
                className="h-11 border border-gray-200 rounded-xl px-4 outline-none focus:border-black text-sm transition-colors w-32"
              />
            </div>

            <div
              onClick={() => SetEditFrequency(true)}
              className="cursor-pointer border border-gray-200 rounded-xl px-4 py-3.5 flex items-center justify-between hover:border-black transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <img src={assets.appcalander} className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                    Frequency
                  </span>
                </div>

                <span className="text-sm font-semibold text-black">
                  {frequencyDefault()}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  SetEditFrequency(true);
                }}
                className="hidden sm:block shrink-0 text-xs font-bold px-3.5 py-2 rounded-lg bg-red-500 text-white hover:bg-black transition-colors tracking-wide"
              >
                Edit
              </button>
            </div>

            <div
              onClick={() => SetEditCategory(true)}
              className="cursor-pointer border border-gray-200 rounded-xl px-4 py-3.5 flex items-center justify-between hover:border-black transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <img src={assets.category} className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                    Category
                  </span>
                </div>

                <span className="text-sm font-semibold text-black">
                  {CategoryDefault()}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  SetEditCategory(true);
                }}
                className="hidden sm:block shrink-0 text-xs font-bold px-3.5 py-2 rounded-lg bg-red-500 text-white hover:bg-black transition-colors tracking-wide"
              >
                Edit
              </button>
            </div>

            <div
              className={`${CurrentMode === "Edit" ? "justify-between" : "justify-end"} w-full items-center flex gap-3 pt-4 border-t border-gray-100`}
            >
              <button
                onClick={() => deleteHabit(HabitData._id)}
                className={`${CurrentMode === "Edit" ? "flex" : "hidden"} items-center w-full max-w-[25%] gap-2 flex itmes-center justify-center bg-black text-white rounded-xl text-sm font-bold py-2.5 px-4 hover:bg-red-500 transition-colors`}
              >
                <img className="w-4 h-4" src={assets.bin} alt="Delete" />
                Delete
              </button>

              <button
                onClick={CreateOrEdit}
                disabled={IsCreateOrEdit}
                className={`w-full ${CurrentMode === "Edit" ? "justify-between max-w-[40%]" : "justify-end"} py-2.5 px-4 text-sm font-medium rounded-md text-white ${IsCreateOrEdit
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 cursor-pointer"
                  } focus:outline-none transition-colors`}
              >
                {IsCreateOrEdit ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {CurrentMode === "Edit" ? "Editing Habit..." : "Creating Habit..."}
                  </span>
                ) : (
                  CurrentMode === "Edit" ? "Edit Habit" : "Create Habit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}




export default Habit;
