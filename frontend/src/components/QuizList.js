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
import axios from 'axios';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const toggle = () => {
        setModal(!modal);
    }

    const fetchQuizzes = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/quizzes/');
            console.log(res.data)
            setQuizzes(res.data);
            setLoading(false);
            setNewTitle('');
        } catch (err){
            setLoading(false);
            console.error(err);
        }
    }

    const onChange = e => {
        setNewTitle(e.target.value);
    };

    const onSubmit = e => {
        console.log(newTitle);
        axios.post('/quizzes/add', {
            title: newTitle,
            username: 'Alex' //TODO: CHANGE THIS HARDCODED NAME
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
        toggle();
        fetchQuizzes();
    };

    let listItems = (<Spinner size="lg" color="primary" />);
    if (!loading) {
        listItems = quizzes.map(quiz =>
        <QuizListItem key={quiz._id} id={quiz._id} title={quiz.title} />);
    }

    return(
        <div className="d-flex container">
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

export default QuizList