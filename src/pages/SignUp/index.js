import React from "react";
const formStyle = {
  background: "#fff",
  margin: "0 450px",
  height: "428px",
  padding: "17px 75px",
  align:"center",
  display: "inline-block",
  marginTop:"108px"

};
const inputStyle = {
  padding: "0 50px",
};
const style = {
  float: "right"
};
const styleForBody={
align:"center",
background: "#0cf",
paddingBottom: "155px"
}
const btn={
  background: "#0cf",
  border: "#0cf"
}
export default class SignUp extends React.PureComponent {
  render() {
    return (
    
      <div style={styleForBody}>
      <form style={formStyle} onSubmit={this.handleSubmit}>
        <div className="form-group">
          <h1>SignUp</h1>
          <br></br>
          <h3>Please fill in the form to create an account</h3>
          <br></br>
        </div>
        <div className="form-group">
          <input
            size="13"
            type="text"
            className="input-box"
            placeholder="First Name"
          />
          <input
            style={style}
            size="13"
            type="text"
            className="input-box"
            placeholder="Last Name"
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="input-box"
            style={inputStyle}
            placeholder="UserName"
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="input-box"
            style={inputStyle}
            placeholder="Password"
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="input-box"
            style={inputStyle}
            placeholder="Email"
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="input-box"
            style={inputStyle}
            placeholder="Confirm Password"
          />
        </div>
        <br></br>
        <div className="form-group">
          <input type="radio"></input>
          <label>I accept the Terms of Use & Privacy Policy</label>
        </div><br></br>
        <div className="form-group">
          <button style={btn} >Sign Up</button>
        </div>
      </form>
      </div>
    );
  }
  handleSubmit() {}
}
