import React from 'react';
import './styles/QuestionListItem.css';

const QuestionListItem = (props) => {
    const choices = props.choices.map(choice => 
        <li>{choice}</li>
    );

    return(
        <div>
            <h2>I am a question list item</h2>
            <p>This is my id: {props.id}</p>
            <p>This is my quizId: {props.quizId}</p>
            <p>This is my description: {props.desc}</p>
            <ul>{choices}</ul>
            <p>The correct answer is {props.correctAnswer}</p>

        </div>
    )
}

export default QuestionListItem