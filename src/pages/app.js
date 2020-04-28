import React from "react";
import { BrowserRouter as Router, Route,Redirect ,Switch} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from './SignUp'
import Login from './Login'
import jwtDecode from 'jwt-decode';
import NavBar from './NavBar'
import Logout from './Logout'
import ForgotPswd from './ForgotPswd'

class App extends React.Component {
  state = {};
  componentDidMount() {
    try {
        const jwt = localStorage.getItem("token");
        const user = jwtDecode(jwt);
        console.log("user",jwt)
        this.setState({ user });
      } catch (ex) {}

  //     const user = auth.getCurrentUser();
  //     this.setState({ user });
  //   } catch (ex) {}
  }
  render() {
    return (
      <Router>
      <div className="App">
        <NavBar user ={this.state.user} /> 

          <Switch>
          <Route exact path='/' component={Login} />

            <Route exact path="/Login" component={Login} />
            <Route exact path="/Logout" component={Logout} />
            <Route exact path="/ForgotPswd" component={ForgotPswd} />

            <Route exact path="/SignUp" component={SignUp} />
            <Redirect from="/" exact to="/Login"></Redirect>

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
