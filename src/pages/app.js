import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";
import ForgotPswd from "./ForgotPswd";
import Home from "./Home";

class App extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/Home/:id" component={Home} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Logout" component={Logout} />
            <Route exact path="/ForgotPswd" component={ForgotPswd} />
            <Route exact path="/SignUp" component={SignUp} />

            <Redirect exact from="/" exact to="/Home"></Redirect>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
