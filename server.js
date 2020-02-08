const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

const connectDB = require('./config/db');

//connect Database
connectDB();

const quizzesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use('/quizzes', quizzesRouter);
app.use('/questions', questionsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});