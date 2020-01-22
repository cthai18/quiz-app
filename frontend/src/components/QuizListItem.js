import React from 'react';
import './styles/QuizListItem.css';
import { Redirect } from "react-router-dom";
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

    componentDidMount() {
        console.log(this.props);
    }

    onClickView = () => {
        this.setState({redirectUrl: "/quizzes/" + this.props.id});
        this.setState({redirect: true});
    }

    onClickPlay = () => {
        this.setState({redirectUrl: "/quizzes/" + this.props.id + "/play"});
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
                <div className="card shadow-sm">
                    <h4 className="quizname">{this.props.title}</h4>
                    <div className="buttons">
                        <Button outline color="primary" className="mr-2" onClick={this.onClickView}>View</Button>
                        <Button outline color="primary" className="ml-2 mr-2" onClick={this.onClickPlay}>Play</Button>
                        <Button outline color="primary" className="ml-2" onClick={this.onClickDelete}>Delete</Button>
                    </div>
                </div>
        )
    }


}

export default QuizListItem