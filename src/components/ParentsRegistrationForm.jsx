import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { parentsRegistrationAction } from '../actions/studentRegistrationActions';

class ParentsRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      members: [0, 1, 2, 3, 4, 5, 6],
      mobile: '',
      selectedCountOfMembers: 0,
      isSubmitTriggered: false,
      isError: false,
      isCloseBrowserPopMessage: false,
    };
    this._handleInputChangeName = this.handleInputChangeName.bind(this);
    this._addOptions = this.addOptions.bind(this);
    this._handleSelectChange = this.handleSelectChange.bind(this);
    this._submitStudentData = this.submitStudentData.bind(this);
    this._renderPopUp = this.renderPopUp.bind(this);
    this._closePopUp = this.closePopUp.bind(this);
    this._renderErrorMessage = this.renderErrorMessage.bind(this);
    this._handleInputChangeMobile = this.handleInputChangeMobile.bind(this);
    this.renderCloseBrowserMessage = this.renderCloseBrowserMessage.bind(this);
  }
  componentDidMount() {
    this.setState({
      isSubmitTriggered: false,
      isCloseBrowserPopMessage: false,
    });
  }
  handleInputChangeName(event) {
    this.setState({
      name: event.target.value,
      isError: false,
    });
  }
  handleInputChangeMobile(event) {
    const validationForMobile = /^[0-9\b]+$/;
    if (((event.target.value === '') || validationForMobile.test(event.target.value)) && event.target.value !== 'e' && event.target.value.length <= 10) {
      this.setState({
        mobile: event.target.value,
        isError: false,
      });
    }
  }
  handleSelectChange(event) {
    this.setState({
      selectedCountOfMembers: event.target.value,
      isError: false,
    });
  }
  submitStudentData(event) {
    event.preventDefault();
    if (isEmpty(this.state.name) || isEmpty(this.state.mobile)) {
      this.setState({
        isSubmitTriggered: false,
        isError: true,
      });
    } else {
      this.props.parentsRegistrationAction(String(this.state.name), Number(this.state.selectedCountOfMembers), this.state.mobile);
      this.setState({
        isSubmitTriggered: true,
        isError: false,
      });
    }
  }
  addOptions() {
    return (this.state.members.map(
      optionCount => (
        <option
          key={optionCount}
        >{optionCount}
        </option>
      ))
    );
  }
  renderCloseBrowserMessage() {
    if (this.state.isCloseBrowserPopMessage) {
      return (
        <div className="popup">
          <div className="popupContainer">
            <h5>Please close your browser manually.</h5>
          </div>
        </div>
      );
    }
  }
  closePopUp() {
    this.setState({
      isSubmitTriggered: true,
      name: '',
      mobile: '',
      selectedCountOfMembers: 0,
      isError: false,
      isCloseBrowserPopMessage: true,
    });
  }
  renderErrorMessage() {
    if (this.state.isError) {
      return (
        <div className="errorPopupContainer error-popup-padding">
          <span className="error-message">{'All fields are compulsory'}</span>
        </div>);
    }
    return null;
  }
  renderPopUp() {
    if (this.state.isSubmitTriggered) {
      return (
        <div className="inputFieldContainer parent-register-message-wrapper">
          <div>
            <span>आपका रजिस्ट्रेशन संपन्न हुआ!</span>
          </div>
          <div className="parent-register-success">
            <span>धन्यवाद्</span>
          </div>
          <div className="buttonContainer">
            <button onClick={this._closePopUp} className="linkButton margin-none full-width">Close</button>
          </div>
        </div>
      );
    }
  }
  render() {
    if (!this.state.isSubmitTriggered && !this.state.isCloseBrowserPopMessage) {
      return (
        <div className="footer-none-wrapper">
          <div className="registrationFormContainer parent-register-container">
            <div className="student-logo-header">
              <div className="yjsg-logo">
                <img src="../../react-logo-1.png" alt="logo" className="yjsg-logo-img" />
              </div>
              <h2 className="student-info-heading parent-info-heading">{'अभिभावक सम्मलेन (Parents\' Convention)'}</h2>
            </div>
            <form id="parentsRegistrationForm" className="inputFieldContainerWrapper input-field-register-container">
              <div className="inputFieldContainer input-field-register-wrapper">
                <div className="parent-register-heading">
                  <h1 className="parent-register-heading-text primary-color">सम्मिलित होने के लिए कृपया निचे दी गई जानकारी देवें!</h1>
                </div>
                <div className="parent-register-input-text">
                  <span className="column-content-students parent-register-label">नाम : </span>
                  <input
                    type="text"
                    name="name"
                    className="parent-input-text"
                    value={this.state.name}
                    onChange={this._handleInputChangeName}
                    required
                  />
                </div>
                <div className="parent-register-input-text">
                  <span className="column-content-students parent-register-label">फ़ोन : </span>
                  <input
                    type="number"
                    name="mobile"
                    className="parent-input-text"
                    value={this.state.mobile}
                    onChange={this._handleInputChangeMobile}
                    required
                  />
                </div>
                <span className="column-content-students">आपके अलावा साथ आने वालो की संख्या : </span>
                <select
                  onChange={this._handleSelectChange}
                  value={this.state.members[this.state.selectedCountOfMembers]}
                  className="selected-day-list"
                >
                  {this._addOptions()}
                </select>
                <div>
                  {this._renderErrorMessage()}
                </div>
                <div className="buttonContainer button-register-submit">
                  <button
                    type="submit"
                    form="parentsRegistrationForm"
                    value="Submit"
                    className="linkButton margin-none full-width"
                    onClick={this._submitStudentData}
                  >
                    {'Submit'}
                  </button>
                </div>
                <div className="register-form-content-wrapper">
                  <div className="form-content-title">
                    <span className="form-title-small">{'दिनांक :'}</span>
                    <span className="form-title-text"> {'रविवार १७ फरवरी'}</span>
                  </div>
                  <div className="form-content-title">
                    <span className="form-title-small">{'समय :'}</span>
                    <span className="form-title-text">{'प्रातः ९ से १ बजे'}</span>
                  </div>
                  <div className="form-content-title form-content-flex">
                    <span className="form-title-small">{'स्थान : '}</span>
                    <span className="form-content-flex-content form-title-text">{'श्री चंद्रप्रभु दिगंबर जैन मांगलिक भवन, अंजनी नगर'}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="footer print-media-none footer-index">
            <p className="footer-text footer-index">
              <span className="contact-no-footer footer-index">किसी अन्य जानकारी के लिए संपर्क सूत्र: प्रकाश छाबड़ा (99260 40137)</span>
            </p>
          </div>
        </div>


      );
    }
    return (
      <div className="footer-none-wrapper">
        <div className="registrationFormContainer">
          <div className="student-logo-header">
            <div className="yjsg-logo">
              <img src="../../react-logo-1.png" alt="logo" className="yjsg-logo-img" />
            </div>
            <h2 className="student-info-heading">{'अभिभावक सम्मलेन (Parents\' Convention)'}</h2>
          </div>
          {this._renderPopUp()}
        </div>
        <div className="footer print-media-none footer-index">
          <p className="footer-text footer-index">
            <span className="contact-no-footer footer-index">
              {'किसी कारणवश आपका रजिस्ट्रेशन नहीं हो पाया! कृपया श्री प्रकाश छाबड़ा से 99260 40137 पर संपर्क करें!'}
            </span>
          </p>
          <p className="footer-text footer-index">
            <span className="contact-no-footer footer-index">
              {'धन्यवाद्'}
            </span>
          </p>
        </div>
        {this.renderCloseBrowserMessage()}
      </div>

    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  parentsRegistrationAction,
})(ParentsRegistration);
