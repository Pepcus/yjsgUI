import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import {
  studiesArray,
  busStops,
  gender,
  optIn2019Options,
  goBackBtnText,
  adminPassword,
  invalidIdMessage,
  noInfoChangeMessage,
  infoUpdateSuccessMessage,
  yjsgHeader, formSubmitBtnText,
} from '../utils/yjsgConstants';
import {
  PREVIOUS_YEAR_LEVEL_LABEL,
  IS_OPT_IN_OR_OPT_OUT_2019_LABEL,
  ID_LABEL,
  NAME_LABEL,
  FATHER_OR_HUSBAND_NAME_LABEL,
  GENDER_LABEL,
  AGE_LABEL,
  MOBILE_NUMBER_LABEL,
  MOTHER_MOBILE_NUMBER_LABEL,
  OCCUPATION_LABEL,
  EDUCATION_LABEL,
  EMAIL_LABEL,
  ADDRESS_LABEL,
  BUS_STOP_LABEL,
  WHAT_YOU_WANT_TO_STUDY_LABEL,
} from '../utils/labelConstants';
import {
  UPDATE_FURTHER_INFORMATION_TEXT,
  CLICK_HERE_TEXT,
} from '../utils/textConstants';
import InputField from './formComponents/InputField';
import TextAreaField from './formComponents/TextAreaField';
import LinkButton from './commonComponents/LinkButton';
import { updateStudentData, isUpdatedResetAction } from '../actions/studentRegistrationActions';
import {
  updateClassAttended2019InStudentData,
  isDataCorrect,
  isValidUserInfo,
  setRegistrationData,
  validateInput,
} from '../utils/registrationFormUtils';
import {
  getStudent,
  isFetched,
  isLoading,
  isUpdated,
  getUserId,
  getUserSecretKey,
} from '../reducers/studentRegistrationReducer';
import SelectListInputField from './formComponents/SelectListInputField';
import Button from './commonComponents/Button';

// FIXME:
//  This component is redundant.
//  Please use studentCorrectionForm instead. and delete this component
/**
 * StudentRegistrationCorrectionFormURL render student
 * correction form when student login through URL.
 * @type {Class} StudentRegistrationCorrectionFormURL
 */
