/* This component is deprecated. Please do not use this component*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';

import LinkButton from '../commonComponents/LinkButton';
import Button from '../commonComponents/Button';
import InputField from '../formComponents/InputField';
import {
  fetchStudentData,
  setAdminCredentialsAction,
  setStudentCredentials,
  setAdminLoginStateAction,
} from '../../actions/studentRegistrationActions';
import yjsgLogo from '../../assets/images/yjsgLogo.png';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getStudent,
  isFetched,
  isLoading,
  stateOfAdminLogin,
  getUserId,
  getUserSecretKey,
} from '../../reducers/studentRegistrationReducer';
import {
  adminId,
  adminPassword,
  eventDate,
  eventVenue,
  goBackBtnText,
  alreadyRegisteredBtnText,
  newRegistrationBtnText,
  adminLoginBtnText,
  invalidAdminMsg, formSubmitBtnText,
} from '../../utils/yjsgConstants';
import { setRegistrationData } from '../../utils/registrationFormUtils';

// FixMe: This component is unnecessary.
//  Please use splash page to show pre-populated data and remove this component

/** This component may be use in future
 * SplashPage component is home page of admin panel
 * @type {Class}
 */
class SplashPagePrePopulated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCorrection: false,
      isAdmin: false,
      credentials: {},
      admin: {},
      adminCredentialErrorMessage: false,
      isURLParams: false,
      adminLoginState: false,
      registeredStudentCredentialErrorMessage: false,
    };

    // FIXME: Use arrow functions to avoid binding.
    this.enableStudentInfoCorrectionButtons = this.enableStudentInfoCorrectionButtons.bind(this);
    this.disableStudentInfoCorrectionButtons = this.disableStudentInfoCorrectionButtons.bind(this);
    this.enableAdminLoginButtons = this.enableAdminLoginButtons.bind(this);
    this.disableAdminLoginButtons = this.disableAdminLoginButtons.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this._setAdminLogin = this.setAdminLogin.bind(this);
    this.adminScreenRedirection = this.adminScreenRedirection.bind(this);
    // This may be use in future.
    // this._fetchStudentById = this.fetchStudentById.bind(this);
    // this.checkRegisteredStudentCredential = this.checkRegisteredStudentCredential.bind(this);
  }

  componentDidMount() {
    this.setState({
      credentials: {
        studentId: this.props.studentId,
        secretKey: this.props.secretKey,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      credentials: {
        studentId: nextProps.studentId,
        secretKey: nextProps.secretKey,
      },
    });
  }

  /**
   * enableStudentInfoCorrectionButtons method enable the student information
   * corrections button by onClick of already register button.
   * It set the value of isCorrection to true.
   */
  enableStudentInfoCorrectionButtons() {
    this.setState({
      isCorrection: true,
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
  disableStudentInfoCorrectionButtons() {
    this.setState({
      isCorrection: false,
    });
  }

  /**
   * adminScreenRedirection method redirect to admin page on some condition.
   * @return {ReactComponent}
   */
  adminScreenRedirection() {
    if (!this.props.adminLoginState) {
      const {
        id,
        password,
      } = this.props;
      if (this.state.adminCredentialErrorMessage) {
        if (id !== adminId || password !== adminPassword) {
          return (
            <div className="errorPopupContainer">
              <h5>{invalidAdminMsg}</h5>
            </div>
          );
        }
        this.props.setAdminLoginStateAction(true);
        return <Switch><Redirect to="/student-search" /></Switch>;

      }
      return null;
    }
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
        return (<div>
          <h5>{invalidIdMessage}</h5>
        </div>);
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
        <div className="button-wrapper">
          <Button
            buttonText={goBackBtnText}
            onClick={this.disableStudentInfoCorrectionButtons}
          />
          <Button
            buttonText={viewEditInfoBtnText}
            onClick={this._fetchStudentById}
          />
        </div>
      </div>
    )
  }*/

  renderAdminLoginFields() {
    return (
      <div>
        <form id="adminCredential">
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
          {this.adminScreenRedirection()}
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
   * renderLoginField method redirect to "/student-login" or
   * render admin login field or admin home page buttons
   * according to condition.
   * @return {ReactComponent}
   */
  renderLoginField() {
    if (this.state.isCorrection) {
      return <Switch><Redirect to="/student-login" /></Switch>;
    } else if (this.state.isAdmin) {
      return this.renderAdminLoginFields();
    }

    return (
      <div>
        <Button
          buttonText={alreadyRegisteredBtnText}
          onClick={this.enableStudentInfoCorrectionButtons}
        />
        <LinkButton
          buttonText={newRegistrationBtnText}
          linkPath="/studentRegister"
        />
        <Button
          buttonText={adminLoginBtnText}
          onClick={this.enableAdminLoginButtons}
        />
      </div>
    );

  }

  render() {
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

SplashPagePrePopulated.propTypes = {
  fetchStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
  setAdminLoginStateAction: PropTypes.func,
  setAdminCredentialsAction: PropTypes.func,
  studentId: PropTypes.string,
  secretKey: PropTypes.string,
  adminLoginState: PropTypes.bool,
  id: PropTypes.string,
  password: PropTypes.string,
};

SplashPagePrePopulated.defaultProps = {
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
  setAdminLoginStateAction: () => {},
  setAdminCredentialsAction: () => {},
  studentId: '',
  secretKey: '',
  adminLoginState: false,
  id: '',
  password: '',
};

const mapStateToProps = state => ({
  studentId: getUserId(state),
  id: getAdminId(state),
  secretKey: getUserSecretKey(state),
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
})(SplashPagePrePopulated);
