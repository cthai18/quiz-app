import React, { useEffect, useState } from 'react';
import './styles/QuestionList.css';
import QuestionListItem from './QuestionListItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuizTitle } from '../actions/quizActions';

const QuestionList = (props) => {
    const { id } = useParams();
    const { quizTitle } = props.quiz;
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        props.getQuizTitle(id);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="container-sm">
            <h3>{quizTitle}</h3>
            {listItems}
        </div>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz,
});

export default connect(
    mapStateToProps, 
    { getQuizTitle }
)(QuestionList);