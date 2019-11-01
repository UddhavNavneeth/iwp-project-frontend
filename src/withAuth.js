import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ls from 'local-storage';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
        let data = {
            token: ls.get('token')
        }

        axios.post('http://localhost:8000/api/secret', data).then((doc) => {
            this.setState({loading: false, redirect: false});
        }).catch((e) => {
            console.log(e.response);
            this.setState({ loading: false, redirect: true });
        })

    //   fetch('/checkToken')
    //     .then(res => {
    //       if (res.status === 200) {
    //         this.setState({ loading: false });
    //       } else {
    //         const error = new Error(res.error);
    //         throw error;
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err);
    //       this.setState({ loading: false, redirect: true });
    //     });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}