const ERRORS = {
    "number": "%s must be a number, %typeof was is given",
    "date": "%s must be a number a was is given",
    "between": "%s must be greater than %d and less than %d, %d was given",
    "betweene": "%s must be between %d and %d, %d was given",
    "required": "%s is required",
    "max": "%s must be less than %d",
    "min": "%s must be greater than %d",
    "maxe": "%s must be less than or equal to %d",
    "mine": "%s must be greater than or equal to %d",
};
export const basicValidationMessageSource = {
    getValidationMessage(key) {
        return ERRORS[key];
    }
};
