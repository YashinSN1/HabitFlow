import Habit from "../models/Habit.js";
import User from "../models/User.js";
import HabitTracking from "../models/Habit.Tracking.js";

export const TrackHabitRecord = async (req, res) => {
  try {
    const Habitid = req.params.Habitid;
    const Userid = req.user.id;

    const { status, notes, date, LogReason } = req.body;

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
      status: status,
      notes: notes,
      logReason: LogReason,
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

    if (!UserExist) {
      return res.status(404).json({
        success: false,
        message: "User Does not Exist",
        details: `User with ID ${Userid} not found in Database`,
      });
    }

    const trackingData = await HabitTracking.find({ userId: Userid });
    if (!trackingData || trackingData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No habit tracking data found for this user",
        TrackData: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Habit tracking data retrieved successfully",
      TrackData: trackingData,
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
    const trackRecordExists = await HabitTracking.findOne({
      userId: userId,
      habitId: habitId,
    });

    const { status, notes, LogReason } = req.body;

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

    if (!trackRecordExists) {
      return res.status(404).json({
        success: false,
        message: "Habit tracking record not found",
        details: `Tracking record for user ${userId} and habit ${habitId} not found`,
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

    const UpdatedTrackRecord = await HabitTracking.findOneAndUpdate(
      { userId: userId, habitId: habitId },
      { status: status, notes: notes, logReason: LogReason },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Habit tracking record updated successfully",
      TrackData: UpdatedTrackRecord,
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
