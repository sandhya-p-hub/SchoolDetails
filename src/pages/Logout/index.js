import React, { Component } from "react";

class Logout extends Component {
  state = {};
  componentDidMount() {
    this.props.history.push("/");
  }
  render() {
    return null;
  }
}

export default Logout;
