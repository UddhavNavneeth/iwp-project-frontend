import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ls from 'local-storage';

class Users extends Component {

    state = {
        users: [{username:'', name:''}]
    };

    componentDidMount() {
        let data = {
            token: ls.get('token')
        }
        axios.post('http://localhost:8000/getUsers', data).then((doc) => {
            this.setState({users: doc.data});
            // console.log(doc);
        }).catch((e) => {
            console.log(e.response);
            this.setState({message: e.response.data});
        })
    }

    handleLogout = () => {
        ls.clear();
    }

    render() {

        let users = [...this.state.users];
        console.log(users);

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

                <h1 class="titles">Users</h1>
                {users.map((user, index) => {
                    return (
                        <div key={index} class="card light-blue accent-4">
                            <p><b>Username:</b> {user.username}</p>
                            <p><b>Name:</b> {user.name}</p>
                        </div>

                    )
                })}
            </div>
        )
    }
}

export default Users;