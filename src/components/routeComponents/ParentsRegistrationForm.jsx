import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { parentsRegistrationAction } from '../../actions/memberRegistrationActions';
import Button from '../common/Button';
import { formSubmitBtnText } from '../../constants/yjsg';
import Popup from '../common/Popup';

/**
 * ParentsRegistration component render parents registration form.
 * @type {Class}
 */
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

    // FIXME: Use arrow functions to avoid binding.
    this._handleInputChangeName = this.handleInputChangeName.bind(this);
    this._addOptions = this.addOptions.bind(this);
    this._handleSelectChange = this.handleSelectChange.bind(this);
    this._onSubmitParentsData = this.onSubmitParentsData.bind(this);
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
  /**
   * handleInputChangeMobile method set mobile number.
   * @param {Object} event
   */
  handleInputChangeMobile(event) {
    // validation only for number with max length 10 only
    const validationForMobile = /^[0-9\b]+$/;
    if (((event.target.value === '') || validationForMobile.test(event.target.value)) && event.target.value !== 'e' && event.target.value.length <= 10) {
      this.setState({
        mobile: event.target.value,
        isError: false,
      });
    }
  }
  /**
   * handleSelectChange method set the number of member
   * that are selected from drop down list of member
   * @param {Object} event
   */
  handleSelectChange(event) {
    this.setState({
      selectedCountOfMembers: event.target.value,
      isError: false,
    });
  }
  /**
   * onSubmitParentsData method will on onClick of submit button
   * @param {Object} event
   */
  onSubmitParentsData(event) {
    // to prevent form action default
    event.preventDefault();
    // name and mobile number are compulsory for from submission
    if (isEmpty(this.state.name) || isEmpty(this.state.mobile)) {
      this.setState({
        isSubmitTriggered: false,
        isError: true,
      });
    } else {
      // call action to submit form data
      const name = String(this.state.name);
      const members = Number(this.state.selectedCountOfMembers);
      const phoneNumber = this.state.mobile;
      this.props.parentsRegistrationAction({ name, members, phoneNumber });
      this.setState({
        isSubmitTriggered: true,
        isError: false,
      });
    }
  }
  /**
   * addOptions method return number of member option in member drop down list.
   * @return {ReactComponent}
   */
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

  /**
   * render close browser message
   * @return {*}
   */
  renderCloseBrowserMessage() {
    if (this.state.isCloseBrowserPopMessage) {
      return (
        <Popup>
          <h5>Please close your browser manually.</h5>
        </Popup>
      );
    }
  }
  /**
   * closePopUp method call on onClick on close button in popup
   * And set all values of state initial.
   */
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

  // FIXME: Reuse the component to render error message popup
  renderErrorMessage() {
    if (this.state.isError) {
      return (
        <div className="errorPopupContainer error-popup-padding">
          <span className="error-message">
            {'All fields are compulsory'}
          </span>
        </div>);
    }
    return null;
  }
  // FIXME: Reuse the component to render message popup
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
          <div className="button-container">
            <button onClick={this._closePopUp} className="linkButton margin-none full-width">Close</button>
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    if (!this.state.isSubmitTriggered && !this.state.isCloseBrowserPopMessage) {
      return (
        <div className="footer-none-wrapper">
          <div className="registrationFormContainer parent-register-container">
            {/* FIXME: Create a separate reusable component to render form*/}
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
                <div className="button-container button-register-submit">
                  <Button
                    buttonText={formSubmitBtnText}
                    type="submit"
                    formName="parentsRegistrationForm"
                    value="Submit"
                    onClick={this._onSubmitParentsData}
                  />
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
        </div>
      );
    }
    return (
      <div className="footer-none-wrapper">
        <div className="registrationFormContainer">
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
ParentsRegistration.propsType = {
  parentsRegistrationAction: PropTypes.func,
};

ParentsRegistration.defaultProps = {
  parentsRegistrationAction: () => {},
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  parentsRegistrationAction,
})(ParentsRegistration);
