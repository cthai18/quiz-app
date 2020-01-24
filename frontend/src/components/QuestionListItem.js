import React from 'react';
import './styles/QuestionListItem.css';
import {
    Button,
    Card, 
    CardText, 
    CardTitle, 
    ButtonGroup,
} from 'reactstrap';
import { editQuestion, deleteQuestion } from '../actions/questionActions';
import { connect } from 'react-redux';

const QuestionListItem = (props) => {
    const { description, choices, correctAnswer, quizId } = props.question.questions.filter(question => question._id === props.id)[0];

    const choicesList = choices.map((choice, index) => 
        <li key={index}>{choice}</li>
    );

    return(
        <div>
            <Card className="question" body >
                <CardTitle className="desc">{description}</CardTitle>
                <ul className="choices">{choicesList}</ul>
                <CardText className="correct-answer">Correct Answer: {correctAnswer}</CardText>
                <ButtonGroup>
                    <Button size="sm" color="primary">Edit</Button>
                    <Button size="sm" color="primary" onClick={() => props.deleteQuestion(props.id)}>Delete</Button>
                </ButtonGroup>
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
    question: state.question,
});

export default connect(
    mapStateToProps, 
    { editQuestion, deleteQuestion }
)(QuestionListItem);