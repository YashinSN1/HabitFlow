import express from "express";
const router = express.Router();
import { SignupSchema, LoginSchema } from '../middleware/User.Validation.js'
import { ValidateSchema } from '../middleware/Schema.Validator.js'
import { RegisterUser, LoginUser } from "../controller/Authenticate.js";

router.post('/register', ValidateSchema(SignupSchema), RegisterUser)
router.post('/login', ValidateSchema(LoginSchema), LoginUser);

export default router;