import React, { Component } from 'react';
import Modal from 'react-modal';

import { uploadOptInFileAction, resetIsOptinSuccessAction } from '../actions/studentRegistrationActions';
import { connect } from 'react-redux';
import { getSecretKey, isOptinSuccess, getFailOptin } from '../reducers/studentRegistrationReducer';
const customColumnOptionStyles = {
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

class UploadOptinFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optinFile: null,
      isUploadOptinFileModalOpen: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.renderFailOptin = this.renderFailOptin.bind(this);
    this.optionUploadOptinFileModal = this.optionUploadOptinFileModal.bind(this);
    this.closeUploadOptinFileModal = this.closeUploadOptinFileModal.bind(this);
    this.renderUploadOptinModal = this.renderUploadOptinModal.bind(this);
  }

  optionUploadOptinFileModal() {
    this.setState({isUploadOptinFileModalOpen: true});
  }
  closeUploadOptinFileModal() {
    this.setState({isUploadOptinFileModalOpen: false});
    this.props.resetIsOptinSuccessAction();
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.optinFile);
  }

  onChange(e) {
    this.setState({optinFile: e.target.files[0]})
  }

  fileUpload(optinFile) {
    this.props.uploadOptInFileAction(this.props.secretKey, optinFile);
  }
  closePopup(){
    this.props.resetIsOptinSuccessAction();
    this.closeUploadOptinFileModal();
  }
  renderFailOptin(){
    if(this.props.failOptin){
      return(
        <div>
          <label>Failed Records are:</label>
          <div>{this.props.failOptin}</div>
        </div>
      );
    }
  }
  renderMessage(){
    if(this.props.isOptinSuccess){
      return(
        <div>
          <label>Upload optin file is success</label>
          {this.renderFailOptin()}
          <button onClick = {() => this.closePopup()}>OK</button>
        </div>
      );
    }
  }
  renderUploadOptinModal() {
    if (this.state.isUploadOptinFileModalOpen) {
      return (
        <Modal
          isOpen={this.state.isUploadOptinFileModalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeUploadOptinFileModal}
          style={customColumnOptionStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
        >
          <div className="column-group-wrapper">
            <form onSubmit={this.onFormSubmit}>
              <h1>File Upload</h1>
              <input type="file" onChange={this.onChange}/>
              <button type="submit">Upload</button>
            </form>
            {this.renderMessage()}
            <div className="modal-save-container">
              <div className="save-button-wrapper">
                <button className="button-modal button-close"
                        onClick={this.closeUploadOptinFileModal}>Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      );
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.optionUploadOptinFileModal}>
          Upload Optin File
        </button>
        {this.renderUploadOptinModal()}
      </div>
    );

  }
}
const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isOptinSuccess: isOptinSuccess(state),
  failOptin: getFailOptin(state),
});

export default connect(mapStateToProps, {
  uploadOptInFileAction,
  resetIsOptinSuccessAction,
})(UploadOptinFile);

