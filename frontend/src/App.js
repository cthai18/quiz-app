import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { QuizList, QuestionList } from './components';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/quizzes/:id">
            <QuestionList/>
          </Route>
          <Route path="/quizzes">
            <QuizList/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
