export const ValidateSchema = (schema) => (req, res, next) => {    
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {

        
        const errors = {};
        const errorReferences = {};
        const errorDetails = {};
        
        error.details.forEach(err => {
            const field = err.path[0];
            const fieldPath = err.path.join('.');
            
            errors[field] = err.message;
            
        });
        
        return res.status(400).json({ 
            success: false,
            message: "Validation Error: One or more fields failed validation",
            errorReference: "SCHEMA_VALIDATION_FAILED",
            errors: errors,
            errorReferences: errorReferences,
            details: errorDetails,
            timestamp: new Date().toISOString(),
            validationSummary: {
                totalErrors: error.details.length,
                fieldsWithErrors: Object.keys(errors),
                errorTypes: [...new Set(Object.values(errorReferences))]
            }
        });
    } else {
        next();
    }
};

export default ValidateSchema;