import React from 'react';
import './styles/QuizList.css';
import QuizListItem from './QuizListItem';
import { Button, Spinner } from 'reactstrap';
import axios from 'axios';

import { Redirect } from "react-router-dom";

export default class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectUrl: '',
            quizzes: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('/quizzes')
            .then(res => {
                console.log(res.data);
                this.setState({quizzes: res.data, loading: false})
            })
            .catch(err => {
                this.setState({loading: false})
                console.error(err);
            });
    }

    onClickCreate = () => {
        this.setState({redirectUrl: "/create"});
        this.setState({redirect: true});
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectUrl}/>
        }

        let listItems = (<Spinner size="lg" color="primary" />);
        if (!this.state.loading) {
            listItems = this.state.quizzes.map((quiz) =>
            <QuizListItem title={quiz.title} />);
        }


        return(
            <div className="d-flex container">
                <h1 className="title">My Quizzes</h1>
                {listItems}
                <Button size="lg" color="primary" className="shadow-sm mt-3" onClick={this.onClickCreate}>Add New Quiz</Button>
            </div>
        )
    }
}