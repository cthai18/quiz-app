import axios from 'axios';
import { GET_QUESTIONS, ADD_QUESTION, EDIT_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING } from './types';

export const getQuestions = id => dispatch => {
    dispatch(setQuestionsLoading());
    axios.get('/questions/' + id)
        .then(res => {
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data,
            });
        })
        .catch(err => {
            console.error(err); //TODO: something better than this
        });
}

export const addQuestion = newQuestion => dispatch => {
    axios.post('/questions/add', {
        description: newQuestion.description,
        quizId: newQuestion.quizId,
        choices: newQuestion.choices,
        correctAnswer: newQuestion.correctAnswer,
    })
    .then(res => {
        dispatch({
            type: ADD_QUESTION,
            payload: res.data,
        });
    })
    .catch(err => {
        console.error(err); //TODO: something better than this
    });
}

export const editQuestion = (id, updatedQuestion) => dispatch => {
    axios.post('/questions/edit/' + id, {
        description: updatedQuestion.description,
        choices: updatedQuestion.choices,
        correctAnswer: updatedQuestion.correctAnswer,
    })
    .then(res => {
        dispatch({
            type: EDIT_QUESTION,
            payload: res.data,
        });
    })
    .catch(err => {
        console.error(err); //TODO: something better than this
    });
}


export const deleteQuestion = id => dispatch => {
    axios.delete('/questions/' + id)
        .then(res => {
            dispatch({
                type: DELETE_QUESTION,
                payload: id,
            });
        })
        .catch(err => {
            console.error(err); //TODO: something better than this
        });
}

export const setQuestionsLoading = () => {
    return {
      type: QUESTIONS_LOADING
    };
};
