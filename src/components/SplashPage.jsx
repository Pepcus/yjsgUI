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
  isLoading,
  stateOfAdminLogin,
} from '../reducers/studentRegistrationReducer';

import yjsgLogo from '../assets/yjsgLogo.png';
import {
  adminId,
  adminPassword,
  eventDate,
  eventVenue,
  yjsgHeader,
  goBackBtnText,
  alreadyRegisteredBtnText,
  newRegistrationBtnText,
  viewEditInfoBtnText,
  adminLoginBtnText,
  loginBtnText,
  invalidAdminMsg,
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
      message: false,
    };

    this._enableEditInfo = this.enableEditInfo.bind(this);
    this._disableEditInfo = this.disableEditInfo.bind(this);
    this._enableAdminLogin = this.enableAdminLogin.bind(this);
    this._disableAdminLogin = this.disableAdminLogin.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this._fetchStudentById = this.fetchStudentById.bind(this);
    this._setAdminLogin = this.setAdminLogin.bind(this);
    this.checkAdminCredential = this.checkAdminCredential.bind(this);
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
     let data = sessionStorage.getItem('isAdminLogin');
    if (!data) {
      const {
        id,
        password,
      } = this.props;
      if(this.state.message) {
        if (id !== adminId || password !== adminPassword) {
          return (
            <div className={'errorPopupContainer'}>
              <h5>{invalidAdminMsg}</h5>
            </div>
          );
        }
        else {
          sessionStorage.setItem('isAdminLogin', 'yes');
          return <Switch><Redirect to={'/student-search'}/></Switch>
          }
      }
      return null;
      }else {
      return <Switch><Redirect to={'/student-search'}/></Switch>
      }
      }
  setAdminLogin() {
    this.setState({
      adminLoginState: true,
      message: true
    });
    this.props.setAdminLoginStateAction(true);
    this.props.setAdminCredentialsAction(this.state.admin.adminId, this.state.admin.adminPassword);
  }

  fetchStudentById () {
    this.props.setStudentCredentials(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.props.fetchStudentData(this.state.credentials.studentId,
      this.state.credentials.secretKey);
  };

  handleInputChange(value, name) {
    let updatedData = extend(cloneDeep(this.state.credentials),
      setRegistrationData(value, name));

    let adminData = extend(cloneDeep(this.state.admin),
      setRegistrationData(value, name));

    this.setState({
      credentials: updatedData,
      admin: adminData,
      message: false,
    });
  }

  renderRegistrationCorrectionFields() {
    return (
      <div>
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
        <LinkButton
          buttonText={viewEditInfoBtnText}
          linkPath={'/studentCorrection'}
          onClick={this._fetchStudentById}
        />
        <Button
          buttonText={goBackBtnText}
          onClick={this._disableEditInfo}
        />
      </div>
    )
  }

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
              onclick={this.setAdminCredentialFalse}
            />
            <InputField
              type={'password'}
              name={'adminPassword'}
              label={'Admin Password'}
              placeholder={'Enter Admin Password'}
              onInputChange={this._handleInputChange}
              value={this.state.admin.adminPassword}
              onclick={this.setAdminCredentialFals}
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
      return this.renderRegistrationCorrectionFields();
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
        <div className={'landingPageContainer'}>
          <h2>{yjsgHeader}</h2>
          <div className={'landingPageContent'}>
            <div className={'yjsgEventInfo'}>
              <h5 className="primary-color">{eventDate}</h5>
              <h5>{eventVenue}</h5>
            </div>
            <div className={'landingPageLogo'}>
              <img src={yjsgLogo} alt={'yjsg logo'} />
            </div>
            <div className={'landingPageButtonContainer'}>
              {this.renderLoginField()}
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
});
export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
})(SplashPage);
