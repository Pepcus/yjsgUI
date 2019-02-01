import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import {
  resetIsUpdateIdCardStatusSuccessAction,
  updateIdCardStatusSelectedStudentsAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
  isUpdateIdCardStatusSuccess,
} from '../reducers/studentRegistrationReducer';
import isEmpty from 'lodash/isEmpty';
const customUpdateIdCardStatusSelectedStudentsModalStyles = {
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

class UpdateIdCardStatusSelectedStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsId:[],
      selectedCardOption:'',
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
  };
  openUpdateIdCardStatusSelectedStudentsModal() {
    this.setState({
      isUpdateSelectedStudentsOptInOrOptOutModalOpen: true,
    });
    this.filterIdsOfStudents();
  }
  closeUpdateIdCardStatusSelectedStudentsModal() {
    this.setState({
      isUpdateSelectedStudentsOptInOrOptOutModalOpen: false,
    });
    this.props.resetIsUpdateIdCardStatusSuccessAction();
  }
  renderSubmitButtonClassName(){
    if(isEmpty(this.state.selectedCardOption)) {
      return "popup-buttons-disable";
    }
    else {
      return "display-inline padding-7 linkButton float-right";
    }
  }
  filterIdsOfStudents(){
    const Ids = this.props.selectedStudents.map((student) => {
      return String(student.studentId);
    });
    this.setState({
      studentsId: Ids,
    });
  }
  renderIdCardStatusButtonClassName(){
    if(isEmpty(this.props.selectedStudents)) {
      return "disable-link-button-new";
    }
    else {
      return "linkButton";
    }
  }
  renderMessage(){
    if(this.props.isUpdateIdCardStatusSuccess){
      return(
        <div>
          <label>Update selected students Id card print status success</label>
        </div>
      );
    }
  }
  onClickRadioButton(event) {
    this.setState({
      selectedCardOption: { "printStatus": event.target.value },
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    this.props.updateIdCardStatusSelectedStudentsAction(this.props.secretKey, this.state.studentsId, this.state.selectedCardOption);
  }
  renderUpdateIdCardStatusSelectedStudentsModal() {
    if (this.state.isUpdateSelectedStudentsOptInOrOptOutModalOpen) {
      return (
        <Modal
          isOpen={this.state.isUpdateSelectedStudentsOptInOrOptOutModalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeUpdateIdCardStatusSelectedStudentsModal}
          style={customUpdateIdCardStatusSelectedStudentsModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
        >
          <div className="column-group-wrapper">
            <form onSubmit={this.onFormSubmit}>
              <div className="column-modal">
                <h1  className="column-modal-container">Update selected students Id card print status</h1>
              </div>
              <div>
                <label>Selected Students Id: </label>
                {
                  this.state.studentsId.map(student =>
                    <span className='selected-students-Id'>{student}</span>)
                }
              </div>
              <div className = "advance-input-radio">
                <div className="input-radio-container">
                  <input type="radio" name="IdCardStatus" value="Y" onClick={this.onClickRadioButton} />
                  <label htmlFor = "Reprint">Reprint</label>
                </div>
                <div className="input-radio-container">
                  <input type="radio" name="IdCardStatus" value="N" onClick={this.onClickRadioButton} />
                  <label htmlFor="NotPrint">Not Print</label>
                </div>
              </div>
              <button className={this.renderSubmitButtonClassName()} type="submit">Submit</button>
              {this.renderMessage()}
            </form>
            <div className="modal-save-container">
              <div className="save-button-wrapper">
                <button className="button-modal button-close"
                        onClick={this.closeUpdateIdCardStatusSelectedStudentsModal}>Close
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
      <div className="buttonContainer">
        <button className={this.renderIdCardStatusButtonClassName()} onClick={this.openUpdateIdCardStatusSelectedStudentsModal}>
          <i className="fa fa-user card-icon"/>Id Card Status
        </button>
        {this.renderUpdateIdCardStatusSelectedStudentsModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isUpdateIdCardStatusSuccess: isUpdateIdCardStatusSuccess(state),
});

export default connect(mapStateToProps, {
  resetIsUpdateIdCardStatusSuccessAction,
  updateIdCardStatusSelectedStudentsAction,
}, null, { pure: false })(UpdateIdCardStatusSelectedStudents);



