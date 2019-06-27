import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  fetchStudentDataAction,
  setStudentCredentialsAction,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
  setHashLinkForNewRegistrationAction,
} from '../../actions/studentRegistrationActions';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getStudent,
  isFetched,
  isLoading,
  stateOfAdminLogin,
} from '../../reducers/studentRegistrationReducer';
import yjsgLogo from '../../assets/images/yjsgLogo.png';
import {
  adminId,
  adminPassword,
  eventDate,
  eventVenue,
  USER_TYPES,
} from '../../constants/yjsg';
import { getParameterByName } from '../../utils/http';
import LoginForm from '../LoginForm';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';
import {
  GIVEN_INFORMATION_WRONG_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../../constants/messages';

/**
 *SplashPage render home page of admin
 * @type {Class}
 */
class SplashPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // this may be use in future
      // isCorrection: false,
      isAdmin: false,
      admin: {},
      isURLParams: false,
      hasError: true,
      adminCredentialErrorMessage: false,
      isNewRegistration: false,
      redirectToRoute: '',
    };

    // FIXME: Use arrow functions to avoid binding.
    this._enableAdminLoginButtons = this.enableAdminLoginButtons.bind(this);
    this.handleDisableAdminLoginButtons = this.handleDisableAdminLoginButtons.bind(this);
    this._setAdminLogin = this.setAdminLogin.bind(this);
    this.handleAdminScreenRedirection = this.handleAdminScreenRedirection.bind(this);
    this.redirectToNewRegistrationPage = this.redirectToNewRegistrationPage.bind(this);
  }

  /**
   * when student login through URL then this method will
   * get id and secretCode form URL and fetch data of that particular student.
   */
  componentWillMount() {

    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');
    const redirectToRoute = getParameterByName('fromRoute');

    if (redirectToRoute) {
      this.setRedirectToRoute(redirectToRoute);
    }

    if (id && secretCode) {
      this.fetchStudentByURLParams(id, secretCode);
    }
  }

  onChange = ({ formData, errors }) => {
    this.setState({
      admin: formData,
      hasError: isEmpty(errors),
      adminCredentialErrorMessage: false,
    });
  };

  /**
   * transformErrors method return error message object
   * @return {Object} error message object
   */
  transformErrors = () => ({
    'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  });

  /**
   * setRedirectToRoute set the path to which redirect
   * @param {String} redirectToRoute
   */
  setRedirectToRoute = (redirectToRoute) => {
    this.setState({
      redirectToRoute,
    });
  };

  /**
   * fetchStudentByURLParams method fetch student data.
   * And verify the student credential and if fetch student data is
   * success then it set the value of isURLParams to true.
   * @param {String} id
   * @param {String} secretCode
   */
  fetchStudentByURLParams(id, secretCode) {
    this.props.setStudentCredentialsAction(id, secretCode);
    this.props.fetchStudentDataAction(id, secretCode);
    this.setState({
      isURLParams: true,
    });
  }

  /**
   * enableAdminLoginButtons method enable the admin login
   * button by onClick of admin login button.
   * It set the value of isAdmin to true.
   */
  enableAdminLoginButtons() {
    this.setState({
      isAdmin: true,
    });
  }

  /**
   * handleDisableAdminLoginButtons method disable the admin login
   * button by onClick of go back button.
   * It set the value of isAdmin to false.
   */
  handleDisableAdminLoginButtons() {
    this.setState({
      isAdmin: false,
    });
  }

  /**
   * handleAdminScreenRedirection method redirect to admin page on some condition.
   *
   * @return {HTML}
   */
  handleAdminScreenRedirection() {
    // IF admin initial login.
    const { redirectToRoute, adminCredentialErrorMessage } = this.state;
    const { id, password, adminLoginState } = this.props;

    if (!adminLoginState) {
      // Verify admin credential
      if (adminCredentialErrorMessage) {
        if (id !== adminId || password !== adminPassword) {
          // If admin credential is not valid it gives the error message.
          return (
            // FIXME: Create a reusable component for error message popup.
            <div className="errorPopupContainer">
              <h5>
                {GIVEN_INFORMATION_WRONG_MESSAGE}
              </h5>
            </div>
          );
        }
        // if admin credential is valid then it set admin login true in redux store
        // and redirect to "/student-search" route
        this.props.setAdminLoginStateAction(true);
        if (redirectToRoute) {
          this.setRedirectToRoute('');
          return <Switch><Redirect to={redirectToRoute} /></Switch>;
        }
        return <Switch><Redirect to="/student-search" /></Switch>;

      }
      return null;
    }

    if (redirectToRoute) {
      this.setRedirectToRoute('');
      return <Switch><Redirect to={redirectToRoute} /></Switch>;
    }
    // if admin is already login then it redirect to "/student-search"
    // without any credential.
    return <Switch><Redirect to="/student-search" /></Switch>;

  }

  /**
   * setAdminLogin method set the admin login credential
   * @param {Object} event
   */
  setAdminLogin(event) {
    const { admin } = this.state;

    event.preventDefault();
    if (this.state.hasError) {
      this.setState({
        adminCredentialErrorMessage: true,
      });
      this.props.setAdminCredentialsAction(admin.adminId, admin.adminPassword);
    }
  }

  /**
   * redirectToNewRegistrationPage method set the value of isNewRegistration true on Onclick
   * of new registration button.
   */
  redirectToNewRegistrationPage() {
    const { ADMIN } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    this.props.setHashLinkForNewRegistrationAction(ADMIN);
  }

  render() {

    const {
      isURLParams,
      isAdmin,
      admin,
      isNewRegistration,
    } = this.state;
    const { tenant } = this.props;

    if (isURLParams) {
      return <Switch><Redirect to="/studentCorrection" /></Switch>;
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
              <LoginForm
                onChange={this.onChange}
                transformErrors={this.transformErrors}
                isAdmin={isAdmin}
                admin={admin}
                handleAdminScreenRedirection={this.handleAdminScreenRedirection}
                handleDisableAdminLoginButtons={this.handleDisableAdminLoginButtons}
                setAdminLogin={this._setAdminLogin}
                isNewRegistration={isNewRegistration}
                redirectToNewRegistrationPage={this.redirectToNewRegistrationPage}
                enableAdminLoginButtons={this._enableAdminLoginButtons}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SplashPage.propTypes = {
  adminLoginState: PropTypes.bool,
  fetchStudentDataAction: PropTypes.func,
  id: PropTypes.string,
  password: PropTypes.string,
  setAdminCredentialsAction: PropTypes.func,
  setAdminLoginStateAction: PropTypes.func,
  setHashLinkForNewRegistrationAction: PropTypes.func,
  setStudentCredentialsAction: PropTypes.func,
  tenant: PropTypes.string,
};

SplashPage.defaultProps = {
  adminLoginState: false,
  fetchStudentDataAction: () => {},
  id: '',
  password: '',
  setAdminCredentialsAction: () => {},
  setAdminLoginStateAction: () => {},
  setHashLinkForNewRegistrationAction: () => {},
  setStudentCredentialsAction: () => {},
  tenant: '',
};

const mapStateToProps = state => ({
  adminLoginState: stateOfAdminLogin(state),
  id: getAdminId(state),
  isStudentFetched: isFetched(state),
  isLoading: isLoading(state),
  password: getAdminPassword(state),
  searchResults: getSearchResults(state),
  studentData: getStudent(state),
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, {
  fetchStudentDataAction,
  getApplicationTenant,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
  setHashLinkForNewRegistrationAction,
  setStudentCredentialsAction,
})(SplashPage);
