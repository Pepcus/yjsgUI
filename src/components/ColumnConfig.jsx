import React, {Component} from 'react';
import Modal from 'react-modal';

const customColumnOptionStyles = {
  overlay: {
    backgroundColor: 'rgba(21, 20, 20, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(205, 68, 3)',
    boxShadow: 'rgb(99, 99, 99) 0px 2.3px 3px 0px',
    padding:'0px !important',
    marginRight: '-50%',
    width: '40%',
    transform: 'translate(-50%, -50%)'
  }
};

class ColumnConfig extends Component{
  constructor(props){
    super(props);
    this.state = {
      visibleColumnConfig: {},
    };
    this.setValuesOfVisibleColumnConfig = this.setValuesOfVisibleColumnConfig.bind(this);
  }
  setValuesOfVisibleColumnConfig (){
    this.props.setValuesOfVisibleColumnConfig(this.state.visibleColumnConfig);
    this.props.closeColumnOption();
  }
  componentWillMount(){
    this.setState ({
      visibleColumnConfig: this.props.visibleColumnConfig,
    });
    this.handleChange = this.handleChange.bind(this);
    this.checkAllColumns = this.checkAllColumns.bind(this);
    this.unCheckAllColumns = this.unCheckAllColumns.bind(this);
  }
  checkAllColumns(){
    let temporaryVisibleColumnConfig = this.props.visibleColumnConfig;
      Object.keys(temporaryVisibleColumnConfig).forEach(function(key) {
       temporaryVisibleColumnConfig[key]= true;
    });
      console.log("check", temporaryVisibleColumnConfig);
    this.setState({
      visibleColumnConfig: temporaryVisibleColumnConfig,
    });
  }
  unCheckAllColumns(){
    let temporaryVisibleColumnConfig = this.props.visibleColumnConfig;
    Object.keys(temporaryVisibleColumnConfig).forEach(function(key) {
      temporaryVisibleColumnConfig[key]= false;
    });
    console.log("uncheck", temporaryVisibleColumnConfig);
    this.setState({
      visibleColumnConfig: temporaryVisibleColumnConfig,
    });
  }
  handleChange = event => {
    if (event.target.checked ===  true) {
      this.setState({
        visibleColumnConfig: {
          ...this.state.visibleColumnConfig,
          [event.target.name]: true,
        }
      });
    } else if(event.target.checked === false){
      this.setState({
        visibleColumnConfig: {
          ...this.state.visibleColumnConfig,
          [event.target.name]: false,
        }
      });
    }
  };

  render(){
    return(
      <Modal
        isOpen={this.props.columnOptionIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.closeColumnOption}
        style={customColumnOptionStyles}
        contentLabel="Column Options"
        overlayLabel = "Overlay Options"
      >
        <div className="column-modal">
          <h2 className="column-modal-container">Select Column</h2>
        </div>
        <form>
          <div className="column-group">
            <div className="column-group-container">
              <label className="label">
                <input type="checkbox" name="name" onChange={this.handleChange} checked={this.state.visibleColumnConfig.name ? "checked": ""} />
                <span>Name</span>
              </label>
              <label className="label">
                <input type="checkbox" name="fatherName" onChange={this.handleChange} checked={this.state.visibleColumnConfig.fatherName ? "checked": ""} />
                <span>Father Name</span>
              </label>
              <label className="label">
                <input type="checkbox" name="mobile" onChange={this.handleChange} checked={this.state.visibleColumnConfig.mobile ? "checked": ""} />
                <span>Mobile No.</span>
              </label>
              <label className="label">
                <input type="checkbox" name="email" onChange={this.handleChange} checked={this.state.visibleColumnConfig.email ? "checked": ""} />
                <span>Email ID</span>
              </label>
              <label className="label">
                <input type="checkbox" name="gender" onChange={this.handleChange} checked={this.state.visibleColumnConfig.gender ? "checked": ""} />
                <span>Gender</span>
              </label>
              <label className="label">
                <input type="checkbox" name="age" onChange={this.handleChange} checked={this.state.visibleColumnConfig.age ? "checked": ""} />
                <span>Age</span>
              </label>
              <label className="label">
                <input type="checkbox" name="address" onChange={this.handleChange} checked={this.state.visibleColumnConfig.address ? "checked": ""} />
                <span>Address</span>
              </label>
              <label className="label">
                <input type="checkbox" name="education" onChange={this.handleChange} checked={this.state.visibleColumnConfig.education ? "checked": ""} />
                <span>Education</span>
              </label>
            </div>
            <div className = "column-group-container">
              <label className="label">
                <input type="checkbox" name="classAttended2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classAttended2016 ? "checked": ""} />
                <span>Class Attended 2016</span>
              </label>
              <label className="label">
                <input type="checkbox" name="classAttended2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classAttended2017 ? "checked": ""} />
                <span>Class Attended 2017</span>
              </label>
              <label className="label">
                <input type="checkbox" name="attendance2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.attendance2016 ? "checked": ""} />
                <span>Attendance 2016</span>
              </label>
              <label className="label">
                <input type="checkbox" name="attendance2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.attendance2017 ? "checked": ""} />
                <span>Attendance 2017</span>
              </label>
              <label className="label">
                <input type="checkbox" name="classRoomNo2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classRoomNo2016 ? "checked": ""} />
                <span>Class Room No. 2016</span>
              </label>
              <label className="label">
                <input type="checkbox" name="classRoomNo2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classRoomNo2017 ? "checked": ""} />
                <span>Class Room No. 2017</span>
              </label>
              <label className="label">
                <input type="checkbox" name="marks2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.marks2016 ? "checked": ""} />
                <span>Marks 2016</span>
              </label>
              <label className="label">
                <input type="checkbox" name="marks2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.marks2017 ? "checked": ""} />
                <span>Marks 2017</span>
              </label>
              <label className="label">
                <input type="checkbox" name="edit" onChange={this.handleChange} checked={this.state.visibleColumnConfig.edit ? "checked": ""} />
                <span>Edit</span>
              </label>
            </div>
          </div>
        </form>
        <div className = "modal-save-container">
          <div>
            <button className="button-modal" onClick={() => this.checkAllColumns()}>Select All</button>
            <button className="button-modal" onClick={() => this.unCheckAllColumns()}>Select Null</button>
          </div>
          <div>
            <button className="button-modal" onClick={this.props.closeColumnOption}>Close</button>
            <button className="button-modal" onClick={this.setValuesOfVisibleColumnConfig}>Save</button>
          </div>
        </div>
      </Modal>
    );
  }
}
export default ColumnConfig;