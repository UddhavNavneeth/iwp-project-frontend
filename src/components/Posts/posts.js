import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ls from 'local-storage';

class Posts extends Component {

    state = {
        posts: [{message:'..no new posts', owner:''}]
    };

    handleLogout = () => {
        ls.clear();
    }

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

    handleLike = (id) => {
        let data = {
            id: id,
            token: ls.get('token')
        }
        axios.post('http://localhost:8000/addLike', data).then(() => {
            let data2 = {
                token: ls.get('token')
            }
            // console.log('success');
            axios.post('http://localhost:8000/getPosts', data2).then((doc) => {
            this.setState({posts: doc.data});
            // console.log(doc);
            }).catch((e) => {
                console.log(e.response);
                this.setState({message: e.response.data});
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    render() {

        let posts = [...this.state.posts];
        // console.log(posts);

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

                <h1 class="titles">Posts</h1>
                {posts.map((post, index) => {
                    return (
                        <div key={index} class="card light-blue accent-4">
                            <div class="post-box">
                                {post.message}
                            </div>
                            <p><b>By:</b> {post.owner} <b>Likes:</b> {post.likes}</p>
                            <button class="white btn" onClick={() => this.handleLike(post._id)}>Like</button>
                        </div>

                    )
                })}
            </div>
        )
    }
}

export default Posts;