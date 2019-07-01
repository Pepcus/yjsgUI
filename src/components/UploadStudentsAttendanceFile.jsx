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
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../constants/messages';
import {
  days,
} from '../constants/yjsg';
import Form from './form';
import { UploadStudentsAttendanceFileJsonSchema } from '../config/fromJsonSchema.json';

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
      formFieldData: {},
      isUploadStudentsAttendanceFileModal: false,
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
  closeUploadStudentsAttendanceFileOption() {
    this.setState({ isUploadStudentsAttendanceFileModal: false });
    this.props.resetIsSuccessAction();
    this.setState({
      formFieldData: {},
    });
  }

  /**
   *onFormSubmit method call fileUpload method to upload attendance file
   */
  onFormSubmit() {
    const { attendanceFile } = this.state.formFieldData;

    this.fileUpload(attendanceFile);
  }

  /**
   * onChange method set attendance file in attendanceFile
   * when browse the file.
   * @param {Object} event
   */
  onChange(event) {
    this.setState(
      { formFieldData: { ...this.state.formFieldData, attendanceFile: event.target.files[0] } });
  }

  /**
   * fileUpload method upload attendance file by calling uploadStudentsAttendanceFileAction action
   * @param {Array} attendanceFile
   */
  fileUpload(attendanceFile) {

    const { secretKey } = this.props;
    const { selectedDay } = this.state.formFieldData;

    this.props.uploadStudentsAttendanceFileAction({ secretKey, attendanceFile, day: selectedDay });
  }

  /**
   * renderFailRecordIds method method render failed records Ids
   * @return {HTML} failed records
   */
  renderFailRecordIds() {

    const { failRecordIds } = this.props;

    if (failRecordIds) {
      return (
        <div className="failure-block">
        Failed Records are:
          <div className="failure-block-records">{failRecordIds}</div>
        </div>);
    }
    return null;
  }

  /**
   * renderIdNotExistMessage method render Id not exist message
   * @return {HTML} not exist Id's
   */
  renderIdNotExistMessage() {

    const { errorMessageOfIdNotExist } = this.props;

    if (errorMessageOfIdNotExist) {
      return (
        <div className="failure-block">
          <div className="failure-block-records">{errorMessageOfIdNotExist}</div>
        </div>);
    }
    return null;
  }

  /**
   * renderUploadButtonClassName method return the class name of upload button
   * @return {string} class name
   */
  renderUploadButtonClassName() {

    const { attendanceFile, selectedDay } = this.state.formFieldData;

    if (!attendanceFile || isEmpty(selectedDay)) {
      return 'btn-upload linkButton';// 'popup-buttons-disable';
    }
    return 'btn-upload linkButton';
  }

  /**
   * transformErrors method return error message object
   * @return {Object} error message object
   */
  transformErrors = () => ({
    'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  });

  /**
   * renderMessage method render success or failure message of upload attendance
   * @return {HTML} message
   */
  renderMessage() {

    const { isAttendanceUploadFailed, isUploadAttendanceSuccess } = this.props;

    if (isUploadAttendanceSuccess) {
      return (
        <div className="upload-message-wrapper">
          <div className="success-block">
            {ATTENDANCE_FILE_UPLOAD_SUCCESS_MESSAGE}
          </div>
          {this.renderFailRecordIds()}
          {this.renderIdNotExistMessage()}
        </div>
      );

    } else if (!isUploadAttendanceSuccess && isAttendanceUploadFailed) {
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
   * @return {HTML} options of day in drop down list
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
  handleSelectChange({ formData }) {
    this.setState({
      formFieldData: { ...this.state.formFieldData, selectedDay: formData.selectedDay, },
    });
  }

  /**
   * renderUploadStudentsAttendanceOption method render upload student attendance file modal
   * @return {HTML} modal
   */
  renderUploadStudentsAttendanceOption() {
    const uiSchema = {
      ...UploadStudentsAttendanceFileJsonSchema.UISchema,
      attendanceFile: {
        ...UploadStudentsAttendanceFileJsonSchema.UISchema.attendanceFile,
        'ui:widget': () => (
          <input
            type="file"
            onChange={this.onChange}
            className="choose-file-wrapper"
          />
        ),
      },
      close: {
        ...UploadStudentsAttendanceFileJsonSchema.UISchema.close,
        'ui:widget': () => (
          <button
            className="button-modal button-close"
            onClick={this.closeUploadStudentsAttendanceFileOption}
          >Close
          </button>
        ),
      },
      submit: {
        ...UploadStudentsAttendanceFileJsonSchema.UISchema.submit,
        'ui:widget': () => (
          <button
            type="submit"
            className={this.renderUploadButtonClassName()}
          >
            <i className="fa fa-file-text card-icon" />
            Upload
          </button>

        ),
      },
    };
    const { isUploadStudentsAttendanceFileModal } = this.state;
    const { selectedDay, attendanceFile } = this.state.formFieldData;

    if (isUploadStudentsAttendanceFileModal) {
      return (
        <Modal
          isOpen={isUploadStudentsAttendanceFileModal}
          onRequestClose={this.closeUploadStudentsAttendanceFileOption}
          style={customUploadStudentsAttendanceFileModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
          ariaHideApp={false}
        >
          <div className="column-group-wrapper">
            <Form
              showErrorList={false}
              liveValidate
              schema={UploadStudentsAttendanceFileJsonSchema.Schema}
              uiSchema={uiSchema}
              formData={{ attendanceFile, selectedDay }}
              onChange={this.handleSelectChange}
              transformErrors={this.transformErrors}
              onSubmit={this.onFormSubmit}
            >
              {this.renderMessage()}
            </Form>
          </div>
        </Modal>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="display-inline mar-right-10">
        <button
          className="column-option-container"
          title="Upload Attendance"
          onClick={this.openUploadStudentsAttendanceFileOption}
        >
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
  errorMessageOfIdNotExist: PropTypes.string,
  isAttendanceUploadFailed: PropTypes.bool,
  isUploadAttendanceSuccess: PropTypes.bool,
  resetIsSuccessAction: PropTypes.func,
  secretKey: PropTypes.string,
  uploadStudentsAttendanceFileAction: PropTypes.func,
};

UploadStudentsAttendanceFile.defaultProps = {
  failRecordIds: '',
  errorMessageOfIdNotExist: '',
  isAttendanceUploadFailed: false,
  isUploadAttendanceSuccess: false,
  resetIsSuccessAction: () => {},
  secretKey: '',
  uploadStudentsAttendanceFileAction: () => {},
};

const mapStateToProps = state => ({
  failRecordIds: getFailRecordIds(state),
  errorMessageOfIdNotExist: idNotExistErrorMessage(state),
  isAttendanceUploadFailed: isUploadAttendanceFailed(state),
  isUploadAttendanceSuccess: getSuccess(state),
  secretKey: getSecretKey(state),
});

export default connect(mapStateToProps, {
  resetIsSuccessAction,
  uploadStudentsAttendanceFileAction,
})(UploadStudentsAttendanceFile);

