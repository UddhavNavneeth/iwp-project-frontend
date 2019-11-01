import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage';
// import { Redirect } from 'react-router-dom';

//https://iwp-backend-ud.herokuapp.com/
//http://localhost:8000
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password: '',
            error: false
            // redirect: false
        };
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
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/authenticate',
        data: data,
        withCredentials: true,
      }).then((res) => {
        if (res.status === 200) {
            this.props.history.push('/');
            // this.setState({redirect: true});
            console.log(res.data);
            ls.set('username', res.data.username);
            ls.set('name', res.data.name);
            ls.set('email', res.data.email);
            ls.set('token', res.data.token);
        } else {
            const error = new Error(res.error);
            throw error;
        } 
      }).catch((e) => {
        let resp = {...e.response};
        this.setState({error: true});
        // this.setState({redirect: false});
        console.log(e.response);
        console.log(resp.data);
        alert('Error while logging in!! check console!!');
    });


    // alert('Authentication coming soon!');
    // axios.post('http://localhost:8000/api/authenticate', data).then((res) => {
    //     if (res.status === 200) {
    //         this.props.history.push('/');
    //         console.log(res);
    //     } else {
    //         const error = new Error(res.error);
    //         throw error;
    //     } 
    // }).catch((e) => {
    //     let resp = {...e.response};
    //     console.log(e.response);
    //     console.log(resp.data);
    //     alert('Error while logging in!! check console!!');
    // })
  }

  render() {
    // const redirect = {...this.state.redirect};
    // if (redirect) {
    //   return <Redirect to="/" />;
    // }
    let error = this.state.error;
        let errormsg = null;
        if (error) {
            errormsg = (
                <p>Error occured while signing up, check console logs!!</p>
            )
        }

    return (
        <div>
            <form onSubmit={this.onSubmit}>
                <h1>Login Below!</h1>
                <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
                />
            <input type="submit" value="Submit"/>
            </form>
            {errormsg}

        </div>
      
    );
  }
}