import React from "react";
import assets from "@/assets/assets.js";
import FrequencySelector from "./FrequencySelector.jsx";
import CategorySelector from "./CategorySelector.jsx";

function Habit({
  CurrentMode,
  CancelMode,
  HabitData,
  SetHabitData,
  createHabit,
  editHabit,
  deleteHabit,
}) {
  if (!CurrentMode) return null;

  const [EditFrequency, SetEditFrequency] = React.useState(false);
  const [EditCategory, SetEditCategory] = React.useState(false);

  const frequencyDefault = () => {
    const type = HabitData?.frequency?.frequencyType;
    const days = HabitData?.frequency?.days || [];
    const DaysInMonths = HabitData?.frequency?.DaysInMonths || [];
    if (!type) return "Not set";
    if (type === "Monthly") {
      if (DaysInMonths.length === 0) return "Monthly - no days set";
      return `Monthly - day${DaysInMonths.length > 1 ? "s" : ""} ${DaysInMonths.join(", ")}`;
    }
    if (days.length === 0) return `${type} — no days set`;
    if (days.length === 7) return `${type} — Every Day`;
    return `${type} — ${days.map((d) => d.slice(0, 3)).join(", ")}`;
  };

  const CreateOrEdit = () => {
    if (CurrentMode === "Edit") {
      editHabit();
    } else {
      createHabit();
    }
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

      <div className="absolute w-full h-full inset-0 flex items-center justify-center p-4 ">
        <div
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl h-full overflow-y-auto"
          style={{ border: "1.5px solid #fee2e2" }}
        >
          <div className="bg-red-500 px-6 py-5 flex items-center justify-between w-full h-fullrounded-t-2xl">
            <h2 className="text-white text-2xl font-black tracking-tight">
              {CurrentMode === "Create" ? "Create Habit" : "Edit Habit"}
            </h2>

            <button
              onClick={CancelMode}
              className="rounded-xl bg-red-300"
            >
              <img src={assets.cross} className="w-10 text-white h-10]" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-4 text-black">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-500">
                Title
              </label>
              <input
                type="text"
                placeholder="eg. Coding 2 Hours"
                onChange={(e) =>
                  SetHabitData((prev) => ({ ...prev, title: e.target.value }))
                }
                value={HabitData.title}
                className="h-11 border-2 border-red-100 rounded-xl px-4 outline-none focus:border-red-400 text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-500">
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
                className="h-24 border-2 border-red-100 rounded-xl px-4 py-3 resize-none outline-none focus:border-red-400 text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-500">
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
                className="h-11 border-2 border-red-100 rounded-xl px-4 outline-none focus:border-red-400 text-sm transition-colors w-32"
              />
            </div>

            <div
              onClick={() => SetEditFrequency(true)}
              className="border-2 border-dashed border-red-200 rounded-xl px-4 py-3 flex items-center justify-between bg-red-50"
            >
              <div className="flex flex-col gap-1">
                <div className="flex gap-3">
                  <img src={assets.appcalander} className="w-5 h-5" />
                  <span className="text-xs font-bold tracking-widest uppercase text-red-400">
                    Frequency
                  </span>
                </div>

                <span className="text-sm font-semibold text-black">
                  {frequencyDefault()}
                </span>
              </div>

              <button
                onClick={() => SetEditFrequency(true)}
                className={` hidden sm:block  text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors tracking-wide`}
              >
                Edit
              </button>
            </div>

            <div
              onClick={() => SetEditCategory(true)}
              className="border-2 border-dashed border-red-200 rounded-xl px-4 py-3 flex items-center justify-between bg-red-50"
            >
              <div className="flex flex-col gap-1">
                <div className="flex gap-3">
                  <img src={assets.category} className="w-5 h-5" />

                  <span className="text-xs font-bold tracking-widest uppercase text-red-400">
                    Category
                  </span>
                </div>

                <span className="text-sm font-semibold text-black">
                  {CategoryDefault()}
                </span>
              </div>
              <button
                onClick={() => SetEditCategory(true)}
                className={` hidden sm:block  text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors tracking-wide`}
              >
                Edit
              </button>
            </div>

            <div
              className={`${CurrentMode === "Edit" ? "justify-between" : "justify-end"} w-full h-full items-center flex gap-3 pt-1`}
            >
              <button
                onClick={() => deleteHabit(HabitData._id)}
                className={`${CurrentMode === "Edit" ? "block" : "hidden"} bg-black text-white rounded-xl text-sm font-bold py-[4%] max-h-20 max-w-30 px-[3%] hover:bg-red-600 transition-colors flex items-center gap-2 shadow-md shadow-red-200`}
              >
                <img className="w-[25%]" src={assets.bin} alt="Delete" />
                Delete
              </button>

                <button
                  onClick={CreateOrEdit}
                  className="py-[5%] max-h-20 max-w-40 px-[3%] bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors shadow-md shadow-red-200"
                >
                  {CurrentMode === "Edit"
                    ? "Edit Habit"
                    : "Create Habit"}
                </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Habit;
