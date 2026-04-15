import Joi from "joi";

const TrackHabitData = Joi.object({
    status: Joi.string().valid('skipped', 'pending', 'completed').required(),
    notes: Joi.string().allow('', null).max(500).optional(),
    date: Joi.date().optional().iso(),
    logReason: Joi.string().allow('', null).max(20).optional(),
})

export default TrackHabitData;