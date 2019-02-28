import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import {
  resetIsMarkAttendanceSuccessAction,
  markSelectedStudentsAttendanceAction,
} from '../actions/studentRegistrationActions';
import { getSecretKey, isMarkAttendanceSuccess } from '../reducers/studentRegistrationReducer';

const customSelectedStudentsAttendanceModalStyles = {
  overlay: {
    zIndex: '999',
    backgroundColor: 'rgba(21, 20, 20, 0.75)',
  },
  content: {
    top: '50%',
    position: 'absolute',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(205, 68, 3)',
    boxShadow: 'rgb(99, 99, 99) 0px 2.3px 3px 0px',
    padding: '0px !important',
    marginRight: '-50%',
    width: '45%',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
  },
};

/**
 * MarkSelectedStudentAttendance component render mark selected student attendance modal
 * @type {Class}
 */
class MarkSelectedStudentAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsId: [],
      selectedDay: '',
      isMarkSelectedStudentsAttendanceModalOpen: false,
      days: [
        { 'day': '1' },
        { 'day': '2' },
        { 'day': '3' },
        { 'day': '4' },
        { 'day': '5' },
        { 'day': '6' },
        { 'day': '7' },
        { 'day': '8' },
      ],
    };
  }

  /**
   * openMarkSelectedStudentsAttendanceModal method
   * on Onclick mark as present button set the value of
   * isMarkSelectedStudentsAttendanceModalOpen to true.
   * And on the basis of this render the mark selected student modal
   */
  openMarkSelectedStudentsAttendanceModal = () => {
    this.setState({ isMarkSelectedStudentsAttendanceModalOpen: true });
    this.filterIdsOfStudents();
  };

  /**
   * closeMarkSelectedStudentsAttendanceModal method
   * on Onclick close button set the value of
   * isMarkSelectedStudentsAttendanceModalOpen to false.
   * And on the basis of this close the mark selected student modal
   */
  closeMarkSelectedStudentsAttendanceModal = () => {
    this.setState({ isMarkSelectedStudentsAttendanceModalOpen: false });
    this.props.resetIsMarkAttendanceSuccessAction();
    this.setState({
      selectedDay: '',
      studentsId: [],
    });
  };

  /**
   * filterIdsOfStudents method filter Ids of selected students
   * for marking the attendance.
   */
  filterIdsOfStudents = () => {
    const Ids = this.props.selectedStudents.map(student => String(student.studentId));
    this.setState({
      studentsId: Ids,
    });
  };

  /**
   * renderMarkPresentButtonClassName method return className
   * of mark as present button as per students are selected or not.
   * @return {string} className
   */
  renderMarkPresentButtonClassName = () => {
    if (isEmpty(this.props.selectedStudents)) {
      return 'disable-link-button-new';
    }
    return 'linkButton';
  };

  /**
   * renderMarkButtonClassName method return className
   * of submit button as per students attendance mark or not.
   * @return {string} className
   */
  renderMarkButtonClassName = () => {
    if (isEmpty(this.state.selectedDay)) {
      return 'popup-buttons-disable';
    }
    return 'btn-upload linkButton';
  };

  /**
   * renderMessage method render success message
   * as per selected students attendance marked.
   * @return {ReactComponent}
   */
  renderMessage = () => {
    if (this.props.isMarkAttendanceSuccess) {
      return (
        <div className="success-block">
          <span>चयनित छात्रो की उपस्तिथि सफलतापूवर्क दर्ज कर दी गयी है |</span>
        </div>
      );
    }
    return null;
  };

  /**
   * addOptions method return options of drop down list
   * of days
   * @return {ReactComponent}
   */
  addOptions = () => {
    const Options = ({ day }) => (
      <option value={day.day}>
      Day {day.day}
      </option>
    );
    return this.state.days.map(
      optionDay => (
        <Options
          day={optionDay}
          key={optionDay.day}
        />
      ));
  };

  /**
   * handleSelectChange method set the value of selected day in selectedDay.
   * @param {Object} event
   */
  handleSelectChange = (event) => {
    this.setState({
      selectedDay: { 'day': event.target.value },
    });
  };

  /**
   * onFormSubmit method call on submission of selected student attendance
   * @param {Object} event
   */
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.markSelectedStudentsAttendanceAction(
      this.props.secretKey, this.state.studentsId, this.state.selectedDay,
    );
  };

  /**
   * renderMarkSelectedStudentsModal method render mark selected students attendance modal
   * @return {ReactComponent}
   */
  renderMarkSelectedStudentsModal = () => {
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
                <h1 className="column-modal-container">कृपिया चयनित छात्रो की उपस्तिथि दर्ज करे </h1>
              </div>
              <div className="column-content-modal column-wrapper">
                <div className="selected-student-heading">
                  <span>Selected Students Id:</span>
                  <div className="selected-student-wrapper-id">
                    {
                      this.state.studentsId.map(student =>
                        <span className="selected-students-Id">{student}</span>)
                    }
                  </div>
                </div>
                <div className="column-content-student-wrapper">
                  <span className="column-content-students">Select Day:</span>
                  <select onChange={this.handleSelectChange} value={this.state.selectedDay.day} className="selected-day-list">
                    <option selected="true" hidden="true" disabled="disabled" value="" />
                    {this.addOptions()}
                  </select>
                </div>
                {this.renderMessage()}
              </div>
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button
                    className="button-modal button-close"
                    onClick={this.closeMarkSelectedStudentsAttendanceModal}
                  >Close
                  </button>
                  <button className={this.renderMarkButtonClassName()} type="submit">Submit</button>
                </div>
              </div>
            </form>

          </div>
        </Modal>
      );
    }
    return null;
  };

  render() {
    return (
      <div className="buttonContainer button-container-mobile">
        <button
          className={this.renderMarkPresentButtonClassName()}
          onClick={this.openMarkSelectedStudentsAttendanceModal}
        >
          <i className="fa fa-user card-icon" />Mark as Present
        </button>
        {this.renderMarkSelectedStudentsModal()}
      </div>
    );
  }
}

MarkSelectedStudentAttendance.propTypes = {
  resetIsMarkAttendanceSuccessAction: PropTypes.func,
  selectedStudents: PropTypes.array,
  isMarkAttendanceSuccess: PropTypes.bool,
  markSelectedStudentsAttendanceAction: PropTypes.func,
  secretKey: PropTypes.string,
};

MarkSelectedStudentAttendance.defaultProps = {
  resetIsMarkAttendanceSuccessAction: () => {},
  selectedStudents: [],
  isMarkAttendanceSuccess: false,
  markSelectedStudentsAttendanceAction: () => {},
  secretKey: '',
};

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isMarkAttendanceSuccess: isMarkAttendanceSuccess(state),
});

export default connect(mapStateToProps, {
  resetIsMarkAttendanceSuccessAction,
  markSelectedStudentsAttendanceAction,
}, null, { pure: false })(MarkSelectedStudentAttendance);

