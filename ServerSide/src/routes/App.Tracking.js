import express from 'express';
const router = express.Router();
import AuthorizeUser from '../middleware/Authorize.User.js';
import ValidateSchema from '../middleware/Schema.Validator.js';
import TrackHabitData from '../middleware/Track.Habit.Joi.js';
import { TrackHabitRecord, GetHabitTrackingData, UpdateHabitTrackingRecord } from '../controller/Track.Habit.Controller.js';

router.post('/app/habit/createTracking/:Habitid', AuthorizeUser, ValidateSchema(TrackHabitData), TrackHabitRecord);
router.get('/app/habit/tracking', AuthorizeUser, GetHabitTrackingData)
router.get('/app/habit/tracking/{:HabitTrackDate}', AuthorizeUser, GetHabitTrackingData);
router.patch('/app/habit/updateTracking/:Habitid', AuthorizeUser, ValidateSchema(TrackHabitData), UpdateHabitTrackingRecord);


export default router;