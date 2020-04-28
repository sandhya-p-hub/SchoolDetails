import React from "react";
import { NavLink, Link } from "react-router-dom";
import LinkBtn from './../components/Button/LinkBtn'

const NavBar = ({ user }) => {
  console.log("userss", user);

  return (
    <nav className="navbar">
        <div className="container">
        <div className="row">
          <div className="row__col-1">
            Logo
          </div>
          <div>
          {!user && (
            <React.Fragment>
               <LinkBtn label="Register" to="/SignUp" />
              <LinkBtn label="Login" to="/Login" />
              </React.Fragment>
          )}
          {user && (
           <React.Fragment>
                Hello {user.name}
                <LinkBtn label="Logout" to="/logout" />
            </React.Fragment>
          )}
          </div>
          </div>
        </div>
    </nav>
  );
};

export default NavBar;
