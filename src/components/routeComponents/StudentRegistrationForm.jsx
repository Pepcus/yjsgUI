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
  MOTHER_MOBILE_NUMBER_LABEL,
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
  isLoading,
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
        motherMobile: '',
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
        motherMobile: {},
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
    this._verifyStudentFormData({ email: '', motherMobile: '', optIn2019: 'Y' });
  }
  /**
   * verifyStudentFormData method verify the student data.
   * according to student data it set the error message object.
   * @param {Object} studentData
   */
  verifyStudentFormData(studentData) {
    const errorMessageObject = extend(cloneDeep(this.state.errorMessage),
      isDataCorrect(studentData, this.props.tenant));
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
    return isValidUserInfo({ errorMessageObject: this.state.errorMessage, tenant: this.props.tenant });
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
    event.preventDefault();
    // call _verifyStudentFormData method to check data student
    this._verifyStudentFormData(this.state.student);
    // call isValidData method to check error message
    // according to error message it will get boolean value
    if (this.isValidData()) {
      // This action call api
      this.props.createStudentData(this.state.student);
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
    const errorMessageObject = {};
    // validateInput set the error message in error message object according to input value and name
    errorMessageObject[name] = validateInput({ value, name, tenant: this.props.tenant });
    // this will update the error object and updated error message object will be set into state.
    const updatedErrorState = extend(cloneDeep(this.state.errorMessage), errorMessageObject);
    // this will get update student data
    const updatedData = extend(cloneDeep(this.state.student),
    // setRegistrationData method format name and value in key value format
      setRegistrationData(value, name));
    this.setState({
      student: updatedData,
      isSubmitTriggered: false,
      errorMessage: updatedErrorState,
    });
  }

  renderSuccessMessage() {
    if (this.props.isCreated && this.state.isSubmitTriggered) {
      const student = this.props.newStudent;

      // for pre-population on splash page
      this.props.setStudentCredentials(student.id, student.secretKey);

      return (
        <Popup>
          <p>{YJSG_REGISTRATION_SUCCESS_MESSAGE}</p>
          <p>{YOUR_ID_TEXT}<strong>{student.id}</strong>{IS_THERE_TEXT}</p>
          <p>{YOUR_SECRET_CODE_TEXT}<strong>{student.secretKey}</strong>{IS_THERE_TEXT}</p>
          <p>{ID_NOTE_MESSAGE}</p>
          <p>{ID_CARD_SUGGESTION_MESSAGE}</p>
          {this.renderBackButton()}
        </Popup>
      );
    }
    return null;
  }
  renderBusStopOptions = () => {
    if (this.props.tenant === TENANT.INDORE) {
      return (
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
      );
    } return null;
  };
  renderMotherMobileNumberField = () => {
    if (this.props.tenant === TENANT.INDORE) {
      return (
        <InputField
          type="number"
          label={MOTHER_MOBILE_NUMBER_LABEL}
          name="motherMobile"
          onInputChange={this._handleInputChange}
          value={this.state.student.motherMobile}
          isRequired={false}
          errorMessage={this.state.errorMessage.motherMobile.message}
        />
      );
    } return null;
  };
  /**
   * renderBackButton method return link button according to user type
   * @return {ReactComponent}
   */
  renderBackButton() {
    if (this.props.userType === USER_TYPES.STUDENT) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/"
        />
      );
    } else if (this.props.userType === USER_TYPES.ADMIN) {
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
        linkPath={this.props.context.previousLocation}
      />
    );
  }
  render() {
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
              {this.renderMotherMobileNumberField()}
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
              {this.renderBusStopOptions()}
              <SelectListInputField
                name="classAttended2019"
                label={WHAT_YOU_WANT_TO_STUDY_LABEL}
                options={studiesArray}
                onInputChange={this._handleInputChange}
                value={this.state.student.classAttended2019}
                isRequired
                errorMessage={this.state.errorMessage.classAttended2019.message}
              />
              <InputField
                type="text"
                label={PREVIOUS_YEAR_LEVEL_LABEL}
                name="classAttended2018"
                onInputChange={this._handleInputChange}
                value={this.state.student.classAttended2018}
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
  isLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  newStudent: PropTypes.object,
  createStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
  userType: PropTypes.string,
  context: PropTypes.object,
  tenant: PropTypes.string,
};

StudentRegistrationForm.defaultProps = {
  isLoading: false,
  isCreated: false,
  newStudent: {},
  createStudentData: () => {},
  setStudentCredentials: () => {},
  userType: '',
  context: {},
  tenant: '',
};

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isCreated: isCreated(state),
  newStudent: getNewStudent(state),
  userType: getUserType(state),
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, {
  createStudentData,
  setStudentCredentials,
  getApplicationTenant,
})(StudentRegistrationForm);

