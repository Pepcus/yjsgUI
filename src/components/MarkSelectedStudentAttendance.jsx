import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

import {
  MARK_SELECTED_STUDENTS_ATTENDANCE_LABEL,
} from '../constants/label';
import {
  MARK_ATTENDANCE_SUCCESS_MESSAGE,
  MARK_ATTENDANCE_FAILED_MESSAGE,
} from '../constants/messages';
import {
  days,
} from '../constants/yjsg';
import {
  resetIsMarkAttendanceSuccessAction,
  markSelectedStudentsAttendanceAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
  isMarkAttendanceSuccess,
  isMarkAttendanceFailed,
} from '../reducers/studentRegistrationReducer';

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
    };
    this.openMarkSelectedStudentsAttendanceModal = this.openMarkSelectedStudentsAttendanceModal.bind(this);
    this.closeMarkSelectedStudentsAttendanceModal = this.closeMarkSelectedStudentsAttendanceModal.bind(this);
    this.renderMarkSelectedStudentsModal = this.renderMarkSelectedStudentsModal.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderMarkPresentButtonClassName = this.renderMarkPresentButtonClassName.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.filterIdsOfStudents = this.filterIdsOfStudents.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderMarkButtonClassName = this.renderMarkButtonClassName.bind(this);
  }

  /**
   * openMarkSelectedStudentsAttendanceModal method
   * on Onclick mark as present button set the value of
   * isMarkSelectedStudentsAttendanceModalOpen to true.
   * And on the basis of this render the mark selected student modal
   */
  openMarkSelectedStudentsAttendanceModal() {
    this.setState({ isMarkSelectedStudentsAttendanceModalOpen: true });
    this.filterIdsOfStudents();
  }
  /**
   * closeMarkSelectedStudentsAttendanceModal method
   * on Onclick close button set the value of
   * isMarkSelectedStudentsAttendanceModalOpen to false.
   * And on the basis of this close the mark selected student modal
   */
  closeMarkSelectedStudentsAttendanceModal() {
    this.setState({ isMarkSelectedStudentsAttendanceModalOpen: false });
    this.props.resetIsMarkAttendanceSuccessAction();
    this.setState({
      selectedDay: '',
      studentsId: [],
    });
  }
  /**
   * filterIdsOfStudents method filter Ids of selected students
   * for marking the attendance.
   */
  filterIdsOfStudents() {
    const Ids = this.props.selectedStudents.map(student => String(student.studentId));
    this.setState({
      studentsId: Ids,
    });
  }
  /**
   * renderMarkPresentButtonClassName method return className
   * of mark as present button as per students are selected or not.
   * @return {string} className
   */
  renderMarkPresentButtonClassName() {
    if (isEmpty(this.props.selectedStudents)) {
      return 'disable-link-button-new';
    }
    return 'linkButton';
  }
  /**
   * renderMarkButtonClassName method return className
   * of submit button as per students attendance mark or not.
   * @return {string} className
   */
  renderMarkButtonClassName() {
    if (isEmpty(this.state.selectedDay)) {
      return 'popup-buttons-disable';
    }
    return 'btn-upload linkButton';
  }
  /**
   * renderMessage method render success message
   * as per selected students attendance marked.
   * @return {ReactComponent}
   */
  renderMessage() {
    if (this.props.isMarkAttendanceSuccess) {
      return (
        <div className="success-block">
          <span>{MARK_ATTENDANCE_SUCCESS_MESSAGE}</span>
        </div>
      );
    } else if (!this.props.isMarkAttendanceSuccess && this.props.isMarkAttendanceFailed) {
      return (
        <div className="upload-message-wrapper">
          <div className="failure-block">
            <span>
              {MARK_ATTENDANCE_FAILED_MESSAGE}
            </span>
          </div>
        </div>
      );
    }
    return null;
  }

  /**
   * addOptions method return options of drop down list
   * of days
   * @return {ReactComponent}
   */
  renderOptions() {
    return days.map(
      optionDay => (
        <option key={shortId.generate()} value={optionDay.day}>
          Day {optionDay.day}
        </option>
      ));
  }

  /**
   * handleSelectChange method set the value of selected day in selectedDay.
   * @param {Object} event
   */
  handleSelectChange(event) {
    this.setState({
      selectedDay: { 'day': event.target.value },
    });
  }

  /**
   * onFormSubmit method call on submission of selected student attendance
   * @param {Object} event
   */
  onFormSubmit(event) {
    event.preventDefault();
    const { secretKey } = this.props;
    const selectedStudentsId = this.state.studentsId;
    const day = this.state.selectedDay;
    this.props.markSelectedStudentsAttendanceAction({ secretKey, selectedStudentsId, day });
  }

  /**
   * renderMarkSelectedStudentsModal method render mark selected students attendance modal
   * @return {ReactComponent}
   */
  renderMarkSelectedStudentsModal() {
    if (this.state.isMarkSelectedStudentsAttendanceModalOpen) {
      return (
        <Modal
          isOpen={this.state.isMarkSelectedStudentsAttendanceModalOpen}
          onRequestClose={this.closeMarkSelectedStudentsAttendanceModal}
          style={customSelectedStudentsAttendanceModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
          ariaHideApp={false}
        >
          <div className="column-group-wrapper">
            <form onSubmit={this.onFormSubmit}>
              <div className="column-modal">
                <h1 className="column-modal-container">{MARK_SELECTED_STUDENTS_ATTENDANCE_LABEL} </h1>
              </div>
              <div className="column-content-modal column-wrapper">
                <div className="selected-student-heading">
                  <span>Selected Students Id:</span>
                  <div className="selected-student-wrapper-id">
                    {
                      this.state.studentsId.map(student =>
                        <span key={shortId.generate()} className="selected-students-Id">{student}</span>)
                    }
                  </div>
                </div>
                <div className="column-content-student-wrapper">
                  <span className="column-content-students">Select Day:</span>
                  <select onChange={this.handleSelectChange} value={this.state.selectedDay.day} className="selected-day-list">
                    <option selected hidden disabled="disabled" value="" />
                    {this.renderOptions()}
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
  }
  render() {
    return (
      <div className="button-container button-container-mobile">
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
  isMarkAttendanceFailed: PropTypes.bool,
  markSelectedStudentsAttendanceAction: PropTypes.func,
  secretKey: PropTypes.string,
};

MarkSelectedStudentAttendance.defaultProps = {
  resetIsMarkAttendanceSuccessAction: () => {},
  selectedStudents: [],
  isMarkAttendanceSuccess: false,
  isMarkAttendanceFailed: false,
  markSelectedStudentsAttendanceAction: () => {},
  secretKey: '',
};

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isMarkAttendanceSuccess: isMarkAttendanceSuccess(state),
  isMarkAttendanceFailed: isMarkAttendanceFailed(state),
});

export default connect(mapStateToProps, {
  resetIsMarkAttendanceSuccessAction,
  markSelectedStudentsAttendanceAction,
}, null, { pure: false })(MarkSelectedStudentAttendance);

