const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  description: { type: String, required: true },
  quiz: { type: String, required: true },
  choices: { type: Array, required: true },
  correctAnswer: { type: String, required: true }
}, {
  timestamps: true,
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;