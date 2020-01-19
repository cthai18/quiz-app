const router = require('express').Router();
let Question = require('../models/question.model');

router.route('/').get((req, res) => {
    console.log("Get request received for questions");
    Question.find()
        .then(questions => res.json(questions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newQuestion = new Question({
        description: req.body.description,
        quizId: req.body.quizId,
        choices: req.body.choices,
        correctAnswer: req.body.correctAnswer,
    });

    newQuestion.save()
        .then(question => res.json(question))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;