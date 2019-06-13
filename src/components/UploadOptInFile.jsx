import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import {
  uploadOptInFileAction,
  resetIsOptInSuccessAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
  isOptInSuccess,
  getFailOptIn,
  isUploadOptInFailed,
  unavailableIdErrorMessage,
} from '../reducers/studentRegistrationReducer';
import {
  OPT_IN_FILE_UPLOAD_SUCCESS_MESSAGE,
  OPT_IN_FILE_UPLOAD_FAILURE_MESSAGE,
} from '../constants/messages';
import {
  UPLOAD_FILE_TEXT,
} from '../constants/text';

const customUploadOptInFileModalStyles = {
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
 * UploadOptInFile render upload optIn file modal
 * @type {Class}
 */
class UploadOptInFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optInFile: null,
      isUploadOptInFileModalOpen: false,
      isFormSubmitted: false,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderFailOptIn = this.renderFailOptIn.bind(this);
    this.optionUploadOptInFileModal = this.optionUploadOptInFileModal.bind(this);
    this.closeUploadOptInFileModal = this.closeUploadOptInFileModal.bind(this);
    this.renderUploadOptInModal = this.renderUploadOptInModal.bind(this);
    this.renderUploadButtonClassName = this.renderUploadButtonClassName.bind(this);
    this.renderIdNotPresentMessage = this.renderIdNotPresentMessage.bind(this);
  }

  /**
   * optionUploadOptInFileModal method set isUploadOptInFileModalOpen to true
   */
  optionUploadOptInFileModal() {
    this.setState({ isUploadOptInFileModalOpen: true });
  }

  /**
   * closeUploadOptInFileModal method set isUploadOptInFileModalOpen to false
   * and to reset IsOptIn it call resetIsOptInSuccessAction action
   */
  closeUploadOptInFileModal() {
    this.setState({ isUploadOptInFileModalOpen: false });
    this.props.resetIsOptInSuccessAction();
    this.setState({
      optInFile: null,
      isFormSubmitted: false,
    });
  }

  /**
   * renderUploadButtonClassName method return the class name of Upload button
   * @return {string} class name
   */
  renderUploadButtonClassName() {
    const { optInFile } = this.state;
    if (!optInFile) {
      return 'popup-buttons-disable';
    }
    return 'btn-upload linkButton';
  }

  /**
   * onFormSubmit method set isFormSubmitted to true
   * and call fileUpload method
   * @param {Object} event
   */
  onFormSubmit(event) {
    const { optInFile } = this.state;
    event.preventDefault();
    this.fileUpload(optInFile);
    this.setState({
      isFormSubmitted: true,
    });
  }

  /**
   * onChange method set optIn file in optInFile
   * when browse the file.
   * @param {Object} event
   */
  onChange(event) {
    this.setState({ optInFile: event.target.files[0] });
  }

  /**
   * fileUpload method upload optIn file by calling uploadOptInFileAction action
   * @param {Array} optInFile
   */
  fileUpload(optInFile) {
    const { secretKey } = this.props;
    this.props.uploadOptInFileAction(secretKey, optInFile);
  }

  /**
   * renderFailOptIn method render failed records Ids
   * @return {*} failed records
   */
  renderFailOptIn() {
    const { failOptIn } = this.props;
    if (failOptIn) {
      return (
        <div className="failure-block">
          Failed Records are:
          <div className="failure-block-records">{failOptIn}</div>
        </div>
      );
    }
    return null;
  }

  /**
   * renderIdNotPresentMessage method render unavailable Id error message
   * @return {*} not present Id's
   */
  renderIdNotPresentMessage() {
    if (this.props.unavailableIdErrorMessage) {
      return (
        <div className="failure-block">
          <div className="failure-block-records">{this.props.unavailableIdErrorMessage}</div>
        </div>
      );
    }
    return null;
  }

  /**
   * renderMessage method render success or failure message of upload optIn file
   * @return {*} message
   */
  renderMessage() {
    if (this.props.isOptInSuccess) {
      return (
        <div className="upload-message-wrapper">
          <div className="success-block">
            <span>
              {OPT_IN_FILE_UPLOAD_SUCCESS_MESSAGE}
            </span>
          </div>
          {this.renderFailOptIn()}
          {this.renderIdNotPresentMessage()}
        </div>
      );
    } else if (!this.props.isOptInSuccess && this.props.isUploadOptInFailed) {
      return (
        <div className="upload-message-wrapper">
          <div className="failure-block">
            <span>
              {OPT_IN_FILE_UPLOAD_FAILURE_MESSAGE}
            </span>
          </div>
        </div>
      );
    }
    return null;
  }

  /**
   * renderUploadOptInModal method render upload optIn modal
   * @return {*} modal
   */
  renderUploadOptInModal() {
    const { isUploadOptInFileModalOpen, isFormSubmitted } = this.state;
    if (isUploadOptInFileModalOpen) {
      return (
        <Modal
          isOpen={isUploadOptInFileModalOpen}
          onRequestClose={this.closeUploadOptInFileModal}
          style={customUploadOptInFileModalStyles}
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
                  {this.renderMessage()}
                </div>
              </div>
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button
                    className="button-modal button-close"
                    onClick={this.closeUploadOptInFileModal}
                  >Close
                  </button>
                  <button
                    type="submit"
                    className={this.renderUploadButtonClassName()}
                    disabled={isFormSubmitted}
                  >
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
        <button className="column-option-container" title="Upload Opt In" onClick={this.optionUploadOptInFileModal}>
          <i className="fa fa-upload card-icon" />
          Upload Opt In
        </button>
        {this.renderUploadOptInModal()}
      </div>
    );
  }
}

UploadOptInFile.propTypes = {
  failOptIn: PropTypes.string,
  isOptInSuccess: PropTypes.bool,
  isUploadOptInFailed: PropTypes.bool,
  resetIsOptInSuccessAction: PropTypes.func,
  secretKey: PropTypes.string,
  unavailableIdErrorMessage: PropTypes.string,
  uploadOptInFileAction: PropTypes.func,
};

UploadOptInFile.defaultProps = {
  failOptIn: '',
  isOptInSuccess: false,
  isUploadOptInFailed: false,
  resetIsOptInSuccessAction: () => {},
  secretKey: '',
  unavailableIdErrorMessage: '',
  uploadOptInFileAction: () => {},
};

const mapStateToProps = state => ({
  failOptIn: getFailOptIn(state),
  isOptInSuccess: isOptInSuccess(state),
  isUploadOptInFailed: isUploadOptInFailed(state),
  secretKey: getSecretKey(state),
  unavailableIdErrorMessage: unavailableIdErrorMessage(state),
});

export default connect(mapStateToProps, {
  resetIsOptInSuccessAction,
  uploadOptInFileAction,
})(UploadOptInFile);
