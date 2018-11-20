import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";

import "./App.css";

const apiEndpoint = config.apiEndpoint;
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const newPost = {
      title: "new post title",
      body: "new post content"
    };

    const { data: post } = await http.post(apiEndpoint, newPost);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "updated title";
    await http.put(`${apiEndpoint}/${post.id}`, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post.id);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = [...this.state.posts];

    try {
      await http.delete(`s${apiEndpoint}/${post.id}`);
      const posts = this.state.posts.filter(_post => post.id !== _post.id);
      this.setState({ posts });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("this post has already been deleted");
      }
      this.setState({ posts: originalPosts });
    }
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
