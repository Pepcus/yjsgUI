import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  fetchStudentDataAction,
  setStudentCredentialsAction,
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
import {
  getTenantName,
  isRegisterCorrectionEnabled,
} from '../../reducers/appConfigReducer';

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

    const { STUDENT_WITH_URL } = USER_TYPES;

    this.props.setStudentCredentialsAction(id, secretCode);
    this.props.fetchStudentDataAction(id, secretCode);
    this.props.setUserTypeAction(STUDENT_WITH_URL);
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

    const { STUDENT } = USER_TYPES;

    this.setState({
      isStudentLogin: true,
    });
    this.props.setHashLinkForStudentCredentialAction(STUDENT);
  }

  /**
   * redirectToNewRegistrationPage method call by onclick of button new registration
   * it set the value of isNewRegistration is true.
   * And set user is student in reducer through setHashLinkForNewRegistrationAction action.
   */
  redirectToNewRegistrationPage() {

    const { STUDENT } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    this.props.setHashLinkForNewRegistrationAction(STUDENT);
  }

  /**
   * renderAlreadyRegisteredButton render already register button conditionally
   * @return {HTML}
   */
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
   * @return {HTML}
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

    const { isURLParams, isStudentLogin, isNewRegistration } = this.state;
    const { tenant } = this.props;

    if (isURLParams) {
      return <Switch><Redirect to="/studentCorrection" /></Switch>;

    } else if (isStudentLogin) {
      return <Switch><Redirect to="/student-login" /></Switch>;

    } else if (isNewRegistration) {
      return <Switch><Redirect to="/studentRegister" /></Switch>;
    }

    return (
      <div className="landing-page-block">
        <div className="landing-page-wrapper">
          <div className="landing-page-content">
            <div className="yjsg-event-info">
              <h5 className="primary-color">{eventDate[tenant]}</h5>
              <h5 className="header-text">{eventVenue[tenant]}</h5>
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
  fetchStudentDataAction: PropTypes.func,
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  setHashLinkForNewRegistrationAction: PropTypes.func,
  setHashLinkForStudentCredentialAction: PropTypes.func,
  setStudentCredentialsAction: PropTypes.func,
  setUserTypeAction: PropTypes.func,
  tenant: PropTypes.string,
};

StudentPage.defaultProps = {
  fetchStudentDataAction: () => {},
  isAlreadyRegisteredButtonEnabled: false,
  setHashLinkForStudentCredentialAction: () => {},
  setHashLinkForNewRegistrationAction: () => {},
  setStudentCredentialsAction: () => {},
  setUserTypeAction: () => {},
  tenant: '',
};

const mapStateToProps = state => ({
  isAlreadyRegisteredButtonEnabled: isRegisterCorrectionEnabled(state),
  studentData: getStudent(state),
  tenant: getTenantName(state),
});

export default connect(mapStateToProps, {
  fetchStudentDataAction,
  getTenantName,
  isRegisterCorrectionEnabled,
  setHashLinkForNewRegistrationAction,
  setHashLinkForStudentCredentialAction,
  setStudentCredentialsAction,
  setUserTypeAction,
})(StudentPage);
