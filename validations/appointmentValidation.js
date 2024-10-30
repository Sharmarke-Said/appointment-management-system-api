const Joi = require("joi");

function appointmentValidation(appointmentObj) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    categoryId: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
  });

  return schema.validate(appointmentObj);
}

module.exports = appointmentValidation;
