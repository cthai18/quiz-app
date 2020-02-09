const router = require("express").Router();
let Quiz = require("../models/quiz.model");
let Question = require("../models/question.model");

router.route("/").get((req, res) => {
  Quiz.find()
    .then(quizzes => res.json(quizzes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Quiz.findById(req.params.id)
    .then(quiz => res.json(quiz))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const newQuiz = new Quiz({
    title: req.body.title,
    username: req.body.username
  });

  newQuiz
    .save()
    .then(quiz => res.json(quiz))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").post((req, res) => {
  Quiz.findById(req.params.id)
    .then(quiz => {
      quiz.title = req.body.title;

      quiz
        .save()
        .then(quiz => res.json(quiz))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

const deleteQuizAndQuestions = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    const obj = await Question.deleteMany({ quizId: req.params.id });
    return res.json(obj);
  } catch (err) {
    return res.status(400).json("Error: " + err);
  }
};

router.route("/:id").delete((req, res) => {
  deleteQuizAndQuestions(req, res);
});

module.exports = router;
