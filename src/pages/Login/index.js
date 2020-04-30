import React from "react";
import FormContainer from "../../components/hoc/FormContainer";
import TextInput from "../../components/TextInput";
import joi from "joi-browser";
import ForgotPassword from "./../ForgotPswd"
import { Redirect ,Link} from 'react-router-dom';
import ForgotPswd from './../ForgotPswd/index';
import { saveUser, fetchUser } from '../../action';
import SignUp from './../SignUp';
import { connect } from 'react-redux';

class Login extends React.PureComponent {
  
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      error: {}, redirect: false
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
  
  componentDidMount = () => {
    const { match } = this.props;
    if (match.params.emailId) {
      this.props.fetchUser(match.params.emailId);
    }
  }
  saveUser = ({firstName, lastName, emailId,password,confirmPassword }) => {
    if (emailId) {
      return this.props.saveUser({ firstName, lastName,emailId,password,confirmPassword }).then(
        () => { this.setState({ redirect: true })},
      );
    }
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
    this.saveUser();
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
      <div>  {
        this.state.redirect ?
        <Redirect to="/login" /> :
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
      }</div>
    );
  }
}


function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.emailId) {
    return {
      user: state.user.find(item => item.emailId === match.params.emailId)
    }
  }

  return { user: null };
}

export default connect(mapStateToProps, { saveUser, fetchUser })(Login);
