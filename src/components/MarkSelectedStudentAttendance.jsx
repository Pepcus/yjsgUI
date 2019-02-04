import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import {
  resetIsMarkAttendanceSuccessAction,
  markSelectedStudentsAttendanceAction,
} from '../actions/studentRegistrationActions';
import { getSecretKey, isMarkAttendanceSuccess } from '../reducers/studentRegistrationReducer';
import isEmpty from 'lodash/isEmpty';
const customSelectedStudentsAttendanceModalStyles = {
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
    width: '45%',
    outline: 'none',
    transform: 'translate(-50%, -50%)'
  }
};

class MarkSelectedStudentAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsId:[],
      selectedDay:'',
      isMarkSelectedStudentsAttendanceModalOpen: false,
      days: [
        {"day": "1"},
        {"day": "2"},
        {"day": "3"},
        {"day": "4"},
        {"day": "5"},
        {"day": "6"},
        {"day": "7"},
        {"day": "8"},
      ],
    };
    this.openMarkSelectedStudentsAttendanceModal = this.openMarkSelectedStudentsAttendanceModal.bind(this);
    this.closeMarkSelectedStudentsAttendanceModal = this.closeMarkSelectedStudentsAttendanceModal.bind(this);
    this.renderMarkSelectedStudentsModal = this.renderMarkSelectedStudentsModal.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderMarkPresentButtonClassName = this.renderMarkPresentButtonClassName.bind(this);
    this.addOptions = this.addOptions.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.filterIdsOfStudents = this.filterIdsOfStudents.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderMarkButtonClassName = this.renderMarkButtonClassName.bind(this);
  };
  openMarkSelectedStudentsAttendanceModal() {
    this.setState({isMarkSelectedStudentsAttendanceModalOpen: true});
    this.filterIdsOfStudents();
  }
  closeMarkSelectedStudentsAttendanceModal() {
    this.setState({isMarkSelectedStudentsAttendanceModalOpen: false});
    this.props.resetIsMarkAttendanceSuccessAction();
    this.setState({
      selectedDay: '',
      studentsId: [],
    });
  }
  filterIdsOfStudents(){
    const Ids = this.props.selectedStudents.map((student) => {
      return String(student.studentId);
      });
    this.setState({
      studentsId: Ids,
    })
  }
  renderMarkPresentButtonClassName(){
    if(isEmpty(this.props.selectedStudents)) {
      return "disable-link-button-new";
    }
    else {
      return "linkButton";
    }
  }
  renderMarkButtonClassName(){
    if(isEmpty(this.state.selectedDay)) {
      return "popup-buttons-disable";
    }
    else {
      return "btn-upload linkButton";
    }
  }
  renderMessage(){
    if(this.props.isMarkAttendanceSuccess ){
      return(
        <div className="success-block">
          <span>चयनित छात्रो की उपस्तिथि सफलतापूवर्क दर्ज कर दी गयी है |</span>
        </div>
      );
    }
  }
  addOptions() {
    const Options = ({ day }) => {
      return(
      <option value={day.day}>
      Day {day.day}
      </option>
    )};
    return this.state.days.map(
      (optionDay) => {
          return (
            <Options
              day={optionDay}
              key={optionDay.day}
            />
          );
      });
  }
  handleSelectChange(event) {
    this.setState({
      selectedDay: {"day": event.target.value},
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    this.props.markSelectedStudentsAttendanceAction(this.props.secretKey, this.state.studentsId, this.state.selectedDay);
  }
  renderMarkSelectedStudentsModal() {
    if (this.state.isMarkSelectedStudentsAttendanceModalOpen) {
      return (
        <Modal
          isOpen={this.state.isMarkSelectedStudentsAttendanceModalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeMarkSelectedStudentsAttendanceModal}
          style={customSelectedStudentsAttendanceModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
        >
          <div className="column-group-wrapper">
            <form onSubmit={this.onFormSubmit}>
              <div className="column-modal">
              <h1  className="column-modal-container">कृपिया चयनित छात्रो की उपस्तिथि दर्ज करे </h1>
              </div>
              <div className="column-content-modal column-wrapper">
                <div className="selected-student-heading">
                  <span>Selected Students Id:</span>
                  {
                    this.state.studentsId.map(student =>
                      <span className='selected-students-Id'>{student}</span>)
                  }
                </div>
                <div className="column-content-student-wrapper">
                  <span className="column-content-students">Select Day:</span>
                  <select onChange={this.handleSelectChange} value={this.state.selectedDay["day"]} className="selected-day-list">
                    <option selected="true" hidden="true" disabled="disabled" value=''/>
                    {this.addOptions()}
                  </select>
                </div>
                {this.renderMessage()}
              </div>
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button className="button-modal button-close"
                          onClick={this.closeMarkSelectedStudentsAttendanceModal}>Close
                  </button>
                  <button className={this.renderMarkButtonClassName()} type="submit">Submit</button>
                </div>
              </div>
            </form>

          </div>
        </Modal>
      );
    }
  }
  render() {
    return (
      <div className="buttonContainer button-container-mobile">
        <button className={this.renderMarkPresentButtonClassName()} onClick={this.openMarkSelectedStudentsAttendanceModal}>
          <i className="fa fa-user card-icon"/>Mark as Present
        </button>
        {this.renderMarkSelectedStudentsModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isMarkAttendanceSuccess: isMarkAttendanceSuccess(state),
});

export default connect(mapStateToProps, {
  resetIsMarkAttendanceSuccessAction,
  markSelectedStudentsAttendanceAction
}, null, { pure: false })(MarkSelectedStudentAttendance);



