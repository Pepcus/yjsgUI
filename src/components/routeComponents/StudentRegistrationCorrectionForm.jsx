import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import ErrorMessage from '../common/ErrorMessage';
import {
  studiesArray,
  busStops,
  gender,
  optIn2019Options,
  goBackBtnText,
  formSubmitBtnText,
  invalidIdMessage,
  noInfoChangeMessage,
  infoUpdateSuccessMessage,
  busNumber,
  classRoomNumber,
  USER_TYPES, TENANT,
} from '../../constants/yjsg';
import {
  PREVIOUS_YEAR_LEVEL_LABEL,
  IS_OPT_IN_OR_OPT_OUT_2019_LABEL,
  ID_LABEL,
  NAME_LABEL,
  FATHER_OR_HUSBAND_NAME_LABEL,
  GENDER_LABEL,
  AGE_LABEL,
  MOBILE_NUMBER_LABEL,
  OCCUPATION_LABEL,
  EDUCATION_LABEL,
  EMAIL_LABEL,
  ADDRESS_LABEL,
  BUS_STOP_LABEL,
  WHAT_YOU_WANT_TO_STUDY_LABEL,
  BUS_NUMBER_LABEL,
  CLASS_LABEL,
  ROOM_LABEL,
} from '../../constants/label';
import InputField from '../formComponents/InputField';
import TextAreaField from '../formComponents/TextAreaField';
import LinkButton from '../common/LinkButton';
import {
  updateStudentData,
  isUpdatedResetAction,
} from '../../actions/studentRegistrationActions';
import {
  updateClassAttended2019InStudentData,
  isDataCorrect,
  isValidUserInfo,
  setRegistrationData,
  validateInput,
} from '../../utils/registrationFormUtils';
import {
  getStudent,
  isFetched,
  isUpdated,
  getUserId,
  getUserSecretKey,
  getPageUserType,
} from '../../reducers/studentRegistrationReducer';
import SelectListInputField from '../formComponents/SelectListInputField';
import Button from '../common/Button';
import {
  CLICK_HERE_TEXT,
  NO_TEXT, UPDATE_FURTHER_INFORMATION_TEXT,
  YES_TEXT,
} from '../../constants/text';
import Popup from '../common/Popup';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';


/**
 * The StudentRegistrationCorrectionForm component render student correction form.
 * @type {class}
 * @return {*} registration correction form
 */
