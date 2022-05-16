const Joi = require("@hapi/joi");

function signupValidation(request) {
  const signupValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });

  return signupValidationSchema.validate(request);
}

function signinValidation(request) {
  const signinValidationSchema = Joi.object({
    username: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });

  return signinValidationSchema.validate(request);
}

module.exports = { signupValidation, signinValidation };
