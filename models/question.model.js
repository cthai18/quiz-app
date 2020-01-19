const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  description: { type: String, required: true },
  quizId: { type: String, required: true },
  choices: { type: Array, required: true },
  correctAnswer: { type: String, required: true }
}, {
  timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;