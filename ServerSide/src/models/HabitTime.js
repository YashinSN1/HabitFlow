import mongoose from "mongoose";

const HabitTimeSchema = new mongoose.Schema(
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

        duration: {
            value: {
                type: Number,
                default: 2,
                required: true,
            },
            unit: {
                type: String,
                enum: ["minutes", "hours", "seconds"],
                default: "minutes",
                required: true,
            },
        },

        habitType: {
            type: String,
            enum: [
                "Non Time Bound",
                "Time Bound"
            ],
            required: true,
        }
        ,
        reminder: { type: Boolean, default: false },

        priority: {
            type: String,
            default: "",
        },
    },
    { timestamps: true },
);

const HabitTime = mongoose.models.HabitTime || mongoose.model("HabitTime", HabitTimeSchema);
export default HabitTime;
