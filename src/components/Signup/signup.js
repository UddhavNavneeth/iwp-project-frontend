import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                <nav>
                        <div class="nav-wrapper light-blue accent-4">
                            <Link to="/" class="brand-logo">Express</Link>
                            <ul id="nav-mobile" class="right hide-on-med-and-down">
                                <li><Link to="/login" class="nav-li-button">Login</Link></li>
                                <li><Link to="#" class="nav-li"></Link></li>
                                <li><Link to="#" class="nav-li"></Link></li>
                            </ul>
                        </div>
                </nav>

                <div class="card light-blue accent-4">
                    <div class="input-field col s6">
                        <h1>Join the Community to Express Yourself</h1>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" name="username" placeholder="Enter Username(preferably anonymous)" onChange={this.handleInputChange} class="input-box"></input>
                            <br></br>
                            <input type="text" name="name" placeholder="Enter Name(don't worry we will keep it hidden)" onChange={this.handleInputChange} class="input-box"></input>
                            <br></br>
                            <input type="password" name="password" placeholder="Enter Password" onChange={this.handleInputChange} class="input-box"></input>
                            <br></br>
                            <input type="text" name="gender" placeholder="Enter Gender(feel free to identify yourself)" onChange={this.handleInputChange} class="input-box"></input>
                            <br></br>
                            <input type="text" name="email" placeholder="Enter Email ID" onChange={this.handleInputChange} class="input-box"></input>
                            <br></br>
                            <input type="submit" value="Join Us" class="white btn-large"/>
                        </form>
                    </div>
                
                {errormsg}
            </div>

            </div>
        )
    }
    
}

export default Signup;