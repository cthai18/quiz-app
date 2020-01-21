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

        const listItems = this.state.questionDesc.map((description) =>
            <QuestionListItem desc={description}/>
        );

        return(
            <div className="container">
                <h3>Questions </h3>
                {listItems}
            </div>
        )
    }
}