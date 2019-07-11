import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import LinkButton from '../common/LinkButton';
import Button from '../common/Button';
import {
  fetchStudentDataAction,
  setStudentCredentialsAction,
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
import { getTenantName } from '../../reducers/appConfigReducer';
import yjsgLogo from '../../assets/images/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  goBackBtnText,
  viewEditInfoBtnText,
  USER_TYPES,
} from '../../constants/yjsg';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../../constants/messages';
import { getParameterByName } from '../../utils/http';
import Form from '../form';
import { StudentCredentialPageJsonSchema } from '../../config/fromJsonSchema.json';

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
      isURLParams: false,
      hasError: true,
      isSubmitTrigger: false,
      redirectToStudentCorrectionLogin: false,
    };

    this._fetchStudentById = this.fetchStudentById.bind(this);
    this.renderBackButton = this.renderBackButton.bind(this);
  }

  componentWillMount() {
    const { context, studentId, secretKey } = this.props;

    // If admin redirect to student credential page in that case
    // pre populate the id and secretKey of previous login student
    if (context.previousLocation === '/admin') {
      this.setState({
        credentials: { studentId, secretKey },
      });// else student credential fields are empty

    } else if (context.previousLocation === '/') {
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
   * renderViewEditButton render button of view or edit information of member Button
   * @return {HTML} button
   */
  renderViewEditButton = () => (
    <Button
      buttonText={viewEditInfoBtnText}
      type="submit"
      value="Submit"
      disabled={this.state.isSubmitTrigger}
      formName="studentCredential"
      onClick={this._fetchStudentById}
    />
  );

  /**
   * transformErrors method return error message object
   * @return {Object} error message object
   */
  transformErrors = () => ({
    'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  });

  /**
   * onChange method handle onChange of student login form
   * @param {Object} formData
   * @param {Object} errors
   */
  onChange = ({ formData, errors }) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        ...formData,
      },
      hasError: isEmpty(errors),
      isSubmitTrigger: false,
    });
  };

  /**
   * fetchStudentByURLParams method fetch
   * the particular student data according id and secretKey
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
   * fetchStudentById method fetch the student
   * data on submit of student credential
   * @param {Object} event
   */
  fetchStudentById(event) {

    const { credentials } = this.state;
    const { STUDENT } = USER_TYPES;

    event.preventDefault();
    if (this.state.hasError) {
      this.props.setStudentCredentialsAction(credentials.studentId,
        credentials.secretKey);
      this.props.fetchStudentDataAction(credentials.studentId,
        credentials.secretKey);
      this.props.setUserTypeAction(STUDENT);
      this.setState({
        redirectToStudentCorrectionLogin: true,
        isSubmitTrigger: true,
      });
    }

  }

  /**
   * renderBackButton method return back button according to user type.
   * @return {HTML}
   */
  renderBackButton() {
    const { hashLink, context } = this.props;
    const { ADMIN, STUDENT } = USER_TYPES;

    if (hashLink === ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/admin"
        />
      );

    } else if (hashLink === STUDENT) {
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
        linkPath={context.previousLocation}
      />
    );
  }

  /**
   * renderRegistrationCorrectionFields method return student login form
   * @return {HTML}
   */
  renderRegistrationCorrectionFields() {
    const uiSchema = {
      ...StudentCredentialPageJsonSchema.uiSchema,
      backButton: {
        ...StudentCredentialPageJsonSchema.uiSchema.backButton,
        'ui:widget': () => (
          this.renderBackButton()
        ),
      },
      viewEditButton: {
        ...StudentCredentialPageJsonSchema.uiSchema.viewEditButton,
        'ui:widget': () => (
          this.renderViewEditButton()
        ),
      },
    };
    const { credentials } = this.state;
    return (
      <div className="student-already-register-form">
        <Form
          showErrorList={false}
          liveValidate
          schema={StudentCredentialPageJsonSchema.schema}
          uiSchema={uiSchema}
          formData={credentials}
          onChange={this.onChange}
          transformErrors={this.transformErrors}
        />
      </div>
    );
  }

  render() {
    const { isURLParams, redirectToStudentCorrectionLogin } = this.state;
    const { tenant } = this.props;

    if (isURLParams) {
      return <Switch><Redirect to="/studentCorrection" /></Switch>;

    } else if (redirectToStudentCorrectionLogin && this.state.hasError) {
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
              {this.renderRegistrationCorrectionFields()}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

StudentCredentialPage.propTypes = {
  context: PropTypes.object,
  fetchStudentDataAction: PropTypes.func,
  hashLink: PropTypes.string,
  isStudentFetched: PropTypes.bool,
  isLoading: PropTypes.bool,
  secretKey: PropTypes.string,
  setStudentCredentialsAction: PropTypes.func,
  setUserTypeAction: PropTypes.func,
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tenant: PropTypes.string,
};

StudentCredentialPage.defaultProps = {
  context: {},
  fetchStudentDataAction: () => {},
  hashLink: '',
  isStudentFetched: false,
  isLoading: false,
  secretKey: '',
  setStudentCredentialsAction: () => {},
  setUserTypeAction: () => {},
  studentData: '',
  studentId: '',
  tenant: '',
};

const mapStateToProps = state => ({
  hashLink: getHash(state),
  id: getAdminId(state),
  isStudentFetched: isFetched(state),
  isLoading: isLoading(state),
  password: getAdminPassword(state),
  searchResults: getSearchResults(state),
  secretKey: getUserSecretKey(state),
  studentData: getStudent(state),
  studentId: getUserId(state),
  tenant: getTenantName(state),
});

export default connect(mapStateToProps, {
  fetchStudentDataAction,
  getTenantName,
  setStudentCredentialsAction,
  setUserTypeAction,
})(StudentCredentialPage);
