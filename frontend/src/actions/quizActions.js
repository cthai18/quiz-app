import axios from 'axios';
import { GET_QUIZZES, GET_QUIZ_TITLE, ADD_QUIZ, DELETE_QUIZ, QUIZZES_LOADING } from './types';

export const getQuizzes = () => dispatch => {
    dispatch(setQuizzesLoading());
    axios.get('/quizzes/')
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_QUIZZES,
                payload: res.data,
            });
        })
        .catch(err => {
            console.error(err); //TODO: something better than this
        });
}

export const getQuizTitle = id => dispatch => {
    dispatch({
        type: GET_QUIZ_TITLE,
        payload: id
    });
}

export const addQuiz = newTitle => dispatch => {
    axios.post('/quizzes/add', {
        title: newTitle,
        username: 'Alex' //TODO: CHANGE THIS HARDCODED NAME
    })
    .then(res => {
        console.log(res);
        dispatch({
            type: ADD_QUIZ,
            payload: res.data,
        });
    })
    .catch(err => {
        console.error(err); //TODO: something better than this
    });
}

export const deleteQuiz = id => dispatch => {
    axios.delete('/quizzes/' + id)
        .then(res => {
            console.log(res);
            dispatch({
                type: DELETE_QUIZ,
                payload: id,
            });
        })
        .catch(err => {
            console.error(err); //TODO: something better than this
        });
}

export const setQuizzesLoading = () => {
    return {
      type: QUIZZES_LOADING
    };
  };
