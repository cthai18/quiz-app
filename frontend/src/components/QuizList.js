import React from 'react';
import './styles/QuizList.css';
import QuizListItem from './QuizListItem';
import { Button } from 'reactstrap';

import { Redirect } from "react-router-dom";

export default class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizTitles: ["Capitols Quiz", "Animated Shows", "Quiz 3"],
            redirect: false,
            redirectUrl: '',
        };
    }

    onClickCreate = () => {
        this.setState({redirectUrl: "/create"});
        this.setState({redirect: true});
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectUrl}/>
        }

        const listItems = this.state.quizTitles.map((title) =>
            <QuizListItem title={title} />
        );

        return(
            <div className="container">
                <h1 className="title">My Quizzes</h1>
                {listItems}
                <Button size="lg" color="primary" className="shadow-sm mt-3" onClick={this.onClickCreate}>Add New Quiz</Button>
            </div>
        )
    }
}