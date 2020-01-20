import React from 'react';
import './styles/QuizListItem.css';

function QuizListItem(props) {
    return(
        <div className="title">
            {props.title}
            <button>Play</button>
            <button>Delete</button>
        </div>
    )
}

export default QuizListItem