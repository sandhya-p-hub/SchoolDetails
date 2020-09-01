import React from "react";

const TextInput = ({ type, placeholder, name, handleChange, error, value }) => {
  return (
    <div className="form-input">
      <input
        type={type}
        className="form-input__box"
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
      />
      {error && <div className="form-input__error">{error}</div>}
    </div>
  );
};

TextInput.defaultProps = {
  handleChange: () => {},
  type: "text",
  placeholder: "enter your input",
  name: ""
};

export default TextInput;
