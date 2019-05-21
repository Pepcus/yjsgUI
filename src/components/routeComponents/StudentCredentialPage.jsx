import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import LinkButton from '../common/LinkButton';
import Button from '../common/Button';
import InputField from '../form/InputField';
import {
  fetchStudentData,
  setStudentCredentials,
  setUserTypeAction,
} from '../../actions/studentRegistrationActions';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getStudent,
  isFetched,
  isLoading,
  getHash,
  getUserId,
  getUserSecretKey,
} from '../../reducers/studentRegistrationReducer';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';
import yjsgLogo from '../../assets/images/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  goBackBtnText,
  viewEditInfoBtnText,
  invalidIdMessage,
  USER_TYPES,
} from '../../constants/yjsg';
import {
  ENTER_ID_NUMBER_MESSAGE,
  ENTER_SECRET_CODE_MESSAGE,
} from '../../constants/messages';
import {
  ID_NUMBER_TEXT,
  SECRET_CODE_TEXT,
} from '../../constants/text';
import { setRegistrationData } from '../../utils/registrationFormUtils';
import { getParameterByName } from '../../utils/http';

// FixMe:This component is unnecessary.
//  Please use splash page to show pre-populated data and remove this component
/**
 * StudentCredentialPage is render student credential form
 * @type {Class}
 */
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
    // If admin redirect to student credential page in that case
    // pre populate the id and secretKey of previous login student
    if (this.props.context.previousLocation === '/admin') {
      this.setState({
        credentials: { studentId: this.props.studentId, secretKey: this.props.secretKey },
      });
    // else student credential fields are empty
    } else if (this.props.context.previousLocation === '/') {
      this.setState({
        credentials: {},
      });
    }
    // If student login through URL
    // then get the id and secretKey form URL and fetch the student data
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');
    if (id && secretCode) {
      this.fetchStudentByURLParams(id, secretCode);
    }
  }

  /**
   * fetchStudentByURLParams method fetch
   * the particular student data according id and secretKey
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
   * checkRegisteredStudentCredential method check the credential
   * of which is already registered.
   * @return {ReactComponent}
   */
  checkRegisteredStudentCredential() {
    if (this.state.registeredStudentCredentialErrorMessage) {
      if ((!this.props.studentData || !this.props.isFetched) && !this.props.isLoading) {
        return (
          <div className="errorPopupContainer">
            <h5 className="error-message">{invalidIdMessage}</h5>
          </div>
        );
      } else if (this.props.studentData && this.props.isFetched) {
        this.props.setUserTypeAction(USER_TYPES.STUDENT);
        return (
          <div>
            <Redirect to="/studentCorrection" />
          </div>
        );
      }
    }
    return null;
  }

  /**
   * fetchStudentById method fetch the student
   * data on submit of student credential
   * @param {Object} event
   */
  fetchStudentById(event) {
    event.preventDefault();
    this.props.setStudentCredentials(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.props.fetchStudentData(this.state.credentials.studentId,
      this.state.credentials.secretKey);

    // this.setState({
    //   registeredStudentCredentialErrorMessage: true,
    // });

    this.props.setUserTypeAction(USER_TYPES.STUDENT);
    this.setState({
      redirectToStudentCorrectionByUrl: true,
    });
  }

  /**
   * handleInputChange method set the student credential in state
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
   * renderBackButton method return back button according to user type.
   * @return {ReactComponent}
   */
  renderBackButton() {
    if (this.props.hashLink === USER_TYPES.ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/admin"
        />
      );
    } else if (this.props.hashLink === USER_TYPES.STUDENT) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/"
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

  /**
   * renderRegistrationCorrectionFields method return student login fields
   * @return {ReactComponent}
   */
  renderRegistrationCorrectionFields() {
    return (
      <div className="student-already-register-form">
        <form id="studentCredential">
          <div className="form-input-wrapper ">
            <InputField
              type="number"
              name="studentId"
              label={ID_NUMBER_TEXT}
              placeholder={ENTER_ID_NUMBER_MESSAGE}
              onInputChange={this._handleInputChange}
              value={this.state.credentials.studentId}
            />
            <InputField
              type="text"
              name="secretKey"
              label={SECRET_CODE_TEXT}
              placeholder={ENTER_SECRET_CODE_MESSAGE}
              onInputChange={this._handleInputChange}
              value={this.state.credentials.secretKey}
            />
            {this.checkRegisteredStudentCredential()}
          </div>
          <div className="button-wrapper">
            {this.renderBackButton()}
            <div className="button-container">
              <Button
                buttonText={viewEditInfoBtnText}
                type="submit"
                value="Submit"
                formName="studentCredential"
                onClick={this._fetchStudentById}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.state.isURLParams) {
      return <Switch><Redirect to="/studentCorrection" /></Switch>;
    } else if (this.state.redirectToStudentCorrectionByUrl) {
      return <Switch><Redirect to="/studentCorrection" /></Switch>;
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
  setUserTypeAction: PropTypes.func,
  context: PropTypes.object,
  isFetched: PropTypes.bool,
  isLoading: PropTypes.bool,
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secretKey: PropTypes.string,
  hashLink: PropTypes.string,
  tenant: PropTypes.string,
};

StudentCredentialPage.defaultProps = {
  setUserTypeAction: () => {},
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
  studentData: '',
  context: {},
  isFetched: false,
  isLoading: false,
  studentId: '',
  secretKey: '',
  hashLink: '',
  tenant: '',
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
  tenant: getApplicationTenant(state),
});
export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
  setUserTypeAction,
  getApplicationTenant,
})(StudentCredentialPage);
