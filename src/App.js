import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home/home';
import Secret from './components/Secret/secret';
import Login from './components/Login/Login';
import Signup from './components/Signup/signup';
import Posts from './components/Posts/posts';
import Users from './components/Users/users';
import NewPost from './components/NewPost/newPost';

import withAuth from './withAuth';
import './App.css';

class App extends Component {
  state = {
    username: ""
  }

  setUsername = (username) => {
    this.setState({username});
  }

  render() {
    return (
      <Router>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        
          <Route exact path="/" component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/posts" component={withAuth(Posts)} />
          <Route path="/users" component={withAuth(Users)} />
          <Route path="/newPost" component={withAuth(NewPost)} />
        
        </Router>
    )
  }
}

export default App;
