import React, {Component} from 'react';
import Modal from 'react-modal';
import { CSVLink } from 'react-csv';
import { isEmpty } from 'simple-react-data-grid/src/utils/CommonUtils';

const customPrintOptionStyles = {
  overlay: {
    zIndex: '999',
    backgroundColor: 'rgba(21, 20, 20, 0.75)'
  },
  content: {
    top: '50%',
    position: 'absolute',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(205, 68, 3)',
    boxShadow: 'rgb(99, 99, 99) 0px 2.3px 3px 0px',
    padding:'0px !important',
    marginRight: '-50%',
    width: '85%',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
    height: 'fit-content',
  }
};

class SelectedStudentsActionWrapper extends Component{
  constructor(props) {
    super(props);
    this.state = {
      printOptionIsOpen:false,
    }
    this.openPrintOption = this.openPrintOption.bind(this);
    this.closePrintOption = this.closePrintOption.bind(this);
    this.renderStudentIdCards =this.renderStudentIdCards.bind(this);
  };
  openPrintOption() {
    this.setState({printOptionIsOpen: true});
  }
  closePrintOption() {
    this.setState({printOptionIsOpen: false});
  }
  renderStudentIdCards(student){
   const studentsIdCards = student.map(object =>
      <div className="student-Id-Cards">
        <h2 className="student-Id-Cards-header"> Young Jain Study Group</h2>
        <div className="card-fields-wrapper">
          <div>Name: {object.name}</div>
          <div>Class: {object.education}</div>
          <div>Room: {object.classRoomNo2017}</div>
        </div>
        <div className="card-fields-wrapper">
          <div>Father Name: {object.fatherName}</div>
          <div>Mobile No.: {object.mobile}</div>
        </div>
        <div className="card-fields-wrapper">
          <div>Address: {object.address}</div>
        </div>
        <div className="card-fields-wrapper">
          <div>Student </div>
          <div>{object.studentId}</div>
        </div>
        <div className="student-Id-Cards-footer">
          <div>
            Coordinator name: Bhagchand Jain
          </div>
          <div>
            Coordinator contact: 8435534036
          </div>
        </div>
      </div>
    );
    if(!isEmpty(studentsIdCards)) {
      return (
        <div>
          <h3>Students Id Cards</h3>
          <div className="students-Id-Card-Wrapper">
            {studentsIdCards}
          </div>
        </div>
      );
    }
    else{
      return(
      <div>
        <h3>Please select students </h3>
      </div>
      );
    }
  }
  render(){
  const filterHeader = this.props.metaData.headerConfig.filter(obj => obj.excludeFromExport !== true);
  const header = filterHeader.map(item =>
    ({ label: item.label, key: item.key, disable: item.disable }),
  );
  return(
    <div className = "id-card-wrapper">
      <div className="buttons-wrapper">
        <div className="buttonContainer">
          <CSVLink headers={header} data={this.props.selectedStudents} >
            <button className="linkButton">
                <i className="fa fa-download card-icon"></i>Export
            </button>
          </CSVLink>
        </div>
        <div className="buttonContainer">
          <button className="linkButton" onClick={this.openPrintOption}>
              <i className="fa fa-print card-icon"></i>Print Now
          </button>
        </div>
        <Modal
          isOpen={this.state.printOptionIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closePrintOption}
          style={customPrintOptionStyles}
        >
          <div > {this.renderStudentIdCards(this.props.selectedStudents)} </div>
          <div>
            <button className="button-modal button-close" onClick={this.closePrintOption}>
              Close
            </button>
          </div>
        </Modal>
        <div className="buttonContainer">
          <button className="linkButton">
              <i className="fa fa-print card-icon"></i>Print Later
          </button>
        </div>
        <div className="buttonContainer">
          <button className="linkButton">
              <i className="fa fa-user card-icon"></i>Mark as Present
          </button>
        </div>
      </div>
    </div>
    );
  }
}
export default SelectedStudentsActionWrapper;
