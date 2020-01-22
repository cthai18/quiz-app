const router = require('express').Router();
let Question = require('../models/question.model');

router.route('/:quizId').get((req, res) => {
    console.log(req.params.quizId);
    Question.find({
            quizId: req.params.quizId
        })
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
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
    Question.findById(req.params.id)
        .then(question => {
            question.description = req.body.description;
            question.choices = req.body.choices;
            question.correctAnswer = req.body.correctAnswer;

            question.save()
                .then(q => res.json(q))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Question.findByIdAndDelete(req.params.id)
        .then(() => res.json('Question Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;