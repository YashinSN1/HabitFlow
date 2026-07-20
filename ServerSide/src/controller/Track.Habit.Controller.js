import Habit from "../models/Habit.js";
import User from "../models/User.js";
import HabitTracking from "../models/Habit.Tracking.js";
import { getDayRange } from "../utils/getDayRange.js";
import { buildDefaultTrackEntry } from "../utils/buildDefaultTrackEntry.js";
import { DateTime } from "luxon";

export const TrackHabitRecord = async (req, res) => {
  try {
    const Habitid = req.params.Habitid;
    const Userid = req.user.id;

    const { type, date, status } = req.body;

    const UserExist = await User.findById(Userid);

    if (!UserExist) {
      return res.status(404).json({
        message: "User Does not Exist",
        details: `User with This ${Userid} not Exist in Database`,
      });
    }
    const HabitExists = await Habit.findById(Habitid);

    if (!HabitExists) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
        details: `Habit with ${Habitid} not exist in database`,
      });
    }

    const isOwner = HabitExists?.user_id?.toString() === Userid;

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to track this habit",
        details: "User does not own this habit",
      });
    }

    const newHabitTracking = new HabitTracking({
      userId: Userid,
      habitId: Habitid,
      date: date,
      type: type,
      status: status,
    });

    await newHabitTracking.save();

    return res.status(201).json({
      success: true,
      message: "Habit tracking record created successfully",
      TrackData: newHabitTracking,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        details: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      details: error.message,
      timestamp: new Date()?.toISOString(),
    });
  }
};


export const GetHabitTrackingData = async (req, res) => {
  try {
    const Userid = req.user.id;
    const UserExist = await User.findById(Userid);
    const { selectedDay, timezone } = req.query;

    if (!UserExist) {
      return res.status(404).json({
        success: false,
        message: "User Does not Exist",
        details: `User with ID ${Userid} not found in Database`,
      });
    }

    if (!timezone) {
      return res.status(400).json({
        success: false,
        message: "timezone is required",
      });
    }

    if (!selectedDay) {
      const today = DateTime.now().setZone(timezone).toISODate();
      
      const { startOfDay, endOfDay } = getDayRange(today, timezone);

      const trackingData = await HabitTracking.find({
        userId: Userid,
        date: { $gte: startOfDay, $lte: endOfDay },
        type: "log",
      }).populate("habitId", "title priority");

      // self note: populate() is used on fields that store a reference (ObjectId) to
      // another collection - here, habitId points to a doc in Habit. It runs a lookup
      // using that ID, fetches the specified fields ("title priority") from the
      // referenced Habit doc, and replaces the ID with the actual object in the result.
      // It does NOT touch or add any other field - fields like "status" that already
      // exist directly on HabitTracking are untouched, since they aren't references.

      if (!trackingData || trackingData.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No habit tracking data found for this user",
          TrackData: [],
        });
      }

      return res.status(200).json({
        success: true,
        message: "Habit tracking data retrieved successfully",
        TrackData: trackingData,
      });
    }

    const { startOfDay, endOfDay } = getDayRange(selectedDay, timezone);

    const trackingData = await HabitTracking.find({
      userId: Userid,
      date: { $gte: startOfDay, $lte: endOfDay },
      type: "log",
    }).populate("habitId", "title priority");

    const eligibleHabits = await Habit.find({
      user_id: Userid,
      createdAt: { $lte: endOfDay },
    });

    if (!trackingData || trackingData.length === 0) {
      const defaultTrackData = eligibleHabits.map((habit) =>
        buildDefaultTrackEntry(habit, startOfDay, Userid),
      );

      return res.status(200).json({
        success: true,
        message: "Habit tracking data retrieved successfully",
        TrackData: defaultTrackData,
      });
    }

    const trackedHabitIds = new Set(
      trackingData.map((entry) => entry.habitId._id.toString()),
    );

    const missingHabitEntries = eligibleHabits
      .filter((habit) => !trackedHabitIds.has(habit._id.toString()))
      .map((habit) => buildDefaultTrackEntry(habit, startOfDay, Userid));

    return res.status(200).json({
      success: true,
      message: "Habit tracking data retrieved successfully",
      TrackData: [...trackingData, ...missingHabitEntries],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};


export const UpdateHabitTrackingRecord = async (req, res) => {
  try {
    let userId = req.user.id;
    const UserExist = await User.findById(userId);
    let habitId = req.params.Habitid;
    const HabitExists = await Habit.findById(habitId);
    const { status, notes, LogReason, date, type } = req.body;

    const trackRecordExists = await HabitTracking.findOne({
      userId: userId,
      habitId: habitId,
      date: date,
      type: type,
    });


    if (!UserExist) {
      return res.status(404).json({
        success: false,
        message: "User Does not Exist",
        details: `User with ID ${userId} not found in Database`,
      });
    }

    if (!HabitExists) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
        details: `Habit with ID ${habitId} not found in Database`,
      });
    }

    const isOwner = HabitExists?.user_id?.toString() === userId;

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to track this habit",
        details: "User does not own this habit",
      });
    }

    if (!trackRecordExists) {
      const createdTrackRecord = new HabitTracking({
        userId: userId,
        habitId: habitId,
        date: date,
        status: status,
        notes: notes,
        type: type,
        logReason: LogReason,
      });
      await createdTrackRecord.save();
    }

    const UpdatedTrackRecord = await HabitTracking.findOneAndUpdate(
      { userId: userId, habitId: habitId, date: date, type: type },
      { status: status, notes: notes, logReason: LogReason, },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Habit tracking record updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      details: error.message,
      timestamp: new Date()?.toISOString(),
    });
  }
};
