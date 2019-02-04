import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import {
  resetIsMarkOptInOrOptOutSuccessAction,
  markSelectedStudentsOptInOrOptOutAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
  isMarkOptInOrOptOutSuccess,
} from '../reducers/studentRegistrationReducer';
import isEmpty from 'lodash/isEmpty';
const customSelectedStudentsOptInOrOptOutStyles = {
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

class MarkSelectedStudentsOptInOrOptOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsId:[],
      selectedOptOption:'',
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
  };
  openMarkSelectedStudentsOptInOrOptOutModal() {
    this.setState({
      isMarkSelectedStudentsOptInOrOptOutModalOpen: true,
    });
    this.filterIdsOfStudents();
  }
  closeMarkSelectedStudentsOptInOrOptOutModal() {
    this.setState({
      isMarkSelectedStudentsOptInOrOptOutModalOpen: false,
    });
    this.props.resetIsMarkOptInOrOptOutSuccessAction();
  }
  renderSubmitButtonClassName(){
    if(isEmpty(this.state.selectedOptOption)) {
      return "popup-buttons-disable";
    }
    else {
      return "btn-upload linkButton";
    }
  }
  filterIdsOfStudents(){
    const Ids = this.props.selectedStudents.map((student) => {
      return String(student.studentId);
    });
    this.setState({
      studentsId: Ids,
    })
  }
  renderMarkOptInOrOutClassName(){
    if(isEmpty(this.props.selectedStudents)) {
      return "disable-link-button-new";
    }
    else {
      return "linkButton";
    }
  }
  renderMessage(){
    if(this.props.isMarkOptInOrOptOutSuccess){
      return(
        <div className="success-block">
          <span>चयनित छात्रो की optin या optout सफलतापूवर्क अद्यतन कर दी गयी है|</span>
        </div>
      );
    }
  }

  onClickRadioButton(event) {
    this.setState({
      selectedOptOption: { "optIn2019": event.target.value } ,
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    this.props.markSelectedStudentsOptInOrOptOutAction(this.props.secretKey, this.state.studentsId, this.state.selectedOptOption);
  }
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
            <form onSubmit={this.onFormSubmit}>
              <div className="column-modal">
              <h1  className="column-modal-container">कृपिया चयनित छात्रो की optin या optout अद्यतन करे </h1>
              </div>
              <div className="column-content-modal">
                <div className="selected-student-heading">
                  <span>Selected Students Id: </span>
                  {
                    this.state.studentsId.map(student =>
                      <span className='selected-students-Id'>{student}</span>)
                  }
                </div>
                <div className = "advance-input-radio">
                  <div className="input-radio-container">
                    <input type="radio" name="OptInOrOptOut" value="Y" onClick={this.onClickRadioButton} />
                    <label htmlFor = "Opt-In">Opt In</label>
                  </div>
                  <div className="input-radio-container">
                    <input type="radio" name="OptInOrOptOut" value="N" onClick={this.onClickRadioButton} />
                    <label htmlFor="Opt-Out">Opt Out</label>
                  </div>
                </div>
                {this.renderMessage()}
              </div>
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button className="button-modal button-close"
                          onClick={this.closeMarkSelectedStudentsOptInOrOptOutModal}>Close
                  </button>
                  <button className={this.renderSubmitButtonClassName()} type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      );
    }
  }
  render() {
    return (
      <div className="buttonContainer button-container-mobile">
        <button className={this.renderMarkOptInOrOutClassName()} onClick={this.openMarkSelectedStudentsOptInOrOptOutModal}>
          <i className="fa fa-info-circle card-icon"/>
          Mark Opt In / Out
        </button>
        {this.renderMarkSelectedStudentsOptInOrOptOutModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isMarkOptInOrOptOutSuccess: isMarkOptInOrOptOutSuccess(state),
});

export default connect(mapStateToProps, {
  resetIsMarkOptInOrOptOutSuccessAction,
  markSelectedStudentsOptInOrOptOutAction,
}, null, { pure: false })(MarkSelectedStudentsOptInOrOptOut);



