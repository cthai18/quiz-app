import React from 'react';
import './styles/QuizListItem.css';
import { Link, Redirect } from "react-router-dom";
import { Button } from 'reactstrap';

const SAMPLE_QUIZ_ID="samplequizid123"

class QuizListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectUrl: '',
        };
    }

    onClickPlay = () => {
        this.setState({redirectUrl: "quizzes/" + SAMPLE_QUIZ_ID + "/play"});
        this.setState({redirect: true});
    };

    onClickDelete = () => {
        alert("Delete button clicked");
    };

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectUrl}/>
        }

        return(
                <div className="title">
                    <Link to={"/quizzes/" + SAMPLE_QUIZ_ID}>
                        {this.props.title}
                    </Link>
                    <Button outline color="primary" onClick={this.onClickPlay}>Play</Button>
                    <Button outline color="primary" onClick={this.onClickDelete}>Delete</Button>
                </div>
        )
    }

    
}

export default QuizListItem