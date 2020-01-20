import React from 'react';
import './styles/QuizList.css';
import QuizListItem from './QuizListItem';

export default class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizTitles: ["Quiz 1", "Quiz 2", "Quiz 3"]
        };
    }

    render() {

        const listItems = this.state.quizTitles.map((title) =>
            <QuizListItem title={title}/>
        );

        return(
            <div className="container">
                {listItems}
            </div>
        )
    }
}