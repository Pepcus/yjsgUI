import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import Loader from './Loader';
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
  yjsgHeader,
  busNumber,
  classRoomNumber,
  USER_TYPES,
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
  BUS_NUMBER_LABEL,
  CLASS_LABEL,
  ROOM_LABEL,
} from '../utils/labelConstants';
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
  getPageUserType,
} from '../reducers/studentRegistrationReducer';
import SelectListInputField from './formComponents/SelectListInputField';
import Button from './commonComponents/Button';
import { CLICK_HERE_TEXT, UPDATE_FURTHER_INFORMATION_TEXT } from '../utils/textConstants';


// FixMe: Add missing propTypes and defaultProps.
//  Fix EsLint issues.
//  Add missing JSDocs
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
        motherMobile: '',
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
    };
    // FIXME: Use arrow functions to avoid binding.
    this._submitStudentData = this.submitStudentData.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this.prePopulateCourse2019 = this.prePopulateCourse2019.bind(this);
    this.renderClassAttended2018 = this.renderClassAttended2018.bind(this);
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

  /**
   * renderAdminEditableFields render admin editable field which will edit by only admin.
   * @return {ReactComponent}
   */
  renderAdminEditableFields = () => {
    if (this.props.pageUser === USER_TYPES.ADMIN) {
      return (
        <div>
          <InputField
            type="text"
            label="Marks 2019"
            name="marks2019"
            onInputChange={this._handleInputChange}
            value={this.state.student.marks2019}
          />
          <SelectListInputField
            name="busNumber"
            label={BUS_NUMBER_LABEL}
            options={busNumber}
            onInputChange={this._handleInputChange}
            value={this.state.student.busNumber}
          />
          <SelectListInputField
            name="classRoomNo2019"
            label={ROOM_LABEL}
            options={classRoomNumber}
            onInputChange={this._handleInputChange}
            value={this.state.student.classRoomNo2019}
            style={{ fontFamily: 'sans-serif' }}
            optionsStyle={{ fontFamily: 'Poppins' }}
          />
          <TextAreaField
            label="Remark"
            name="remark"
            onInputChange={this._handleInputChange}
            value={this.state.student.remark}
            isRequired={false}
          />
        </div>
      );
    }
    return null;
  };
  /**
   * submitStudentDataForOnlyOptInCase method will call
   * in case when student only edit optIn2019 and submit it.
   * @param {Object} e
   */
  submitStudentDataForOnlyOptInCase = (e) => {
    this.checkError(this.state.student);
    e.preventDefault();
    if (!isEmpty(this.state.student.optIn2019)) {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    }
  };
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
  renderOnlyOptIn2019 = () => (
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
            <a className="student-portal-link" onClick={() => { this.changeIsOnlyOptIn2019(false); }}>{CLICK_HERE_TEXT}
            </a>
          </span>
        </div>
      </form>
    </div>
  );
  // FIXME: Rename it to verifyStudentFormData
  checkError(studentData) {
    const errorMessageObject = extend(cloneDeep(this.state.errorMessage),
      isDataCorrect(studentData));
    this.setState({
      errorMessage: errorMessageObject,
    });
  }

  /**
   * renderLavelField render Level field according to user type.
   * @return {Reactcomponent}
   */
  renderLevelField = () => {
    if (this.state.student.optIn2019 === 'N') {
      if (this.props.pageUser === USER_TYPES.ADMIN) {
        return (
          <SelectListInputField
            name="classAttended2019"
            label={CLASS_LABEL}
            options={studiesArray}
            onInputChange={this._handleInputChange}
            value={this.state.student.classAttended2019}
            isRequired
          />
        );
      }
      return (
        <SelectListInputField
          name="classAttended2019"
          label={WHAT_YOU_WANT_TO_STUDY_LABEL}
          options={studiesArray}
          onInputChange={this._handleInputChange}
          value={this.state.student.classAttended2019}
          isRequired
        />
      );

    } else if (this.props.pageUser === USER_TYPES.ADMIN) {
      return (
        <SelectListInputField
          name="classAttended2019"
          label={CLASS_LABEL}
          options={studiesArray}
          onInputChange={this._handleInputChange}
          value={this.state.student.classAttended2019}
          errorMessage={this.state.errorMessage.classAttended2019.message}
          isRequired
        />
      );
    }
    return (
      <SelectListInputField
        name="classAttended2019"
        label={WHAT_YOU_WANT_TO_STUDY_LABEL}
        options={studiesArray}
        onInputChange={this._handleInputChange}
        value={this.state.student.classAttended2019}
        errorMessage={this.state.errorMessage.classAttended2019.message}
        isRequired
      />
    );
  };
  /**
   * renderBackButton method render back button according to user type
   * @return {ReactComponent}
   */
  renderBackButton = () => {
    if (this.props.pageUser === USER_TYPES.ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={this.props.context.previousLocation}
        />
      );
    } else if (this.props.pageUser === USER_TYPES.STUDENT_WITH_URL) {
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
        linkPath={this.props.context.previousLocation}
      />
    );

  };
  /**
   * prePopulateCourse2019 method will use for pre populate the information of fetch student.
   * @param {Object} nextProps
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
  * This method is called to return the value of marks if marks doesn't exist then it will return N.A. otherwise reture the value
  * @param {String} Marks
  */
  getMarks = (marks) => {
    if (!marks) {
      return 'N.A.';
    }
    return marks;

  };
  isValidData() {
    return isValidUserInfo(this.state.errorMessage);
  }

  updateStudentData() {
    const { id, secretKey } = this.props;
    const { student } = this.state;
    // Calls api to update student data
    this.props.updateStudentData({ id,
      secretKey,
      student });
  }
  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-error');
    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };
  // FIXME: Rename it to onSubmitStudentData
  submitStudentData(e) {
    e.preventDefault();
    if (this.state.student.optIn2019 === 'N') {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    } else {
      this.checkError(this.state.student);
      if (!isEqual(this.props.studentData, this.state.student) && this.isValidData()) {
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

  // FIXME: Create a separate reusable component to render success message popup
  renderSuccessMessage() {
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

  renderClassAttended2018() {
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

  // FIXME: Create a separate component to render no-validation input fields
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
        {/* <h3 className={'registrationFormHeading'}>{yjsgHeader}</h3>*/}
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
              {this.renderLevelField()}
              {this.renderAdminEditableFields()}
              <div className="registrationFormButtonContainer">
                <div className="button-wrapper">
                  {this.renderBackButton()}
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
  }
  render() {
    if (this.props.pageUser === USER_TYPES.STUDENT_WITH_URL && this.state.onlyOptIn2019 && this.props.studentData && this.props.isFetched) {
      return this.renderOnlyOptIn2019();
    } else if (this.props.isFetched && this.state.student.optIn2019 === 'N') {
      return this.renderNoValidationFields();
    } else if (this.props.studentData && this.props.isFetched) {
      // when student is going to attend the session
      return (
        <div className="registrationFormContainer">
          {this.renderSuccessMessage()}
          {/* FIXME: Create a separate reusable component to render logo*/}
          <div className="student-logo-header">
            <div className="yjsg-logo">
              <img src="../../react-logo-1.png" alt="logo" className="yjsg-logo-img" />
            </div>
            {/* FIXME: Create a separate reusable component to render header*/}
            <h2 className="student-info-heading">{yjsgHeader}</h2>
          </div>
          {/* FIXME: Create a separate reusable component to render form*/}
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
                {this.renderLevelField()}
                {this.renderAdminEditableFields()}
                <div className="registrationFormButtonContainer">
                  <div className="button-wrapper">
                    {this.renderBackButton()}
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
    return (
      // FIXME: Create a component to render error message popup
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

StudentRegistrationCorrectionForm.propTypes = {
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isUpdated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetched: PropTypes.bool,
  updateStudentData: PropTypes.func,
};

StudentRegistrationCorrectionForm.defaultProps = {
  studentData: {},
  isUpdated: false,
  isLoading: false,
  isFetched: false,
  updateStudentData: () => {},
};

const mapStateToProps = state => ({
  studentData: getStudent(state),
  isUpdated: isUpdated(state),
  isLoading: isLoading(state),
  isFetched: isFetched(state),
  id: getUserId(state),
  secretKey: getUserSecretKey(state),
  pageUser: getPageUserType(state),
});

export default connect(mapStateToProps, {
  updateStudentData,
  isUpdatedResetAction,
})(StudentRegistrationCorrectionForm);
