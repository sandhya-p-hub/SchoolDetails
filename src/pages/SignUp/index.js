import React from "react";
import FormContainer from "../../components/hoc/FormContainer";
import TextInput from "../../components/hoc/TextInput";
import joi from "joi-browser";
import { saveUser } from "../../action";
import { connect } from "react-redux";
import DropDown from "../../components/hoc/DropDown";

class SignUp extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      admin:"",
      emailId: "",
      password: "",
      confirmPassword: "",
      error: {}
    };
    this.schema = {
      firstName: joi
        .string()
        .required()
        .min(3),
      lastName: joi
        .string()
        .required()
        .min(3),
        admin: joi
        .string()
        .required(),
      emailId: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .required()
        .min(4),
      confirmPassword: joi
        .string()
        .required()
        .min(4)
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const errors = this.validate();
    this.setState({ error: errors || {} });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { error } = this.state;
    const errors = this.validate();
    this.setState({ error: errors || {} });
    if (
      !(
        errors.confirmPassword ||
        errors.firstName ||
        errors.lastName ||
        errors.password ||
        errors.emailId  ||
        errors.admin
      )
    ) {
      const {
        firstName,
        lastName,
        admin,
        emailId,
        password,
        confirmPassword
      } = this.state;
      this.props
        .saveUser({ firstName, lastName, admin,emailId, password, confirmPassword })
        .then(res => {
           this.props.history.push(`Home/${res.user._id}`);
        })
        .catch(err => {
          return err;
        });
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
      if (
        result.value.password.toString() !== "" &&
        result.value.confirmPassword.toString() !== "" &&
        result.value.password.toString() !==
          result.value.confirmPassword.toString()
      ) {
        errors.password = "The passwords does not match";
        errors.confirmPassword = "The passwords does not match";
      } else if (
        result.value.password.toString() ===
        result.value.confirmPassword.toString()
      ) {
        errors.password = "";
        errors.confirmPassword = "";
      }
      errors[item.path[0]] = item.message;
      return errors;
    }
  };

  render() {
    const {
      error,
      firstName,
      lastName,
      admin,
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
         <DropDown 
         name="admin"
         handleChange={this.handleChange}
         error={error.admin}
         value={admin}
         />
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
export default connect(null, { saveUser })(SignUp);
