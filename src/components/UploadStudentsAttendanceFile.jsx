import React, { Component } from 'react';
import Modal from 'react-modal';

import { uploadStudentsAttendanceFileAction, resetIsSuccessAction } from '../actions/studentRegistrationActions';
import { connect } from 'react-redux';
import { getSecretKey, getSuccess, getFailRecordIds } from '../reducers/studentRegistrationReducer';
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

class UploadStudentsAttendanceFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attendanceFile: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.renderFailRecordIds = this.renderFailRecordIds.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.attendanceFile);
  }

  onChange(e) {
    this.setState({attendanceFile: e.target.files[0]})
  }

  fileUpload(attendanceFile) {
    this.props.uploadStudentsAttendanceFileAction(this.props.secretKey, attendanceFile);
  }
  closePopup(){
    this.props.resetIsSuccessAction();
    this.props.closeUploadStudentsAttendanceFileOption();
  }
  renderFailRecordIds(){
    if(this.props.failRecordIds){
      return(<div>
        Failed Records are:
        <div>{this.props.failRecordIds}</div>
      </div>);
    }
  }
  renderMessage(){
    if(this.props.isSuccess){
      return<div>
        Upload students attendance file is success
        {this.renderFailRecordIds()}
        <button onClick = {() => this.closePopup()}>OK</button>
      </div>
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.UploadStudentsAttendanceFileOptionIsOption}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.closeUploadStudentsAttendanceFileOption}
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
                      onClick={this.props.closeUploadStudentsAttendanceFileOption}>Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isSuccess: getSuccess(state),
  failRecordIds: getFailRecordIds(state),
});

export default connect(mapStateToProps, {
  uploadStudentsAttendanceFileAction,
  resetIsSuccessAction,
})(UploadStudentsAttendanceFile);

