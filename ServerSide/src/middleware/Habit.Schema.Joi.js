import Joi from 'joi';

const HabitSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('', null).optional(),

    category: Joi.object({
        icon: Joi.string().allow('', null).optional(),
        name: Joi.string().allow('', null).optional(),
    }).optional(),

    frequency: Joi.object({
        frequencyType: Joi.string().valid('Daily', 'Weekly', 'Monthly', '').default('Daily'),
        days: Joi.array().items(Joi.string()).default([]),
        months: Joi.object({
            DaysInMonths: Joi.array().items(Joi.number()).default([]),
        }).optional(),
    }).required(),

    reminder: Joi.boolean().default(false),
    priority: Joi.string().allow('', null).required(),
});

export default HabitSchema;