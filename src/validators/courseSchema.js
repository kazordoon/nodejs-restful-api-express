/* eslint-disable camelcase */
const { checkSchema } = require('express-validator');

const currentYear = new Date().getFullYear();

const requiredSchema = {
  name: {
    isLength: {
      options: { min: 5, max: 50 },
    },
    errorMessage: 'Course name must be between 5 to 50 characters',
  },
  description: {
    isLength: {
      options: { min: 15, max: 100 },
    },
    errorMessage: 'Course description must be 15 to 100 characters',
  },
  workload: {
    isInt: {
      options: { min: 1 },
    },
    errorMessage: 'Course workload must be at least 1 hour',
  },
  total_classes: {
    isInt: {
      options: { min: 1 },
    },
    errorMessage: 'Course must have at least 1 class',
  },
  year: {
    isInt: {
      options: { min: 1970, max: currentYear },
    },
    errorMessage: `Course year must be between 1970 and ${currentYear}`,
  },
};

const requiredSchemaAuxiliary = JSON.parse(JSON.stringify(requiredSchema));
const optionalSchema = Object.entries(requiredSchemaAuxiliary).reduce(
  (accumulator, [key, value]) => {
    accumulator[key] = value;
    accumulator[key].optional = true;
    return accumulator;
  },
  {},
);

const checkRequiredSchema = checkSchema(requiredSchema);
const checkOptionalSchema = checkSchema(optionalSchema);

module.exports = {
  checkRequiredSchema,
  checkOptionalSchema,
};
