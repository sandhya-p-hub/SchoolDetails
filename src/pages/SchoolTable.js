import React, { Component } from "react";
import {
  fetchSchool,
  fetchSchoolArea,
  saveSchool,
  updateSchool,
  updateSchoolArea,
  deleteSchool
} from "../action";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import schoolArea from "./../Reducer/schoolArea";
import DailogueBox from "./DailogueBox";
import Modal from "./Modal";
import BarChart from "./BarChart";

class SchoolTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "",
      modal: false,
      modalForEdit: false,
      NoInStock: "",
      Title: "",
      area: "",
      tableData: [],
      modalData:{},
      count:""
    };
  }
  componentDidMount = () => {
    this.props.fetchSchool();
    this.props.fetchSchoolArea();
  };
  get getFilteredSchool() {
    const { selectedItem } = this.state;
    let filteredSchool = this.props.schools.filter(
      m =>
        (selectedItem !== "" &&
          m.area.name.toUpperCase() ===
            this.state.selectedItem.toUpperCase()) ||
        (selectedItem === "" && m)
    );
    return filteredSchool;
  }

  /// dailogue Box

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
   const {modalForEdit,modalData} = this.state;
   if(modalForEdit){
   if(name==="area") {
     modalData[name].name =value;
    console.log("edit",modalData)
   }else{
    modalData[name] =value;
   }
    this.setState({
      modalData
     })
   }
  }
  handleUpdate(){
    const { modalData } = this.state;
    const { NoInStock, Title, area,count } = modalData;
    const reqObject = {
      NoInStock,
      Title,
      area: { name: area.name },
      count
    };
      this.props
            .updateSchool(reqObject, modalData._id);
            this.modalEditClose()
  }
  handleDelete(e){
    console.log("delete", e._id)
      this.props
            .deleteSchool(e._id);
  }
  handleSubmit(e) {
    const { NoInStock, Title, area,count } = this.state;
    const reqObject = {
      NoInStock,
      Title,
      area: { name: area },
      count
    };

    this.props.saveSchool(reqObject);
    this.props
    .updateSchoolArea(reqObject.area);
    this.modalClose();
    this.setState({
      NoInStock:"",
      area:"",
      Title:"",
      count:""
    })
  }

  createnewSchool() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({
      modalInputName: "",
      modal: false
    });
  }
  modalEditClose() {
    this.setState({
      modalInputName: "",
      modalForEdit: false
    });
  }
  handleEdit(e) {
    //     console.log(this.state)

    // const reqObject = {
    //  e
    //  };
    //  console.log("reqObject",reqObject)
    // this.props
    //       .updateSchool(reqObject)
    console.log("enter edit", e);
    this.setState({ modalForEdit: true, modal: false,modalData:e});
  }

  mapToViewModel = tableData => {
    return {
      _id: tableData._id,
      Title: tableData.Title,
      NoInStock: tableData.NoInStock,
      area: tableData.area.name,
      count: tableData.count
    };
  };
  render() {
    let tableData = this.getFilteredSchool;
    console.log('tableData', tableData)
const {modalData,modalForEdit} = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <SideBar
              items={this.props.schoolArea}
              selectedItem={this.props.schoolArea}
              onItemSelect={this.handleSchoolArea}
            />
          </div>
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>No of Branches</th>
                  <th>Area</th>
                  <th style={{display:"none"}}>Count</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 &&
                  tableData.map((entity, i) => (
                    <tr>
                      <td>{entity.Title}</td>
                      <td>{entity.NoInStock}</td>
                      <td>{entity.area.name}</td>
                      <td style={{display:"none"}}>{entity.count}</td>
                     <div className="col">
                      <td key={entity._id}>
                        <button onClick={e => this.handleEdit(entity)}>
                          Edit
                        </button>
                        <button onClick={e => this.handleDelete(entity)}>
                          Delete
                        </button>
                        </td>
                        </div>
                    </tr>
                  ))}
                    
              </tbody>
            </table>
          </div>
          <div className="col-1">
            <button onClick={e => this.createnewSchool(e)}>CREATE</button>
            <Modal
              show={this.state.modal}
              handleClose={e => this.modalClose(e)}
            >
              <h3>Enter the details to create a School</h3>
              <div className="col">
                <div className="row">
                  <label>Name</label>
                  <input
                    type="text"
                    value={this.state.Title}
                    name="Title"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <label>No of Branches</label>

                  <input
                    type="text"
                    value={this.state.NoInStock}
                    name="NoInStock"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <label>Area</label>
                  <input
                    type="text"
                    value={this.state.area}
                    name="area"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <label>Count</label>
                  <input
                    type="text"
                    value={this.state.count}
                    name="count"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <button onClick={e => this.handleSubmit(e)} type="button">
                  Save
                </button>
              </div>
            </Modal>
          </div>
        </div>


        <Modal
                        show={this.state.modalForEdit}
                        handleClose={e => this.modalEditClose(e)}
                      >
                        <h3>Edit the school details</h3>
                        {modalData && modalForEdit &&  <div className="col">
                          <div className="row">
                            {/* <label>{ `${ modalData.NoInStock }_${ modalData._id }` }</label> */}
                            <label>No of Branches</label>
                            <input
                              type="text"
                              value={modalData.NoInStock}
                              name="NoInStock"
                              onChange={e => this.handleChange(e)}
                              className="form-control"
                            />
                          </div>
                          <div className="row">
                            <label>Title</label>
                            <input
                              type="text"
                              value={modalData.Title}
                              name="Title"
                              onChange={e => this.handleChange(e)}
                              className="form-control"
                            />
                          </div>
                          <div className="row">
                            <label>Area</label>
                            <input
                              type="text"
                              value={modalData.area.name}
                              name="area"
                              onChange={e => this.handleChange(e)}
                              className="form-control"
                            />
                          </div>
                          <div className="row">
                            <label>Count</label>
                            <input
                              type="text"
                              value={modalData.count}
                              name="count"
                              onChange={e => this.handleChange(e)}
                              className="form-control"
                            />
                          </div>
                        </div>}

                        <div className="form-group">
                          <button
                            onClick={e => this.handleUpdate(e)}
                            type="button"
                          >
                            Save
                          </button>
                        </div>
                      </Modal>  
                   
<BarChart/>

      </React.Fragment>


    );
  }
  handleSchoolArea = genreList => {
    this.setState({ selectedItem: genreList.name });
  };
}

function mapStateToProps(state) {
  return {
    schools: state.schools,
    schoolArea: state.schoolArea
  };
}

export default connect(mapStateToProps, {
  fetchSchool,
  fetchSchoolArea,
  saveSchool,
  updateSchool,
  updateSchoolArea,
  deleteSchool
})(SchoolTable);
