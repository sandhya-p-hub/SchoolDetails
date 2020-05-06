import React from "react";
import LinkBtn from "./../components/Button/LinkBtn";
import Logoimage from "../school.png";
import Adminimage from "../admin.jpg";


const NavBar = ({ name,admin }) => {
  console.log("userss", name,admin);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row">
          <div className="row__col-1">
            <img src={Logoimage} alt="" id="foodlovers"></img>
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
                <div className="row">
                Hello {name} 
                <div className="row__col-1">
                <img src={Adminimage} alt=""></img>
                </div>
                <div className="row__col-1">
                {admin}
                </div>
                <div className="row__col-1">
                <LinkBtn label="Logout" to="/logout" />
                </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
