import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {

    state = {
        message: '..loading'
    };

    componentDidMount() {
        axios.get('http://localhost:8000/api/home').then((doc) => {
            this.setState({message: doc.data});
        }).catch((e) => {
            console.log(e);
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <ul>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/users">Users</Link></li>
                    <li><Link to="/newPost">New Post</Link></li>
                </ul>
            </div>
        )
    }
}

export default Home;