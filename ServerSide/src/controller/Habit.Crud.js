import Habit from "../models/Habit.js";
import User from "../models/User.js";
import HabitTracking from "../models/Habit.Tracking.js";
import mongoose from "mongoose";

export const CreateHabit = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
        errorReference: "INVALID_USER_ID_FORMAT",
        details: `User ID '${user_id}' is not a valid MongoDB ObjectId format`,
      });
    }
    const user = await User.findById(user_id);

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "User is not active",
        errorReference: "USER_INACTIVE",
        details: `User '${user.email}' has status '${user.status}' but must be 'active' to create habits`,
      });
    }

    const { title, description, category, frequency, reminder, priority } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
        errorReference: "MISSING_TITLE",
        details: "Habit title is required but was not provided",
      });
    }

    const CurrentHabit = new Habit({
      user_id: user_id,
      title: title,
      description: description,
      category: category,
      frequency: frequency,
      reminder: reminder,
      priority: priority,
    });

    const NewHabit = await CurrentHabit.save();

    if (!NewHabit) {
      return res.status(400).json({
        success: false,
        message: "Failed to create habit",
        errorReference: "Habit_Save_Failed",
        details: "Habit object was created but failed to save to database",
      });
    }

    res.status(201).json({
      success: true,
      message: "Habit Created SuccessFully",
      Habit: NewHabit,
      createdAt: NewHabit.createdAt,
    });
  } catch (error) {
    let errorMessage = "Server Error While creating habit";
    let errorReference = "HABIT_CREATION_FAILED";
    let errorDetails = error.message;

    if (error.name === "ValidationError") {
      errorMessage = "Validation Error: Invalid habit data provided";
      errorReference = "HABIT_VALIDATION_ERROR";
      errorDetails = `MongoDB validation failed: ${error.message}`;
    } else if (error.name === "MongoServerError") {
      errorMessage = "Database Error: Unable to save habit data";
      errorReference = "HABIT_DATABASE_ERROR";
      errorDetails = `MongoDB error (code: ${error.code}): ${error.message}`;
    } else if (error.name === "CastError") {
      errorMessage = "Data Type Error: Invalid data format provided";
      errorReference = "HABIT_CAST_ERROR";
      errorDetails = `Data casting failed: ${error.message}`;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      errorReference: errorReference,
      details: errorDetails,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === "development" && {
        stack: error.stack,
        fullError: error,
      }),
    });
  }
};

export const GetMyHabits = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
        errorReference: "INVALID_USER_ID_FORMAT",
        details: `User ID '${userId}' is not a valid MongoDB ObjectId format`,
      });
    }

    const habits = await Habit.find({ user_id: userId });

    if (habits.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No Habit Exist",
        details: `User Does Not Have Any Habits`,
      });
    }

    return res.status(200).json({
      success: true,
      habits: habits,
      count: habits.length,
      userId: userId,
    });
  } catch (error) {
    let errorMessage = "Error fetching habits";
    let errorReference = "Habit_Fetch_Error";
    let errorDetails = error.message;

    if (error.name === "MongoServerError") {
      errorMessage = "Database Error: Unable to query habits data";
      errorReference = "HABITS_DATABASE_ERROR";
      errorDetails = `MongoDB error (code: ${error.code}): ${error.message}`;
    } else if (error.name === "CastError") {
      errorMessage = "Data Type Error: Invalid user ID format in query";
      errorReference = "HABITS_CAST_ERROR";
      errorDetails = `Data casting failed: ${error.message}`;
    }

    return res.status(500).json({
      success: false,
      message: errorMessage,
      errorReference: errorReference,
      details: errorDetails,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === "development" && {
        stack: error.stack,
        fullError: error,
      }),
    });
  }
};

