import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import * as shortId from 'shortid';

import {
  uploadStudentsAttendanceFileAction,
  resetIsSuccessAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
  getSuccess,
  getFailRecordIds,
  isUploadAttendanceFailed,
  idNotExistErrorMessage,
} from '../reducers/studentRegistrationReducer';
import {
  ATTENDANCE_FILE_UPLOAD_SUCCESS_MESSAGE,
  ATTENDANCE_FILE_UPLOAD_FAILURE_MESSAGE,
} from '../constants/messages';
import {
  UPLOAD_FILE_TEXT,
} from '../constants/text';
import {
  days,
} from '../constants/yjsg';


const customUploadStudentsAttendanceFileModalStyles = {
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
 * UploadStudentsAttendanceFile render upload student attendance file modal
 * @type {Class}
 */
class UploadStudentsAttendanceFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attendanceFile: null,
      isUploadStudentsAttendanceFileModal: false,
      selectedDay: '',
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderFailRecordIds = this.renderFailRecordIds.bind(this);
    this.openUploadStudentsAttendanceFileOption = this.openUploadStudentsAttendanceFileOption.bind(this);
    this.closeUploadStudentsAttendanceFileOption = this.closeUploadStudentsAttendanceFileOption.bind(this);
    this.renderUploadStudentsAttendanceOption = this.renderUploadStudentsAttendanceOption.bind(this);
    this.renderUploadButtonClassName = this.renderUploadButtonClassName.bind(this);
    this.renderIdNotExistMessage = this.renderIdNotExistMessage.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  /**
   * openUploadStudentsAttendanceFileOption method set isUploadStudentsAttendanceFileModal to true
   */
  openUploadStudentsAttendanceFileOption() {
    this.setState({ isUploadStudentsAttendanceFileModal: true });
  }

  /**
   * closeUploadStudentsAttendanceFileOption method set isUploadStudentsAttendanceFileModal to false
   * and reset isSuccess by calling resetIsSuccessAction action
   */
  closeUploadStudentsAttendanceFileOption(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    this.setState({ isUploadStudentsAttendanceFileModal: false });
    this.props.resetIsSuccessAction();
    this.setState({
      attendanceFile: null,
      selectedDay: '',
    });
  }

  /**
   *onFormSubmit method call fileUpload method to upload attendance file
   * @param {Object} event
   */
  onFormSubmit(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    this.fileUpload(this.state.attendanceFile);
  }

  /**
   * onChange method set attendance file in attendanceFile
   * when browse the file.
   * @param {Object} event
   */
  onChange(event) {
    this.setState({ attendanceFile: event.target.files[0] });
  }

  /**
   * fileUpload method upload attendance file by calling uploadStudentsAttendanceFileAction action
   * @param {Array} attendanceFile
   */
  fileUpload(attendanceFile) {
    const { secretKey } = this.props;
    const day = this.state.selectedDay;
    this.props.uploadStudentsAttendanceFileAction({ secretKey, attendanceFile, day });
  }

  /**
   * renderFailRecordIds method method render failed records Ids
   * @return {ReactComponent}
   */
  renderFailRecordIds() {
    if (this.props.failRecordIds) {
      return (
        <div className="failure-block">
        Failed Records are:
          <div className="failure-block-records">{this.props.failRecordIds}</div>
        </div>);
    }
    return null;
  }

  /**
   * renderIdNotExistMessage method render Id not exist message
   * @return {ReactComponent}
   */
  renderIdNotExistMessage() {
    if (this.props.idNotExistErrorMessage) {
      return (
        <div className="failure-block">
          <div className="failure-block-records">{this.props.idNotExistErrorMessage}</div>
        </div>);
    }
    return null;
  }

  /**
   * renderUploadButtonClassName method return the class name of upload button
   * @return {string} class name
   */
  renderUploadButtonClassName() {
    if (!this.state.attendanceFile || isEmpty(this.state.selectedDay)) {
      return 'popup-buttons-disable';
    }
    return 'btn-upload linkButton';
  }

  /**
   * renderMessage method render success or failure message of upload attendance
   * @return {ReactComponent}
   */
  renderMessage() {
    if (this.props.isUploadAttendanceSuccess) {
      return (
        <div className="upload-message-wrapper">
          <div className="success-block">
            {ATTENDANCE_FILE_UPLOAD_SUCCESS_MESSAGE}
          </div>
          {this.renderFailRecordIds()}
          {this.renderIdNotExistMessage()}
        </div>
      );
    } else if (!this.props.isUploadAttendanceSuccess && this.props.isUploadAttendanceFailed) {
      return (
        <div className="upload-message-wrapper">
          <div className="failure-block">
            {ATTENDANCE_FILE_UPLOAD_FAILURE_MESSAGE}
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
      selectedDay: event.target.value,
    });
  }

  /**
   * renderUploadStudentsAttendanceOption method render upload student attendance file modal
   * @return {ReactComponent}
   */
  renderUploadStudentsAttendanceOption() {
    if (this.state.isUploadStudentsAttendanceFileModal) {
      return (
        <Modal
          isOpen={this.state.isUploadStudentsAttendanceFileModal}
          onRequestClose={this.closeUploadStudentsAttendanceFileOption}
          style={customUploadStudentsAttendanceFileModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
          ariaHideApp={false}
        >
          <div className="column-group-wrapper">
            <div className="column-modal">
              <h1 className="column-modal-container">{UPLOAD_FILE_TEXT}</h1>
            </div>
            <form onSubmit={this.onFormSubmit} className="upload-form-wrapper">
              <div>
                <div className="column-content-modal">
                  <input type="file" onChange={this.onChange} className="choose-file-wrapper" />
                  <div className="column-content-student-wrapper">
                    <span className="column-content-students">Select Day:</span>
                    <select onChange={this.handleSelectChange} value={this.state.selectedDay} className="selected-day-list">
                      <option hidden disabled="disabled" value="" />
                      {this.renderOptions()}
                    </select>
                  </div>
                  {this.renderMessage()}
                </div>
              </div>
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button
                    className="button-modal button-close"
                    onClick={this.closeUploadStudentsAttendanceFileOption}
                  >Close
                  </button>
                  <button type="submit" className={this.renderUploadButtonClassName()}>
                    <i className="fa fa-file-text card-icon" />
                    Upload
                  </button>
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
      <div className="display-inline mar-right-10">
        <button className="column-option-container" title="Upload Attendance" onClick={this.openUploadStudentsAttendanceFileOption}>
          <i className="fa fa-upload card-icon" />
        Upload Attendance
        </button>
        {this.renderUploadStudentsAttendanceOption()}
      </div>
    );
  }
}

UploadStudentsAttendanceFile.propTypes = {
  failRecordIds: PropTypes.string,
  idNotExistErrorMessage: PropTypes.string,
  isUploadAttendanceFailed: PropTypes.bool,
  isUploadAttendanceSuccess: PropTypes.bool,
  resetIsSuccessAction: PropTypes.func,
  secretKey: PropTypes.string,
  uploadStudentsAttendanceFileAction: PropTypes.func,
};

UploadStudentsAttendanceFile.defaultProps = {
  failRecordIds: '',
  idNotExistErrorMessage: '',
  isUploadAttendanceFailed: false,
  isUploadAttendanceSuccess: false,
  resetIsSuccessAction: () => {},
  secretKey: '',
  uploadStudentsAttendanceFileAction: () => {},
};
const mapStateToProps = state => ({
  failRecordIds: getFailRecordIds(state),
  idNotExistErrorMessage: idNotExistErrorMessage(state),
  isUploadAttendanceFailed: isUploadAttendanceFailed(state),
  isUploadAttendanceSuccess: getSuccess(state),
  secretKey: getSecretKey(state),
});

export default connect(mapStateToProps, {
  resetIsSuccessAction,
  uploadStudentsAttendanceFileAction,
})(UploadStudentsAttendanceFile);

