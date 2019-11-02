import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ls from 'local-storage';

class Home extends Component {

    state = {
        message: '..loading'
    };

    // componentDidMount() {
    //     axios.get('http://localhost:8000/api/home').then((doc) => {
    //         this.setState({message: doc.data});
    //     }).catch((e) => {
    //         console.log(e);
    //     })
    // }

    handleLogout = () => {
        ls.clear();
    }

    render() {
        return (
            <div>
                <nav>
                    <div class="nav-wrapper light-blue accent-4">
                    <Link to="/" class="brand-logo">Express</Link>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><Link to="/posts" class="nav-li">Posts</Link></li>
                        <li><Link to="/myPosts" class="nav-li">My Posts</Link></li>
                        <li><Link to="/users" class="nav-li">Users</Link></li>
                        <li><Link to="/newPost" class="nav-li">New Post</Link></li>
                        <li><Link to="/login" class="nav-li-button" onClick={this.handleLogout}>Logout</Link></li>
                        <li><Link to="#" class="nav-li"></Link></li>
                        <li><Link to="#" class="nav-li"></Link></li>
                    </ul>
                    </div>
                </nav>
                <div class="card light-blue accent-4">
                    <h1>Welcome to the Express Community!</h1>
                    <ul>
                        <li><Link class="home-li" to="/posts">>Posts</Link></li>
                        <p>--->Read quirky, heartfelt posts written by fellow 'Expressors'</p>
                        <p>--->Get a flavour of the entrée of emotions presented by Express</p>
                        <li><Link class="home-li" to="/myPosts">>My Posts</Link></li>
                        <p>--->See the art you have composed</p>
                        <li><Link class="home-li" to="/users">>Users</Link></li>
                        <p>--->Meet other 'Expressors'</p>
                        <p>--->Recognize anyone? ;D</p>
                        <li><Link class="home-li" to="/newPost">>New Post</Link></li>
                        <p>--->Having something welled up inside you, you want to Express?</p>
                        <p>--->Write away to your heart's content</p>
                        <p>--->This is of course all anonymouse</p>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Home;