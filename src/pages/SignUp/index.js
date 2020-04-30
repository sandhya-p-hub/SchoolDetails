import React from "react";
import FormContainer from "../../components/hoc/FormContainer";
import TextInput from "../../components/TextInput";
import joi from "joi-browser";
import { saveUser } from "../../action";
import { connect } from "react-redux";

class SignUp extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      confirmPassword: "",
      error: {}
    };
    this.schema = {
      firstName: joi
        .string()
        .required()
        .min(7),
      lastName: joi
        .string()
        .required()
        .min(7),
      emailId: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .required()
        .min(8),
      confirmPassword: joi
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

    const isValid = Object.keys(error).length === 0;
    console.log("isvalid", isValid);
    if (isValid) {
      const {
        firstName,
        lastName,
        emailId,
        password,
        confirmPassword
      } = this.state;
      this.props
        .saveUser({ firstName, lastName, emailId, password, confirmPassword })
        .catch(err =>
          err.response.json().then(({ error }) => this.setState({ error }))
        );
    }
  };

  validate = () => {
    const result = joi.validate(this.state, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      if (!isNaN(parseInt(result.value.firstName))) {
        errors.firstName = "Please enter a valid name";
      }
      if (!isNaN(parseInt(result.value.lastName))) {
        errors.lastName = "Please enter a valid name";
      }
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  render() {
    const {
      error,
      firstName,
      lastName,
      emailId,
      password,
      confirmPassword
    } = this.state;
    return (
      <FormContainer>
        <h1>SignUp</h1>
        <h3>Please fill in the form to create an account</h3>
        <form>
          <div className="row">
            <div className="row__col-1">
              <TextInput
                type="text"
                placeholder="First Name"
                name="firstName"
                handleChange={this.handleChange}
                error={error.firstName}
                value={firstName}
              />
            </div>
            <div className="row__col-1">
              <TextInput
                type="text"
                placeholder="Last Name"
                handleChange={this.handleChange}
                error={error.lastName}
                name="lastName"
                value={lastName}
              />
            </div>
          </div>
          <TextInput
            type="email"
            placeholder="email"
            handleChange={this.handleChange}
            name="emailId"
            error={error.emailId}
            value={emailId}
          />
          <TextInput
            type="password"
            placeholder="Password"
            handleChange={this.handleChange}
            error={error.password}
            name="password"
            value={password}
          />
          <TextInput
            type="password"
            placeholder="Confirm Password"
            handleChange={this.handleChange}
            name="confirmPassword"
            error={error.confirmPassword}
            value={confirmPassword}
          />
          <button onClick={this.handleSubmit}>Sign Up</button>
        </form>
      </FormContainer>
    );
  }
}
export default connect(null,{ saveUser })(SignUp);
