import mongoose from 'mongoose';

const habitTrackingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
        required: true,
    },

    status: {
        type: String,
        enum: ['pending', 'completed', 'skipped'],
        default: 'pending',
    },

    notes: {
        type: String,
        default: ''
    },

    logReason: {
        type: String,
        default: '',
    },

    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

habitTrackingSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });
habitTrackingSchema.index({ userId: 1, date: -1 });
habitTrackingSchema.index({ habitId: 1, date: -1 });

const HabitTracking = mongoose.models.HabitTracking || mongoose.model('HabitTracking', habitTrackingSchema);

export default HabitTracking;