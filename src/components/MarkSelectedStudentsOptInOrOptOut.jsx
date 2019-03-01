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
  isMarkOptInOrOptOutFailed,
  isMarkOptInOrOptOutSuccess,
} from '../reducers/studentRegistrationReducer';

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
 * MarkSelectedStudentsOptInOrOptOut component render mark selected student optIn or optOut modal
 * @type {Class}
 */
class MarkSelectedStudentsOptInOrOptOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsId: [],
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
    this.renderSubmitButtonClassName = this.renderSubmitButtonClassName.bind(this);
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
   */
  closeMarkSelectedStudentsOptInOrOptOutModal() {
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
    const Ids = this.props.selectedStudents.map(student => String(student.studentId));
    this.setState({
      studentsId: Ids,
    });
  }
  /**
   * renderMarkOptInOrOutClassName method return className
   * of mark optIn/optOut button as per students are selected or not.
   * @return {string} className
   */
  renderMarkOptInOrOutClassName() {
    if (isEmpty(this.props.selectedStudents)) {
      return 'disable-link-button-new';
    }
    return 'linkButton';
  }
  /**
   * renderSubmitButtonClassName method return className
   * of submit button as per students optIn/optOut mark or not.
   * @return {string} className
   */
  renderSubmitButtonClassName() {
    if (isEmpty(this.state.selectedOptOption)) {
      return 'popup-buttons-disable';
    }
    return 'btn-upload linkButton';
  }
  /**
   * renderMessage method render success message
   * as per selected students optIn/optOut marked.
   * @return {ReactComponent}
   */
  renderMessage() {
    if (this.props.isMarkOptInOrOptOutSuccess) {
      return (
        <div className="success-block">
          <span>चयनित छात्रो की optin या optout सफलतापूवर्क अद्यतन कर दी गयी है|</span>
        </div>
      );
    } else if (this.props.isMarkOptInOrOptOutFailed) {
      return (
        <div className="failure-block">
          <span>चयनित छात्रो की optin या optout असफल रही|</span>
        </div>
      );
    }
    return null;
  }

  /**
   * onClickRadioButton method set the value of optIn2019 onChange of radio button.
   * @param {Object} event
   */
  onClickRadioButton(event) {
    this.setState({
      selectedOptOption: { 'optIn2019': event.target.value },
    });
  }
  /**
   * onFormSubmit method call on submission of selected student optIn/optOut
   * @param {Object} event
   */
  onFormSubmit(event) {
    event.preventDefault();
    this.props.markSelectedStudentsOptInOrOptOutAction(this.props.secretKey, this.state.studentsId, this.state.selectedOptOption);
  }

  renderModalForm = () => {
    if (this.props.isMarkOptInOrOptOutSuccess || this.props.isMarkOptInOrOptOutFailed) {
      return (
        <form onSubmit={this.onFormSubmit}>
          <div className="column-modal">
            <h1 className="column-modal-container">चयनित छात्रों की शिविर के लिए हाँ या ना दर्ज़ करने की स्थिति</h1>
          </div>
          <div className="column-content-modal">
            {this.renderMessage()}
          </div>
          <div className="modal-save-container">
            <div className="save-button-wrapper">
              <button
                className="button-modal button-close"
                onClick={this.closeMarkSelectedStudentsOptInOrOptOutModal}
              >Close
              </button>
            </div>
          </div>
        </form>
      );
    }
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="column-modal">
          <h1 className="column-modal-container">कृपया चयनित छात्रों की शिविर के लिए हाँ या ना दर्ज़ करें</h1>
        </div>
        <div className="column-content-modal">
          <div className="selected-student-heading">
            <span>Selected Students Id: </span>
            <div className="selected-student-wrapper-id">
              {
                this.state.studentsId.map(student =>
                  <span className="selected-students-Id">{student}</span>)
              }
            </div>
          </div>
          <div className="advance-input-radio advance-input-print-later">
            <div className="input-radio-container">
              <input type="radio" name="OptInOrOptOut" value="Y" onClick={this.onClickRadioButton} />
              <label htmlFor="Opt-In">हाँ</label>
            </div>
            <div className="input-radio-container">
              <input type="radio" name="OptInOrOptOut" value="N" onClick={this.onClickRadioButton} />
              <label htmlFor="Opt-Out">ना</label>
            </div>
          </div>
          {this.renderMessage()}
        </div>
        <div className="modal-save-container">
          <div className="save-button-wrapper">
            <button
              className="button-modal button-close"
              onClick={this.closeMarkSelectedStudentsOptInOrOptOutModal}
            >Close
            </button>
            <button
              className={this.renderSubmitButtonClassName()}
              type="submit"
              disabled={this.state.selectedOptOption === ''}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  };

  /**
   * renderMarkSelectedStudentsOptInOrOptOutModal method render
   * mark selected students optIn/optOut modal
   * @return {ReactComponent}
   */
  renderMarkSelectedStudentsOptInOrOptOutModal() {
    if (this.state.isMarkSelectedStudentsOptInOrOptOutModalOpen) {
      return (
        <Modal
          isOpen={this.state.isMarkSelectedStudentsOptInOrOptOutModalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeMarkSelectedStudentsOptInOrOptOutModal}
          style={customSelectedStudentsOptInOrOptOutStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
        >
          <div className="column-group-wrapper">
            {this.renderModalForm()}
          </div>
        </Modal>
      );
    }
    return null;
  }
  render() {
    return (
      <div className="buttonContainer button-container-mobile">
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

MarkSelectedStudentsOptInOrOptOut.propsType = {
  resetIsMarkOptInOrOptOutSuccessAction: PropTypes.func,
  selectedStudents: PropTypes.array,
  isMarkOptInOrOptOutSuccess: PropTypes.bool,
  isMarkOptInOrOptOutFailed: PropTypes.bool,
  markSelectedStudentsOptInOrOptOutAction: PropTypes.func,
  secretKey: PropTypes.string,
  clearSelectedStudents: PropTypes.func,
};
MarkSelectedStudentsOptInOrOptOut.defaultProps = {
  resetIsMarkOptInOrOptOutSuccessAction: () => {},
  selectedStudents: [],
  markSelectedStudentsOptInOrOptOutAction: () => {},
  secretKey: '',
  clearSelectedStudents: () => {},
};
const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isMarkOptInOrOptOutSuccess: isMarkOptInOrOptOutSuccess(state),
  isMarkOptInOrOptOutFailed: isMarkOptInOrOptOutFailed(state),
});

export default connect(mapStateToProps, {
  resetIsMarkOptInOrOptOutSuccessAction,
  markSelectedStudentsOptInOrOptOutAction,
}, null, { pure: false })(MarkSelectedStudentsOptInOrOptOut);

