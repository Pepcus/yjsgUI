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
  isCreated,
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
      onlyOptIn2019: true,
      isSubmitTriggered: false,
      hasError: false,
      isFormChanged: false,
    };
  }

  componentDidMount() {
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const studentData = !isEmpty(this.props.studentData)
      ? this.props.studentData : studentDataFromSession;
    const prePopulateOptInStudentData = prePopulateOptIn(studentData);
    if (!isEmpty(prePopulateOptInStudentData)) {
      this.setState({
        student: InitialStudentData(prePopulateOptInStudentData),
        oldStudentDate: InitialStudentData(studentData),
        isSubmitTriggered: false,
      });
      this.prePopulateCourse2019(InitialStudentData(prePopulateOptInStudentData));
    }
  }

  componentWillReceiveProps(nextProps) {
    // get student data from session if present
    const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const studentData = !isEmpty(nextProps.studentData)
      ? nextProps.studentData : studentDataFromSession;
    const prePopulateOptInStudentData = prePopulateOptIn(studentData);
    if (!isEmpty(prePopulateOptInStudentData)) {
      this.setState({
        student: InitialStudentData(prePopulateOptInStudentData),
        oldStudentDate: InitialStudentData(studentData),
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

  renderSuccessMessage = () => {
    const {
      isSubmitTriggered,
      isFormChanged,
      hasError,
    } = this.state;
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
    } else if (isSubmitTriggered && !isFormChanged && hasError) {
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
  };

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

  prePopulateCourse2019 = (studentData) => {
    // const lastCourse = nextProps.studentData.classAttended2018;
    // const level = checkLevelValue(lastCourse);
    const updatedData = updateClassAttended2019InStudentData(studentData);
    this.setState({
      student: updatedData,
    });
  };

  changeIsOnlyOptIn2019 = (value) => {
    this.setState({
      onlyOptIn2019: value,
    });
  };

  renderSubmitButtons = () => (
    <Button
      buttonText={formSubmitBtnText}
      type="submit"
      formName=""
      value="Submit"
      onClick={this.handleSubmit}
    />
  );

  handleSubmit = (e) => {
    const { student } = this.state;
    delete student.backButton;
    delete student.submitButton;
    e.preventDefault();
    if (this.state.student.optIn2019 === 'N') {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    } else if (!isEqual(this.state.oldStudentDate, student) && this.state.hasError) {
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
    if (this.props.studentData.optIn2019 === 'N') {
      return [];
    }
    errors.forEach((error) => {
      if (this.props.studentData.optIn2019 !== 'N') {
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
    const {
      pageUser,
      context,
    } = this.props;
    if (pageUser === USER_TYPES.ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={context.previousLocation}
        />
      );
    } else if (pageUser === USER_TYPES.STUDENT_WITH_URL || pageUser === USER_TYPES.STUDENT) {
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
      onlyOptIn2019,
      student,
    } = this.state;
    if (isFetch && studentData) {
      return (
        <CorrectionsForm
          pageUser={pageUser}
          tenant={tenant}
          onlyOptIn2019={onlyOptIn2019}
          renderSuccessMessage={this.renderSuccessMessage}
          validate={this.validate}
          student={student}
          onChange={this.onChange}
          transformErrors={this.transformErrors}
          submitStudentDataForOnlyOptInCase={this.submitStudentDataForOnlyOptInCase}
          changeIsOnlyOptIn2019={this.changeIsOnlyOptIn2019}
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
  studentData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isUpdated: PropTypes.bool,
  isFetch: PropTypes.bool,
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
  isFetch: false,
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
  isFetch: isFetched(state),
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
