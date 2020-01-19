const router = require('express').Router();
let Quiz = require('../models/quiz.model');

router.route('/').get((req, res) => {
    console.log("Get request received for quizzes");
    Quiz.find()
        .then(quizzes => res.json(quizzes))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;