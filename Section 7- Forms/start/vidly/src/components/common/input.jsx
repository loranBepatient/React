import React from "react";

const input = ({ label, type, id, name, value, onChange }) => {
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

export default input;