class StudentRegistrationCorrectionForm extends Component {

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
        email: '',
        address: '',
        busStop: '',
        marks2019: '',
        busNumber: '',
        classAttended2019: '',
        classRoomNo2019: '',
        optIn2019: '',
        remark: '',
        occupation: '',
      },
      onlyOptIn2019: true,
      isSubmitTriggered: false,
      isFormChanged: false,
      errorMessage: {
        name: {},
        fatherName: {},
        gender: {},
        age: {},
        mobile: {},
        email: {},
        address: {},
        busStop: {},
        classAttended2019: {},
        optIn2019: {},
      },
    };

    // FIXME: Use arrow functions to avoid binding.
    this.onSubmitStudentData = this.onSubmitStudentData.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this.prePopulateCourse2019 = this.prePopulateCourse2019.bind(this);
    this.renderClassAttended2018 = this.renderClassAttended2018.bind(this);
  }

  componentDidMount() {

    const { studentData } = this.props;
    const { student } = this.state;
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const finalStudentData = !isEmpty(studentData)
      ? studentData : studentDataFromSession;

    if (!isEmpty(finalStudentData)) {
      this.setState({
        student: { ...student, ...finalStudentData },
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(finalStudentData);
      this.verifyStudentFormData({ email: '' });
    }
  }

  componentWillReceiveProps(nextProps) {

    const { studentData } = nextProps;
    const { student } = this.state;
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const finalStudentData = !isEmpty(studentData)
      ? studentData : studentDataFromSession;

    if (!isEmpty(finalStudentData)) {
      this.setState({
        student: { ...student, ...finalStudentData },
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(finalStudentData);
      this.verifyStudentFormData({ email: '' });
    }
  }

  /**
   * renderBusStopOptions method render bus stop form field conditionally
   * @return {*} bus stop form field
   */
  renderBusStopOptions = () => {

    const { student, errorMessage } = this.state;
    const { tenant } = this.props;
    const { INDORE } = TENANT;

    if (tenant === INDORE && student.optIn2019 === 'N') {
      return (
        <SelectListInputField
          type="text"
          label={BUS_STOP_LABEL}
          name="busStop"
          options={busStops}
          onInputChange={this._handleInputChange}
          value={student.busStop}
        />
      );

    } else if (tenant === INDORE && student.optIn2019 === 'Y') {
      return (
        <SelectListInputField
          type="text"
          label={BUS_STOP_LABEL}
          name="busStop"
          options={busStops}
          onInputChange={this._handleInputChange}
          value={student.busStop}
          isRequired
          errorMessage={errorMessage.busStop.message}
        />
      );
    } return null;
  };

  /**
   * renderBusNumberOption method render bus number form field conditionally
   * @return {*} bus number field
   */
  renderBusNumberOption = () => {

    const { student } = this.state;
    const { tenant, pageUser } = this.props;
    const { ADMIN } = USER_TYPES;
    const { INDORE } = TENANT;

    if (tenant === INDORE && pageUser === ADMIN) {
      return (
        <SelectListInputField
          name="busNumber"
          label={BUS_NUMBER_LABEL}
          options={busNumber}
          onInputChange={this._handleInputChange}
          value={student.busNumber}
        />
      );
    } return null;
  };

  /**
   * renderMark2019Field method render current year mark form field conditionally
   * @return {*} mark field
   */
  renderMark2019Field = () => {

    const { student } = this.state;
    const { pageUser } = this.props;
    const { ADMIN } = USER_TYPES;

    if (pageUser === ADMIN) {
      return (
        <InputField
          type="text"
          label="Marks 2019"
          name="marks2019"
          onInputChange={this._handleInputChange}
          value={student.marks2019}
        />
      );
    } return null;
  } ;

  /**
   * renderClassRoom2019Field method render current year class room form field conditionally
   * @return {*} current year class room field
   */
  renderClassRoom2019Field = () => {

    const { student } = this.state;
    const { pageUser } = this.props;
    const { ADMIN } = USER_TYPES;

    if (pageUser === ADMIN) {
      return (
        <SelectListInputField
          name="classRoomNo2019"
          label={ROOM_LABEL}
          options={classRoomNumber}
          onInputChange={this._handleInputChange}
          value={student.classRoomNo2019}
          style={{ fontFamily: 'sans-serif' }}
          optionsStyle={{ fontFamily: 'Poppins' }}
        />
      );
    } return null;
  };

  /**
   * renderRemarkField method remark form field only in admin case
   * @return {*} remark form field
   */
  renderRemarkField = () => {

    const { student } = this.state;
    const { pageUser } = this.props;
    const { ADMIN } = USER_TYPES;

    if (pageUser === ADMIN) {
      return (
        <TextAreaField
          label="Remark"
          name="remark"
          onInputChange={this._handleInputChange}
          value={student.remark}
          isRequired={false}
        />
      );
    } return null;
  };

  /**
   * submitStudentDataForOnlyOptInCase method will call
   * in case when student only edit optIn2019 and submit it.
   * @param {Object} e
   */
  submitStudentDataForOnlyOptInCase = (e) => {

    const { student } = this.state;

    this.verifyStudentFormData(student);
    e.preventDefault();

    if (!isEmpty(student.optIn2019)) {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    }
  };

  /**
   * changeIsOnlyOptIn2019 method maintained flag value of onlyOptIn2019
   * as per form contends show to user.
   * @param {boolean}value
   */
  changeIsOnlyOptIn2019 = (value) => {
    this.setState({
      onlyOptIn2019: value,
    });
  };

  /**
   * renderOnlyOptIn2019 method render react component with OptIn2019,
   * submit button and edit all information form link.
   * @return {*}
   */
  renderOnlyOptIn2019 = () => {

    const { student, errorMessage } = this.state;

    return (
      <div className="registrationFormContainer correction-form-container">
        {this.renderSuccessMessage()}
        <form id="studentCorrectionForm" className="inputFieldContainerWrapper correction-form-input-wrapper">
          <div className="inputFieldContainer input-field-container">
            <label className="name-label">{NAME_LABEL}: </label>
            <span className="student-correction-name-text">{student.name}</span>
            <div className="inputWrapper input-wrapper-correction-url">
              <div className="has-error inputWrapperContainer errorInputField">
                <div className="inputLabel">
                  <label>{IS_OPT_IN_OR_OPT_OUT_2019_LABEL} * </label>
                  <div className="advance-input-radio advance-input-print-later">
                    <div className="input-radio-container">
                      <input
                        type="radio"
                        name="OptInOrOptOut"
                        value="Y"
                        onChange={this.onClickRadioButton}
                        checked={student.optIn2019 === 'Y'}
                      />
                      <label htmlFor="Opt-In">{YES_TEXT}</label>
                    </div>
                    <div className="input-radio-container">
                      <input
                        type="radio"
                        name="OptInOrOptOut"
                        value="N"
                        onChange={this.onClickRadioButton}
                        checked={student.optIn2019 === 'N'}
                      />
                      <label htmlFor="Opt-Out">{NO_TEXT}</label>
                    </div>
                  </div>
                  <ErrorMessage message={errorMessage.optIn2019.message} />
                </div>
              </div>
            </div>
            <div className="registrationFormButtonContainer student-correction-button-container">
              <div className="button-wrapper student-correction-button-wrapper">
                <div className="button-container button-container-correction">
                  <Button
                    buttonText={formSubmitBtnText}
                    type="submit"
                    formName="studentRegistrationForm"
                    value="Submit"
                    onClick={this.submitStudentDataForOnlyOptInCase}
                  />
                </div>
              </div>
            </div>
            <span className="student-portal-link-heading">{UPDATE_FURTHER_INFORMATION_TEXT}
              <a className="student-portal-link" onClick={() => { this.changeIsOnlyOptIn2019(false); }}>
                {CLICK_HERE_TEXT}
              </a>
            </span>
          </div>
        </form>
      </div>
    );
  };

  /**
   * verifyStudentFormData check the student form data is valid or not.
   * @param {Object} studentData
   */
  verifyStudentFormData(studentData) {

    const { errorMessage } = this.state;
    const { tenant } = this.props;
    const errorMessageObject = extend(cloneDeep(errorMessage),
      isDataCorrect(studentData, tenant));

    this.setState({
      errorMessage: errorMessageObject,
    });
  }

  /**
   * renderOptInField optIn field as per user condition.
   * @return {*} optIn form field
   */
  renderOptInField = () => {

    const { student, errorMessage } = this.state;
    const { pageUser } = this.props;
    const { ADMIN } = USER_TYPES;

    if (pageUser === ADMIN) {
      return (
        <SelectListInputField
          name="optIn2019"
          label={IS_OPT_IN_OR_OPT_OUT_2019_LABEL}
          options={optIn2019Options}
          onInputChange={this._handleInputChange}
          value={student.optIn2019}
        />
      );
    }

    return (
      <SelectListInputField
        name="optIn2019"
        label={IS_OPT_IN_OR_OPT_OUT_2019_LABEL}
        options={optIn2019Options}
        onInputChange={this._handleInputChange}
        value={student.optIn2019}
        isRequired
        errorMessage={errorMessage.optIn2019.message}
      />
    );
  };

  /**
   * renderLevelField render Level field according to user type.
   * @return {*}
   */
  renderLevelField = () => {

    const { student, errorMessage } = this.state;
    const { pageUser } = this.props;
    const { ADMIN } = USER_TYPES;

    if (pageUser === ADMIN) {
      return (
        <SelectListInputField
          name="classAttended2019"
          label={CLASS_LABEL}
          options={studiesArray}
          onInputChange={this._handleInputChange}
          value={student.classAttended2019}
        />
      );

    } else if (student.optIn2019 === 'Y' && pageUser !== ADMIN) {
      return (
        <SelectListInputField
          name="classAttended2019"
          label={WHAT_YOU_WANT_TO_STUDY_LABEL}
          options={studiesArray}
          onInputChange={this._handleInputChange}
          value={student.classAttended2019}
          errorMessage={errorMessage.classAttended2019.message}
          isRequired
        />
      );

    } else if (student.optIn2019 === 'N' && pageUser !== ADMIN) {
      return (
        <SelectListInputField
          name="classAttended2019"
          label={WHAT_YOU_WANT_TO_STUDY_LABEL}
          options={studiesArray}
          onInputChange={this._handleInputChange}
          value={student.classAttended2019}
        />
      );
    }

    return (
      <SelectListInputField
        name="classAttended2019"
        label={WHAT_YOU_WANT_TO_STUDY_LABEL}
        options={studiesArray}
        onInputChange={this._handleInputChange}
        value={student.classAttended2019}
        errorMessage={errorMessage.classAttended2019.message}
        isRequired
      />
    );
  };

  /**
   * renderBackButton method render back button according to user type
   * @return {*}
   */
  renderBackButton = () => {

    const { pageUser, context } = this.props;
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
          onClick={() => { this.changeIsOnlyOptIn2019(true); }}
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
   * prePopulateCourse2019 method will use for pre populate the information of fetch student.
   * @param {Object} studentData
   */
  prePopulateCourse2019(studentData) {

    const updatedData = updateClassAttended2019InStudentData(studentData);

    this.setState({
      student: updatedData,
    });
  }

  /**
   * This method is called to return the value of marks if marks doesn't
   * exist then it will return N.A. otherwise return the value
   * @param {String} marks
   * @return {String} marks or 'N.A.'
   */
  getMarks = (marks) => {
    if (!marks) {
      return 'N.A.';
    }
    return marks;
  };

  /**
   * isValidData method call the isValidUserInfo method
   * to check the error message object and according error message
   * object return it boolean value
   * @return {boolean}
   */
  isValidData() {

    const { errorMessage } = this.state;
    const { pageUser, tenant } = this.props;

    return isValidUserInfo({
      errorMessageObject: errorMessage,
      user: pageUser,
      tenant,
    });
  }

  /**
   * updateStudentData method update the particular student data.
   */
  updateStudentData() {

    const { id, secretKey } = this.props;
    const { student } = this.state;

    // Calls api to update student data
    this.props.updateStudentData({ id,
      secretKey,
      student });
  }

  /**
   * scrollToError method scroll to first form file which is in valid in mobile view only.
   */
  scrollToError = () => {

    const errorNode = this.formRef.current.querySelector('.has-error');

    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };

  /**
   * onSubmitStudentData method will call when click on form submit button
   * It submit the updated student data
   * @param {Object} e
   */
  onSubmitStudentData(e) {

    const { student } = this.state;
    const { studentData } = this.props;

    e.preventDefault();

    if (student.optIn2019 === 'N') {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();

    } else {
      this.verifyStudentFormData(student);

      if (!isEqual(studentData, student) && this.isValidData()) {
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
    }
  }

  /**
   * onClickRadioButton method call onchange of optIn or optOut radio button
   * @param {Object} event
   */
  onClickRadioButton = (event) => {
    this.handleInputChange(event.target.value, 'optIn2019');
  };

  /**
   * handleInputChange method set the form fields data in state
   * and all in format value and name in key value format through
   * setRegistrationData functional component.
   * @param {String} value
   * @param {String} name
   */
  handleInputChange(value, name) {

    const { student, errorMessage } = this.state;
    const { tenant } = this.props;
    const updatedData = extend(cloneDeep(student),
      setRegistrationData(value, name));
    const errorMessageObject = {};
    errorMessageObject[name] = validateInput({ value, name, tenant });
    const updatedErrorState = extend(cloneDeep(errorMessage), errorMessageObject);

    this.setState({
      student: updatedData,
      errorMessage: updatedErrorState,
      isFormChanged: true,
      isSubmitTriggered: false,
    });
    this.verifyStudentFormData(updatedData);
  }

  /**
   * renderSuccessMessage render the success message if form data is validate
   * @return {*} message popup
   */
  renderSuccessMessage() {

    const { isSubmitTriggered, isFormChanged } = this.state;
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

    } else if (isSubmitTriggered && !isFormChanged && this.isValidData()) {
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
  }

  /**
   * renderClassAttended2018 method previous year level from field
   * @return{*}
   */
  renderClassAttended2018() {

    const { student } = this.state;
    const { studentData } = this.props;

    // if it contained value
    if (studentData.classAttended2018) {
      return (
        <InputField
          type="text"
          label={PREVIOUS_YEAR_LEVEL_LABEL}
          name="classAttended2018"
          onInputChange={this._handleInputChange}
          value={student.classAttended2018}
          isRequired={false}
          disabled
        />
      );
    }

    // if it is empty
    return (
      <InputField
        type="text"
        label={PREVIOUS_YEAR_LEVEL_LABEL}
        name="classAttended2018"
        onInputChange={this._handleInputChange}
        value={student.classAttended2018}
        isRequired={false}
      />
    );
  }

  // FIXME: Create a separate component to render no-validation input
  /**
   * renderNoValidationFields method render form field without validation if opt-in
   * is 'N'
   * @return {*} Form
   */
  renderNoValidationFields() {

    const { student } = this.state;

    return (
      <div className="registrationFormContainer">
        {this.renderSuccessMessage()}
        <form id="studentRegistrationForm" className="inputFieldContainerWrapper">
          <div className="inputFieldContainer student-form-input-field">
            <div className="student-form-input-wrapper">
              <SelectListInputField
                name="optIn2019"
                label={IS_OPT_IN_OR_OPT_OUT_2019_LABEL}
                options={optIn2019Options}
                onInputChange={this._handleInputChange}
                value={student.optIn2019}
              />
              <InputField
                type="number"
                label={ID_LABEL}
                name="id"
                onInputChange={this._handleInputChange}
                value={student.id}
                disabled
              />
              <InputField
                type="text"
                label={NAME_LABEL}
                name="name"
                onInputChange={this._handleInputChange}
                value={student.name}
              />
              <InputField
                type="text"
                label={FATHER_OR_HUSBAND_NAME_LABEL}
                name="fatherName"
                onInputChange={this._handleInputChange}
                value={student.fatherName}
              />
              <SelectListInputField
                name="gender"
                label={GENDER_LABEL}
                options={gender}
                onInputChange={this._handleInputChange}
                value={student.gender}
              />
              <InputField
                type="number"
                label={AGE_LABEL}
                name="age"
                onInputChange={this._handleInputChange}
                value={student.age}
              />
              <InputField
                type="number"
                label={MOBILE_NUMBER_LABEL}
                name="mobile"
                onInputChange={this._handleInputChange}
                value={student.mobile}
              />
              <InputField
                type="text"
                label={OCCUPATION_LABEL}
                name="occupation"
                onInputChange={this._handleInputChange}
                value={student.occupation}
              />
              <InputField
                type="text"
                label={EDUCATION_LABEL}
                name="education"
                onInputChange={this._handleInputChange}
                value={student.education}
              />
              <InputField
                type="email"
                label={EMAIL_LABEL}
                name="email"
                onInputChange={this._handleInputChange}
                value={student.email}
              />
              {this.renderBusStopOptions()}
              {this.renderClassAttended2018()}
              {this.renderLevelField()}
              {this.renderMark2019Field()}
              {this.renderBusNumberOption()}
              {this.renderClassRoom2019Field()}
              <TextAreaField
                label={ADDRESS_LABEL}
                name="address"
                onInputChange={this._handleInputChange}
                value={student.address}
              />
              {this.renderRemarkField()}
              <div className="student-form-marks-container student-form-marks-desktop-none">
                <div className="student-form-marks-wrapper student-form-marks-mobile-wrapper">
                  <div className="student-form-marks-content">
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2018:</label>
                      <label className="marks-label-text">{this.getMarks(student.marks2018)}</label>
                    </div>
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2017:</label>
                      <label className="marks-label-text">{this.getMarks(student.marks2017)}</label>
                    </div>
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2016:</label>
                      <label className="marks-label-text">{this.getMarks(student.marks2016)}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="registrationFormButtonContainer">
                <div className="button-wrapper">
                  {this.renderBackButton()}
                  <div className="button-container">
                    <Button
                      buttonText={formSubmitBtnText}
                      type="submit"
                      formName="studentRegistrationForm"
                      value="Submit"
                      onClick={this.onSubmitStudentData}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="student-form-marks-container student-form-marks-mobile-none">
              <div className="student-form-marks-wrapper">
                <div className="student-form-marks-content">
                  <div className="inputWrapper">
                    <label className="marks-input-label">Marks 2018:</label>
                    <label className="marks-label-text">{this.getMarks(student.marks2018)}</label>
                  </div>
                  <div className="inputWrapper">
                    <label className="marks-input-label">Marks 2017:</label>
                    <label className="marks-label-text">{this.getMarks(student.marks2017)}</label>
                  </div>
                  <div className="inputWrapper">
                    <label className="marks-input-label">Marks 2016:</label>
                    <label className="marks-label-text">{this.getMarks(student.marks2016)}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {

    const { student, errorMessage, onlyOptIn2019 } = this.state;
    const { pageUser, studentData, context, isStudentFetched } = this.props;
    const { STUDENT_WITH_URL, STUDENT } = USER_TYPES;

    if ((pageUser === STUDENT_WITH_URL || pageUser === STUDENT)
      && onlyOptIn2019 && studentData && isStudentFetched) {
      return this.renderOnlyOptIn2019();

    } else if (isStudentFetched && student.optIn2019 === 'N') {
      return this.renderNoValidationFields();

    } else if (studentData && isStudentFetched) {
      // when student is going to attend the session
      return (
        <div className="registrationFormContainer">
          {this.renderSuccessMessage()}
          {/* FIXME: Create a separate reusable component to render form*/}
          <form id="studentCorrectionForm" className="inputFieldContainerWrapper">
            <div className="inputFieldContainer student-form-input-field" ref={this.formRef}>
              <div className="student-form-input-wrapper">
                {this.renderOptInField()}
                <InputField
                  type="number"
                  label={ID_LABEL}
                  name="id"
                  onInputChange={this._handleInputChange}
                  value={student.id}
                  isRequired
                  disabled
                />
                <InputField
                  type="text"
                  label={NAME_LABEL}
                  name="name"
                  onInputChange={this._handleInputChange}
                  value={student.name}
                  isRequired
                  errorMessage={errorMessage.name.message}
                />
                <InputField
                  type="text"
                  label={FATHER_OR_HUSBAND_NAME_LABEL}
                  name="fatherName"
                  onInputChange={this._handleInputChange}
                  value={student.fatherName}
                  isRequired
                  errorMessage={errorMessage.fatherName.message}
                />
                <SelectListInputField
                  name="gender"
                  label={GENDER_LABEL}
                  options={gender}
                  onInputChange={this._handleInputChange}
                  value={student.gender}
                  isRequired
                  errorMessage={errorMessage.gender.message}
                />
                <InputField
                  type="number"
                  label={AGE_LABEL}
                  name="age"
                  onInputChange={this._handleInputChange}
                  value={student.age}
                  isRequired
                  errorMessage={errorMessage.age.message}
                />
                <InputField
                  type="number"
                  label={MOBILE_NUMBER_LABEL}
                  name="mobile"
                  onInputChange={this._handleInputChange}
                  value={student.mobile}
                  isRequired
                  errorMessage={errorMessage.mobile.message}
                />
                <InputField
                  type="text"
                  label={OCCUPATION_LABEL}
                  name="occupation"
                  onInputChange={this._handleInputChange}
                  value={student.occupation}
                  isRequired={false}
                />
                <InputField
                  type="text"
                  label={EDUCATION_LABEL}
                  name="education"
                  onInputChange={this._handleInputChange}
                  value={student.education}
                  isRequired={false}
                />
                <InputField
                  type="email"
                  label={EMAIL_LABEL}
                  name="email"
                  onInputChange={this._handleInputChange}
                  value={student.email}
                  isRequired={false}
                  errorMessage={errorMessage.email.message}
                />
                {this.renderBusStopOptions()}
                {this.renderClassAttended2018()}
                {this.renderLevelField()}
                {this.renderMark2019Field()}
                {this.renderBusNumberOption()}
                {this.renderClassRoom2019Field()}
                <TextAreaField
                  label={ADDRESS_LABEL}
                  name="address"
                  onInputChange={this._handleInputChange}
                  value={student.address}
                  isRequired
                  errorMessage={errorMessage.address.message}
                />
                {this.renderRemarkField()}
                <div className="student-form-marks-container student-form-marks-desktop-none">
                  <div className="student-form-marks-wrapper student-form-marks-mobile-wrapper">
                    <div className="student-form-marks-content">
                      <div className="inputWrapper">
                        <label className="marks-input-label">Marks 2018:</label>
                        <label className="marks-label-text">{this.getMarks(student.marks2018)}</label>
                      </div>
                      <div className="inputWrapper">
                        <label className="marks-input-label">Marks 2017:</label>
                        <label className="marks-label-text">{this.getMarks(student.marks2017)}</label>
                      </div>
                      <div className="inputWrapper">
                        <label className="marks-input-label">Marks 2016:</label>
                        <label className="marks-label-text">{this.getMarks(student.marks2016)}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="registrationFormButtonContainer">
                  <div className="button-wrapper">
                    {this.renderBackButton()}
                    <Button
                      buttonText={formSubmitBtnText}
                      type="submit"
                      formName="studentRegistrationForm"
                      value="Submit"
                      onClick={this.onSubmitStudentData}
                    />
                  </div>
                </div>
              </div>
              <div className="student-form-marks-container student-form-marks-mobile-none">
                <div className="student-form-marks-wrapper">
                  <div className="student-form-marks-content">
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2018:</label>
                      <label className="marks-label-text">{this.getMarks(student.marks2018)}</label>
                    </div>
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2017:</label>
                      <label className="marks-label-text">{this.getMarks(student.marks2017)}</label>
                    </div>
                    <div className="inputWrapper">
                      <label className="marks-input-label">Marks 2016:</label>
                      <label className="marks-label-text">{this.getMarks(student.marks2016)}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
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

StudentRegistrationCorrectionForm.propTypes = {
  context: PropTypes.object,
  id: PropTypes.string,
  isStudentFetched: PropTypes.bool,
  isStudentUpdated: PropTypes.bool,
  isUpdatedResetAction: PropTypes.func,
  pageUser: PropTypes.string,
  secretKey: PropTypes.string,
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tenant: PropTypes.string,
  updateStudentData: PropTypes.func,
};

StudentRegistrationCorrectionForm.defaultProps = {
  context: {},
  id: '',
  isStudentFetched: false,
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
  isStudentFetched: isFetched(state),
  isStudentUpdated: isUpdated(state),
  pageUser: getPageUserType(state),
  secretKey: getUserSecretKey(state),
  studentData: getStudent(state),
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, {
  getApplicationTenant,
  isUpdatedResetAction,
  updateStudentData,
})(StudentRegistrationCorrectionForm);
