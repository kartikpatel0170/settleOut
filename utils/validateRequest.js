const joi = require("joi");
const logger = require("../config/logger");

exports.validateParamsWithJoi = (body, schemaKeys) => {
  const schema = joi.object(schemaKeys);

  try {
    const { error, value } = schema.validate(body, {
      abortEarly: false
    });

    if (error && error.details) {
      logger.error("Validation error:", error.details);
      return { error: true, details: error.details };
    } else {
      return value;
    }
  } catch (err) {
    logger.error("Validation error:", err);
    return { error: true, details: err };
  }
};
