import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./ducks/store";
import Home from './containers/Home';
import List from './containers/List';
import Details from './components/Details';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/list">List</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/' exact><Home /></Route>
            <Route path='/list'><List /></Route>
            <Route path='/details'><Details /></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
