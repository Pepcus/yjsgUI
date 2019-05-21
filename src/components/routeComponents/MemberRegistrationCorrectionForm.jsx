import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import {
  formSubmitBtnText,
  goBackBtnText,
  infoUpdateSuccessMessage, invalidIdMessage, noInfoChangeMessage,
  TENANT,
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
  getUserId, getUserSecretKey,
  getUserType,
  isCreated,
  isFetched,
  isUpdated,
} from '../../reducers/studentRegistrationReducer';
import Popup from '../common/Popup';
import LinkButton from '../common/LinkButton';
import Button from '../common/Button';
import { updateClassAttended2019InStudentData } from '../../utils/registrationFormUtils';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';
import { defaultStudent, defaultAdmin, indoreStudent, indoreAdmin, onlyOptin2019, validation } from '../../config/memberRegisrationCurrectionFormShema.json';
import { CLICK_HERE_TEXT, UPDATE_FURTHER_INFORMATION_TEXT } from '../../constants/text';
import validations from '../../utils/validation';

/**
 * MemberRegistrationCorrectionForm render member registration correction form.
 * @type {Class}
 * @return {ReactComponent}
 */
class MemberRegistrationCorrectionForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      onlyOptIn2019: true,
      isSubmitTriggered: false,
      student: {
        name: '',
        fatherName: '',
        gender: '',
        age: null,
        mobile: null,
        email: null,
        address: '',
        busStop: '',
        marks2019: '',
        busNumber: '',
        classAttended2019: '',
        classRoomNo2019: undefined,
        optIn2019: '',
        remark: '',
        occupation: '',
      },
      hasError: false,
      isFormChanged: false,
    };
  }

  componentDidMount() {
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    let studentData = !isEmpty(this.props.studentData)
      ? this.props.studentData : studentDataFromSession;
    if (studentData) {
      studentData = { ...studentData, optIn2019: !studentData.optIn2019 ? 'Y' : studentData.optIn2019 };
      studentData = {
        ...studentData,
        mobile: !studentData.mobile ? null : Number(studentData.mobile),
        age: !studentData.age ? null : Number(studentData.age),
        classRoomNo2019: !studentData.classRoomNo2019 ? undefined : Number(studentData.classRoomNo2019),
      };
    }
    if (!isEmpty(studentData)) {
      this.setState({
        student: { ...this.state.student,
          ...studentData,
          mobile: !this.state.student.mobile ? null : Number(this.state.student.mobile),
          age: !this.state.student.age ? null : Number(this.state.student.age),
          classRoomNo2019: !this.state.student.classRoomNo2019 ? undefined : Number(this.state.student.classRoomNo2019),
        },
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(studentData);
    }
  }
  componentWillReceiveProps(nextProps) {
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    let studentData = !isEmpty(nextProps.studentData)
      ? nextProps.studentData : studentDataFromSession;
    if (studentData) {
      studentData = { ...studentData, optIn2019: !studentData.optIn2019 ? 'Y' : studentData.optIn2019 };
      studentData = {
        ...studentData,
        mobile: !studentData.mobile ? null : Number(studentData.mobile),
        age: !studentData.age ? null : Number(studentData.age),
        classRoomNo2019: !studentData.classRoomNo2019 ? undefined : Number(studentData.classRoomNo2019),
      };
    }
    if (!isEmpty(studentData)) {
      this.setState({
        student: {
          ...this.state.student,
          ...studentData,
          mobile: !this.state.student.mobile ? null : Number(this.state.student.mobile),
          age: !this.state.student.age ? null : Number(this.state.student.age),
          classRoomNo2019: !this.state.student.classRoomNo2019 ? undefined : Number(this.state.student.classRoomNo2019),
        },
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(studentData);
    }
  }
  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-danger');
    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };
  validate = (formData, errors) => {
    if (this.state.student.optIn2019 === 'Y') {
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
  renderForm = () => {
    if ((this.props.pageUser === USER_TYPES.STUDENT_WITH_URL || this.props.pageUser === USER_TYPES.STUDENT)
      && this.state.onlyOptIn2019) {
      return (
        <div className="form-container">
          <div className="form-wrapper" ref={this.formRef}>
            <Form
              showErrorList={false}
              noHtml5Validate
              validate={this.validate}
              liveValidate
              schema={onlyOptin2019.Schema}
              uiSchema={onlyOptin2019.UISchema}
              formData={{ ...onlyOptin2019.Data, ...this.state.student }}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
            >
              <div>
                <Button
                  buttonText={formSubmitBtnText}
                  type="submit"
                  formName=""
                  value="Submit"
                  onClick={this.submitStudentDataForOnlyOptInCase}
                />
              </div>
              <span className="student-portal-link-heading">{UPDATE_FURTHER_INFORMATION_TEXT}
                <a className="student-portal-link" onClick={() => { this.changeIsOnlyOptIn2019(false); }}>{CLICK_HERE_TEXT}
                </a>
              </span>
            </Form>
            {this.renderSuccessMessage()}
          </div>
        </div>
      );
    } else if (this.props.pageUser === USER_TYPES.ADMIN && this.props.tenant === TENANT.INDORE) {
      return (
        <div className="form-container">
          <div className="form-wrapper" ref={this.formRef}>
            <Form
              showErrorList={false}
              noHtml5Validate
              validate={this.validate}
              liveValidate
              schema={indoreAdmin.Schema}
              uiSchema={indoreAdmin.UISchema}
              formData={{ ...indoreAdmin.Data, ...this.state.student }}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
            >
              {this.renderMarksInMobileView()}
              <div>
                {this.renderBackButton()}
                <Button
                  buttonText={formSubmitBtnText}
                  type="submit"
                  formName=""
                  value="Submit"
                  onClick={this.handleSubmit}
                />
              </div>
              {this.renderMarksInDesktopView()}
            </Form>
            {this.renderSuccessMessage()}
          </div>
        </div>
      );
    } else if ((this.props.pageUser === USER_TYPES.STUDENT || this.props.pageUser === USER_TYPES.STUDENT_WITH_URL)
      && this.props.tenant === TENANT.INDORE) {
      return (
        <div className="form-container">
          <div className="form-wrapper" ref={this.formRef}>
            <Form
              showErrorList={false}
              noHtml5Validate
              validate={this.validate}
              liveValidate
              schema={indoreStudent.Schema}
              uiSchema={indoreStudent.UISchema}
              formData={{ ...indoreStudent.Data, ...this.state.student }}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
            >
              {this.renderMarksInMobileView()}
              <div>
                {this.renderBackButton()}
                <Button
                  buttonText={formSubmitBtnText}
                  type="submit"
                  formName=""
                  value="Submit"
                  onClick={this.handleSubmit}
                />
              </div>
              {this.renderMarksInDesktopView()}
            </Form>
            {this.renderSuccessMessage()}
          </div>
        </div>
      );
    } else if (this.props.pageUser === USER_TYPES.ADMIN && this.props.tenant !== TENANT.INDORE) {
      return (
        <div className="form-container">
          <div className="form-wrapper" ref={this.formRef}>
            <Form
              showErrorList={false}
              noHtml5Validate
              validate={this.validate}
              liveValidate
              schema={defaultAdmin.Schema}
              uiSchema={defaultAdmin.UISchema}
              formData={{ ...defaultAdmin.Data, ...this.state.student }}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
            >
              {this.renderMarksInMobileView()}
              <div>
                {this.renderBackButton()}
                <Button
                  buttonText={formSubmitBtnText}
                  type="submit"
                  formName=""
                  value="Submit"
                  onClick={this.handleSubmit}
                />
              </div>
              {this.renderMarksInDesktopView()}
            </Form>
            {this.renderSuccessMessage()}
          </div>
        </div>
      );
    } else if ((this.props.pageUser === USER_TYPES.STUDENT || this.props.pageUser === USER_TYPES.STUDENT_WITH_URL)
      && this.props.tenant !== TENANT.INDORE) {
      return (
        <div className="form-container">
          <div className="form-wrapper" ref={this.formRef}>
            <Form
              showErrorList={false}
              noHtml5Validate
              validate={this.validate}
              liveValidate
              schema={defaultStudent.Schema}
              uiSchema={defaultStudent.UISchema}
              formData={{ ...defaultStudent.Data, ...this.state.student }}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
            >
              {this.renderMarksInMobileView()}
              <div>
                {this.renderBackButton()}
                <Button
                  buttonText={formSubmitBtnText}
                  type="submit"
                  formName=""
                  value="Submit"
                  onClick={this.handleSubmit}
                />
              </div>
              {this.renderMarksInDesktopView()}
            </Form>
            {this.renderSuccessMessage()}
          </div>
        </div>
      );
    }
    return null;
  };
  renderMarksInMobileView = () => (
    <div className="student-form-marks-container student-form-marks-desktop-none">
      <div className="student-form-marks-wrapper student-form-marks-mobile-wrapper">
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
  );
  renderMarksInDesktopView = () => (
    <div className="student-form-marks-container student-form-marks-mobile-none">
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
  );
  getMarks = (marks) => {
    if (!marks) {
      return 'N.A.';
    }
    return marks;
  };
  renderSuccessMessage() {
    // if form data is update and valid and submitted successfully.
    if (this.props.isUpdated) {
      return (
        <Popup>
          <h5>{infoUpdateSuccessMessage}</h5>
          <LinkButton
            buttonText={goBackBtnText}
            linkPath={this.props.context.previousLocation}
            onClick={() => { this.props.isUpdatedResetAction(); }}
          />
        </Popup>
      );
    } else if (this.state.isSubmitTriggered && !this.state.isFormChanged && this.state.hasError) {
      // if form data is not update and valid.
      return (
        <Popup>
          <h5>{noInfoChangeMessage}</h5>
          <LinkButton
            buttonText={goBackBtnText}
            linkPath={this.props.context.previousLocation}
          />
        </Popup>
      );
    } return null;
  }
  updateStudentData() {
    const { id, secretKey } = this.props;
    const { student } = this.state;
    // Calls api to update student data
    this.props.updateStudentData({ id,
      secretKey,
      student });
  }
  prePopulateCourse2019(studentData) {
    // const lastCourse = nextProps.studentData.classAttended2018;
    // const level = checkLevelValue(lastCourse);
    const updatedData = updateClassAttended2019InStudentData(studentData);
    this.setState({
      student: updatedData,
    });
  }
  changeIsOnlyOptIn2019 = (value) => {
    this.setState({
      onlyOptIn2019: value,
    });
  };
  handleSubmit = (e) => {
    const studentData = {
      ...this.props.studentData,
      age: !this.props.studentData.age ? null : Number(this.props.studentData.age),
      mobile: !this.props.studentData.mobile ? null : Number(this.props.studentData.mobile),
    };
    e.preventDefault();
    if (this.state.student.optIn2019 === 'N') {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    } else if (!isEqual(studentData, this.state.student) && this.state.hasError) {
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
  submitStudentDataForOnlyOptInCase = (e) => {
    e.preventDefault();
    if (!isEmpty(this.state.student.optIn2019)) {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    }
  };

  transformErrors = (errors) => {
    const temError = [];
    if (this.state.student.optIn2019 !== 'Y') {
      return [];
    }
    errors.forEach((error) => {
      if (this.state.student.optIn2019 !== 'N') {
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

  renderBackButton = () => {
    if (this.props.pageUser === USER_TYPES.ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={this.props.context.previousLocation}
        />
      );
    } else if (this.props.pageUser === USER_TYPES.STUDENT_WITH_URL || this.props.pageUser === USER_TYPES.STUDENT) {
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
    if (this.props.isFetched && this.props.studentData) {
      return this.renderForm();
    }
    return (
      <Popup>
        <h5>{invalidIdMessage}</h5>
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={this.props.context.previousLocation}
        />
      </Popup>
    );
  }
}

MemberRegistrationCorrectionForm.propTypes = {
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isUpdated: PropTypes.bool,
  isFetched: PropTypes.bool,
  updateStudentData: PropTypes.func,
  id: PropTypes.string,
  secretKey: PropTypes.string,
  context: PropTypes.object,
  pageUser: PropTypes.string,
  isUpdatedResetAction: PropTypes.func,
  tenant: PropTypes.string,
};

MemberRegistrationCorrectionForm.defaultProps = {
  studentData: {},
  isUpdated: false,
  isFetched: false,
  updateStudentData: () => {},
  id: '',
  secretKey: '',
  context: {},
  pageUser: '',
  isUpdatedResetAction: () => {},
  tenant: '',
};

const mapStateToProps = state => ({
  studentData: getStudent(state),
  isCreated: isCreated(state),
  userType: getUserType(state),
  isUpdated: isUpdated(state),
  isFetched: isFetched(state),
  id: getUserId(state),
  secretKey: getUserSecretKey(state),
  tenant: getApplicationTenant(state),
  pageUser: getPageUserType(state),
});

export default connect(mapStateToProps, {
  createStudentData,
  setStudentCredentials,
  isUpdatedResetAction,
  updateStudentData,
})(MemberRegistrationCorrectionForm);
