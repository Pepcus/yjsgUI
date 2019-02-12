import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import LinkButton from './commonComponents/LinkButton';
import {
  fetchStudentData,
  setStudentCredentials,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
} from '../actions/studentRegistrationActions';

import yjsgLogo from '../assets/yjsgLogo.png';
import {
  yjsgHeader,
  eventDate,
  eventVenue,
  alreadyRegisteredBtnText,
  newRegistrationBtnText,
} from '../utils/yjsgConstants';
import { getParameterByName } from '../utils/http';
import Button from './commonComponents/Button';

/*
* The StudentPage component for the student which will render -
* Two buttons (Already Registered and New Registration) .
 * @type {class}
 * */
// FIXME: Add missing propTypes and defaultProps.
//  Fix EsLint issues.
//  Add missing JSDocs
class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isURLParams: false,
      isStudentLogin: false,
      isNewRegistration: false,
    };
    // FIXME: Use arrow functions to avoid binding.
    this.renderLoginField = this.renderLoginField.bind(this);
    this.redirectToStudentLogin = this.redirectToStudentLogin.bind(this);
    this.redirectToNewRegistrationPage = this.redirectToNewRegistrationPage.bind(this);
  }

  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');
    if (id && secretCode) {
      this.fetchStudentByURLParams(id, secretCode);
    }
  }

  fetchStudentByURLParams(id, secretCode) {
    this.props.setStudentCredentials(id, secretCode);
    this.props.fetchStudentData(id, secretCode);
    this.setState({
      isURLParams: true,
    });
  }
  redirectToStudentLogin() {
    this.setState({
      isStudentLogin: true,
    });
    this.props.setHashLinkForStudentCredentialAction('student');
  }
  redirectToNewRegistrationPage() {
    this.setState({
      isNewRegistration: true,
    });
    this.props.setHashLinkForNewRegistrationAction('student');
  }

  // FixMe: Rename the method to renderStudentLoginButtons
  renderLoginField() {
    return (
      <div>
        <Button
          buttonText={alreadyRegisteredBtnText}
          onClick={this.redirectToStudentLogin}
        />
        <Button
          buttonText={newRegistrationBtnText}
          onClick={this.redirectToNewRegistrationPage}
        />
      </div>
    );
  }
  render() {
    if (this.state.isURLParams) {
      return <Switch><Redirect to="/student-correction-by-url" /></Switch>;
    } else if (this.state.isStudentLogin) {
      return <Switch><Redirect to="/student-login" /></Switch>;
    } else if (this.state.isNewRegistration) {
      return <Switch><Redirect to="/studentRegister" /></Switch>;
    }
    return (
      <div className="landing-page-block">
        <div className={'landing-page-container'}>
          <h2 className="student-heading">{yjsgHeader}</h2>
        </div>
        <div className="landing-page-wrapper">
          <div className={'landing-page-content'}>
            <div className={'yjsg-event-info'}>
              <h5 className="primary-color">{eventDate}</h5>
              <h5 className="header-text">{eventVenue}</h5>
            </div>
            <div className={'landing-page-logo'}>
              <img src={yjsgLogo} alt={'yjsg logo'} />
            </div>
            <div className={'landing-page-button-container'}>
              {this.renderLoginField()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentPage.propTypes = {
  fetchStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
};

StudentPage.defaultProps = {
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
})(StudentPage);
