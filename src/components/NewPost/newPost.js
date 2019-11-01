import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage';

class NewPost extends Component {

    state = {
        message: '',
        error: false,
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
                <h1>Write a Post, Express Yourself</h1>
                <form onSubmit={this.onSubmit}>
                    <textarea name="message" placeholder="express yourself" onChange={this.handleInputChange}></textarea>
                    <br></br>
                    <input type="submit" value="Join Us"/>
                </form>
                {errormsg}
            </div>
        )
    }
    
}

export default NewPost;