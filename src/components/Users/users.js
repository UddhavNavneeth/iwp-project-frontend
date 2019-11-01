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

    render() {

        let users = [...this.state.users];
        console.log(users);

        return (
            <div>
                <h1>Users</h1>
                {users.map((user, index) => {
                    return (
                        <div key={index}>
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