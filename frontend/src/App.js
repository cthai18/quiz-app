import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { QuizList, QuestionList, Play, CreateQuiz, AppNavBar } from './components';

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavBar />
        <Switch>
          <Route path = "/quizzes/:id/play" component={Play}/>
          <Route path="/quizzes/:id" component={QuestionList}/>
          <Route path="/quizzes">
            <QuizList/>
          </Route>
          <Route path="/create">
              <CreateQuiz />
          </Route>
          <Route exact path="/">
            {/* TODO: replace with authentification screen */}
            <Redirect to="/quizzes"/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
