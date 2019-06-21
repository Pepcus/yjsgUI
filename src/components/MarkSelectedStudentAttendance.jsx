import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

import {
  ID_CARD_PRINT_STATUS_FOR_SELECTED_STUDENTS_LABEL,
  MARK_SELECTED_STUDENTS_ATTENDANCE_LABEL,
} from '../constants/label';
import {
  MARK_ATTENDANCE_SUCCESS_MESSAGE,
  MARK_ATTENDANCE_FAILED_MESSAGE, THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
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
import Form from './Form';

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

const formDetail = {
  Schema: {
    'title': MARK_SELECTED_STUDENTS_ATTENDANCE_LABEL,
    'type': 'object',
    'properties': {
      'studentsId': {
        'title': 'Selected Students Id:',
        'type': 'array',
        'items': {
          'type': 'string',
        },
      },
      'selectedDay': {
        'type': 'string',
        'enum': [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
        ],
        'enumNames': [
          'Day 1',
          'Day 2',
          'Day 3',
          'Day 4',
          'Day 5',
          'Day 6',
          'Day 7',
          'Day 8',
        ],
      },
      'Close': {
        'type': 'string',
      },
      'Submit': {
        'type': 'string',
      },
    },
    'required': ['studentsId', 'selectedDay'],
  },
  UISchema: {
    'ui:order': ['studentsId',
      'selectedDay',
      '*',
      'Close',
      'Submit',
    ],
    'studentsId': {
      'className': 'column-content-modal column-wrapper',
      'ui:options': {
        'addable': false,
        'removable': false,
      },
      'items': {
        'ui:disabled': true,
      },
    },
    'selectedDay': {
      'ui:options': {
        'label': false,
      },
    },
    'Close': {
      'ui:options': {
        'label': false,
      },
    },
    'Submit': {
      'ui:options': {
        'label': false,
      },
    },
  },
  data: {},
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
   * @return {*} message
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
   * @return {*} day drop down list option
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
    const { studentsId, selectedDay } = this.state;
    const { secretKey } = this.props;

    this.props.markSelectedStudentsAttendanceAction({ secretKey, selectedStudentsId: studentsId, day: selectedDay });
  }

  /**
   * renderMarkSelectedStudentsModal method render mark selected students attendance modal
   * @return {*} modal
   */
  renderMarkSelectedStudentsModal() {
    const uiSchema = {
      ...formDetail.UISchema,
      Close: {
        ...formDetail.UISchema.Close,
        'ui:widget': () => (
          <button
            className="button-modal button-close"
            onClick={this.closeMarkSelectedStudentsAttendanceModal}
          >Close
          </button>
        ),
      },
      Submit: {
        ...formDetail.UISchema.Submit,
        // 'classNames': this.renderSubmitButtonClassName(),
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
    const { isMarkSelectedStudentsAttendanceModalOpen, studentsId, selectedDay } = this.state;

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
              noHtml5Validate
              liveValidate
              schema={formDetail.Schema}
              uiSchema={uiSchema}
              formData={
                { studentsId,
                  selectedDay: selectedDay.day,
                }}
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

