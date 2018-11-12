import React from "react";

const Input = ({ type, name, label, id, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        aria-describedby="emailHelp"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
