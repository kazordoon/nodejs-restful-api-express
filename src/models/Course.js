const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  descricao: {
    type: String,
    required: true
  },
  carga_horaria: {
    type: Number,
    required: true
  },
  total_aulas: {
    type: Number,
    required: true
  },
  ano: {
    type: Number,
    required: true
  }
}, { versionKey: false });

const Course = mongoose.model('Curso', CourseSchema);

module.exports = Course;