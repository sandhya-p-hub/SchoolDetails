import React from "react";
const formStyle = {
  background: "#fff",
  margin: "0 450px",
  height: "269px",
  padding: "17px 75px",
  align:"center",
  display: "inline-block",
  marginTop:"206px"

};
const inputStyle = {
  padding: "0 50px",
};
const style = {
marginTop: "27px"
}
const styleForBody={
align:"center",
background: "#0cf",
paddingBottom: "300px"
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
        <div style={style} className="form-group">
          <h1>Login</h1>
          <br></br>        </div>
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
          <button style={btn} >Login</button>
        </div>
      </form>
      </div>
    );
  }
  handleSubmit() {}
}
