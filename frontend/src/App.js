import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { QuizList, QuestionList, Play } from './components';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path = "/quizzes/:id/play" component={Play}/>
          <Route path="/quizzes/:id" component={QuestionList}/>
          <Route path="/quizzes">
            <QuizList/>
          </Route>
          <Route path="/">
            {/* TODO: replace with authentification screen */}
            <Link to="/quizzes">My Quizzes</Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
