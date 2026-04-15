import express from 'express';
const router = express.Router();
import AuthenticateUser from '../middleware/Authenticate.User.js';
import ValidateSchema from '../middleware/Schema.Validator.js';
import TrackHabitData from '../middleware/Track.Habit.Joi.js';
import {TrackHabitRecord,GetHabitTrackingData,UpdateHabitTrackingRecord} from '../controller/Track.Habit.Controller.js';

router.post('/app/habit/createTracking/:Habitid', AuthenticateUser, TrackHabitRecord);
router.get('/app/habit/tracking', AuthenticateUser, GetHabitTrackingData);
router.patch('/app/habit/updateTracking/:Habitid', AuthenticateUser, ValidateSchema(TrackHabitData), UpdateHabitTrackingRecord);


export default router;