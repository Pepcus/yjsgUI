import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import isEqual from 'lodash/isEqual';

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
  yjsgHeader, alreadyRegisteredBtnText, viewEditInfoBtnText,
} from '../utils/yjsgConstants';
import InputField from './formComponents/InputField';
import TextAreaField from './formComponents/TextAreaField';
import LinkButton from './commonComponents/LinkButton';
import { updateStudentData, isUpdatedResetAction } from '../actions/studentRegistrationActions';
import {
  checkLevelValue,
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

class StudentRegistrationCorrectionFormURL extends Component {
  constructor(props) {
    super(props);

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
    this.ChangeIsOnlyOptIn2019 = this.ChangeIsOnlyOptIn2019.bind(this);
    this.submitStudentDataForOnlyOptInCase = this.submitStudentDataForOnlyOptInCase.bind(this);
  }

  ChangeIsOnlyOptIn2019() {
    this.setState({
      isOnlyOptIn2019: false,
    });
  }

  checkError(studentData) {
    const errorMessageObject = extend(cloneDeep(this.state.errorMessage),
      isDataCorrect(studentData));
    this.setState({
      errorMessage: errorMessageObject,
    });
  }

  prePopulateCourse2019(nextProps) {
    const lastCourse = nextProps.studentData.classAttended2017;
    const level = checkLevelValue(lastCourse);
    if (level > 0) {
      const updatedData = extend(cloneDeep(this.state.student), { classAttended2019: level + 1 });
      this.setState({
        student: updatedData,
      });
    }
  }

  componentDidMount() {
    if (this.props.studentData) {
      this.prePopulateCourse2019(this.props);
      this.setState({
        student: { ...this.state.student, ...this.props.studentData },
        isValidId: true,
        isSubmitTriggered: false,
      });
      this.checkError({ email: '', motherMobile: '' });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.studentData) {
      this.prePopulateCourse2019(nextProps);
      this.setState({
        student: { ...this.state.student, ...nextProps.studentData },
        isValidId: true,
        isSubmitTriggered: false,
      });
      this.checkError({ email: '', motherMobile: '' });
    }
  }

  isValidData() {
    return isValidUserInfo(this.state.errorMessage);
  }

  updateStudentData() {
    // Calls api to update student data
    this.props.updateStudentData(this.props.id,
      this.props.secretKey,
      this.state.student);
  }
  submitStudentDataForOnlyOptInCase(e) {
    e.preventDefault();
    this.setState({
      isSubmitTriggered: true,
    });
    this.updateStudentData();
  }
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
        });
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
          label="पूर्व में किये गए धार्मिक अध्ययन का विवरण"
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
        label="पूर्व में किये गए धार्मिक अध्ययन का विवरण"
        name="classAttended2018"
        onInputChange={this._handleInputChange}
        value={this.state.student.classAttended2018}
        isRequired={false}
      />
    );

  }

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
          <div className="inputFieldContainer">
            <SelectListInputField
              name="optIn2019"
              label="2019 के शिविर की स्वीकृति ?"
              options={optIn2019Options}
              onInputChange={this._handleInputChange}
              value={this.state.student.optIn2019}
              isRequired
            />
            <InputField
              type="number"
              label="आई.डी."
              name="id"
              onInputChange={this._handleInputChange}
              value={this.state.student.id}
              isRequired
              disabled
            />
            <InputField
              type="text"
              label="नाम"
              name="name"
              onInputChange={this._handleInputChange}
              value={this.state.student.name}
              isRequired
            />
            <InputField
              type="text"
              label="पिता / पति का नाम"
              name="fatherName"
              onInputChange={this._handleInputChange}
              value={this.state.student.fatherName}
              isRequired
            />
            <SelectListInputField
              name="gender"
              label="लिंग"
              options={gender}
              onInputChange={this._handleInputChange}
              value={this.state.student.gender}
              isRequired
            />
            <InputField
              type="number"
              label="उम्र"
              name="age"
              onInputChange={this._handleInputChange}
              value={this.state.student.age}
              isRequired
            />
            <InputField
              type="number"
              label="मोबाइल नं."
              name="mobile"
              onInputChange={this._handleInputChange}
              value={this.state.student.mobile}
              isRequired
            />
            <InputField
              type="number"
              label="मोबाइल नं. ( माता का )"
              name="motherMobile"
              onInputChange={this._handleInputChange}
              value={this.state.student.motherMobile}
              isRequired={false}
            />
            <InputField
              type="text"
              label="व्यवसाय (युवा वर्ग हेतु)"
              name="occupation"
              onInputChange={this._handleInputChange}
              value={this.state.student.occupation}
              isRequired={false}
            />
            <InputField
              type="text"
              label="स्कूल शिक्षा"
              name="education"
              onInputChange={this._handleInputChange}
              value={this.state.student.education}
              isRequired={false}
            />
            <InputField
              type="email"
              label="ई-मेल"
              name="email"
              onInputChange={this._handleInputChange}
              value={this.state.student.email}
              isRequired={false}
            />
            <TextAreaField
              label="पूरा पता"
              name="address"
              onInputChange={this._handleInputChange}
              value={this.state.student.address}
              isRequired
            />
            <SelectListInputField
              type="text"
              label="बस स्टॉप (कृपया निकटतम बस स्टॉप चुनें)"
              name="busStop"
              options={busStops}
              onInputChange={this._handleInputChange}
              value={this.state.student.busStop}
              isRequired
            />
            {this.renderClassAttended2018()}
            <SelectListInputField
              name="classAttended2019"
              label="आप क्या अध्ययन करना चाहते हैं ?"
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
                <LinkButton
                  buttonText={goBackBtnText}
                  linkPath={this.props.context.previousLocation}
                />
                <div className="buttonContainer">
                  <button
                    style={{padding: '8px 0px' }}
                    type="submit"
                    form="studentRegistrationForm"
                    value="Submit"
                    /* buttonText={formSubmitBtnText}*/
                    onClick={this._submitStudentData}
                    className="linkButton margin-none full-width"
                  >Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  renderOnlyOptIn2019() {
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
          <div className="inputFieldContainer input-field-container-wrapper">
            <SelectListInputField
              wrapperStyle={{ width: '100%' }}
              wrapperContainerStyle={{ padding: '0px 0px 15px' }}
              selectInputStyle={{maxWidth: ' 100%' }}
              name="optIn2019"
              label="2019 के शिविर की स्वीकृति ?"
              options={optIn2019Options}
              onInputChange={this._handleInputChange}
              value={this.state.student.optIn2019}
              isRequired
              errorMessage={this.state.errorMessage.optIn2019.message}
            />
            <div className="registrationFormButtonContainer">
              <div className="button-wrapper">
                <div className="buttonContainer button-container-correction">
                  <button
                    type="submit"
                    form="studentRegistrationForm"
                    value="Submit"
                              /* buttonText={formSubmitBtnText}*/
                    onClick={this.submitStudentDataForOnlyOptInCase}
                    className="linkButton margin-none full-width"
                  >Submit
                  </button>
                </div>
                <Button
                  style={{padding: '8px 0px'}}
                  buttonCorrectionStyle={{padding: '0px 0px'}}
                  buttonText={viewEditInfoBtnText}
                  onClick={this.ChangeIsOnlyOptIn2019}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.state.isOnlyOptIn2019) {
     return this.renderOnlyOptIn2019();
    }
    // when student is not attending the session
    else if (this.props.isFetched && this.state.student.optIn2019 === 'N' && !this.state.isOnlyOptIn2019) {
      return this.renderNoValidationFields();
    }
    // when student is going to attend the session
    else if (this.props.studentData && this.props.isFetched && !this.state.isOnlyOptIn2019) {
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
            <div className="inputFieldContainer">
              <SelectListInputField
                name="optIn2019"
                label="2019 के शिविर की स्वीकृति ?"
                options={optIn2019Options}
                onInputChange={this._handleInputChange}
                value={this.state.student.optIn2019}
                isRequired
                errorMessage={this.state.errorMessage.optIn2019.message}
              />
              <InputField
                type="number"
                label="आई.डी."
                name="id"
                onInputChange={this._handleInputChange}
                value={this.state.student.id}
                isRequired
                disabled
              />
              <InputField
                type="text"
                label="नाम"
                name="name"
                onInputChange={this._handleInputChange}
                value={this.state.student.name}
                isRequired
                errorMessage={this.state.errorMessage.name.message}
              />
              <InputField
                type="text"
                label="पिता / पति का नाम"
                name="fatherName"
                onInputChange={this._handleInputChange}
                value={this.state.student.fatherName}
                isRequired
                errorMessage={this.state.errorMessage.fatherName.message}
              />
              <SelectListInputField
                name="gender"
                label="लिंग"
                options={gender}
                onInputChange={this._handleInputChange}
                value={this.state.student.gender}
                isRequired
                errorMessage={this.state.errorMessage.gender.message}
              />
              <InputField
                type="number"
                label="उम्र"
                name="age"
                onInputChange={this._handleInputChange}
                value={this.state.student.age}
                isRequired
                errorMessage={this.state.errorMessage.age.message}
              />
              <InputField
                type="number"
                label="मोबाइल नं."
                name="mobile"
                onInputChange={this._handleInputChange}
                value={this.state.student.mobile}
                isRequired
                errorMessage={this.state.errorMessage.mobile.message}
              />
              <InputField
                type="number"
                label="मोबाइल नं. ( माता का )"
                name="motherMobile"
                onInputChange={this._handleInputChange}
                value={this.state.student.motherMobile}
                isRequired={false}
                errorMessage={this.state.errorMessage.motherMobile.message}
              />
              <InputField
                type="text"
                label="व्यवसाय (युवा वर्ग हेतु)"
                name="occupation"
                onInputChange={this._handleInputChange}
                value={this.state.student.occupation}
                isRequired={false}
              />
              <InputField
                type="text"
                label="स्कूल शिक्षा"
                name="education"
                onInputChange={this._handleInputChange}
                value={this.state.student.education}
                isRequired={false}
              />
              <InputField
                type="email"
                label="ई-मेल"
                // isRequired={true}
                // errorMessage={this.state.errorMessage.address['message']}
                name="email"
                onInputChange={this._handleInputChange}
                value={this.state.student.email}
                isRequired={false}
                errorMessage={this.state.errorMessage.email.message}
              />
              <TextAreaField
                label="पूरा पता"
                name="address"
                onInputChange={this._handleInputChange}
                value={this.state.student.address}
              />
              <SelectListInputField
                type="text"
                label="बस स्टॉप (कृपया निकटतम बस स्टॉप चुनें)"
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
                label="आप क्या अध्ययन करना चाहते हैं ?"
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
                  <LinkButton
                    buttonText={goBackBtnText}
                    linkPath={this.props.context.previousLocation}
                  />
                  <div className="buttonContainer">
                    <button
                      type="submit"
                      form="studentRegistrationForm"
                      value="Submit"
                      /* buttonText={formSubmitBtnText}*/
                      onClick={this._submitStudentData}
                      className="linkButton margin-none full-width"
                    >Submit
                    </button>
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
  studentData: PropTypes.object,
  isUpdated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetched: PropTypes.bool,
  updateStudentData: PropTypes.func,
};

StudentRegistrationCorrectionFormURL.defaultProps = {
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
});

export default connect(mapStateToProps, {
  updateStudentData,
  isUpdatedResetAction,
})(StudentRegistrationCorrectionFormURL);
