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
  setAdminCredentials,
  setAdminLoginState,
} from '../actions/studentRegistrationActions';

import yjsgLogo from '../assets/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  yjsgHeader,
  goBackBtnText,
  alreadyRegisteredBtnText,
  newRegistrationBtnText,
  viewEditInfoBtnText,
  adminLoginBtnText,
  loginBtnText,
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
    };

    this._enableEditInfo = this.enableEditInfo.bind(this);
    this._disableEditInfo = this.disableEditInfo.bind(this);
    this._enableAdminLogin = this.enableAdminLogin.bind(this);
    this._disableAdminLogin = this.disableAdminLogin.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this._fetchStudentById = this.fetchStudentById.bind(this);
    this._setAdminLogin = this.setAdminLogin.bind(this);
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

  setAdminLogin() {
    this.setState({
      adminLoginState: true,
    });
    this.props.setAdminLoginState(true);
    this.props.setAdminCredentials(this.state.admin.adminId, this.state.admin.adminPassword);
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
        <Button
          buttonText={goBackBtnText}
          onClick={this._disableAdminLogin}
        />
        <LinkButton
          buttonText={loginBtnText}
          linkPath={'/adminPanel'}
          onClick={this._setAdminLogin}
        />

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

export default connect(null, {
  fetchStudentData,
  setStudentCredentials,
  setAdminCredentials,
  setAdminLoginState,
})(SplashPage);
