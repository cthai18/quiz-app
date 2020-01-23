import React from 'react';
import './styles/QuestionListItem.css';
import {
    Button,
    Card, 
    CardText, 
    CardTitle, 
  } from 'reactstrap';

const QuestionListItem = (props) => {
    const choices = props.choices.map((choice, index) => 
        <li key={index}>{choice}</li>
    );

    return(
        <div>
            <Card className="question" body >
                <CardTitle className="desc">{props.desc}</CardTitle>
                <ul className="choices">{choices}</ul>
                <CardText className="correct-answer">Correct Answer: {props.correctAnswer}</CardText>
                <Button size="sm" color="primary">Edit</Button>
            </Card>
        </div>
    )
}

export default QuestionListItem