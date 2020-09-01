import React, { Component } from "react";
import NavBar from "./NavBar";
import SchoolTable from "./SchoolTable";
import InstituteTable from "./InstituteTable";

class Home extends Component {
  render() {
    let name = "";
    let admin = "";
    if (this.props.location.state) {
      name = this.props.location.state.name;
      admin = this.props.location.state.admin;
    }

    return (
      <React.Fragment>
      <div>
        {name && <NavBar name={name} admin={admin} />}
        {!name && <NavBar />}
      </div>
      <div>
        {admin === "Institute" &&
      <InstituteTable /> || <SchoolTable />
        }
      </div>
      </React.Fragment> 
    );
  }
}
export default Home;
