import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import {
  resetIsMarkOptInOrOptOutSuccessAction,
  markSelectedStudentsOptInOrOptOutAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
  isMarkOptInOrOptOutSuccess,
  isMarkOptInOrOptOutFailed,
} from '../reducers/studentRegistrationReducer';
import {
  OPT_IN_OR_OPT_OUT_SUCCESS_MESSAGE,
  OPT_IN_OR_OPT_OUT_FAILED_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../constants/messages';
import Form from './form';
import { MarkOptInOrOptOutButtonJsonSchema } from '../config/fromJsonSchema.json';

const customSelectedStudentsOptInOrOptOutStyles = {
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
 *  MarkOptInOrOptOutButton component render mark selected student optIn or optOut modal
 * @type {Class}
 */
class MarkOptInOrOptOutButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      studentIds: [],
      selectedOptOption: '',
      isMarkSelectedStudentsOptInOrOptOutModalOpen: false,
    };

    this.openMarkSelectedStudentsOptInOrOptOutModal = this.openMarkSelectedStudentsOptInOrOptOutModal.bind(this);
    this.closeMarkSelectedStudentsOptInOrOptOutModal = this.closeMarkSelectedStudentsOptInOrOptOutModal.bind(this);
    this.onClickRadioButton = this.onClickRadioButton.bind(this);
    this.renderMarkSelectedStudentsOptInOrOptOutModal = this.renderMarkSelectedStudentsOptInOrOptOutModal.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.filterIdsOfStudents = this.filterIdsOfStudents.bind(this);
    this.renderMarkOptInOrOutClassName = this.renderMarkOptInOrOutClassName.bind(this);
    this.getSubmitButtonClassName = this.getSubmitButtonClassName.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /**
   * openMarkSelectedStudentsOptInOrOptOutModal method
   * on Onclick optIn or optOut button set the value of
   * isMarkSelectedStudentsOptInOrOptOutModalOpen to true.
   * And on the basis of this render the mark optIn/optOut modal
   */
  openMarkSelectedStudentsOptInOrOptOutModal() {
    this.setState({
      isMarkSelectedStudentsOptInOrOptOutModalOpen: true,
    });
    this.filterIdsOfStudents();
  }

  /**
   * closeMarkSelectedStudentsOptInOrOptOutModal method
   * on Onclick close button set the value of
   * isMarkSelectedStudentsOptInOrOptOutModalOpen to false.
   * And on the basis of this close the mark optIn/optOut modal
   * @param {Object} event
   */
  closeMarkSelectedStudentsOptInOrOptOutModal(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    this.setState({
      isMarkSelectedStudentsOptInOrOptOutModalOpen: false,
      selectedOptOption: '',
    });
    this.props.resetIsMarkOptInOrOptOutSuccessAction();
    this.props.clearSelectedStudents();
  }

  /**
   * filterIdsOfStudents method filter Ids of selected students
   * for marking the optIn/optOut.
   */
  filterIdsOfStudents() {

    const { selectedStudents } = this.props;

    const selectedStudentIds = selectedStudents.map(student => String(student.studentId));
    this.setState({
      studentIds: selectedStudentIds,
    });
  }

  /**
   * renderMarkOptInOrOutClassName method return className
   * of mark optIn/optOut button as per students are selected or not.
   * @return {string} className
   */
  renderMarkOptInOrOutClassName() {

    const { selectedStudents } = this.props;

    if (isEmpty(selectedStudents)) {
      return 'disable-link-button-new';
    }
    return 'linkButton';
  }

  /**
   * getSubmitButtonClassName method return className
   * of submit button as per students optIn/optOut mark or not.
   * @return {string} className
   */
  getSubmitButtonClassName() {

    const { selectedOptOption } = this.state;

    if (isEmpty(selectedOptOption)) {
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
   * as per selected students optIn/optOut marked successfully.
   * otherwise render failed message
   * @return {HTML} message
   */
  renderMessage() {

    const { isMarkOptOutOrOptInSuccess, isMarkOptOutOrOptInFailed } = this.props;

    if (isMarkOptOutOrOptInSuccess) {
      return (
        <div className="success-block">
          <span>{OPT_IN_OR_OPT_OUT_SUCCESS_MESSAGE}</span>
        </div>
      );

    } else if (!isMarkOptOutOrOptInSuccess && isMarkOptOutOrOptInFailed) {
      return (
        <div className="upload-message-wrapper">
          <div className="failure-block">
            <span>
              {OPT_IN_OR_OPT_OUT_FAILED_MESSAGE}
            </span>
          </div>
        </div>
      );
    }
    return null;
  }

  /**
   * onClickRadioButton method set the value of optIn2019 onChange of radio button.
   * @param {Object} event
   */
  onClickRadioButton({ formData }) {
    this.setState({
      selectedOptOption: { 'optIn2019': formData.selectedOptOption },
    });
  }

  /**
   * onFormSubmit method call on submission of selected student optIn/optOut
   * @param {Object} event
   */
  onFormSubmit(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    const { studentIds, selectedOptOption } = this.state;
    const { secretKey } = this.props;

    this.props.markSelectedStudentsOptInOrOptOutAction({
      secretKey,
      selectedStudentsId: studentIds,
      opt: selectedOptOption,
    });
  }

  /**
   * renderMarkSelectedStudentsOptInOrOptOutModal method render
   * mark selected students optIn/optOut modal
   * @return {HTML} modal
   */
  renderMarkSelectedStudentsOptInOrOptOutModal() {
    const uiSchema = {
      ...MarkOptInOrOptOutButtonJsonSchema.UISchema,
      close: {
        ...MarkOptInOrOptOutButtonJsonSchema.UISchema.close,
        'ui:widget': () => (
          <button
            className="button-modal button-close"
            onClick={this.closeMarkSelectedStudentsOptInOrOptOutModal}
          >Close
          </button>
        ),
      },
      submit: {
        ...MarkOptInOrOptOutButtonJsonSchema.UISchema.submit,
        // 'classNames': this.getSubmitButtonClassName(),
        'ui:widget': () => (
          <button
            className={this.getSubmitButtonClassName()}
            type="submit"
          >
            Submit
          </button>

        ),
      },
    };
    const { isMarkSelectedStudentsOptInOrOptOutModalOpen, studentIds, selectedOptOption } = this.state;

    if (isMarkSelectedStudentsOptInOrOptOutModalOpen) {
      return (
        <Modal
          isOpen={isMarkSelectedStudentsOptInOrOptOutModalOpen}
          onRequestClose={this.closeMarkSelectedStudentsOptInOrOptOutModal}
          style={customSelectedStudentsOptInOrOptOutStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
          ariaHideApp={false}
        >
          <div className="column-group-wrapper">
            <Form
              showErrorList={false}
              liveValidate
              schema={MarkOptInOrOptOutButtonJsonSchema.Schema}
              uiSchema={uiSchema}
              formData={{ studentIds, selectedOptOption: selectedOptOption.optIn2019 }}
              onChange={this.onClickRadioButton}
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
          className={this.renderMarkOptInOrOutClassName()}
          onClick={this.openMarkSelectedStudentsOptInOrOptOutModal}
        >
          <i className="fa fa-info-circle card-icon" />
          Mark Opt In / Out
        </button>
        {this.renderMarkSelectedStudentsOptInOrOptOutModal()}
      </div>
    );
  }
}

MarkOptInOrOptOutButton.propTypes = {
  clearSelectedStudents: PropTypes.func,
  isMarkOptOutOrOptInFailed: PropTypes.bool,
  isMarkOptOutOrOptInSuccess: PropTypes.bool,
  markSelectedStudentsOptInOrOptOutAction: PropTypes.func,
  resetIsMarkOptInOrOptOutSuccessAction: PropTypes.func,
  secretKey: PropTypes.string,
  selectedStudents: PropTypes.array,
};

MarkOptInOrOptOutButton.defaultProps = {
  clearSelectedStudents: () => {},
  isMarkOptOutOrOptInFailed: false,
  isMarkOptOutOrOptInSuccess: false,
  markSelectedStudentsOptInOrOptOutAction: () => {},
  resetIsMarkOptInOrOptOutSuccessAction: () => {},
  secretKey: '',
  selectedStudents: [],
};

const mapStateToProps = state => ({
  isMarkOptOutOrOptInFailed: isMarkOptInOrOptOutFailed(state),
  isMarkOptOutOrOptInSuccess: isMarkOptInOrOptOutSuccess(state),
  secretKey: getSecretKey(state),
});

export default connect(mapStateToProps, {
  markSelectedStudentsOptInOrOptOutAction,
  resetIsMarkOptInOrOptOutSuccessAction,
}, null, { pure: false })(MarkOptInOrOptOutButton);

