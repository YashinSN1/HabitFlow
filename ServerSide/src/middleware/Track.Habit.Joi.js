import Joi from "joi";

const TrackHabitData = Joi.object({
  status: Joi.string()
    .valid("pending", "completed", "skipped")
    .required(),

  date: Joi.date().iso().required(),


  type: Joi.string()
    .valid("create", "log")
    .required(),

  notes: Joi.string()
    .max(500)
    .allow("", null)
    .default(""),

  logReason: Joi.string()
    .max(200)
    .allow("", null)
    .default(""),
});

export default TrackHabitData;