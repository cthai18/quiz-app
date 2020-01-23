import React, { useState, useEffect } from 'react';
import './styles/QuizList.css';
import QuizListItem from './QuizListItem';
import { Button, Spinner } from 'reactstrap';
import axios from 'axios';

import { useHistory } from "react-router-dom";

const QuizList = (props) => {
    let history = useHistory();

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/quizzes/')
        .then(res => {
            console.log(res.data)
            setQuizzes(res.data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            console.error(err);
        });
    }, []);

    const onClickCreate = () => {
        history.push('/create/');
    };

    let listItems = (<Spinner size="lg" color="primary" />);
    if (!loading) {
        listItems = quizzes.map(quiz =>
        <QuizListItem key={quiz._id} id={quiz._id} title={quiz.title} />);
    }


    return(
        <div className="d-flex container">
            <h1 className="title">My Quizzes</h1>
            {listItems}
            <Button size="lg" color="primary" className="shadow-sm mt-3" onClick={onClickCreate}>Add New Quiz</Button>
        </div>
    )
}

export default QuizList