import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

import {
  MARK_ATTENDANCE_SUCCESS_MESSAGE,
  MARK_ATTENDANCE_FAILED_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
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
import Form from './form';
import { MarkSelectedStudentAttendanceJsonSchema } from '../config/fromJsonSchema.json';

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
      studentIds: [],
      selectedDay: '',
      isMarkSelectedStudentsAttendanceModalOpen: false,
    };

    this.openMarkSelectedStudentsAttendanceModal = this.openMarkSelectedStudentsAttendanceModal.bind(this);
    this.closeMarkSelectedStudentsAttendanceModal = this.closeMarkSelectedStudentsAttendanceModal.bind(this);
    this.renderMarkSelectedStudentsModal = this.renderMarkSelectedStudentsModal.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.returnMarkPresentButtonClassName = this.returnMarkPresentButtonClassName.bind(this);
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
      studentIds: [],
    });
  }

  /**
   * filterIdsOfStudents method filter Ids of selected students
   * for marking the attendance.
   */
  filterIdsOfStudents() {

    const Ids = this.props.selectedStudents.map(student => String(student.studentId));

    this.setState({
      studentIds: Ids,
    });
  }

  /**
   * returnMarkPresentButtonClassName method return className
   * of mark as present button as per students are selected or not.
   * @return {string} className
   */
  returnMarkPresentButtonClassName() {

    const { selectedStudents } = this.props;

    if (isEmpty(selectedStudents)) {
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

    const { selectedDay } = this.state;

    if (isEmpty(selectedDay)) {
      return 'btn-upload linkButton'; // 'popup-buttons-disable';
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
   * renderMessage method render success message
   * as per selected students attendance marked successfully.
   * otherwise render failed message
   * @return {HTML} message
   */
  renderMessage() {

    const { isAttendanceMarkSuccess, isAttendanceMarkFailed } = this.props;

    if (isAttendanceMarkSuccess) {
      return (
        <div className="success-block">
          <span>{MARK_ATTENDANCE_SUCCESS_MESSAGE}</span>
        </div>
      );

    } else if (!isAttendanceMarkSuccess && isAttendanceMarkFailed) {
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
   * @return {HTML} day drop down list option
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
      selectedDay: { 'day': formData.selectedDay },
    });
  }

  /**
   * onFormSubmit method call on submission of selected student attendance
   */
  onFormSubmit() {
    const { studentIds, selectedDay } = this.state;
    const { secretKey } = this.props;

    this.props.markSelectedStudentsAttendanceAction({ secretKey, selectedStudentsId: studentIds, day: selectedDay });
  }

  /**
   * renderMarkSelectedStudentsModal method render mark selected students attendance modal
   * @return {HTML} modal
   */
  renderMarkSelectedStudentsModal() {
    const uiSchema = {
      ...MarkSelectedStudentAttendanceJsonSchema.UISchema,
      close: {
        ...MarkSelectedStudentAttendanceJsonSchema.UISchema.close,
        'ui:widget': () => (
          <button
            className="button-modal button-close"
            onClick={this.closeMarkSelectedStudentsAttendanceModal}
          >Close
          </button>
        ),
      },
      submit: {
        ...MarkSelectedStudentAttendanceJsonSchema.UISchema.submit,
        // 'classNames': this.getSubmitButtonClassName(),
        'ui:widget': () => (
          <button
            className={this.renderMarkButtonClassName()}
            type="submit"
          >
            Submit
          </button>
        ),
      },
    };
    const { isMarkSelectedStudentsAttendanceModalOpen, studentIds, selectedDay } = this.state;

    if (isMarkSelectedStudentsAttendanceModalOpen) {
      return (
        <Modal
          isOpen={isMarkSelectedStudentsAttendanceModalOpen}
          onRequestClose={this.closeMarkSelectedStudentsAttendanceModal}
          style={customSelectedStudentsAttendanceModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
          ariaHideApp={false}
        >
          <div className="column-group-wrapper">
            <Form
              showErrorList={false}
              liveValidate
              schema={MarkSelectedStudentAttendanceJsonSchema.Schema}
              uiSchema={uiSchema}
              formData={{ studentIds, selectedDay: selectedDay.day }}
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
      <div className="button-container button-container-mobile">
        <button
          className={this.returnMarkPresentButtonClassName()}
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
  isAttendanceMarkFailed: PropTypes.bool,
  isAttendanceMarkSuccess: PropTypes.bool,
  markSelectedStudentsAttendanceAction: PropTypes.func,
  resetIsMarkAttendanceSuccessAction: PropTypes.func,
  secretKey: PropTypes.string,
  selectedStudents: PropTypes.array,
};

MarkSelectedStudentAttendance.defaultProps = {
  isAttendanceMarkFailed: false,
  isAttendanceMarkSuccess: false,
  markSelectedStudentsAttendanceAction: () => {},
  resetIsMarkAttendanceSuccessAction: () => {},
  secretKey: '',
  selectedStudents: [],
};

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isAttendanceMarkFailed: isMarkAttendanceFailed(state),
  isAttendanceMarkSuccess: isMarkAttendanceSuccess(state),
});

export default connect(mapStateToProps, {
  markSelectedStudentsAttendanceAction,
  resetIsMarkAttendanceSuccessAction,
}, null, { pure: false })(MarkSelectedStudentAttendance);

