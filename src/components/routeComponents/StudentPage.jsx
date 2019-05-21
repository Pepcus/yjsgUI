import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  fetchStudentData,
  setStudentCredentials,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
  setUserTypeAction,
} from '../../actions/studentRegistrationActions';
import yjsgLogo from '../../assets/images/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  alreadyRegisteredBtnText,
  newRegistrationBtnText,
  USER_TYPES,
} from '../../constants/yjsg';
import { getParameterByName } from '../../utils/http';
import Button from '../common/Button';
import { getStudent } from '../../reducers/studentRegistrationReducer';
import { getApplicationTenant, isRegisterCorrectionEnabled } from '../../reducers/assetFilesReducer';

/**
* The StudentPage component for the student which will render -
* Two buttons (Already Registered and New Registration) .
 * @type {class}
 * */
class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isURLParams: false,
      isStudentLogin: false,
      isNewRegistration: false,
    };
    // FIXME: Use arrow functions to avoid binding.
    this.renderStudentLoginButtons = this.renderStudentLoginButtons.bind(this);
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

  /** If student login through URL fetchStudentByURLParams method will call.
   * @param {String} id
   * @param {String} secretCode
   */
  fetchStudentByURLParams(id, secretCode) {
    this.props.setStudentCredentials(id, secretCode);
    this.props.fetchStudentData(id, secretCode);
    this.props.setUserTypeAction(USER_TYPES.STUDENT_WITH_URL);
    this.setState({
      isURLParams: true,
    });
  }

  /**
   * redirectToStudentLogin method call by onclick of button already register
   * it set the value of isStudentLogin is true.
   * And set user is student in reducer through setHashLinkForStudentCredentialAction action.
   */
  redirectToStudentLogin() {
    this.setState({
      isStudentLogin: true,
    });
    this.props.setHashLinkForStudentCredentialAction(USER_TYPES.STUDENT);
  }

  /**
   * redirectToNewRegistrationPage method call by onclick of button new registration
   * it set the value of isNewRegistration is true.
   * And set user is student in reducer through setHashLinkForNewRegistrationAction action.
   */
  redirectToNewRegistrationPage() {
    this.setState({
      isNewRegistration: true,
    });
    this.props.setHashLinkForNewRegistrationAction(USER_TYPES.STUDENT);
  }
  renderAlreadyRegisteredButton = () => {
    if (this.props.isAlreadyRegisteredButtonEnabled) {
      return (
        <Button
          buttonText={alreadyRegisteredBtnText}
          onClick={this.redirectToStudentLogin}
        />
      );
    } return null;
  };
  /**
   * renderStudentLoginButtons method return the react component in that
   * there are two buttons one is already register and anther is new registration.
   * @return {ReactComponent}
   */
  renderStudentLoginButtons() {
    return (
      <div>
        {this.renderAlreadyRegisteredButton()}
        <Button
          buttonText={newRegistrationBtnText}
          onClick={this.redirectToNewRegistrationPage}
        />
      </div>
    );
  }
  render() {
    if (this.state.isURLParams) {
      return <Switch><Redirect to="/studentCorrection" /></Switch>;
    } else if (this.state.isStudentLogin) {
      return <Switch><Redirect to="/student-login" /></Switch>;
    } else if (this.state.isNewRegistration) {
      return <Switch><Redirect to="/studentRegister" /></Switch>;
    }
    return (
      <div className="landing-page-block">
        <div className="landing-page-wrapper">
          <div className="landing-page-content">
            <div className="yjsg-event-info">
              <h5 className="primary-color">{eventDate[this.props.tenant]}</h5>
              <h5 className="header-text">{eventVenue[this.props.tenant]}</h5>
            </div>
            <div className="landing-page-logo">
              <img src={yjsgLogo} alt="yjsg logo" />
            </div>
            <div className="landing-page-button-container">
              {this.renderStudentLoginButtons()}
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
  setHashLinkForStudentCredentialAction: PropTypes.func,
  setHashLinkForNewRegistrationAction: PropTypes.func,
  setUserTypeAction: PropTypes.func,
  tenant: PropTypes.string,
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
};

StudentPage.defaultProps = {
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
  setHashLinkForStudentCredentialAction: () => {},
  setHashLinkForNewRegistrationAction: () => {},
  setUserTypeAction: () => {},
  tenant: '',
  isAlreadyRegisteredButtonEnabled: false,
};
const mapStateToProps = state => ({
  studentData: getStudent(state),
  tenant: getApplicationTenant(state),
  isAlreadyRegisteredButtonEnabled: isRegisterCorrectionEnabled(state),
});
export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
  setUserTypeAction,
  getApplicationTenant,
  isRegisterCorrectionEnabled,
})(StudentPage);
