import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ls from 'local-storage';

class Posts extends Component {

    state = {
        posts: [{message:'..no new posts', owner:''}]
    };

    componentDidMount() {
        let data = {
            token: ls.get('token')
        }
        axios.post('http://localhost:8000/getPosts', data).then((doc) => {
            this.setState({posts: doc.data});
            // console.log(doc);
        }).catch((e) => {
            console.log(e.response);
            this.setState({message: e.response.data});
        })
    }

    render() {

        let posts = [...this.state.posts];
        console.log(posts);

        return (
            <div>
                <h1>Posts</h1>
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <div>
                                {post.message}
                            </div>
                            <p><b>By:</b> {post.owner} <b>Likes:</b> {post.likes}</p>
                            <button onClick={() => this.handleLike(post._id)}>Like</button>
                        </div>

                    )
                })}
            </div>
        )
    }
}

export default Posts;