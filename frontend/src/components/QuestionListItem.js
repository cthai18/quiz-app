import React from 'react';
import './styles/QuestionListItem.css';

function QuestionListItem(props) {
    return(
        <div>
            <h2>I am a question list item</h2>
            <span>This is my description: </span>
            {props.desc}
        </div>
    )
}

export default QuestionListItem