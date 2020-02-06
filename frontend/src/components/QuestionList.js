import React, { useEffect, useState } from 'react';
import './styles/QuestionList.css';
import QuestionListItem from './QuestionListItem';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuizTitle, editQuizTitle } from '../actions/quizActions';
import { getQuestions, addQuestion } from '../actions/questionActions';
import { 
    Spinner,
    Button,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    ListGroup,
    ListGroupItem,
 } from 'reactstrap';

const QuestionList = (props) => {
    const { id } = useParams();
    const quizTitle = props.quiz.quizzes.filter(quiz => quiz._id === id)[0].title;
    const { questions, loading } = props.question;

    useEffect(() => {
        props.getQuestions(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [titleModalVis, setTitleModalVis] = useState(false);
    const [newTitle, setNewTitle] = useState(quizTitle);

    const toggleEditTitle = () => {
        setTitleModalVis(!titleModalVis);
    }

    const onSubmitEditTitle = e => {
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

    const [addModalVis, setAddModalVis] = useState(false);
    const [desc, setDesc] = useState('');
    const [choices, setChoices] = useState([]);
    const [curChoice, setCurChoice] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const toggleAddQuestion = () => {
        setAddModalVis(!addModalVis);
    }

    const onSubmitQuestion = e => {
        props.addQuestion({
            description: desc,
            quizId: id,
            choices: choices,
            correctAnswer: correctAnswer,
        });
        toggleAddQuestion();
    };

    let choicesList = choices.map((choice, curIndex) => (
        <ListGroupItem key={curIndex}>
            <Button
                className='remove-btn mr-2'
                color='danger'
                size='sm'
                onClick={() => {
                    setChoices(choices.filter((choice, index) => index !== curIndex ))
                }}
            >&times;</Button>
            {choice}
        </ListGroupItem>
    ));

    const addModal = (
        <Modal isOpen={addModalVis} toggle={toggleAddQuestion}>
            <ModalHeader toggle={toggleAddQuestion}>Create a New Question</ModalHeader>
            <ModalBody>
                <Form onSubmit={onSubmitQuestion}>
                    <FormGroup>
                        <Label for="desc">Question Description</Label>
                        <Input type="text" name="desc" id="desc" value={desc} onChange={e => setDesc(e.target.value)}/>
                    </FormGroup>
                    <ListGroup flush>
                        <Label>Current Choices:</Label>
                        {choicesList}
                    </ListGroup>
                    <FormGroup>
                        <Label className="mt-2" for="choices">Add Choices</Label>
                        <Input name="choices" value={curChoice} onChange={e => {setCurChoice(e.target.value)}}/>
                        <Button className="mt-2" onClick={() => setChoices([...choices, curChoice])}>Add Choice</Button>
                    </FormGroup>
                    <FormGroup>
                    <Label for="desc">Correct Answer:</Label>
                        <Input type="text" name="answer" id="answer" value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onSubmitQuestion}>Submit</Button>
                <Button color="secondary" onClick={toggleAddQuestion}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );

    let listItems = (<Spinner size="lg" color="primary" />);
    
    if (!loading) {
        listItems = questions.map(question =>
            <QuestionListItem 
                key={question._id} 
                id={question._id} 
            />
        );
    }

    return(
        <div className="container-sm">
            <div style={{"display": "flex", "flexDirection": "row"}}>
                <h3>{quizTitle}</h3>
                <Button size="sm" outline className="ml-2" color="primary" onClick={toggleEditTitle}>Edit Title</Button>
            </div>
            <Button className="mt-3" outline color="primary" onClick={toggleAddQuestion}>Add a New Question</Button>
            {listItems}
            {editTitleModal}
            {addModal}
        </div>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz,
    question: state.question,
});

export default connect(
    mapStateToProps, 
    { getQuizTitle, editQuizTitle, getQuestions, addQuestion }
)(QuestionList);