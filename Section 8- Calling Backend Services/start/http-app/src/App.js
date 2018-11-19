import React, { Component } from "react";

import axios from "axios";
import "./App.css";

class App extends Component {
  url = "https://jsonplaceholder.typicode.com/posts";
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(this.url);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const newPost = {
      title: "new post title",
      body: "new post content"
    };

    const { data: post } = await axios.post(this.url, newPost);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });

    console.log(this.state.posts);
  };

  handleUpdate = async post => {
    post.title = "updated title";
    await axios.put(`${this.url}/${post.id}`, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post.id);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async post => {
    await axios.delete(`${this.url}/${post.id}`);

    const posts = this.state.posts.filter(_post => post.id !== _post.id);
    this.setState({ posts });
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
