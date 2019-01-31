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
      attendanceFile: null,
      UploadStudentsAttendanceFileOptionIsOption: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.renderFailRecordIds = this.renderFailRecordIds.bind(this);
    this.optionUploadStudentsAttendanceFileOption = this.optionUploadStudentsAttendanceFileOption.bind(this);
    this.closeUploadStudentsAttendanceFileOption = this.closeUploadStudentsAttendanceFileOption.bind(this);
    this.renderUploadStudentsAttendanceOption = this.renderUploadStudentsAttendanceOption.bind(this);
  }

  optionUploadStudentsAttendanceFileOption() {
    this.setState({UploadStudentsAttendanceFileOptionIsOption: true});
  }
  closeUploadStudentsAttendanceFileOption() {
    this.setState({UploadStudentsAttendanceFileOptionIsOption: false});
    this.props.resetIsSuccessAction();
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
    this.closeUploadStudentsAttendanceFileOption();
  }
  renderFailRecordIds(){
    if(this.props.failRecordIds){
      return(
        <div className="failure-block">
        Failed Records are:
        <div className="failure-block-records">{this.props.failRecordIds}</div>
      </div>);
    }
  }
  renderMessage(){
    if(this.props.isSuccess){
      return(
        <div className="upload-message-wrapper">
          <div className="success-block">
            {/*Upload students attendance file is success*/}
            छात्रों की उपस्तिथि फाइल सफलतापूवक अपलोड कर दी गयी है |
          </div>
          {this.renderFailRecordIds()}
          <button onClick = {() => { this.closePopup() }} className="tiny-btn linkButton display-none">
            OK
          </button>
        </div>
      );
    }
  }
  renderUploadStudentsAttendanceOption() {
    if (this.state.UploadStudentsAttendanceFileOptionIsOption) {
      return (
        <Modal
          isOpen={this.state.UploadStudentsAttendanceFileOptionIsOption}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeUploadStudentsAttendanceFileOption}
          style={customColumnOptionStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
        >
          <div className="column-group-wrapper">
            <div className="column-modal">
              <h1 className="column-modal-container">कृपिया फाइल को अपलोड करे </h1>
            </div>
            <form onSubmit={this.onFormSubmit} className="upload-form-wrapper">
              <div>
                <div className="padding-20-30">
                  <input type="file" onChange={this.onChange} className="choose-file-wrapper"/>
                  <button type="submit" className="display-inline linkButton btn-upload">
                    <i className="fa fa-file-text card-icon"/>
                    Upload
                  </button>
                  {this.renderMessage()}
                </div>
              </div>
            </form>
            <div className="modal-save-container">
              <div className="save-button-wrapper">
                <button className="button-modal button-close"
                        onClick={this.closeUploadStudentsAttendanceFileOption}>Cancel
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
      <div className="display-inline mar-right-10">
      <button className="column-option-container" onClick={this.optionUploadStudentsAttendanceFileOption}>
        Upload Attendance
      </button>
        {this.renderUploadStudentsAttendanceOption()}
      </div>
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

