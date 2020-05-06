import React, { Component } from "react";
import { fetchSchool } from "../action";
import { connect } from "react-redux";
import sideBar from "./sideBar"
class SchoolTable extends React.PureComponent {
  componentDidMount=()=> {
    this.props.fetchSchool();
  }

  render() {
    handleGenreSelect = genreList => {
      this.setState({ selectedGenre: genreList, currentPage: 1 });
      console.log("this is my message", genreList._id);
    };
    console.log(this.props.schools)
    const tableData = this.props.schools;
    return (
      <div className="row">
      <div className="col-2">  
      <ListGroup
      items={this.state.genres}
      selectedItem={this.state.selectedGenre}
      onItemSelect={this.handleGenreSelect}
    />
    </div>
    <div className="col">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Share</th>
            <th>Name</th>
            
          </tr>
        </thead>
        <tbody>
          {tableData.length>0 && tableData[0].map((entity, i) => (
            <tr>
              <td>{entity.NoInStock}</td>
              <td>{entity.Title}</td>
              <td>{entity.NoInStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("schoolTable",state)
  return {
    schools: state.schools
  };
}

export default connect(mapStateToProps, { fetchSchool })(SchoolTable);
