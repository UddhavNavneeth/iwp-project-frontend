import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component {

    state = {
        message: '..loading'
    };

    componentDidMount() {
        axios.get('http://localhost:8000/api/home').then((doc) => {
            this.setState({message: doc.data});
            console.log(doc);
        }).catch((e) => {
            console.log(e);
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}

export default Home;