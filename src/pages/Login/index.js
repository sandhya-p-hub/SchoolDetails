import React from "react";
import FormContainer from "../../components/hoc/FormContainer";
import TextInput from "../../components/hoc/TextInput";
import joi from "joi-browser";
import { Link } from "react-router-dom";
import { loginUser } from "../../action";
import { connect } from "react-redux";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      error: {}
    };
    this.schema = {
      emailId: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .required()
        .min(4)
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
  
    if (!(errors.password || errors.emailId)) {
      const { emailId } = this.state;
      this.props.loginUser({ emailId }).then(res => {
        console.log("adminsadsd",res)
        if (res.data.user != null) {
          if (res.data.user.password === this.state.password) {
            this.props.history.push({
              pathname: `Home/${res.data.user._id}`,
              state: { name: res.data.user.firstName,admin:res.data.user.admin}
            });
          } else {
            toaster.notify(
              "Password invalid, Please enter the correct password"
            );
          }
        } else {
          toaster.notify("Invalid username or password");
        }
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
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  render() {
    const { error, emailId, password } = this.state;
    return (
      <div>
        <FormContainer>
          <h1>Login</h1>
          <form>
            <TextInput
              type="email"
              placeholder="User Name"
              name="emailId"
              handleChange={this.handleChange}
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
            <div className="row">
              <div className="row__col-1">
                <button onClick={this.handleSubmit}>Login</button>
              </div>
              <div className="row__col-1">
                <Link to="/ForgotPswd">
                  <button className="btn_forgotPswd">Forgot Password</button>
                </Link>
              </div>
            </div>
          </form>
        </FormContainer>
      </div>
    );
  }
}

export default connect(null, { loginUser })(Login);
