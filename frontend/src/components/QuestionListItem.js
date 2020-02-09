import React, { useState } from "react";
import "./styles/QuestionListItem.css";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { editQuestion, deleteQuestion } from "../actions/questionActions";
import { connect } from "react-redux";

const QuestionListItem = props => {
  const {
    description,
    choices,
    correctAnswer
  } = props.question.questions.filter(question => question._id === props.id)[0];

  const choicesList = choices.map((choice, index) => (
    <li key={index}>{choice}</li>
  ));

  const [editModalVis, setEditModalVis] = useState(false);
  const [desc, setDesc] = useState(description);
  const [editChoices, setEditChoices] = useState(choices);
  const [curChoice, setCurChoice] = useState("");
  const [editCorrectAnswer, setEditCorrectAnswer] = useState(correctAnswer);

  const toggleEditQuestion = () => {
    setEditModalVis(!editModalVis);
  };

  const onSubmitQuestion = e => {
    props.editQuestion(props.id, {
      description: desc,
      choices: editChoices,
      correctAnswer: editCorrectAnswer
    });
    toggleEditQuestion();
  };

  let editChoicesList = editChoices.map((editChoice, curIndex) => (
    <ListGroupItem key={curIndex}>
      <Button
        className="remove-btn mr-2"
        color="danger"
        size="sm"
        onClick={() => {
          setEditChoices(
            editChoices.filter((choice, index) => index !== curIndex)
          );
        }}
      >
        &times;
      </Button>
      {editChoice}
    </ListGroupItem>
  ));

  const editModal = (
    <Modal isOpen={editModalVis} toggle={toggleEditQuestion}>
      <ModalHeader toggle={toggleEditQuestion}>
        Create a New Question
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={onSubmitQuestion}>
          <FormGroup>
            <Label for="desc">Question Description</Label>
            <Input
              type="text"
              name="desc"
              id="desc"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </FormGroup>
          <ListGroup flush>
            <Label>Current Choices:</Label>
            {editChoicesList}
          </ListGroup>
          <FormGroup>
            <Label className="mt-2" for="choices">
              Add Choices
            </Label>
            <Input
              name="choices"
              value={curChoice}
              onChange={e => setCurChoice(e.target.value)}
            />
            <Button
              className="mt-2"
              onClick={() => setEditChoices([...editChoices, curChoice])}
            >
              Add Choice
            </Button>
          </FormGroup>
          <FormGroup>
            <Label for="desc">Correct Answer:</Label>
            <Input
              type="text"
              name="answer"
              id="answer"
              value={editCorrectAnswer}
              onChange={e => setEditCorrectAnswer(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSubmitQuestion}>
          Submit
        </Button>
        <Button color="secondary" onClick={toggleEditQuestion}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Card className="question" body>
        <CardTitle className="desc">{description}</CardTitle>
        <ul className="choices">{choicesList}</ul>
        <CardText className="correct-answer">
          Correct Answer: {correctAnswer}
        </CardText>
        <ButtonGroup>
          <Button size="sm" color="primary" onClick={toggleEditQuestion}>
            Edit
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={() => props.deleteQuestion(props.id)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Card>
      {editModal}
    </div>
  );
};

const mapStateToProps = state => ({
  question: state.question
});

export default connect(mapStateToProps, { editQuestion, deleteQuestion })(
  QuestionListItem
);