export const UpdateMyHabit = async (req, res) => {
  try {
    const userId = req.user.id;
    const habitId =
      req.params?.habitId || req.body?.habitId || req.body?.HabitId;
    const UpdateMyHabit = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
        errorReference: "USER_NOT_FOUND",
        details: `No user found with ID '${userId}' in the database`,
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "User is not active",
        errorReference: "USER_INACTIVE",
        details: `User '${user.email}' has status '${user.status}' but must be 'active' to update habits`,
      });
    }

    const Updating = await Habit.updateOne(
      { _id: habitId, user_id: userId },
      { $set: UpdateMyHabit },
    );
    if (Updating) {
      return res.status(200).json({
        success: true,
        message: "Habit updated successfully",
        habitId: habitId,
        updatedFields: UpdateMyHabit,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update habit",
        errorReference: "HABIT_UPDATE_FAILED",
        details: `Habit with ID '${habitId}' could not be updated`,
      });
    }
  } catch (error) {
    let errorMessage = "Error updating habit";

  }
};

export const DeleteHabit = async (req, res) => {
  try {
    const authUser = req.user;
    const habitId =
      req.params?.habitId || req.body?.habitId || req.body?.HabitId;

    if (!habitId) {
      return res.status(400).json({
        success: false,
        message: "habitId is required",
        errorReference: "MISSING_HABIT_ID",
        details:
          "Habit ID must be provided either in URL parameters or request body",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid habitId format",
        errorReference: "INVALID_HABIT_ID_FORMAT",
        details: `Habit ID '${habitId}' is not a valid MongoDB ObjectId format`,
      });
    }

    const user = await User.findById(authUser?.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
        errorReference: "USER_NOT_FOUND",
        details: `No user found with ID '${authUser?.id}' in the database`,
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "User is not active",
        errorReference: "USER_INACTIVE",
        details: `User '${user.email}' has status '${user.status}' but must be 'active' to delete habits`,
      });
    }

    const isPrivileged = ["admin", "moderator", "user"].includes(user.role);

    if (isPrivileged) {
      await HabitTracking.deleteOne({ habitId: habitId });

      const result = await Habit.deleteOne({ _id: habitId });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Habit not found",
          errorReference: "HABIT_NOT_FOUND",
          details: `No habit found with ID '${habitId}' in the database`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Habit deleted successfully",
        deletedBy: user.role,
        habitId: habitId,
      });
    }

    await HabitTracking.deleteMany({ habitId: habitId });

    const result = await Habit.deleteOne({
      _id: habitId,
      user_id: authUser.id,
    });

    if (result.deletedCount === 0) {
      const exists = await Habit.exists({ _id: habitId });
      if (!exists) {
        return res.status(404).json({
          success: false,
          message: "Habit not found",
          errorReference: "HABIT_NOT_FOUND",
          details: `No habit found with ID '${habitId}' in the database`,
        });
      }

      return res.status(403).json({
        success: false,
        message: "Forbidden: cannot delete this habit",
        errorReference: "HABIT_DELETE_FORBIDDEN",
        details: `User '${user.email}' does not have permission to delete habit '${habitId}' as it belongs to another user`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
      deletedBy: "owner",
      habitId: habitId,
    });
  } catch (error) {
    let errorMessage = "Error deleting habit";
    let errorReference = "HABIT_DELETE_FAILED";
    let errorDetails = error.message;

    if (error.name === "MongoServerError") {
      errorMessage = "Database Error: Unable to delete habit data";
      errorReference = "HABIT_DELETE_DATABASE_ERROR";
      errorDetails = `MongoDB error (code: ${error.code}): ${error.message}`;
    } else if (error.name === "CastError") {
      errorMessage = "Data Type Error: Invalid data format in deletion query";
      errorReference = "HABIT_DELETE_CAST_ERROR";
      errorDetails = `Data casting failed: ${error.message}`;
    }

    return res.status(500).json({
      success: false,
      message: errorMessage,
      errorReference: errorReference,
      details: errorDetails,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === "development" && {
        stack: error.stack,
        fullError: error,
      }),
    });
  }
};
