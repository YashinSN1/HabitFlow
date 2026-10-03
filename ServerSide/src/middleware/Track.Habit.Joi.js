import Joi from "joi";

const TrackHabitData = Joi.object({
  status: Joi.string().valid("pending", "completed", "skipped").required(),

  date: Joi.date().iso().required(),

  type: Joi.string().valid("create", "log").required(),

  notes: Joi.string().max(500).allow("", null).default(""),
  habitType: Joi.string().valid('Non Time Bound', 'Time Bound').required(),
  duration: Joi.object({
    value: Joi.number().default(2).required(),

    unit: Joi.string()
      .valid('minutes', 'hours', 'seconds')
      .default('minutes')
      .required(),
  }).required(),
  logReason: Joi.string().max(200).allow("", null).default(""),
});

export default TrackHabitData;
