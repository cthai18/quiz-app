import React, { useEffect, useState } from 'react';
import './styles/QuestionList.css';
import QuestionListItem from './QuestionListItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionList = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/questions/' + id)
        .then(res => {
            console.log(res.data)
            setQuestions(res.data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            console.error(err);
        });
    }, []);

    const listItems = questions.map(question =>
        <QuestionListItem 
            key={question._id} 
            id={question._id} 
            desc={question.description}
            quizId={question.quizId}
            choices={question.choices}
            correctAnswer={question.correctAnswer}
        />
    );

    return(
        <div className="container">
            <h3>Questions </h3>
            {listItems}
        </div>
    )
}

export default QuestionList