import React, {Component} from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home/home';
import Secret from './components/Secret/secret';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/secrets" component={Secret} />
      </Router>
    )
  }
}

export default App;
