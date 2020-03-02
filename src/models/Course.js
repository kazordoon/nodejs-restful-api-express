const mongoose = require('mongoose');

module.exports = (app) => {
  const CourseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    workload: {
      type: Number,
      required: true,
    },
    total_classes: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  }, { versionKey: false });

  const Course = mongoose.model('Course', CourseSchema);

  return Course;
};
