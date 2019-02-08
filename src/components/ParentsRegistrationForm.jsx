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
      mobile: null,
      selectedCountOfMembers: 0,
      isSubmitTriggered: false,
      isError: false,
    };
    this._handleInputChangeName = this.handleInputChangeName.bind(this);
    this._addOptions = this.addOptions.bind(this);
    this._handleSelectChange = this.handleSelectChange.bind(this);
    this._submitStudentData = this.submitStudentData.bind(this);
    this._renderPopUp = this.renderPopUp.bind(this);
    this._closePopUp = this.closePopUp.bind(this);
    this._renderErrorMessage = this.renderErrorMessage.bind(this);
    this._handleInputChangeMobile = this.handleInputChangeMobile.bind(this);
  }

  handleInputChangeName(event) {
    this.setState({
      name: event.target.value,
      isError: false,
    });
  }
  handleInputChangeMobile(event) {
    this.setState({
      mobile: event.target.value,
      isError: false,
    });
  }
  handleSelectChange(event) {
    this.setState({
      selectedCountOfMembers: event.target.value,
      isError: false,
    });
  }
  submitStudentData(event) {
    event.preventDefault();
    if (isEmpty(this.state.name) || (this.state.mobile === null)) {
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
          memberCount={optionCount}
          key={optionCount}
        >{optionCount}
        </option>
      ))
  );
  }
  closePopUp() {
    this.setState({
      isSubmitTriggered: false,
      name: '',
      mobile: null,
      selectedCountOfMembers: 0,
      isError: false,
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
        <div className="inputFieldContainer">
          <div>
            <span>आपका रजिस्ट्रेशन संपन्न हुआ!</span>
          </div>
          <div>
            <span>धन्यवाद्</span>
          </div>
          <div className="buttonContainer">
            <button onClick={this._closePopUp} className="linkButton margin-none full-width">OK</button>
          </div>
        </div>
      );
    }
  }
  render() {
    if (!this.state.isSubmitTriggered) {
      return (
        <div>
          <div className="registrationFormContainer">
            <div className="student-logo-header">
              <h2 className="student-info-heading">{'अभिभावक सम्मलेन (Parents\' Convention)'}</h2>
            </div>
            <h1>सम्मिलित होने के लिए कृपया निचे दी गई जानकारी देवें!</h1>
            <form id="parentsRegistrationForm" className="inputFieldContainerWrapper">
              <div className="inputFieldContainer">
                <div>
                  <span className="column-content-students">नाम : </span>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this._handleInputChangeName}
                  />
                </div>
                <div>
                  <span className="column-content-students">फ़ोन : </span>
                  <input
                    type="number"
                    name="mobile"
                    value={this.state.mobile}
                    onChange={this._handleInputChangeMobile}
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
                <div className="buttonContainer">
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
              </div>
            </form>
            <div>
              <div>
                <span className="column-content-students">नाम : </span>
                <input
                  type="text"
                  name="name"
                  className="input-text"
                  value={this.state.name}
                  onChange={this._handleInputChangeName}
                />
              </div>
              <div className="parent-register-input-text">
                <span className="column-content-students">फ़ोन : </span>
                <input
                  type="number"
                  name="mobile"
                  className="input-text"
                  value={this.state.mobile}
                  onChange={this._handleInputChangeMobile}
                />
              </div>
              <div>
                <span>स्थान : श्री चंद्रप्रभु दिगंबर जैन मांगलिक भवन, अंजनी नगर</span>
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
                  <span>{'दिनांक : रविवार १७ फरवरी'}</span>
                </div>
                <div className="form-content-title">
                  <span>{'समय : प्रातः ९ से १ बजे'}</span>
                </div>
                <div className="form-content-title form-content-flex">
                  <span>{'स्थान : '}</span>
                  <span className="form-content-flex-content">{'श्री चंद्रप्रभु दिगंबर जैन मांगलिक भवन, अंजनी नगर'}</span>
                </div>
              </div>
            </div>

          </form>

          <div className="footer print-media-none footer-index">
            <p className="footer-text footer-index">
              <span className="contact-no-footer footer-index">{"किसी अन्य जानकारी के लिए संपर्क सूत्र: प्रकाश छाबड़ा (99260 40137)"}</span>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="registrationFormContainer ">
          <div className="student-logo-header">
            <h2 className="student-info-heading">{'अभिभावक सम्मलेन (Parents\' Convention)'}</h2>
          </div>
          {this._renderPopUp()}
        </div>
        <div className="footer print-media-none footer-index">
          <p className="footer-text footer-index">
            <span className="contact-no-footer footer-index">
              {"किसी कारणवश आपका रजिस्ट्रेशन नहीं हो पाया! कृपया श्री प्रकाश छाबड़ा से 99260 40137 पर संपर्क करें!"}
            </span>
          </p>
          <p className="footer-text footer-index">
            <span className="contact-no-footer footer-index">
              {"धन्यवाद्"}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  parentsRegistrationAction,
})(ParentsRegistration);
