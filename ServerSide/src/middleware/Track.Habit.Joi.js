import Joi from 'joi';

const TrackHabitData = Joi.object({
    status: Joi.string().valid('pending', 'completed', 'skipped').required(),
    date: Joi.date().iso().required(),
    notes: Joi.string().allow('', null).max(500).optional(),
    logReason: Joi.string().allow('', null).max(200).optional(),
});

export default TrackHabitData;