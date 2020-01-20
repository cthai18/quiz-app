import React from 'react';
import './styles/QuestionList.css';
import QuestionListItem from './QuestionListItem';

export default class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionDesc: ["What is the capitol of France", "What is the capitol of the US"]
        };
    }

    render() {

        const listItems = this.state.questionDesc.map((d) =>
            <QuestionListItem desc={d}/>
        );

        return(
            <div className="container">
                <h3>Questions for this Quiz</h3>
                {listItems}
            </div>
        )
    }
}