import {
    GET_QUIZZES,
    ADD_QUIZ,
    DELETE_QUIZ,
    QUIZZES_LOADING,
    GET_QUIZ_TITLE,
} from '../actions/types';

const initialState = {
    quizzes: [],
    loading: false,
    quizTitle: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload,
                loading: false,
            };
        case GET_QUIZ_TITLE:
            return {
                ...state,
                quizTitle: state.quizzes.filter(quiz => quiz._id === action.payload)[0].title,
            };
        case ADD_QUIZ:
            return {
                ...state,
                quizzes: [...state.quizzes, action.payload],
            };
        case DELETE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.filter(quiz => quiz._id !== action.payload),
            };
        case QUIZZES_LOADING:
            return{
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
