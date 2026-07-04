
export const buildDefaultTrackEntry = (habit, date, userId) => ({
    _id: habit._id,
    userId,
    habitId: {
        _id: habit._id,
        title: habit.title,
        priority: habit.priority,
    },
    date,
    type: "log",
    status: "pending",
    notes: "",
    logReason: "",
});
;