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
  USER_TYPES,
} from '../../constants/yjsg';
import {
  ENTER_ID_NUMBER_MESSAGE,
  ENTER_SECRET_CODE_MESSAGE, THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../../constants/messages';
import {
  ID_NUMBER_TEXT,
  SECRET_CODE_TEXT,
} from '../../constants/text';
import { getParameterByName } from '../../utils/http';
import Form from '../Form';

// FixMe:This component is unnecessary.
//  Please use splash page to show pre-populated data and remove this component

const formDetail = {
  Schema: {
    'type': 'object',
    'properties': {
      'studentId': {
        'title': ID_NUMBER_TEXT,
        'type': 'number',
      },
      'secretKey': {
        'title': SECRET_CODE_TEXT,
        'type': 'string',
      },
      'backButton': {
        'type': 'string',
      },
      'viewEditButton': {
        'type': 'string',
      },
    },
    'required': ['studentId', 'secretKey'],
  },
  UISchema: {
    'studentId': {
      'ui:placeholder': ENTER_ID_NUMBER_MESSAGE,
    },
    'secretKey': {
      'ui:placeholder': ENTER_SECRET_CODE_MESSAGE,
      'ui:widget': 'textarea',
    },
    'backButton': {
      'classNames': 'button-style',
      'ui:options': {
        'label': false,
      },
    },
    'viewEditButton': {
      'classNames': 'button-style',
      'ui:options': {
        'label': false,
      },
    },
  },
  data: {},
};

/**
 * StudentCredentialPage is render student credential form
 * @type {Class}
 * @return {*} member login form
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
   * @return {*} button
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
    this.props.setStudentCredentials(id, secretCode);
    this.props.fetchStudentData(id, secretCode);
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
      this.props.setStudentCredentials(credentials.studentId,
        credentials.secretKey);
      this.props.fetchStudentData(credentials.studentId,
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
   * @return {*}
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
   * @return {*}
   */
  renderRegistrationCorrectionFields() {
    const uiSchema = {
      ...formDetail.UISchema,
      backButton: {
        ...formDetail.UISchema.backButton,
        'ui:widget': () => (
          this.renderBackButton()
        ),
      },
      viewEditButton: {
        ...formDetail.UISchema.viewEditButton,
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
          noHtml5Validate
          liveValidate
          schema={formDetail.Schema}
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
  fetchStudentData: PropTypes.func,
  hashLink: PropTypes.string,
  isStudentFetched: PropTypes.bool,
  isLoading: PropTypes.bool,
  secretKey: PropTypes.string,
  setStudentCredentials: PropTypes.func,
  setUserTypeAction: PropTypes.func,
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tenant: PropTypes.string,
};

StudentCredentialPage.defaultProps = {
  context: {},
  fetchStudentData: () => {},
  hashLink: '',
  isStudentFetched: false,
  isLoading: false,
  secretKey: '',
  setStudentCredentials: () => {},
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
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, {
  fetchStudentData,
  getApplicationTenant,
  setStudentCredentials,
  setUserTypeAction,
})(StudentCredentialPage);
