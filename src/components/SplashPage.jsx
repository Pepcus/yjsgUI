import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from './commonComponents/Button';
import InputField from './formComponents/InputField';
import {
  fetchStudentData,
  setStudentCredentials,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
} from '../actions/studentRegistrationActions';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getStudent,
  isFetched,
  isLoading,
  stateOfAdminLogin,
} from '../reducers/studentRegistrationReducer';

import yjsgLogo from '../assets/images/yjsgLogo.png';
import {
  adminId,
  adminPassword,
  eventDate,
  eventVenue,
  goBackBtnText,
  newRegistrationBtnText,
  adminLoginBtnText,
  invalidAdminMsg, formSubmitBtnText,
  USER_TYPES,
} from '../utils/yjsgConstants';
import { setRegistrationData } from '../utils/registrationFormUtils';
import { getParameterByName } from '../utils/http';

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
      credentials: {},
      admin: {},
      isURLParams: false,
      adminLoginState: false,
      adminCredentialErrorMessage: false,
      registeredStudentCredentialErrorMessage: false,
      isNewRegistration: false,
      redirectToRoute: '',
    };

    // FIXME: Use arrow functions to avoid binding.
    this._enableAdminLoginButtons = this.enableAdminLoginButtons.bind(this);
    this._disableAdminLoginButtons = this.disableAdminLoginButtons.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this._setAdminLogin = this.setAdminLogin.bind(this);
    this._adminScreenRedirection = this.adminScreenRedirection.bind(this);
    this.redirectToNewRegistrationPage = this.redirectToNewRegistrationPage.bind(this);
    // this may be use in future.
    // this._enableStudentInfoCorrectionButtons = this.enableStudentInfoCorrectionButtons.bind(this);
    // this.checkRegisteredStudentCredential = this.checkRegisteredStudentCredential.bind(this);
    // this._fetchStudentById = this.fetchStudentById.bind(this);
    // this._disableStudentInfoCorrectionButtons = this.disableStudentInfoCorrectionButtons.bind(this);
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
    this.props.setStudentCredentials(id, secretCode);
    this.props.fetchStudentData(id, secretCode);
    this.setState({
      isURLParams: true,
    });
  }

  /**
   * enableStudentInfoCorrectionButtons method enable the student information
   * corrections button by onClick of already register button.
   * It set the value of isCorrection to true.
   */
  // this may be use in future
  /* enableStudentInfoCorrectionButtons() {
    this.setState({
      isCorrection: true,
    });
  }*/

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
   * disableAdminLoginButtons method disable the admin login
   * button by onClick of go back button.
   * It set the value of isAdmin to false.
   */
  disableAdminLoginButtons() {
    this.setState({
      isAdmin: false,
    });
  }

  /**
   * disableStudentInfoCorrectionButtons method disable the the student information
   * corrections button by onClick of go back button.
   * It set the value of isCorrection to false.
   */
  // this may be use in future.
  /* disableStudentInfoCorrectionButtons() {
    this.setState({
      isCorrection: false,
    });
  }*/
  /**
   * adminScreenRedirection method redirect to admin page on some condition.
   * @return {ReactComponent}
   */
  adminScreenRedirection() {
    // IF admin initial login.
    const { redirectToRoute } = this.state;
    if (!this.props.adminLoginState) {
      const {
        id,
        password,
      } = this.props;
      // Verify admin credential
      if (this.state.adminCredentialErrorMessage) {
        if (id !== adminId || password !== adminPassword) {
          // If admin credential is not valid it gives the error message.
          return (
            // FIXME: Create a reusable component for error message popup.
            <div className="errorPopupContainer">
              <h5>{invalidAdminMsg}</h5>
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
   * checkRegisteredStudentCredential method verify the student credential
   * if student credential is not valid give the error message
   * else redirect to student correction form
   * @return {ReactComponent}
   */
  // this may be use in future
  /* checkRegisteredStudentCredential() {
    if (this.state.registeredStudentCredentialErrorMessage) {
     if ((!this.props.studentData || !this.props.isFetched) && !this.props.isLoading) {
        return (
            <div className = "errorPopupContainer">
              <h5 className = "error-message">{invalidIdMessage}</h5>
          </div>
        );
      } else if (this.props.studentData && this.props.isFetched) {
        return (
          <div>
            <Redirect to={'/studentCorrection'}/>
          </div>
        )
      }
    }
      return null;
  }*/
  /**
   * setAdminLogin method set the admin login credential
   * @param {Object} event
   */
  setAdminLogin(event) {
    event.preventDefault();
    this.setState({
      adminLoginState: true,
      adminCredentialErrorMessage: true,
    });
    this.props.setAdminCredentialsAction(this.state.admin.adminId, this.state.admin.adminPassword);
  }

  /**
   * fetchStudentById method fetch the student data while student login through URL.
   */
  // This may be use in future.
  /* fetchStudentById () {
    this.props.setStudentCredentials(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.props.fetchStudentData(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.setState({
      registeredStudentCredentialErrorMessage: true,
    });
  };*/
  /**
   * handleInputChange method set the admin credential in state
   * and all in format value and name in key value format through
   * setRegistrationData functional component.
   * @param {String} value
   * @param {String} name
   */
  handleInputChange(value, name) {
    const updatedData = extend(cloneDeep(this.state.credentials),
      setRegistrationData(value, name));

    const adminData = extend(cloneDeep(this.state.admin),
      setRegistrationData(value, name));

    this.setState({
      credentials: updatedData,
      admin: adminData,
      adminCredentialErrorMessage: false,
      registeredStudentCredentialErrorMessage: false,
    });
  }

  /**
   * renderRegistrationCorrectionFields method return student credential fields
   * @return {ReactComponent}
   */
  // This may be use in future
  /* renderRegistrationCorrectionFields() {
    return (
      <div>
        <div className = "form-input-wrapper">
            <InputField
                type={'number'}
                name={'studentId'}
                label={ID_NUMBER_TEXT}
                placeholder={ENTER_ID_NUMBER_MESSAGE}
                onInputChange={this._handleInputChange}
                value={this.state.credentials.studentId}
            />
            <InputField
                type={'text'}
                name={'secretKey'}
                label={SECRET_CODE_TEXT}
                placeholder={ENTER_SECRET_CODE_MESSAGE}
                onInputChange={this._handleInputChange}
                value={this.state.credentials.secretKey}
            />
            {this.checkRegisteredStudentCredential()}
        </div>
          <div className = "button-wrapper">
              <Button
                  type="button"
                  buttonText={goBackBtnText}
                  onClick={this._disableStudentInfoCorrectionButtons}
              />
              <Button
                type="button"
                buttonText={viewEditInfoBtnText}
                onClick={this._fetchStudentById}
            />
          </div>
      </div>
    )
  }*/

  // FIXME: Create a separate component to render admin login fields
  renderAdminLoginFields() {
    return (
      <div>
        <form id="adminCredential">
          <div className="form-input-wrapper">
            <InputField
              type="text"
              name="adminId"
              label="Admin ID"
              placeholder="Enter Admin ID"
              onInputChange={this._handleInputChange}
              value={this.state.admin.adminId}
            />
            <InputField
              type="password"
              name="adminPassword"
              label="Admin Password"
              placeholder="Enter Admin Password"
              onInputChange={this._handleInputChange}
              value={this.state.admin.adminPassword}
            />
            {this._adminScreenRedirection()}
          </div>
          <div className="button-wrapper">
            <Button
              type="button"
              buttonText={goBackBtnText}
              onClick={this._disableAdminLoginButtons}
            />
            <Button
              type="submit"
              form="adminCredential"
              buttonText={formSubmitBtnText}
              onClick={this._setAdminLogin}
            />
          </div>
        </form>
      </div>
    );
  }

  /**
   * redirectToNewRegistrationPage method set the value of isNewRegistration true on Onclick
   * of new registration button.
   */
  redirectToNewRegistrationPage() {
    this.setState({
      isNewRegistration: true,
    });
    this.props.setHashLinkForNewRegistrationAction(USER_TYPES.ADMIN);
  }
  // FixMe: Use separate methods for redirection and rendering Button fields
  renderLoginField() {
    // this may be use in future
    /* if (this.state.isCorrection) {
      this.props.setHashLinkForStudentCredentialAction(USER_TYPES.ADMIN);
      return <Switch><Redirect to="/student-login" /></Switch>;
    } else*/ if (this.state.isAdmin) {
      return this.renderAdminLoginFields();
    } else if (this.state.isNewRegistration) {
      return <Switch><Redirect to="/studentRegister" /></Switch>;
    }
    return (
      <div>
        {/* // this may be use in future
        <Button
          type="button"
          buttonText={alreadyRegisteredBtnText}
          onClick={this._enableStudentInfoCorrectionButtons}
        />*/}
        <Button
          type="button"
          buttonText={newRegistrationBtnText}
          onClick={this.redirectToNewRegistrationPage}
        />
        <Button
          type="button"
          buttonText={adminLoginBtnText}
          onClick={this._enableAdminLoginButtons}
        />
      </div>
    );
  }
  render() {
    if (this.state.isURLParams) {
      return <Switch><Redirect to="/studentCorrection" /></Switch>;
    }
    return (
      <div className="landing-page-block">
        <div className="landing-page-wrapper">
          <div className="landing-page-content">
            <div className="yjsg-event-info">
              <h5 className="primary-color">{eventDate}</h5>
              <h5 className="header-text">{eventVenue}</h5>
            </div>
            <div className="landing-page-logo">
              <img src={yjsgLogo} alt="yjsg logo" />
            </div>
            <div className="landing-page-button-container">
              {this.renderLoginField()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SplashPage.propTypes = {
  fetchStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
  setAdminLoginStateAction: PropTypes.func,
  setHashLinkForStudentCredentialAction: PropTypes.func,
  setHashLinkForNewRegistrationAction: PropTypes.func,
  setAdminCredentialsAction: PropTypes.func,
  adminLoginState: PropTypes.bool,
  id: PropTypes.string,
  password: PropTypes.string,
};

SplashPage.defaultProps = {
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
  setAdminLoginStateAction: () => {},
  setHashLinkForStudentCredentialAction: () => {},
  setHashLinkForNewRegistrationAction: () => {},
  setAdminCredentialsAction: () => {},
  adminLoginState: false,
  id: '',
  password: '',
};
const mapStateToProps = state => ({
  id: getAdminId(state),
  password: getAdminPassword(state),
  isLoading: isLoading(state),
  searchResults: getSearchResults(state),
  adminLoginState: stateOfAdminLogin(state),
  studentData: getStudent(state),
  isFetched: isFetched(state),
});
export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
})(SplashPage);
