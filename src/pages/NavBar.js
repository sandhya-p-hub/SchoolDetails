import React from "react";
import { NavLink, Link } from "react-router-dom";
import LinkBtn from './../components/Button/LinkBtn'
import image from "../school.png";

const NavBar = ({ name }) => {
  console.log("userss", name);

  return (
    <nav className="navbar">
        <div className="container">
        <div className="row">
          <div className="row__col-1">
          <img src={image} alt="" id="foodlovers"></img>
          </div>
          <div>
          {!name && (
            <React.Fragment>
               <LinkBtn label="Register" to="/SignUp" />
              <LinkBtn label="Login" to="/Login" />
              </React.Fragment>
          )}
          {name && (
           <React.Fragment>
                Hello {name}
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
