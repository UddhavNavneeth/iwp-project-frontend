import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ls from 'local-storage';

class NewPost extends Component {

    state = {
        message: '',
        error: false,
    }

    handleLogout = () => {
        ls.clear();
    }


    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        let data = {
            message: this.state.message,
            token: ls.get('token')
        };
        axios.post('http://localhost:8000/newPost', data).then((res) => {
            if (res.status === 200) {
                console.log(res);
                this.props.history.push('/');
            }
        }).catch((e) => {
            console.log(e);
            this.setState({error: true})
        })
    }


    render () {
        let error = this.state.error;
        let errormsg = null;
        if (error) {
            errormsg = (
                <p>Error occured while signing up, check console logs!!</p>
            )
        }
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
                    <h1>Write a Post, Express Yourself</h1>
                    <form onSubmit={this.onSubmit}>
                        <textarea class="text-area" name="message" required placeholder="express yourself...." onChange={this.handleInputChange}></textarea>
                        <br></br>
                        <input type="submit" value="Express" class="white btn-large"/>
                    </form>
                    {errormsg}
                </div>

            </div>
        )
    }
    
}

export default NewPost;