import express from 'express';
const router = express.Router();
import AppController from '../controller/App.Controller.js';
import ValidateSchema from '../middleware/Schema.Validator.js'
import HabitSchema from '../middleware/Habit.Schema.Joi.js'
import { CreateHabit, DeleteHabit, UpdateMyHabit, GetMyHabits } from '../controller/Habit.Crud.js';
import AuthorizeUser from '../middleware/Authorize.User.js';

router.get('/app', AuthorizeUser, AppController);
router.post('/app/timezone', AuthorizeUser, AppController);
router.post('/app/newhabit', AuthorizeUser, ValidateSchema(HabitSchema), CreateHabit);
router.get('/app/habits', AuthorizeUser, GetMyHabits);
router.delete('/app/habits/:habitId', AuthorizeUser, DeleteHabit)
router.patch('/app/habits/:habitId', AuthorizeUser, UpdateMyHabit)

export default router;