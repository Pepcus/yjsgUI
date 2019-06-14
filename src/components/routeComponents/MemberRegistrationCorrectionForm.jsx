import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import {
  formSubmitBtnText,
  goBackBtnText,
  infoUpdateSuccessMessage,
  invalidIdMessage,
  noInfoChangeMessage,
  USER_TYPES,
} from '../../constants/yjsg';
import {
  createStudentData,
  isUpdatedResetAction,
  setStudentCredentials,
  updateStudentData,
} from '../../actions/studentRegistrationActions';
import {
  INVALID_EMAIL_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../../constants/messages';
import {
  getPageUserType,
  getStudent,
  getUserId,
  getUserSecretKey,
  getUserType,
  isFetched,
  isUpdated,
} from '../../reducers/studentRegistrationReducer';
import Popup from '../common/Popup';
import LinkButton from '../common/LinkButton';
import Button from '../common/Button';
import { updateClassAttended2019InStudentData } from '../../utils/registrationFormUtils';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';
import { validation } from '../../config/memberRegisrationCurrectionFormShema.json';
import validations from '../../utils/validation';
import {
  InitialStudentData,
  prePopulateOptIn,
} from '../../utils/SampleFormValidation';
import CorrectionsForm from '../CorrectionsForm';

/**
 * MemberRegistrationCorrectionForm render member registration correction form.
 * @type {Class}
 */
class MemberRegistrationCorrectionForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      student: {},
      oldStudentDate: {},
      onlyOptInForm: true,
      isSubmitTriggered: false,
      hasError: false,
      isFormChanged: false,
    };
  }

  componentDidMount() {
    const { studentData } = this.props;
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const finalStudentData = !isEmpty(studentData) ? studentData : studentDataFromSession;
    const prePopulateOptInStudentData = prePopulateOptIn(finalStudentData);
    if (!isEmpty(prePopulateOptInStudentData)) {
      this.setState({
        student: InitialStudentData(prePopulateOptInStudentData),
        oldStudentDate: InitialStudentData(finalStudentData),
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(InitialStudentData(prePopulateOptInStudentData));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { studentData } = nextProps;
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const finalStudentData = !isEmpty(studentData) ? studentData : studentDataFromSession;
    const prePopulateOptInStudentData = prePopulateOptIn(finalStudentData);
    if (!isEmpty(prePopulateOptInStudentData)) {
      this.setState({
        student: InitialStudentData(prePopulateOptInStudentData),
        oldStudentDate: InitialStudentData(finalStudentData),
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(InitialStudentData(prePopulateOptInStudentData));
    }
  }

  /**
   * scrollToError method scroll to first form file which is in valid in mobile view only.
   */
  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-danger');
    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };

  /**
   * validate method check validation for only optIn is 'Y' form field and return conditional error for form field
   * @param {Object} formData
   * @param {Object} errors
   * @return {*}
   */
  validate = (formData, errors) => {
    const { student } = this.state;
    if (student.optIn2019 === 'Y') {
      validation.forEach((valid) => {
        const error = validations[valid.validates](formData[valid.field]);
        if (!isEmpty(error)) {
          errors[valid.field].addError(error);
        }
      });
      return errors;
    }
    return {};
  };

  /**
   * renderSuccessMessage render success message when form updated and submit successfully.
   * Otherwise render not success message
   * @return {*}
   */
  renderSuccessMessage = () => {
    const {
      isSubmitTriggered,
      isFormChanged,
      hasError,
    } = this.state;
    const { context, isStudentUpdated } = this.props;
    // if form data is update and valid and submitted successfully.
    if (isStudentUpdated) {
      return (
        <Popup>
          <h5>{infoUpdateSuccessMessage}</h5>
          <LinkButton
            buttonText={goBackBtnText}
            linkPath={context.previousLocation}
            onClick={() => { this.props.isUpdatedResetAction(); }}
          />
        </Popup>
      );
    } else if (isSubmitTriggered && !isFormChanged && hasError) {
      // if form data is not update and valid.
      return (
        <Popup>
          <h5>{noInfoChangeMessage}</h5>
          <LinkButton
            buttonText={goBackBtnText}
            linkPath={context.previousLocation}
          />
        </Popup>
      );
    } return null;
  };


  /**
   * updateStudentData method will update student data by onClick of submit button
   */
  updateStudentData = () => {
    const {
      id,
      secretKey,
    } = this.props;
    const { student } = this.state;
    // Calls api to update student data
    this.props.updateStudentData({
      id,
      secretKey,
      student,
    });
  };

  /**
   * prePopulateCourse2019 method pre populate course (level) of year 2019
   * @param {Object} studentData
   */
  prePopulateCourse2019 = (studentData) => {
    // const lastCourse = nextProps.studentData.classAttended2018;
    // const level = checkLevelValue(lastCourse);
    const updatedData = updateClassAttended2019InStudentData(studentData);
    this.setState({
      student: updatedData,
    });
  };

  /**
   * changeIsOnlyOptIn method set only optIn file form
   * @param {String} value
   */
  changeIsOnlyOptIn = (value) => {
    this.setState({
      onlyOptInForm: value,
    });
  };

  /**
   * renderSubmitButtons method render submit button
   * @return {*} submit button
   */
  renderSubmitButtons = () => (
    <Button
      buttonText={formSubmitBtnText}
      type="submit"
      formName=""
      value="Submit"
      onClick={this.handleSubmit}
    />
  );

  /**
   * handleSubmit submit updated form data on conditional
   * @param {Object} event
   */
  handleSubmit = (event) => {
    const { student, oldStudentDate, hasError } = this.state;
    delete student.backButton;
    delete student.submitButton;
    event.preventDefault();
    if (student.optIn2019 === 'N') {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    } else if (!isEqual(oldStudentDate, student) && hasError) {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    } else {
      this.setState({
        isFormChanged: false,
        isSubmitTriggered: true,
      }, () => { this.scrollToError(); });
    }
  };

  /**
   * submitStudentDataForOnlyOptInCase method submit form data for only optIn field
   * @param {Object} event
   */
  submitStudentDataForOnlyOptInCase = (event) => {
    const { student } = this.state;
    event.preventDefault();
    if (!isEmpty(student.optIn2019)) {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    }
  };

  /**
   * transformErrors method transform error of form field conditionally
   * optIn value should not be 'N'
   * @param {Array} errors
   * @return {Array} temError
   */
  transformErrors = (errors) => {
    const temError = [];
    const { studentData } = this.props;
    if (studentData.optIn2019 === 'N') {
      return [];
    }
    errors.forEach((error) => {
      if (studentData.optIn2019 !== 'N') {
        if (error.name === 'required' || error.name === 'enum') {
          temError.push({ ...error, message: THIS_INFORMATION_IS_COMPULSORY_MESSAGE });
        } else if (error.name === 'format' && error.params.format === 'email') {
          temError.push({ ...error, message: INVALID_EMAIL_MESSAGE });
        } else if (error.name !== 'type') {
          temError.push(error);
        }
      }
    });
    return temError;
  };

  /**
   * renderBackButton render back button conditionally for redirect to previous location .
   * @return {*}
   */
  renderBackButton = () => {
    const {
      pageUser,
      context,
    } = this.props;
    const { ADMIN, STUDENT_WITH_URL, STUDENT } = USER_TYPES;
    if (pageUser === ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={context.previousLocation}
        />
      );
    } else if (pageUser === STUDENT_WITH_URL || pageUser === STUDENT) {
      return (
        <Button
          type="button"
          buttonText={goBackBtnText}
          onClick={() => { this.changeIsOnlyOptIn(true); }}
        />
      );
    }
    return (
      <LinkButton
        buttonText={goBackBtnText}
        linkPath={context.previousLocation}
      />
    );
  };

  /**
   * onChange method handle onChange of form
   * @param {Object} event
   */
  onChange = (event) => {
    this.setState({
      student: {
        ...this.state.student,
        ...event.formData,
      },
      isFormChanged: true,
      isSubmitTriggered: false,
      hasError: isEmpty(event.errors),
    });
  };

  render() {
    const {
      isFetch,
      studentData,
      context,
      pageUser,
      tenant,
    } = this.props;
    const {
      onlyOptInForm,
      student,
    } = this.state;
    if (isFetch && studentData) {
      return (
        <CorrectionsForm
          pageUser={pageUser}
          tenant={tenant}
          onlyOptInForm={onlyOptInForm}
          renderSuccessMessage={this.renderSuccessMessage}
          validate={this.validate}
          student={student}
          onChange={this.onChange}
          transformErrors={this.transformErrors}
          submitStudentDataForOnlyOptInCase={this.submitStudentDataForOnlyOptInCase}
          changeIsOnlyOptIn={this.changeIsOnlyOptIn}
          renderBackButton={this.renderBackButton}
          formRef={this.formRef}
          renderSubmitButtons={this.renderSubmitButtons}
        />
      );
    }
    return (
      <Popup>
        <h5>{invalidIdMessage}</h5>
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={context.previousLocation}
        />
      </Popup>
    );
  }
}

MemberRegistrationCorrectionForm.propTypes = {
  context: PropTypes.object,
  id: PropTypes.string,
  isFetch: PropTypes.bool,
  isStudentUpdated: PropTypes.bool,
  isUpdatedResetAction: PropTypes.func,
  pageUser: PropTypes.string,
  secretKey: PropTypes.string,
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tenant: PropTypes.string,
  updateStudentData: PropTypes.func,
};

MemberRegistrationCorrectionForm.defaultProps = {
  context: {},
  id: '',
  isFetch: false,
  isStudentUpdated: false,
  isUpdatedResetAction: () => {},
  pageUser: '',
  secretKey: '',
  studentData: {},
  tenant: '',
  updateStudentData: () => {},
};

const mapStateToProps = state => ({
  id: getUserId(state),
  isFetch: isFetched(state),
  isStudentUpdated: isUpdated(state),
  pageUser: getPageUserType(state),
  secretKey: getUserSecretKey(state),
  studentData: getStudent(state),
  tenant: getApplicationTenant(state),
  userType: getUserType(state),
});

export default connect(mapStateToProps, {
  createStudentData,
  isUpdatedResetAction,
  setStudentCredentials,
  updateStudentData,
})(MemberRegistrationCorrectionForm);
