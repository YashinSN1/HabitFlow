import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },

    category: {
      icon: { type: String, default: "" },
      name: { type: String, default: "" },
    },

    frequency: {
      frequencyType: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", ""],
        default: "Daily",
      },
      days: { type: [String], default: [] },
      months: {
        DaysInMonths: { type: [Number], default: [] },
      },
    },

    reminder: { type: Boolean, default: false },

    priority: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Habit = mongoose.models.Habit || mongoose.model("Habit", HabitSchema);
export default Habit;
