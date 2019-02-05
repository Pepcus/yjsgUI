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
} from '../actions/studentRegistrationActions';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getStudent,
  isFetched,
  isLoading,
  getHash,
  getUserId, getUserSecretKey,
} from '../reducers/studentRegistrationReducer';

import yjsgLogo from '../assets/yjsgLogo.png';
import {
  yjsgHeader,
  eventDate,
  eventVenue,
  goBackBtnText,
  viewEditInfoBtnText,
  invalidIdMessage,
} from '../utils/yjsgConstants';
import { setRegistrationData } from '../utils/registrationFormUtils';
import { getParameterByName } from '../utils/http';
/*
* The StudentCredentialPage component for the student which will render -
* Already Registered student credential field.
 * @type {class}
 * */
class StudentCredentialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {},
      admin: {},
      isURLParams: false,
      adminCredentialErrorMessage: false,
      registeredStudentCredentialErrorMessage: false,
    };

    this._handleInputChange = this.handleInputChange.bind(this);
    this._fetchStudentById = this.fetchStudentById.bind(this);
    this.checkRegisteredStudentCredential = this.checkRegisteredStudentCredential.bind(this);
    this.renderBackButton = this.renderBackButton.bind(this);
  }

  componentWillMount() {
    if (this.props.context.previousLocation === '/') {
      this.setState({
        credentials: {studentId: this.props.studentId, secretKey: this.props.secretKey},
      });
    } else if (this.props.context.previousLocation === '/reg') {
      this.setState({
        credentials: {},
      });
    }
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
    });
  }
  checkRegisteredStudentCredential() {
    if (this.state.registeredStudentCredentialErrorMessage) {
      if ((!this.props.studentData || !this.props.isFetched) && !this.props.isLoading) {
        return (
          <div className="errorPopupContainer">
            <h5 className="error-message">{invalidIdMessage}</h5>
          </div>
        );
      } else if (this.props.studentData && this.props.isFetched) {
        return (
          <div>
            <Redirect to="/studentCorrection" />
          </div>
        );
      }
    }
    return null;
  }
  fetchStudentById() {
    this.props.setStudentCredentials(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.props.fetchStudentData(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.setState({
      registeredStudentCredentialErrorMessage: true,
    });
  }

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
  renderBackButton() {
    if (this.props.hashLink === 'admin') {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/"
        />
      );
    } else if (this.props.hashLink === 'student') {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/reg"
        />
      );
    }
    return (
      <LinkButton
        buttonText={goBackBtnText}
        linkPath={this.props.context.previousLocation}
      />
    );
  }
  renderRegistrationCorrectionFields() {
    return (
      <div>
        <div className="form-input-wrapper">
          <InputField
            type="number"
            name="studentId"
            label="आई.डी. नं."
            placeholder="अपना आई.डी. नं. दर्ज करें"
            onInputChange={this._handleInputChange}
            value={this.state.credentials.studentId}
          />
          <InputField
            type="text"
            name="secretKey"
            label="सीक्रेट कोड"
            placeholder="अपना सीक्रेट कोड दर्ज करें"
            onInputChange={this._handleInputChange}
            value={this.state.credentials.secretKey}
          />
          {this.checkRegisteredStudentCredential()}
        </div>
        <div className="button-wrapper">
          {this.renderBackButton()}
          <Button
            buttonText={viewEditInfoBtnText}
            onClick={this._fetchStudentById}
          />
        </div>
      </div>
    );
  }
  render() {
    if (this.state.isURLParams) {
      return <Switch><Redirect to="/studentCorrection" /></Switch>;
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
              {this.renderRegistrationCorrectionFields()}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

StudentCredentialPage.propTypes = {
  fetchStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
  context: PropTypes.object,
  isFetched: PropTypes.bool,
  isLoading: PropTypes.bool,
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

};

StudentCredentialPage.defaultProps = {
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
  studentData: '',
  context: {},
  isFetched: false,
  isLoading: false,
};
const mapStateToProps = state => ({
  studentId: getUserId(state),
  id: getAdminId(state),
  secretKey: getUserSecretKey(state),
  password: getAdminPassword(state),
  isLoading: isLoading(state),
  searchResults: getSearchResults(state),
  studentData: getStudent(state),
  isFetched: isFetched(state),
  hashLink: getHash(state),
});
export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
})(StudentCredentialPage);
