import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import LinkButton from './commonComponents/LinkButton';
import Button from './commonComponents/Button';
import InputField from './formComponents/InputField';
import {
  fetchStudentData,
  setStudentCredentials,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
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

import yjsgLogo from '../assets/yjsgLogo.png';
import {
  adminId,
  adminPassword,
  yjsgHeader,
  eventDate,
  eventVenue,
  goBackBtnText,
  alreadyRegisteredBtnText,
  newRegistrationBtnText,
  //viewEditInfoBtnText,
  loginBtnText,
  adminLoginBtnText,
  invalidAdminMsg,
  //invalidIdMessage,
} from '../utils/yjsgConstants';
import { setRegistrationData } from '../utils/registrationFormUtils';
import { getParameterByName } from '../utils/http';
import { setRedirect } from './DataGrid';
import Context from "./coreComponents/ConfigProvider";

class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCorrection: false,
      isAdmin: false,
      credentials: {},
      admin: {},
      isURLParams: false,
      adminLoginState: false,
      adminCredentialErrorMessage: false,
      registeredStudentCredentialErrorMessage:false,
    };

    this._enableEditInfo = this.enableEditInfo.bind(this);
    this._disableEditInfo = this.disableEditInfo.bind(this);
    this._enableAdminLogin = this.enableAdminLogin.bind(this);
    this._disableAdminLogin = this.disableAdminLogin.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    //this._fetchStudentById = this.fetchStudentById.bind(this);
    this._setAdminLogin = this.setAdminLogin.bind(this);
    this.checkAdminCredential = this.checkAdminCredential.bind(this);
   // this.checkRegisteredStudentCredential = this.checkRegisteredStudentCredential.bind(this);
  }

  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secCode');
    if (id && secretCode) {
      this.fetchStudentByURLParams(id, secretCode);
    }
  }

  fetchStudentByURLParams(id, secretCode) {
    this.props.setStudentCredentials(id, secretCode);
    this.props.fetchStudentData(id, secretCode);
    this.setState({
      isURLParams: true,
    })
  }

  enableEditInfo() {
    this.setState({
      isCorrection: true,
    })
  }

  enableAdminLogin() {
    this.setState({
      isAdmin: true,
    });
  }

  disableAdminLogin() {
    this.setState({
      isAdmin: false,
    })
  }

  disableEditInfo() {
    this.setState({
      isCorrection: false,
    })
  }
  checkAdminCredential(){
    if (!this.props.adminLoginState) {
      const {
        id,
        password,
      } = this.props;
      if(this.state.adminCredentialErrorMessage) {
        if (id !== adminId || password !== adminPassword) {
          return (
            <div className={'errorPopupContainer'}>
              <h5>{invalidAdminMsg}</h5>
            </div>
          );
        }
        else {
          this.props.setAdminLoginStateAction(true);
          return <Switch><Redirect to={'/student-search'}/></Switch>
          }
      }
      return null;
      }else {
      return <Switch><Redirect to={'/student-search'}/></Switch>
      }
      }
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
  setAdminLogin() {
    this.setState({
      adminLoginState: true,
      adminCredentialErrorMessage: true
    });
    this.props.setAdminCredentialsAction(this.state.admin.adminId, this.state.admin.adminPassword);
  }

 /* fetchStudentById () {
    this.props.setStudentCredentials(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.props.fetchStudentData(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.setState({
      registeredStudentCredentialErrorMessage: true,
    });
  };*/

  handleInputChange(value, name) {
    let updatedData = extend(cloneDeep(this.state.credentials),
      setRegistrationData(value, name));

    let adminData = extend(cloneDeep(this.state.admin),
      setRegistrationData(value, name));

    this.setState({
      credentials: updatedData,
      admin: adminData,
      adminCredentialErrorMessage: false,
      registeredStudentCredentialErrorMessage: false,
    });
  }

  /*renderRegistrationCorrectionFields() {
    return (
      <div>
        <div className = "form-input-wrapper">
            <InputField
                type={'number'}
                name={'studentId'}
                label={'आई.डी. नं.'}
                placeholder={'अपना आई.डी. नं. दर्ज करें'}
                onInputChange={this._handleInputChange}
                value={this.state.credentials.studentId}
            />
            <InputField
                type={'text'}
                name={'secretKey'}
                label={'सीक्रेट कोड'}
                placeholder={'अपना सीक्रेट कोड दर्ज करें'}
                onInputChange={this._handleInputChange}
                value={this.state.credentials.secretKey}
            />
            {this.checkRegisteredStudentCredential()}
        </div>
          <div className = "button-wrapper">
              <Button
                  buttonText={goBackBtnText}
                  onClick={this._disableEditInfo}
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
          <div className="form-input-wrapper">
            <InputField
              type={'text'}
              name={'adminId'}
              label={'Admin ID'}
              placeholder={'Enter Admin ID'}
              onInputChange={this._handleInputChange}
              value={this.state.admin.adminId}
            />
            <InputField
              type={'password'}
              name={'adminPassword'}
              label={'Admin Password'}
              placeholder={'Enter Admin Password'}
              onInputChange={this._handleInputChange}
              value={this.state.admin.adminPassword}
            />
              {this.checkAdminCredential()}
          </div>
        <div className = "button-wrapper">
            <Button
                buttonText={goBackBtnText}
                onClick={this._disableAdminLogin}
            />
            <Button
                buttonText={loginBtnText}
                onClick={this._setAdminLogin}
            />
        </div>
      </div>
    );
  }

  renderLoginField() {
    if (this.state.isCorrection) {
      return <Switch><Redirect to={'/student-login'} /></Switch>
    } else if (this.state.isAdmin) {
      return this.renderAdminLoginFields();
    }
    else {
      return (
        <div>
          <Button
            buttonText={alreadyRegisteredBtnText}
            onClick={this._enableEditInfo}
          />
          <LinkButton
            buttonText={newRegistrationBtnText}
            linkPath={'/studentRegister'}
          />
          <Button
            buttonText={adminLoginBtnText}
            onClick={this._enableAdminLogin}
          />
        </div>
      )
    }
  }


  render() {
      if (this.state.isURLParams) {
        return <Switch><Redirect to={'/studentCorrection'} /></Switch>
      }
    return (
      <div className="landing-page-block">
        <div className={'landingPageContainer'}>
          <h2 className="student-heading">{yjsgHeader}</h2>
        </div>
          <div className="landing-page-wrapper">
            <div className={'landingPageContent'}>
              <div className={'yjsg-event-info'}>
                <h5 className="primary-color">{eventDate}</h5>
                <h5 className="header-text">{eventVenue}</h5>
              </div>
              <div className={'landingPageLogo'}>
                <img src={yjsgLogo} alt={'yjsg logo'} />
              </div>
              <div className={'landingPageButtonContainer'}>
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
};

SplashPage.defaultProps = {
  fetchStudentData: () => {},
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
})(SplashPage);
