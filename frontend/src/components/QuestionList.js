import React, { useEffect, useState } from 'react';
import './styles/QuestionList.css';
import QuestionListItem from './QuestionListItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuizTitle, editQuizTitle } from '../actions/quizActions';
import { 
    Button,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, 
    Input 
 } from 'reactstrap';

const QuestionList = (props) => {
    const { id } = useParams();
    const quizTitle = props.quiz.quizzes.filter(quiz => quiz._id === id)[0].title;

    const [titleModalVis, setTitleModalVis] = useState(false);
    const [newTitle, setNewTitle] = useState(quizTitle);

    //to be removed
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleEditTitle = () => {
        setTitleModalVis(!titleModalVis);
    }

    const onSubmitEditTitle = e => {
        console.log("New edited title on submit: " + newTitle);
        props.editQuizTitle(id, newTitle);
        toggleEditTitle();
    };

    const onChangeTitle = e => {
        setNewTitle(e.target.value);
    }

    const editTitleModal = (
        <Modal isOpen={titleModalVis} toggle={toggleEditTitle}>
            <ModalHeader toggle={toggleEditTitle}>Edit Quiz Name</ModalHeader>
            <ModalBody>
                <Form onSubmit={onSubmitEditTitle}>
                    <FormGroup>
                        <Label for="quizTitle">Title</Label>
                        <Input type="text" name="quizTitle" id="quizTitle" value={newTitle} onChange={onChangeTitle}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onSubmitEditTitle}>Submit</Button>
                <Button color="secondary" onClick={toggleEditTitle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );

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
            <div style={{"display": "flex", "flexDirection": "row"}}>
                <h3>{quizTitle}</h3>
                <Button outline className="ml-2" color="primary" onClick={toggleEditTitle}>Edit Title</Button>
            </div>
            {listItems}
            {editTitleModal}
        </div>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz,
});

export default connect(
    mapStateToProps, 
    { getQuizTitle, editQuizTitle }
)(QuestionList);