const router = require('express').Router();
let Quiz = require('../models/quiz.model');

router.route('/').get((req, res) => {
    Quiz.find()
        .then(quizzes => res.json(quizzes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newQuiz = new Quiz({
        title: req.body.title,
        username: req.body.username,
    });

    newQuiz.save()
        .then(quiz => res.json(quiz))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/edit/:id').post((req, res) => {
    Quiz.findById(req.params.id)
        .then(quiz => {
            quiz.title = req.body.title;

            quiz.save()
                .then(quize => res.json(quiz))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Quiz.findByIdAndDelete(req.params.id)
        .then(() => res.json('quiz deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;