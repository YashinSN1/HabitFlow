import mongoose from "mongoose";

const HabitEventSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        habitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Habit",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        type: {
            type: String,
            enum: ["create", "log"],
            required: true,
        },


        status: {
            type: String,
            enum: ["pending", "completed", "skipped"],
            required: true,

        },
        notes: { type: String, default: "" },
        logReason: { type: String, default: "" },

    },
    { timestamps: true }
);

HabitEventSchema.index({ habitId: 1, date: 1 }, { unique: true });

export default mongoose.model("HabitEvent", HabitEventSchema);