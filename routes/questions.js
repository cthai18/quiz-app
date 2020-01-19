const router = require('express').Router();
let Question = require('../models/question.model');

router.route('/').get((req, res) => {
    console.log("Get request received for questions");
    Question.find()
        .then(questions => res.json(questions))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;