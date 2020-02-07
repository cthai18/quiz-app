import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { QuizList, QuestionList, Play, AppNavBar } from './components';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavBar />
          <Switch>
            <Route path = "/quizzes/:id/play" component={Play}/>
            <Route path="/quizzes/:id" component={QuestionList}/>
            <Route path="/quizzes">
              <QuizList/>
            </Route>
            <Route exact path="/">
              {/* TODO: replace with authentification screen */}
              <Redirect to="/quizzes"/>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
