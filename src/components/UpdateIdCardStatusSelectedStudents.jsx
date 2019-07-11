import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  resetIsUpdateIdCardStatusSuccessAction,
  updateIdCardStatusSelectedStudentsAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
  isUpdateIdCardStatusSuccess,
  isUpdateIdCardStatusFailed,
} from '../reducers/studentRegistrationReducer';

import {
  UPDATED_ID_CARD_STATUS_SUCCESS_MESSAGE,
  UPDATED_ID_CARD_STATUS_FAILED_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../constants/messages';
import Form from './form';
import { UpdateIdCardStatusSelectedStudentsJsonSchema } from '../config/fromJsonSchema.json';
import { extractStudentIds } from '../utils/dataGridUtils';

const customUpdateIdCardStatusSelectedStudentsModalStyles = {
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
 * TODO: Rename this component in future.
 */
/**
 * UpdateIdCardStatusSelectedStudents render modal of update Id cards of selected students.
 * @type {Class}
 */
class UpdateIdCardStatusSelectedStudents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      studentIds: [],
      selectedCardOption: '',
      isUpdateOptInModalOpen: false,
    };

    this.openUpdateIdCardStatusSelectedStudentsModal = this.openUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.closeUpdateIdCardStatusSelectedStudentsModal = this.closeUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.onClickRadioButton = this.onClickRadioButton.bind(this);
    this.renderUpdateIdCardStatusSelectedStudentsModal = this.renderUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderIdCardStatusButtonClassName = this.renderIdCardStatusButtonClassName.bind(this);
    this.getSubmitButtonClassName = this.getSubmitButtonClassName.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /**
   * openUpdateIdCardStatusSelectedStudentsModal method set
   * isUpdateOptInModalOpen to true
   */
  openUpdateIdCardStatusSelectedStudentsModal() {
    const { selectedStudents } = this.props;
    this.setState({
      isUpdateOptInModalOpen: true,
      studentIds: extractStudentIds({ selectedStudents }),
    });
  }

  /**
   * closeUpdateIdCardStatusSelectedStudentsModal method set
   * isUpdateOptInModalOpen to false
   * and selectedCardOption to empty string
   * @param {Object} event
   */
  closeUpdateIdCardStatusSelectedStudentsModal(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    this.setState({
      isUpdateOptInModalOpen: false,
      selectedCardOption: '',
    });
    this.props.resetIsUpdateIdCardStatusSuccessAction();
  }

  /**
   * getSubmitButtonClassName return class name of submit button
   * @return {string} class name
   */
  getSubmitButtonClassName() {

    const { selectedCardOption } = this.state;

    if (isEmpty(selectedCardOption)) {
      return 'display-inline linkButton btn-upload'; // 'popup-buttons-disable';
    }
    return 'display-inline linkButton btn-upload';
  }

  /**
   * renderIdCardStatusButtonClassName return the class name of Print Later button
   * @return {string} class name
   */
  renderIdCardStatusButtonClassName() {
    const { selectedStudents } = this.props;

    if (isEmpty(selectedStudents)) {
      return 'disable-link-button-new';
    }
    return 'linkButton';
  }

  /**
   * renderMessage method render the success or failed
   * message of update students Id card status
   * @return {HTML} message
   */
  renderMessage() {
    const { isIdCardUpdateStatusSuccess, isIdCardUpdateStatusFailed } = this.props;

    if (isIdCardUpdateStatusSuccess) {
      return (
        <div className="success-block">
          <span>{UPDATED_ID_CARD_STATUS_SUCCESS_MESSAGE}</span>
        </div>
      );
    } else if (!isIdCardUpdateStatusSuccess && isIdCardUpdateStatusFailed) {
      return (
        <div className="upload-message-wrapper">
          <div className="failure-block">
            <span>
              {UPDATED_ID_CARD_STATUS_FAILED_MESSAGE}
            </span>
          </div>
        </div>
      );
    }
    return null;
  }

  /**
   * transformErrors method return error message object
   * @return {Object} error message object
   */
  transformErrors = () => ({
    'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  });

  /**
   * onClickRadioButton method set the object with printStatus property value to selectedCardOption
   * @param {Object} event
   */
  onClickRadioButton = ({ formData }) => {
    this.setState({
      selectedCardOption: { 'printStatus': formData.selectedCardOption },
    });
  };

  /**
   * onFormSubmit method mark the selected students Id card status by
   * calling updateIdCardStatusSelectedStudentsAction action
   * @param {Object} event
   */
  onFormSubmit(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    const { secretKey } = this.props;
    const { studentIds, selectedCardOption } = this.state;

    this.props.updateIdCardStatusSelectedStudentsAction({
      secretKey,
      selectedStudentsId: studentIds,
      IdCardStatus: selectedCardOption,
    });
  }

  /**
   * renderUpdateIdCardStatusSelectedStudentsModal method render
   * the modal of update Id card status of selected students.
   * @return {HTML} modal
   */
  renderUpdateIdCardStatusSelectedStudentsModal() {
    const uiSchema = {
      ...UpdateIdCardStatusSelectedStudentsJsonSchema.uiSchema,
      close: {
        ...UpdateIdCardStatusSelectedStudentsJsonSchema.uiSchema.close,
        'ui:widget': () => (
          <button
            className="button-modal button-close"
            onClick={this.closeUpdateIdCardStatusSelectedStudentsModal}
          >Close
          </button>
        ),
      },
      submit: {
        ...UpdateIdCardStatusSelectedStudentsJsonSchema.uiSchema.submit,
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
    const { isUpdateOptInModalOpen, studentIds, selectedCardOption } = this.state;

    if (isUpdateOptInModalOpen) {
      return (
        <Modal
          isOpen={isUpdateOptInModalOpen}
          onRequestClose={this.closeUpdateIdCardStatusSelectedStudentsModal}
          style={customUpdateIdCardStatusSelectedStudentsModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
          ariaHideApp={false}
        >
          <div className="column-group-wrapper">
            <Form
              showErrorList={false}
              liveValidate
              schema={UpdateIdCardStatusSelectedStudentsJsonSchema.schema}
              uiSchema={uiSchema}
              formData={{ studentIds, selectedCardOption: selectedCardOption.printStatus }}
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
      <div className="button-container">
        <button
          className={this.renderIdCardStatusButtonClassName()}
          onClick={this.openUpdateIdCardStatusSelectedStudentsModal}
        >
          <i className="fa fa-print card-icon" />Print Later
        </button>
        {this.renderUpdateIdCardStatusSelectedStudentsModal()}
      </div>
    );
  }
}

UpdateIdCardStatusSelectedStudents.propTypes = {
  isIdCardUpdateStatusFailed: PropTypes.bool,
  isIdCardUpdateStatusSuccess: PropTypes.bool,
  resetIsUpdateIdCardStatusSuccessAction: PropTypes.func,
  secretKey: PropTypes.string,
  selectedStudents: PropTypes.array,
  updateIdCardStatusSelectedStudentsAction: PropTypes.func,
};

UpdateIdCardStatusSelectedStudents.defaultProps = {
  isIdCardUpdateStatusFailed: false,
  isIdCardUpdateStatusSuccess: false,
  resetIsUpdateIdCardStatusSuccessAction: () => {},
  secretKey: '',
  selectedStudents: [],
  updateIdCardStatusSelectedStudentsAction: () => {},
};

const mapStateToProps = state => ({
  isIdCardUpdateStatusFailed: isUpdateIdCardStatusFailed(state),
  isIdCardUpdateStatusSuccess: isUpdateIdCardStatusSuccess(state),
  secretKey: getSecretKey(state),
});

export default connect(mapStateToProps, {
  resetIsUpdateIdCardStatusSuccessAction,
  updateIdCardStatusSelectedStudentsAction,
}, null, { pure: false })(UpdateIdCardStatusSelectedStudents);

