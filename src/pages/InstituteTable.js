import React, { Component } from "react";
import { fetchInstitute, fetchInstituteArea } from "../action";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import InstituteArea from "./../Reducer/InstituteArea";
import BarChart from "./BarChart";

class InstituteTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: ""
    };
  }
  componentDidMount = () => {
    this.props.fetchInstitute();
    this.props.fetchInstituteArea();
  };
  handleInstituteArea = InstituteList => {
    this.setState({ selectedItem: InstituteList.name });
  };
  get getFIlteredData() {
    const { selectedItem } = this.state;
    let filteredInstitute = this.props.Institute.filter(
      el => selectedItem !== "" && el.area.name.toUpperCase() === this.state.selectedItem.toUpperCase() || selectedItem === "" && el
    );
    return filteredInstitute;
  }
  render() {
    return (
      <div className="row">
        <div className="col-2">
          <SideBar
            items={this.props.InstituteArea}
            selectedItem={this.props.InstituteArea}
            onItemSelect={this.handleInstituteArea}
          />
        </div>
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Share</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {this.getFIlteredData.length > 0 &&
                this.getFIlteredData.map((entity, i) => (
                  <tr>
                    <td>{entity.InstituteName}</td>
                    <td>{entity.branch}</td>
                    <td>{entity.area.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <BarChart/>

      </div>

    );
  }
}
function mapStateToProps(state) {
  console.log("schoolTable", state);
  return {
    Institute: state.Institute,
    InstituteArea: state.InstituteArea
  };
}

export default connect(mapStateToProps, { fetchInstitute, fetchInstituteArea })(
  InstituteTable
);
