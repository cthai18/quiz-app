import {
    GET_QUESTIONS,
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    QUESTIONS_LOADING,
} from '../actions/types';

const initialState = {
    questions: [],
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                loading: false,
            };
        case EDIT_QUESTION:
            return {
                ...state,
                questions: state.questions.map(question => {
                    if (question._id === action.payload._id) {
                        question.description = action.payload.description;
                        question.choices = action.payload.choices;
                        question.correctAnswer = action.payload.correctAnswer;
                    }
                    return question;
                }),
            };
        case ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload],
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question._id !== action.payload),
            };
        case QUESTIONS_LOADING:
            return{
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
