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
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../constants/messages';
import Form from './form';
import { UploadOptInFileJsonSchema } from '../config/fromJsonSchema.json';

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
      formFieldDate: {},
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
      formFieldDate: {},
      isFormSubmitted: false,
    });
  }

  /**
   * renderUploadButtonClassName method return the class name of Upload button
   * @return {string} class name
   */
  renderUploadButtonClassName() {

    const { optInFile } = this.state.formFieldDate;

    if (!optInFile) {
      return 'btn-upload linkButton'; // 'popup-buttons-disable';
    }
    return 'btn-upload linkButton';
  }

  /**
   * onFormSubmit method set isFormSubmitted to true
   * and call fileUpload method
   */
  onFormSubmit() {
    const { optInFile } = this.state.formFieldDate;

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
    this.setState({
      formFieldDate: {
        ...this.state.formFieldDate,
        optInFile: event.target.files[0],
      },
    });
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
   * @return {HTML} failed records
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
   * @return {HTML} not present Id's
   */
  renderIdNotPresentMessage() {

    const { errorMessageOfUnavailableId } = this.props;

    if (errorMessageOfUnavailableId) {
      return (
        <div className="failure-block">
          <div className="failure-block-records">{errorMessageOfUnavailableId}</div>
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
   * renderMessage method render success or failure message of upload optIn file
   * @return {HTML} message
   */
  renderMessage() {

    const { isSuccessOptIn, isOptInUploadFailed } = this.props;

    if (isSuccessOptIn) {
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

    } else if (!isSuccessOptIn && isOptInUploadFailed) {
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
   * @return {HTML} modal
   */
  renderUploadOptInModal() {
    const uiSchema = {
      ...UploadOptInFileJsonSchema.UISchema,
      optInFile: {
        ...UploadOptInFileJsonSchema.UISchema.optInFile,
        'ui:widget': () => (
          <input
            type="file"
            onChange={this.onChange}
            className="choose-file-wrapper"
          />
        ),
      },
      close: {
        ...UploadOptInFileJsonSchema.UISchema.close,
        'ui:widget': () => (
          <button
            className="button-modal button-close"
            onClick={this.closeUploadOptInFileModal}
          >Close
          </button>
        ),
      },
      submit: {
        ...UploadOptInFileJsonSchema.UISchema.submit,
        'ui:widget': () => (
          <button
            type="submit"
            className={this.renderUploadButtonClassName()}
            // disabled={this.state.isFormSubmitted}
          >
            <i className="fa fa-file-text card-icon" />
            Upload
          </button>

        ),
      },
    };
    const { isUploadOptInFileModalOpen } = this.state;
    const { optInFile } = this.state.formFieldDate;

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
            <Form
              showErrorList={false}
              liveValidate
              schema={UploadOptInFileJsonSchema.Schema}
              uiSchema={uiSchema}
              formData={{ optInFile }}
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
  isSuccessOptIn: PropTypes.bool,
  isOptInUploadFailed: PropTypes.bool,
  resetIsOptInSuccessAction: PropTypes.func,
  secretKey: PropTypes.string,
  errorMessageOfUnavailableId: PropTypes.string,
  uploadOptInFileAction: PropTypes.func,
};

UploadOptInFile.defaultProps = {
  failOptIn: '',
  isSuccessOptIn: false,
  isOptInUploadFailed: false,
  resetIsOptInSuccessAction: () => {},
  secretKey: '',
  errorMessageOfUnavailableId: '',
  uploadOptInFileAction: () => {},
};

const mapStateToProps = state => ({
  failOptIn: getFailOptIn(state),
  isSuccessOptIn: isOptInSuccess(state),
  isOptInUploadFailed: isUploadOptInFailed(state),
  secretKey: getSecretKey(state),
  errorMessageOfUnavailableId: unavailableIdErrorMessage(state),
});

export default connect(mapStateToProps, {
  resetIsOptInSuccessAction,
  uploadOptInFileAction,
})(UploadOptInFile);
