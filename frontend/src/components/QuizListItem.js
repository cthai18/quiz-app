import React from 'react';
import './styles/QuizListItem.css';
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';

const QuizListItem = (props) => {
    let history = useHistory();

    const onClickView = () => {
        history.push('/quizzes/' + props.id);
    };

    const onClickPlay = () => {
        history.push('/quizzes/' + props.id + "/play");
    };

    const onClickDelete = () => {
        alert("Delete button clicked");
    };

    return(
        <div className="card shadow-sm">
            <h4 className="quizname">{props.title}</h4>
            <div className="buttons">
                <Button outline color="primary" className="mr-2" onClick={onClickView}>View</Button>
                <Button outline color="primary" className="ml-2 mr-2" onClick={onClickPlay}>Play</Button>
                <Button outline color="primary" className="ml-2" onClick={onClickDelete}>Delete</Button>
            </div>
        </div>
    )
}

export default QuizListItem