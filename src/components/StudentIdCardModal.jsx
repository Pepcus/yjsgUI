import React, {Component} from 'react';
import Modal from 'react-modal';
import isEmpty from 'lodash/isEmpty';

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

class StudentIdCardModal extends Component {
  constructor(props) {
    super(props);
    this.renderStudentIdCards =this.renderStudentIdCards.bind(this);
  };

  renderStudentIdCards(student){
    const studentsIdCards = student.map(object =>
      <div className="student-id-cards">
        <h2 className="student-id-cards-header"> Young Jain Study Group</h2>
        <div className="card-fields-wrapper">
          <div>Name: {object.name}</div>
          <div>Class: {object.education}</div>
          {/*TODO: Use class room no of 2019.*/}
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
        <div className="student-id-cards-footer">
          <div>
            {/* TODO: Remove hard coded content.*/}
            Coordinator name: Bhagchand Jain
          </div>
          <div>
            {/* TODO: Remove hard coded content.*/}
            Coordinator contact: 8435534036
          </div>
        </div>
      </div>
    );
    if(!isEmpty(studentsIdCards)) {
      return (
        <div>
          <h3>Students Id Cards</h3>
          <div className="students-id-card-wrapper">
            {studentsIdCards}
          </div>
        </div>
      );
    }
  }

  render() {
    return(
    <Modal
      isOpen={this.props.printOptionIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.props.closePrintOption}
      style={customPrintOptionStyles}>
      <div>{this.renderStudentIdCards(this.props.selectedStudents)}</div>
      <div>
        <button className="button-modal button-close" onClick={this.props.closePrintOption}>
          Close
        </button>
      </div>
    </Modal>
    );
  }
}
export default StudentIdCardModal;
