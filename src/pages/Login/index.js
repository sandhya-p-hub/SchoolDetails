import React from "react";
import FormContainer from "../../components/hoc/FormContainer";
import TextInput from "../../components/TextInput";
import joi from "joi-browser";
import ForgotPassword from "./../ForgotPswd"
import { Redirect ,Link} from 'react-router-dom';
import ForgotPswd from './../ForgotPswd/index';

export default class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      error: {}
    };
    this.schema = {
      userName: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .required()
        .min(8)
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { error } = this.state;
    const errors = this.validate();
    this.setState({ error: errors || {} });
    if (errors) return;
  };

  validate = () => {
    const result = joi.validate(this.state, this.schema, {
      abortEarly: false
    });
    let nameId = document.getElementById("errorIDForName");
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
      // if (result.value.firstName.trim() !== "" || item.message !== "") {
      //     nameId.className = "alert alert-danger";
      //   } else {
      //     nameId.className = "alert alert-light";
      //   }
    }
    return errors;
  };

  render() {
    const {
      error,
      userName,
      password,
    } = this.state;
    return (
      <FormContainer>
        <h1>Login</h1>
        <form>
              <TextInput
                type="email"
                placeholder="User Name"
                name="userName"
                handleChange={this.handleChange}
                error={error.userName}
                value={userName}
              />
          <TextInput
            type="password"
            placeholder="Password"
            handleChange={this.handleChange}
            error={error.password}
            name="password"
            value={password}
          />
          <div className="row">
            <div className="row__col-1">
          <button  onClick={this.handleSubmit}>Login</button></div>
          <div className="row__col-1">
          <Link to="/ForgotPswd"><button className="btn_forgotPswd">
          Forgot Password
            </button>
            </Link>
          </div>
          </div>
        </form>
      </FormContainer>
    );
  }
}
