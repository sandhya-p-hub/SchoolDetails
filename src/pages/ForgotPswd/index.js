import React from "react";
import FormContainer from "../../components/hoc/FormContainer";
import TextInput from "../../components/TextInput";

export default class ForgotPswd extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      userName: "",
      error: {}
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { error,userName } = this.state;
    let errors={};
    if(userName === "") {
      errors.userName = "Please enter your email id to proceed"
    }
    this.setState({error:errors})
    if(!errors)
    alert("Please check your mail to reset the password")
  };
  
  render() {
    const {
      error,
      userName
        } = this.state;
    return (
      <FormContainer>
        <h1>Forgot Password?</h1>
        <h5>Please enter your email id to reset password</h5>
        <form>
              <TextInput
                type="email"
                placeholder="email id"
                name="userName"
                handleChange={this.handleChange}
                error={error.userName}
                value={userName}
              />
          <button onClick={this.handleSubmit}>OK</button>
        </form>
      </FormContainer>
    );
  }
}
