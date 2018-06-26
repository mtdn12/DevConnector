const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.school)) {
    errors.school = "Education school field is required"
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Education Degree field is required"
  }
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Education Field of study field is required"
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};