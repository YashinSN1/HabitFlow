import Joi from 'joi';

export const SignupSchema = Joi.object({
    name: Joi.string()
        .min(6)
        .max(20)
        .custom((value, helpers) => {
            if (!/^[A-Za-z]/.test(value)) {
                return helpers.error('string.nameStartWithLetter');
            }
            if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(value)) {
                return helpers.error('string.nameInvalidChars');
            }
            return value;
        })
        .required()
        .messages({
            'string.nameStartWithLetter': 'Name must start with a letter',
            'string.nameInvalidChars': 'Name can only contain letters, numbers, hyphens, and underscores',
            'string.min': 'Name must be at least 6 characters long',
            'string.max': 'Name cannot exceed 20 characters',
            'string.empty': 'Name is required',
            'any.required': 'Name is required'
        }),
    
    email: Joi.string()
        .email()
        .min(8)
        .max(30)
        .custom((value, helpers) => {
            if (!/^[A-Za-z]/.test(value)) {
                return helpers.error('string.emailStartWithLetter');
            }
            if (!/^[A-Za-z][A-Za-z0-9]*@gmail\.com$/.test(value)) {
                return helpers.error('string.emailInvalidFormat');
            }
            return value;
        })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'string.emailStartWithLetter': 'Email must start with a letter',
            'string.emailInvalidFormat': 'Email must contain only letters and numbers before @gmail.com',
            'string.min': 'Email must be at least 8 characters long',
            'string.max': 'Email cannot exceed 30 characters',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
    
    password: Joi.string()
        .min(8)
        .max(20)
        .custom((value, helpers) => {
            if (!/^[A-Za-z]/.test(value)) {
                return helpers.error('string.passwordStartWithLetter');
            }
            if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(value)) {
                return helpers.error('string.passwordInvalidChars');
            }
            return value;
        })
        .required()
        .messages({
            'string.passwordStartWithLetter': 'Password must start with a letter',
            'string.passwordInvalidChars': 'Password can only contain letters, numbers, hyphens, and underscores',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 20 characters',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }),
});

export const LoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .min(8)
        .max(30)
        .custom((value, helpers) => {
            if (!/^[A-Za-z]/.test(value)) {
                return helpers.error('string.emailStartWithLetter');
            }
            if (!/^[A-Za-z][A-Za-z0-9]*@gmail\.com$/.test(value)) {
                return helpers.error('string.emailInvalidFormat');
            }
            return value;
        })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'string.emailStartWithLetter': 'Email must start with a letter',
            'string.emailInvalidFormat': 'Email must contain only letters and numbers before @gmail.com',
            'string.min': 'Email must be at least 8 characters long',
            'string.max': 'Email cannot exceed 30 characters',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .custom((value, helpers) => {
            if (!/^[A-Za-z]/.test(value)) {
                return helpers.error('string.passwordStartWithLetter');
            }
            if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(value)) {
                return helpers.error('string.passwordInvalidChars');
            }
            return value;
        })
        .required()
        .messages({
            'string.passwordStartWithLetter': 'Password must start with a letter',
            'string.passwordInvalidChars': 'Password can only contain letters, numbers, hyphens, and underscores',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 20 characters',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }),
});