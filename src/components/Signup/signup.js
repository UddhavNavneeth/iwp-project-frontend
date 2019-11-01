import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {

    state = {
        username: '',
        name: '',
        password: '',
        gender: '',
        email: '',
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
        let data = {...this.state};
        axios.post('http://localhost:8000/api/signup', data).then((res) => {
            if (res.status === 200) {
                console.log(res);
                this.props.history.push('/login');
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
                <h1>Join the Community to Express Yourself</h1>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="username" placeholder="username(preferably anonymous)" onChange={this.handleInputChange}></input>
                    <br></br>
                    <input type="text" name="name" placeholder="name(don't worry we will keep it hidden)" onChange={this.handleInputChange}></input>
                    <br></br>
                    <input type="password" name="password" placeholder="password" onChange={this.handleInputChange}></input>
                    <br></br>
                    <input type="text" name="gender" placeholder="gender(feel free to identify yourself)" onChange={this.handleInputChange}></input>
                    <br></br>
                    <input type="text" name="email" placeholder="email ID" onChange={this.handleInputChange}></input>
                    <br></br>
                    <input type="submit" value="Join Us"/>
                </form>
                {errormsg}
            </div>
        )
    }
    
}

export default Signup;