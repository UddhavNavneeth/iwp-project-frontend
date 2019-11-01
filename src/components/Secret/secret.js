import React, {Component} from 'react';
import axios from 'axios';
import ls from 'local-storage';

class Secret extends Component {

    state = {
        message: '..loading'
    };

    componentDidMount() {
        let data = {
            token: ls.get('token')
        }
        axios.post('http://localhost:8000/api/secret', data).then((doc) => {
            this.setState({message: doc.data});
            console.log(doc);
        }).catch((e) => {
            console.log(e.response);
            this.setState({message: e.response.data});
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

export default Secret;