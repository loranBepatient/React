import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  handleChange = e => {
    let account = { ...this.state.account };
    console.log(e.currentTarget.value);
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email address</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.account.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              value={this.state.account.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
