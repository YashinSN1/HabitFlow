import express from 'express';
const router = express.Router();
import AppController from '../controller/App.Controller.js';
import ValidateSchema from '../middleware/Schema.Validator.js'
import HabitSchema from '../middleware/Habit.Schema.Joi.js'
import { CreateHabit, DeleteHabit, UpdateMyHabit, GetMyHabits } from '../controller/Habit.Crud.js';
import AuthenticateUser from '../middleware/Authenticate.User.js';

router.get('/app', AuthenticateUser, AppController);
router.post('/app/newhabit', AuthenticateUser, ValidateSchema(HabitSchema), CreateHabit);
router.get('/app/habits', AuthenticateUser, GetMyHabits);
router.delete('/app/habits/:habitId', AuthenticateUser, DeleteHabit)
router.patch('/app/habits/:habitId', AuthenticateUser, UpdateMyHabit)

export default router;