import React, { Component } from 'react';
import Modal from 'react-modal';

import { uploadOptInFileAction, resetIsOptInSuccessAction } from '../actions/studentRegistrationActions';
import { connect } from 'react-redux';
import { getSecretKey, isOptInSuccess, getFailOptIn } from '../reducers/studentRegistrationReducer';
const customUploadOptInFileModalStyles = {
  overlay: {
    zIndex: '999',
    backgroundColor: 'rgba(21, 20, 20, 0.75)'
  },
  content: {
    top: '50%',
    position: 'absolute',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(205, 68, 3)',
    boxShadow: 'rgb(99, 99, 99) 0px 2.3px 3px 0px',
    padding:'0px !important',
    marginRight: '-50%',
    width: '45%',
    outline: 'none',
    transform: 'translate(-50%, -50%)'
  }
};

class UploadOptInFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optInFile: null,
      isUploadOptInFileModalOpen: false,
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
  }

  optionUploadOptInFileModal() {
    this.setState({isUploadOptInFileModalOpen: true});
  }
  closeUploadOptInFileModal() {
    this.setState({isUploadOptInFileModalOpen: false});
    this.props.resetIsOptInSuccessAction();
    this.setState({
      optInFile: null,
    });
  }
  renderUploadButtonClassName(){
    if(!this.state.optInFile) {
      return "popup-buttons-disable";
    }
    else {
      return "btn-upload linkButton";
    }
  }
  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.optInFile);
  }

  onChange(e) {
    this.setState({optInFile: e.target.files[0]})
  }

  fileUpload(optInFile) {
    this.props.uploadOptInFileAction(this.props.secretKey, optInFile);
  }
  renderFailOptIn(){
    if(this.props.failOptIn){
      return(
        <div className="failure-block">
          Failed Records are:
          <div className="failure-block-records">{this.props.failOptIn}</div>
        </div>
      );
    }
  }
  renderMessage(){
    if(this.props.isOptInSuccess){
      return(
        <div className="upload-message-wrapper">
          <div className="success-block">
           <span>
             छात्रों की optin file सफलतापूवर्क अपलोड कर दी गयी है|
           </span>
          </div>
          {this.renderFailOptIn()}
        </div>
      );
    }
  }
  renderUploadOptInModal() {
    if (this.state.isUploadOptInFileModalOpen) {
      return (
        <Modal
          isOpen={this.state.isUploadOptInFileModalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeUploadOptInFileModal}
          style={customUploadOptInFileModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
        >
          <div className="column-group-wrapper">
            <div className="column-modal">
              <h1 className="column-modal-container">कृपिया फाइल को अपलोड करे</h1>
            </div>
            <form onSubmit={this.onFormSubmit} className="upload-form-wrapper">
              <div>
                <div className="column-content-modal">
                  <input type="file" onChange={this.onChange} className="choose-file-wrapper"/>
                  {this.renderMessage()}
                </div>
              </div>
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button className="button-modal button-close"
                          onClick={this.closeUploadOptInFileModal}>Close
                  </button>
                  <button type="submit" className={this.renderUploadButtonClassName()}>
                    <i className="fa fa-file-text card-icon"/>
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
        <button className="column-option-container" onClick={this.optionUploadOptInFileModal}>
          <i className="fa fa-upload card-icon"/>
          Upload Opt In
        </button>
        {this.renderUploadOptInModal()}
      </div>
    );

  }
}
const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isOptInSuccess: isOptInSuccess(state),
  failOptIn: getFailOptIn(state),
});

export default connect(mapStateToProps, {
  uploadOptInFileAction,
  resetIsOptInSuccessAction,
})(UploadOptInFile);

