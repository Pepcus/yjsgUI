import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';

import {
  studiesArray,
  busStops,
  gender,
  goBackBtnText,
  formSubmitBtnText,
  USER_TYPES, TENANT,
} from '../../constants/yjsg';
import {
  PREVIOUS_YEAR_LEVEL_LABEL,
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
} from '../../constants/label';
import {
  YJSG_REGISTRATION_SUCCESS_MESSAGE,
  ID_NOTE_MESSAGE,
  ID_CARD_SUGGESTION_MESSAGE,
} from '../../constants/messages';
import {
  YOUR_ID_TEXT,
  YOUR_SECRET_CODE_TEXT,
  IS_THERE_TEXT,
} from '../../constants/text';
import InputField from '../form/InputField';
import TextAreaField from '../form/TextAreaField';
import LinkButton from '../common/LinkButton';
import {
  createStudentData,
  setStudentCredentials,
} from '../../actions/studentRegistrationActions';
import {
  isDataCorrect,
  isValidUserInfo,
  setRegistrationData,
  validateInput,
} from '../../utils/registrationFormUtils';
import SelectListInputField from '../form/SelectListInputField';
import {
  getNewStudent,
  isCreated,
  getUserType,
} from '../../reducers/studentRegistrationReducer';
import Button from '../common/Button';
import Popup from '../common/Popup';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';

/**
 * StudentRegistrationForm render student registration form
 * @type {Class}
 */
class StudentRegistrationForm extends Component {
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
        classAttended2019: '',
        optIn2019: 'Y',
      },
      isSubmitTriggered: false,
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
    this._onSubmitStudentData = this.onSubmitStudentData.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this._verifyStudentFormData = this.verifyStudentFormData.bind(this);
    this.renderBackButton = this.renderBackButton.bind(this);
  }

  componentDidMount() {
    // Since the below fields are optional. we are setting them blank explicitly
    this._verifyStudentFormData({ email: '', optIn2019: 'Y' });
  }
  /**
   * verifyStudentFormData method verify the student data.
   * according to student data it set the error message object.
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
   * isValidData method call the isValidUserInfo method
   * to check the error message object and according error message
   * object return it boolean value
   * @return {boolean}
   */
  isValidData() {
    const { errorMessage } = this.state;
    const { tenant } = this.props;
    return isValidUserInfo({ errorMessageObject: errorMessage, tenant });
  }

  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-error');
    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };

  /**
   * onSubmitStudentData method will be call on onClick
   * of submit button in student registration form.
   * @param {Object} event
   */
  onSubmitStudentData(event) {
    const { student } = this.state;
    event.preventDefault();
    // call _verifyStudentFormData method to check data student
    this._verifyStudentFormData(student);
    // call isValidData method to check error message
    // according to error message it will get boolean value
    if (this.isValidData()) {
      // This action call api
      this.props.createStudentData(student);
      this.setState({
        isSubmitTriggered: true,
      });
    } else {
      this.setState({
      }, () => { this.scrollToError(); });
    }
  }
  /**
   * handleInputChange method set the value and name of input field
   * of student registration form.
   * @param {String} value
   * @param {String} name
   */
  handleInputChange(value, name) {
    const { errorMessage, student } = this.state;
    const { tenant } = this.props;
    const errorMessageObject = {};
    // validateInput set the error message in error message object according to input value and name
    errorMessageObject[name] = validateInput({ value, name, tenant });
    // this will update the error object and updated error message object will be set into state.
    const updatedErrorState = extend(cloneDeep(errorMessage), errorMessageObject);
    // this will get update student data
    const updatedData = extend(cloneDeep(student),
    // setRegistrationData method format name and value in key value format
      setRegistrationData(value, name));
    this.setState({
      student: updatedData,
      isSubmitTriggered: false,
      errorMessage: updatedErrorState,
    });
  }

  renderSuccessMessage() {
    const { isSubmitTriggered } = this.state;
    const { newStudent } = this.props;
    if (this.props.isCreated && isSubmitTriggered) {
      // for pre-population on splash page
      this.props.setStudentCredentials(newStudent.id, newStudent.secretKey);
      return (
        <Popup>
          <p>{YJSG_REGISTRATION_SUCCESS_MESSAGE}</p>
          <p>{YOUR_ID_TEXT}<strong>{newStudent.id}</strong>{IS_THERE_TEXT}</p>
          <p>{YOUR_SECRET_CODE_TEXT}<strong>{newStudent.secretKey}</strong>{IS_THERE_TEXT}</p>
          <p>{ID_NOTE_MESSAGE}</p>
          <p>{ID_CARD_SUGGESTION_MESSAGE}</p>
          {this.renderBackButton()}
        </Popup>
      );
    }
    return null;
  }
  renderBusStopOptions = () => {
    const { student, errorMessage } = this.state;
    const { tenant } = this.props;
    const { INDORE } = TENANT;
    if (tenant === INDORE) {
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
   * renderBackButton method return link button according to user type
   * @return {ReactComponent}
   */
  renderBackButton() {
    const { userType, context } = this.props;
    const { STUDENT, ADMIN } = USER_TYPES;
    if (userType === STUDENT) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/"
        />
      );
    } else if (userType === ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/admin"
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
  render() {
    const { student, errorMessage } = this.state;
    return (
      <div className="registrationFormContainer">
        {this.renderSuccessMessage()}
        {/* FIXME: Create a separate reusable component to render form*/}
        <div className="inputFieldContainerWrapper" >
          <form id="studentRegistrationForm" className="inputFieldContainer">
            <div ref={this.formRef}>
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
              <SelectListInputField
                name="classAttended2019"
                label={WHAT_YOU_WANT_TO_STUDY_LABEL}
                options={studiesArray}
                onInputChange={this._handleInputChange}
                value={student.classAttended2019}
                isRequired
                errorMessage={errorMessage.classAttended2019.message}
              />
              <TextAreaField
                label={ADDRESS_LABEL}
                name="address"
                onInputChange={this._handleInputChange}
                value={student.address}
                isRequired
                errorMessage={errorMessage.address.message}
              />
              <InputField
                type="text"
                label={PREVIOUS_YEAR_LEVEL_LABEL}
                name="classAttended2018"
                onInputChange={this._handleInputChange}
                value={student.classAttended2018}
                isRequired={false}
              />
              <div className="registrationFormButtonContainer">
                <div className="button-wrapper">
                  {this.renderBackButton()}
                  <div className="button-container">
                    <Button
                      buttonText={formSubmitBtnText}
                      type="submit"
                      formName="studentRegistrationForm"
                      value="Submit"
                      disabled={this.props.isLoading}
                      onClick={this._onSubmitStudentData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

StudentRegistrationForm.propTypes = {
  context: PropTypes.object,
  createStudentData: PropTypes.func,
  isCreated: PropTypes.bool,
  newStudent: PropTypes.object,
  setStudentCredentials: PropTypes.func,
  tenant: PropTypes.string,
  userType: PropTypes.string,
};

StudentRegistrationForm.defaultProps = {
  context: {},
  createStudentData: () => {},
  isCreated: false,
  newStudent: {},
  setStudentCredentials: () => {},
  tenant: '',
  userType: '',
};

const mapStateToProps = state => ({
  isCreated: isCreated(state),
  newStudent: getNewStudent(state),
  tenant: getApplicationTenant(state),
  userType: getUserType(state),
});

export default connect(mapStateToProps, {
  createStudentData,
  getApplicationTenant,
  setStudentCredentials,
})(StudentRegistrationForm);