class StudentRegistrationCorrectionFormURL extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      student: {
        name: '',
        fatherName: '',
        gender: '',
        age: '',
        mobile: '',
        motherMobile: '',
        email: '',
        address: '',
        busStop: '',
        classAttended2019: '',
        optIn2019: '',
        remark: '',
      },
      isSubmitTriggered: false,
      isValidId: false,
      isFormChanged: false,
      errorMessage: {
        name: {},
        fatherName: {},
        gender: {},
        age: {},
        mobile: {},
        motherMobile: {},
        email: {},
        address: {},
        busStop: {},
        classAttended2019: {},
        optIn2019: {},
      },
      isOnlyOptIn2019: true,
    };
    this._submitStudentData = this.submitStudentData.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this.prePopulateCourse2019 = this.prePopulateCourse2019.bind(this);
    this.renderClassAttended2018 = this.renderClassAttended2018.bind(this);
    this.renderOnlyOptIn2019 = this.renderOnlyOptIn2019.bind(this);
    this._changeIsOnlyOptIn2019 = this.changeIsOnlyOptIn2019.bind(this);
    this.submitStudentDataForOnlyOptInCase = this.submitStudentDataForOnlyOptInCase.bind(this);
  }
  componentDidMount() {
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const studentData = !isEmpty(this.props.studentData)
      ? this.props.studentData : studentDataFromSession;
    if (!isEmpty(studentData)) {
      this.setState({
        student: { ...this.state.student, ...studentData },
        isValidId: true,
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(studentData);
      this.checkError({ email: '', motherMobile: '' });
    }
  }
  componentWillReceiveProps(nextProps) {
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const studentData = !isEmpty(nextProps.studentData)
      ? nextProps.studentData : studentDataFromSession;
    if (!isEmpty(studentData)) {
      this.setState({
        student: { ...this.state.student, ...studentData },
        isValidId: true,
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(studentData);
      this.checkError({ email: '', motherMobile: '' });
    }
  }
  getMarks = (marks) => {
    if (!marks) {
      return 'N/A';
    } else {
      return marks;
    }
  };

  /**
   * changeIsOnlyOptIn2019 method set the boolean value of isOnlyOptIn2019 according to condition.
   * of hide and show react components
   * @param {boolean} isOnlyOptIn2019
   */
  changeIsOnlyOptIn2019(isOnlyOptIn2019) {
    this.setState({
      isOnlyOptIn2019,
    });
  }

  /**
   * checkError method check the error in student data.
   * And set error object according to errors in student data.
   * @param {Object} studentData
   */

  checkError(studentData) {
    const errorMessageObject = extend(cloneDeep(this.state.errorMessage),
      isDataCorrect(studentData));
    this.setState({
      errorMessage: errorMessageObject,
    });
  }
  /**
   * prePopulateCourse2019 method will use for pre populate the information of fetch student.
   * @param {Object} studentData
   */
  prePopulateCourse2019(studentData) {
    // const lastCourse = nextProps.studentData.classAttended2018;
    // const level = checkLevelValue(lastCourse);
    const updatedData = updateClassAttended2019InStudentData(studentData);
    this.setState({
      student: updatedData,
    });
  }

  /**
   * isValidData method return the boolean value according to errorMessage object of student data.
   * @return {boolean}
   */
  isValidData() {
    return isValidUserInfo(this.state.errorMessage);
  }

  /**
   * updateStudentData method update student data as student edit their information and submit it.
   */
  updateStudentData() {
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // For maintain student credential in case student get back to student correction form
    // Get student id for session store and pass adminPassword instead on student secretKey.
    const studentId = !isEmpty(this.props.id) ? this.props.id : studentDataFromSession.id;
    const secretKey = !isEmpty(this.props.secretKey) ? this.props.secretKey : adminPassword;
    // Calls api to update student data
    this.props.updateStudentData(String(studentId),
      secretKey,
      this.state.student);
  }
  /**
   * submitStudentDataForOnlyOptInCase method will call
   * in case when student only edit optIn2019 and submit it.
   * @param {Object} e
   */
  submitStudentDataForOnlyOptInCase(e) {
    this.checkError(this.state.student);
    e.preventDefault();
    if (!isEmpty(this.state.student.optIn2019)) {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    }
  }

  /**
   * submitStudentData method call onClick of submit button in student correction form.
   * @param {Object} e
   */
  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-error');
    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
      }
  };
  submitStudentData(e) {
    // on submit of student correction form prevent form action is default.
    e.preventDefault();
    // In this case if optIn2019 of student in "N"
    // then updated form submit without any validation.
    if (this.state.student.optIn2019 === 'N') {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    } else {
      // In this case if optIn2019 of student in "Y"
      // then check error in data of student
      // If there is an error in data then it will give the error message for particular input field
      this.checkError(this.state.student);
      // If student data is updated and there is no error in student data then it will submit.
      if (!isEqual(this.props.studentData, this.state.student) && this.isValidData()) {
        this.setState({
          isSubmitTriggered: true,
        });
        this.updateStudentData();
      } else {
        // if student data is not updated and student want to submit it,
        // in that condition it will  give the message in popup.
        // by setting boolean values of isFormChanged and isSubmitTriggered.
        this.setState({
          isFormChanged: false,
          isSubmitTriggered: true,
        }, () => { this.scrollToError(); });
      }
    }
  }

  /**
   * handleInputChange method will call when input change in input field of student correction form.
   * @param {String} value
   * @param {String} name
   */
  handleInputChange(value, name) {
    const updatedData = extend(cloneDeep(this.state.student),
      setRegistrationData(value, name));
    const errorMessageObject = {};
    errorMessageObject[name] = validateInput(value, name);
    const updatedErrorState = extend(cloneDeep(this.state.errorMessage), errorMessageObject);
    this.setState({
      student: updatedData,
      errorMessage: updatedErrorState,
      isFormChanged: true,
      isSubmitTriggered: false,
    });
    this.checkError(updatedData);
  }

  /**
   * renderSuccessMessage method render popup with back button
   * when student data submitted.
   * @return {ReactComponent}
   */
  renderSuccessMessage() {
    // when student data is updated and it submitted successfully.
    if (this.props.isUpdated) {
      return (
        <div className="popup">
          <div className="popupContainer">
            <h5>{infoUpdateSuccessMessage}</h5>
            <LinkButton
              buttonText={goBackBtnText}
              onClick={() => { this.props.isUpdatedResetAction(); }}
              linkPath={this.props.context.previousLocation}
            />
          </div>
        </div>
      );
    } else if (this.state.isSubmitTriggered && !this.state.isFormChanged && this.isValidData()) {
      // when student data is not updated and it not submitted successfully.
      return (
        <div className="popup">
          <div className="popupContainer">
            <h5>{noInfoChangeMessage}</h5>
            <LinkButton
              buttonText={goBackBtnText}
              linkPath={this.props.context.previousLocation}
            />
          </div>
        </div>
      );
    } return null;
  }

  /**
   * renderClassAttended2018 method return input field in student correction form.
   * That is classAttended2018 of student.
   * @return {*}
   */
  renderClassAttended2018() {
    // In this case if classAttended2018 is present
    // So this filed will be disable with their value.
    if (this.props.studentData.classAttended2018) {
      return (
        <InputField
          type="text"
          label={PREVIOUS_YEAR_LEVEL_LABEL}
          name="classAttended2018"
          onInputChange={this._handleInputChange}
          value={this.state.student.classAttended2018}
          isRequired={false}
          disabled
        />
      );
    }
    // In this case if classAttended2018 is not present
    // So this filed will be editable.
    return (
      <InputField
        type="text"
        label={PREVIOUS_YEAR_LEVEL_LABEL}
        name="classAttended2018"
        onInputChange={this._handleInputChange}
        value={this.state.student.classAttended2018}
        isRequired={false}
      />
    );
  }

  /**
   * renderNoValidationFields method return input fields of student correction form with their
   * no validation if student fill the optIn2019 = "N"
   * @return {ReactComponent}
   */
  renderNoValidationFields() {
    return (
      <div className="registrationFormContainer">
        {this.renderSuccessMessage()}
        <div className="student-logo-header">
          <div className="yjsg-logo">
            <img src="../../react-logo-1.png" alt="logo" className="yjsg-logo-img" />
          </div>
          <h2 className="student-info-heading">{yjsgHeader}</h2>
        </div>
        <form id="studentRegistrationForm" className="inputFieldContainerWrapper">
          <div className="inputFieldContainer student-form-input-field">
            <div className="student-form-input-wrapper">
              <SelectListInputField
                name="optIn2019"
                label={IS_OPT_IN_OR_OPT_OUT_2019_LABEL}
                options={optIn2019Options}
                onInputChange={this._handleInputChange}
                value={this.state.student.optIn2019}
                isRequired
              />
              <InputField
                type="number"
                label={ID_LABEL}
                name="id"
                onInputChange={this._handleInputChange}
                value={this.state.student.id}
                isRequired
                disabled
              />
              <InputField
                type="text"
                label={NAME_LABEL}
                name="name"
                onInputChange={this._handleInputChange}
                value={this.state.student.name}
                isRequired
              />
              <InputField
                type="text"
                label={FATHER_OR_HUSBAND_NAME_LABEL}
                name="fatherName"
                onInputChange={this._handleInputChange}
                value={this.state.student.fatherName}
                isRequired
              />
              <SelectListInputField
                name="gender"
                label={GENDER_LABEL}
                options={gender}
                onInputChange={this._handleInputChange}
                value={this.state.student.gender}
                isRequired
              />
              <InputField
                type="number"
                label={AGE_LABEL}
                name="age"
                onInputChange={this._handleInputChange}
                value={this.state.student.age}
                isRequired
              />
              <InputField
                type="number"
                label={MOBILE_NUMBER_LABEL}
                name="mobile"
                onInputChange={this._handleInputChange}
                value={this.state.student.mobile}
                isRequired
              />
              <InputField
                type="number"
                label={MOTHER_MOBILE_NUMBER_LABEL}
                name="motherMobile"
                onInputChange={this._handleInputChange}
                value={this.state.student.motherMobile}
                isRequired={false}
              />
              <InputField
                type="text"
                label={OCCUPATION_LABEL}
                name="occupation"
                onInputChange={this._handleInputChange}
                value={this.state.student.occupation}
                isRequired={false}
              />
              <InputField
                type="text"
                label={EDUCATION_LABEL}
                name="education"
                onInputChange={this._handleInputChange}
                value={this.state.student.education}
                isRequired={false}
              />
              <InputField
                type="email"
                label={EMAIL_LABEL}
                name="email"
                onInputChange={this._handleInputChange}
                value={this.state.student.email}
                isRequired={false}
              />
              <TextAreaField
                label={ADDRESS_LABEL}
                name="address"
                onInputChange={this._handleInputChange}
                value={this.state.student.address}
                isRequired
              />
              <SelectListInputField
                type="text"
                label={BUS_STOP_LABEL}
                name="busStop"
                options={busStops}
                onInputChange={this._handleInputChange}
                value={this.state.student.busStop}
                isRequired
              />
              {this.renderClassAttended2018()}
              <SelectListInputField
                name="classAttended2019"
                label={WHAT_YOU_WANT_TO_STUDY_LABEL}
                options={studiesArray}
                onInputChange={this._handleInputChange}
                value={this.state.student.classAttended2019}
                isRequired
              />
              <TextAreaField
                label="Remark"
                name="remark"
                onInputChange={this._handleInputChange}
                value={this.state.student.remark}
                isRequired={false}
              />
              <div className="registrationFormButtonContainer">
                <div className="button-wrapper">
                  <Button
                    type="button"
                    buttonText={goBackBtnText}
                    onClick={() => { this._changeIsOnlyOptIn2019(true); }}
                  />
                  <Button
                    buttonText={formSubmitBtnText}
                    type="submit"
                    form="studentRegistrationForm"
                    value="Submit"
                    onClick={this._submitStudentData}
                  />
                </div>
              </div>
            </div>
            <div className="student-form-marks-container">
              <div className="student-form-marks-wrapper">
                <div className="student-form-marks-content">
                  <div className="inputWrapper">
                    <label className="marks-input-label">Marks 2018:</label>
                    <label className="marks-label-text">{this.getMarks(this.state.student.marks2018)}</label>
                  </div>
                  <div className="inputWrapper">
                    <label className="marks-input-label">Marks 2017:</label>
                    <label className="marks-label-text">{this.getMarks(this.state.student.marks2017)}</label>
                  </div>
                  <div className="inputWrapper">
                    <label className="marks-input-label">Marks 2016:</label>
                    <label className="marks-label-text">{this.getMarks(this.state.student.marks2016)}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  /**
   * renderOnlyOptIn2019 method render react component with OptIn2019,
   * submit button and edit all information form link.
   * @return {*}
   */
  renderOnlyOptIn2019() {
    return (
      <div className="registrationFormContainer correction-form-container">
        {this.renderSuccessMessage()}
        <div className="student-logo-header">
          <div className="yjsg-logo">
            <img src="../../react-logo-1.png" alt="logo" className="yjsg-logo-img" />
          </div>
          <h2 className="student-info-heading">{yjsgHeader}</h2>
        </div>
        <form id="studentCorrectionForm" className="inputFieldContainerWrapper correction-form-input-wrapper">
          <div className="inputFieldContainer input-field-container">
            <span className="student-correction-name-text">{this.state.student.name}</span>
            <SelectListInputField
              name="optIn2019"
              label={IS_OPT_IN_OR_OPT_OUT_2019_LABEL}
              options={optIn2019Options}
              onInputChange={this._handleInputChange}
              value={this.state.student.optIn2019}
              isRequired
              errorMessage={this.state.errorMessage.optIn2019.message}
            />
            <div className="registrationFormButtonContainer student-correction-button-container">
              <div className="button-wrapper student-correction-button-wrapper">
                <div className="buttonContainer button-container-correction">
                  <Button
                    buttonText={formSubmitBtnText}
                    type="submit"
                    form="studentRegistrationForm"
                    value="Submit"
                    onClick={this.submitStudentDataForOnlyOptInCase}
                  />
                </div>
              </div>
            </div>
            <span className="student-portal-link-heading">{UPDATE_FURTHER_INFORMATION_TEXT}
              <a className="student-portal-link" onClick={() => { this._changeIsOnlyOptIn2019(false); }}>{CLICK_HERE_TEXT}
              </a>
            </span>
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.state.isOnlyOptIn2019) {
      // if isOnlyOptIn2019 is true then render only OptIn2019.
      return this.renderOnlyOptIn2019();
    } else if (this.props.isFetched && this.state.student.optIn2019 === 'N' && !this.state.isOnlyOptIn2019) {
      // when student is not attending the session and isOnlyOptIn2019 is false.
      return this.renderNoValidationFields();
    } else if (this.state.student && this.props.isFetched && !this.state.isOnlyOptIn2019) {
      // when student is going to attend the session and isOnlyOptIn2019 is false
      return (
        <div className="registrationFormContainer">
          {this.renderSuccessMessage()}
          <div className="student-logo-header">
            <div className="yjsg-logo">
              <img src="../../react-logo-1.png" alt="logo" className="yjsg-logo-img" />
            </div>
            <h2 className="student-info-heading">{yjsgHeader}</h2>
          </div>
          <form id="studentCorrectionForm" className="inputFieldContainerWrapper">
            <div className="inputFieldContainer student-form-input-field" ref={this.formRef}>
              <div className="student-form-input-wrapper">
                <SelectListInputField
                  name="optIn2019"
                  label={IS_OPT_IN_OR_OPT_OUT_2019_LABEL}
                  options={optIn2019Options}
                  onInputChange={this._handleInputChange}
                  value={this.state.student.optIn2019}
                  isRequired
                  errorMessage={this.state.errorMessage.optIn2019.message}
                />
                <InputField
                  type="number"
                  label={ID_LABEL}
                  name="id"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.id}
                  isRequired
                  disabled
                />
                <InputField
                  type="text"
                  label={NAME_LABEL}
                  name="name"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.name}
                  isRequired
                  errorMessage={this.state.errorMessage.name.message}
                />
                <InputField
                  type="text"
                  label={FATHER_OR_HUSBAND_NAME_LABEL}
                  name="fatherName"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.fatherName}
                  isRequired
                  errorMessage={this.state.errorMessage.fatherName.message}
                />
                <SelectListInputField
                  name="gender"
                  label={GENDER_LABEL}
                  options={gender}
                  onInputChange={this._handleInputChange}
                  value={this.state.student.gender}
                  isRequired
                  errorMessage={this.state.errorMessage.gender.message}
                />
                <InputField
                  type="number"
                  label={AGE_LABEL}
                  name="age"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.age}
                  isRequired
                  errorMessage={this.state.errorMessage.age.message}
                />
                <InputField
                  type="number"
                  label={MOBILE_NUMBER_LABEL}
                  name="mobile"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.mobile}
                  isRequired
                  errorMessage={this.state.errorMessage.mobile.message}
                />
                <InputField
                  type="number"
                  label={MOTHER_MOBILE_NUMBER_LABEL}
                  name="motherMobile"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.motherMobile}
                  isRequired={false}
                  errorMessage={this.state.errorMessage.motherMobile.message}
                />
                <InputField
                  type="text"
                  label={OCCUPATION_LABEL}
                  name="occupation"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.occupation}
                  isRequired={false}
                />
                <InputField
                  type="text"
                  label={EDUCATION_LABEL}
                  name="education"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.education}
                  isRequired={false}
                />
                <InputField
                  type="email"
                  label={EMAIL_LABEL}
                  name="email"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.email}
                  isRequired={false}
                  errorMessage={this.state.errorMessage.email.message}
                />
                <TextAreaField
                  label={ADDRESS_LABEL}
                  name="address"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.address}
                  isRequired
                  errorMessage={this.state.errorMessage.address.message}
                />
                <SelectListInputField
                  type="text"
                  label={BUS_STOP_LABEL}
                  name="busStop"
                  options={busStops}
                  onInputChange={this._handleInputChange}
                  value={this.state.student.busStop}
                  isRequired
                  errorMessage={this.state.errorMessage.busStop.message}
                />
                {this.renderClassAttended2018()}
                <SelectListInputField
                  name="classAttended2019"
                  label={WHAT_YOU_WANT_TO_STUDY_LABEL}
                  options={studiesArray}
                  onInputChange={this._handleInputChange}
                  value={this.state.student.classAttended2019}
                  isRequired
                  errorMessage={this.state.errorMessage.classAttended2019.message}
                />
                <TextAreaField
                  label="Remark"
                  name="remark"
                  onInputChange={this._handleInputChange}
                  value={this.state.student.remark}
                  isRequired={false}
                />
                <div className="registrationFormButtonContainer">
                  <div className="button-wrapper">
                    <Button
                      type="button"
                      buttonText={goBackBtnText}
                      onClick={() => { this._changeIsOnlyOptIn2019(true); }}
                    />
                    <div className="buttonContainer">
                      <Button
                        buttonText={formSubmitBtnText}
                        type="submit"
                        form="studentRegistrationForm"
                        value="Submit"
                        onClick={this._submitStudentData}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="student-form-marks-container">
                <div className="student-form-marks-wrapper">
                  <div className="student-form-marks-content">
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2018:</label>
                      <label className="marks-label-text">{this.getMarks(this.state.student.marks2018)}</label>
                    </div>
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2017:</label>
                      <label className="marks-label-text">{this.getMarks(this.state.student.marks2017)}</label>
                    </div>
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2016:</label>
                      <label className="marks-label-text">{this.getMarks(this.state.student.marks2016)}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    } else if (this.props.isLoading) {
      return (
        <div className="popup">
          <div className="popupContainer">
            <h5>Loading...</h5>
          </div>
        </div>
      );
    }

    return (
      <div className="errorPopupContainer">
        <div className="popup">
          <div className="popupContainer">
            <h5>{invalidIdMessage}</h5>
            <LinkButton
              buttonText={goBackBtnText}
              linkPath={this.props.context.previousLocation}
            />
          </div>
        </div>
      </div>
    );
  }
}

StudentRegistrationCorrectionFormURL.propTypes = {
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isUpdated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetched: PropTypes.bool,
  updateStudentData: PropTypes.func,
  id: PropTypes.string,
  secretKey: PropTypes.string,
  isUpdatedResetAction: PropTypes.func,
  context: PropTypes.object,
};

StudentRegistrationCorrectionFormURL.defaultProps = {
  studentData: {},
  isUpdated: false,
  isLoading: false,
  isFetched: false,
  updateStudentData: () => {},
  id: '',
  secretKey: '',
  isUpdatedResetAction: () => {},
  context: {},
};

const mapStateToProps = state => ({
  studentData: getStudent(state),
  isUpdated: isUpdated(state),
  isLoading: isLoading(state),
  isFetched: isFetched(state),
  id: getUserId(state),
  secretKey: getUserSecretKey(state),
});

export default connect(mapStateToProps, {
  updateStudentData,
  isUpdatedResetAction,
})(StudentRegistrationCorrectionFormURL);
