import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };
  handleSubmit = e => {
    const { account } = this.state;
    e.preventDefault();
    Joi.validate(account, this.schema, {
      abortEarly: false
    }).then(
      e => console.log(e),
      err => {
        let errors = err.details.reduce((prev, current) => {
          debugger;
          console.log(current);
          return current;
        }, {});
      }
    );
  };

  handleChange = e => {
    let account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Username"
            type="text"
            id="username"
            name="username"
            value={account.username}
            onChange={this.handleChange}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={account.password}
            onChange={this.handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
