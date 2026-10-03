import express from 'express';
const router = express.Router();
import AppController from '../controller/App.Controller.js';
import ValidateSchema from '../middleware/Schema.Validator.js'
import HabitSchema from '../middleware/Habit.Schema.Joi.js'
import { CreateHabit, DeleteHabit, UpdateMyHabit, GetMyHabits } from '../controller/Habit.Crud.js';
import AuthorizeUser from '../middleware/Authorize.User.js';
import HabitTimeSchema from '../middleware/Habit.Time.Schema.Joi.js';

router.get('/app', AuthorizeUser, AppController);
router.post(
    '/app/newhabit',
    AuthorizeUser,
    ValidateSchema((req) => {
        return req.body.habitType === "Time Bound"
            ? HabitTimeSchema
            : HabitSchema;
    }),
    CreateHabit
);
router.get('/app/habits', AuthorizeUser, GetMyHabits);
router.delete('/app/habits/:habitId', AuthorizeUser, DeleteHabit)
router.patch('/app/habits/:habitId', AuthorizeUser,ValidateSchema(HabitTimeSchema), UpdateMyHabit)

export default router;