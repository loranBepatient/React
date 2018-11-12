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
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
  };

  handleChange = e => {
    let { account, errors } = this.state;
    account[e.currentTarget.name] = e.currentTarget.value;
    errors[e.currentTarget.name] = this.validateProperty(
      e.currentTarget.name,
      e.currentTarget.value
    );

    this.setState({ account, errors });
  };

  validate = () => {
    let { account } = this.state;

    const validation = Joi.validate(account, this.schema, {
      abortEarly: false
    });
    if (!validation.error) return null;

    return validation.error.details.reduce((prev, current) => {
      let message = current.message;
      return Object.assign(prev, { [current.context.key]: message });
    }, {});
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    let { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="username"
            label="Username"
            id="username"
            value={account.value}
            onChange={this.handleChange}
          />
          {errors["username"] && (
            <div className="alert alert-danger">{errors["username"]}</div>
          )}
          <Input
            type="password"
            name="password"
            label="Password"
            id="password"
            value={account.password}
            onChange={this.handleChange}
          />
          {errors["password"] && (
            <div className="alert alert-danger">{errors["password"]}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
