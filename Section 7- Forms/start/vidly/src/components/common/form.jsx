import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    let { data } = this.state;

    const validation = Joi.validate(data, this.schema, {
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

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
    }
    this.onSubmit();
  };

  handleChange = e => {
    let { data, errors } = this.state;
    data[e.currentTarget.name] = e.currentTarget.value;
    errors[e.currentTarget.name] = this.validateProperty(
      e.currentTarget.name,
      e.currentTarget.value
    );

    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        id={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSubmit(label) {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  }
}

export default Form;
