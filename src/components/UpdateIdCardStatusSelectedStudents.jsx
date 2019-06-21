import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import * as shortId from 'shortid';

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
  ID_CARD_PRINT_STATUS_FOR_SELECTED_STUDENTS_LABEL,
} from '../constants/label';
import {
  UPDATED_ID_CARD_STATUS_SUCCESS_MESSAGE,
  UPDATED_ID_CARD_STATUS_FAILED_MESSAGE,
  ENTER_ID_NUMBER_MESSAGE,
  ENTER_SECRET_CODE_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../constants/messages';
import { ID_NUMBER_TEXT, SECRET_CODE_TEXT } from '../constants/text';
import Form from './Form';

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

const formDetail = {
  Schema: {
    'title': ID_CARD_PRINT_STATUS_FOR_SELECTED_STUDENTS_LABEL,
    'type': 'object',
    'properties': {
      'studentsId': {
        'title': 'Selected Students Id:',
        'type': 'array',
        'items': {
          'type': 'string',
        },
      },
      'selectedCardOption': {
        'type': 'string',
        'oneOf': [
          {
            'title': 'Reprint',
            'const': 'Y',
          },
          {
            'title': 'Not Print',
            'const': 'N',
          },
        ],
      },
      'Close': {
        'type': 'string',
      },
      'Submit': {
        'type': 'string',
      },
    },
    'required': ['studentsId', 'selectedCardOption'],
  },
  UISchema: {
    'ui:order': ['studentsId',
      'selectedCardOption',
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
    'selectedCardOption': {
      'ui:options': {
        'label': false,
      },
      'ui:widget': 'radio',
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
 * UpdateIdCardStatusSelectedStudents render modal of update Id cards of selected students.
 * @type {Class}
 */
class UpdateIdCardStatusSelectedStudents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      studentsId: [],
      selectedCardOption: '',
      isUpdateSelectedStudentsOptInOrOptOutModalOpen: false,
    };

    this.openUpdateIdCardStatusSelectedStudentsModal = this.openUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.closeUpdateIdCardStatusSelectedStudentsModal = this.closeUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.onClickRadioButton = this.onClickRadioButton.bind(this);
    this.renderUpdateIdCardStatusSelectedStudentsModal = this.renderUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.filterIdsOfStudents = this.filterIdsOfStudents.bind(this);
    this.renderIdCardStatusButtonClassName = this.renderIdCardStatusButtonClassName.bind(this);
    this.renderSubmitButtonClassName = this.renderSubmitButtonClassName.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /**
   * openUpdateIdCardStatusSelectedStudentsModal method set
   * isUpdateSelectedStudentsOptInOrOptOutModalOpen to true
   */
  openUpdateIdCardStatusSelectedStudentsModal() {
    this.setState({
      isUpdateSelectedStudentsOptInOrOptOutModalOpen: true,
    });
    this.filterIdsOfStudents();
  }

  /**
   * closeUpdateIdCardStatusSelectedStudentsModal method set
   * isUpdateSelectedStudentsOptInOrOptOutModalOpen to false
   * and selectedCardOption to empty string
   */
  closeUpdateIdCardStatusSelectedStudentsModal() {
    this.setState({
      isUpdateSelectedStudentsOptInOrOptOutModalOpen: false,
      selectedCardOption: '',
    });
    this.props.resetIsUpdateIdCardStatusSuccessAction();
  }

  /**
   * renderSubmitButtonClassName return class name of submit button
   * @return {string} class name
   */
  renderSubmitButtonClassName() {

    const { selectedCardOption } = this.state;
    if (isEmpty(selectedCardOption)) {
      return 'display-inline linkButton btn-upload'; // 'popup-buttons-disable';
    }
    return 'display-inline linkButton btn-upload';
  }

  /**
   * filterIdsOfStudents method set the selected students Id into studentId Array
   */
  filterIdsOfStudents() {

    const { selectedStudents } = this.props;
    const Ids = selectedStudents.map(student => String(student.studentId));

    this.setState({
      studentsId: Ids,
    });
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
   * @return {*} message
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
   */
  onFormSubmit() {
    const { secretKey } = this.props;
    const { studentsId, selectedCardOption } = this.state;

    this.props.updateIdCardStatusSelectedStudentsAction({
      secretKey,
      selectedStudentsId: studentsId,
      IdCardStatus: selectedCardOption,
    });
  }

  /**
   * renderUpdateIdCardStatusSelectedStudentsModal method render
   * the modal of update Id card status of selected students.
   * @return {*} modal
   */
  renderUpdateIdCardStatusSelectedStudentsModal() {
    const uiSchema = {
      ...formDetail.UISchema,
      Close: {
        ...formDetail.UISchema.Close,
        'ui:widget': () => (
          <button
            className="button-modal button-close"
            onClick={this.closeUpdateIdCardStatusSelectedStudentsModal}
          >Close
          </button>
        ),
      },
      Submit: {
        ...formDetail.UISchema.Submit,
        // 'classNames': this.renderSubmitButtonClassName(),
        'ui:widget': () => (
          <button
            className={this.renderSubmitButtonClassName()}
            type="submit"
          >
            Submit
          </button>
        ),
      },
    };
    const { isUpdateSelectedStudentsOptInOrOptOutModalOpen, studentsId, selectedCardOption } = this.state;

    if (isUpdateSelectedStudentsOptInOrOptOutModalOpen) {
      return (
        <Modal
          isOpen={isUpdateSelectedStudentsOptInOrOptOutModalOpen}
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
              noHtml5Validate
              liveValidate
              schema={formDetail.Schema}
              uiSchema={uiSchema}
              formData={
                { studentsId,
                  selectedCardOption: selectedCardOption.printStatus,
                }}
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

