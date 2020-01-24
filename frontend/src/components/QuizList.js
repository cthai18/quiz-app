import React, { useState, useEffect } from 'react';
import './styles/QuizList.css';
import QuizListItem from './QuizListItem';
import { 
    Button, 
    Spinner, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';
import { connect } from 'react-redux';
import { getQuizzes, addQuiz } from '../actions/quizActions';


const QuizList = (props) => {
    const { quizzes, loading } = props.quiz;

    const [modal, setModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        props.getQuizzes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggle = () => {
        setModal(!modal);
    }

    const onChange = e => {
        setNewTitle(e.target.value);
    };

    const onSubmit = e => {
        props.addQuiz(newTitle);
        toggle();
    };

    let listItems = (<Spinner size="lg" color="primary" />);
    if (!loading) {
        listItems = quizzes.map(quiz =>
        <QuizListItem key={quiz._id} id={quiz._id} title={quiz.title}/>);
    }

    return(
        <div className="d-flex container mb-4">
            <h1 className="title">My Quizzes</h1>
            {listItems}
            <Button size="lg" color="primary" className="shadow-sm mt-3" onClick={toggle}>Add New Quiz</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Quiz</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="quizTitle">Title</Label>
                            <Input type="text" name="quizTitle" id="quizTitle" value={newTitle} onChange={onChange}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz,
});

export default connect(
    mapStateToProps,
    { getQuizzes, addQuiz }
)(QuizList);