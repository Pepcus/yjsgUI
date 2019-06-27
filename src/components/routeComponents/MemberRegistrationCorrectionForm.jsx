import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import {
  formSubmitBtnText,
  goBackBtnText,
  invalidIdMessage,
  USER_TYPES,
} from '../../constants/yjsg';
import {
  isUpdatedResetAction,
  updateStudentDataAction,
} from '../../actions/studentRegistrationActions';
import {
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
import {
  getFinalMemberData,
  isPageUserStudent,
  updateClassAttended2019InStudentData,
} from '../../utils/registrationFormUtils';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';
import { validation } from '../../config/memberRegistrationCorrectionFormSchema.json';
import {
  InitialStudentData, isObjectsEqual,
  prePopulateOptIn,
} from '../../utils/SampleFormValidation';
import CorrectionsForm from '../CorrectionsForm';
import FormUpdateSuccessMessage from '../FormUpdateSuccessMessage';

/**
 * MemberRegistrationCorrectionForm render member registration correction form.
 * @type {Class}
 * @return {HTML} Correction form
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
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const finalStudentData = getFinalMemberData({ studentData });
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
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const finalStudentData = getFinalMemberData({ studentData });
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
   * @return {}
   */
  validate = () => {
    const { student } = this.state;
    if (student.optIn2019 === 'Y') {
      return validation;
    }
    return {};

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
    this.props.updateStudentDataAction({
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
   * callBack for changeIsOnlyOptIn
   */
  onlyOptInChanged = () => {
    this.changeIsOnlyOptIn(true);
  };
  /**
   * renderSubmitButtons method render submit button
   * @return {HTML} submit button
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

    } else if (!isObjectsEqual({ object1: oldStudentDate, object2: student }) && hasError) {
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
   * @return {Array} temError
   */
  transformErrors = () => {
    const { student } = this.state;
    let transFormErrorObject = {};
    if (student.optIn2019 === 'N') {
      transFormErrorObject = {};
    }
    if (student.optIn2019 !== 'N') {
      transFormErrorObject = {
        'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
        'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
      };
    }
    return transFormErrorObject;
  };

  /**
   * renderBackButton render back button conditionally for redirect to previous location .
   * @return {HTML}
   */
  renderBackButton = () => {

    const {
      pageUser,
      context,
    } = this.props;
    const { ADMIN } = USER_TYPES;

    if (pageUser === ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={context.previousLocation}
        />
      );

    } else if (isPageUserStudent({ pageUser })) {
      return (
        <Button
          type="button"
          buttonText={goBackBtnText}
          onClick={this.onlyOptInChanged}
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

  renderNoDataPopUp = () => {
    const { context } = this.props;
    return (
      <Popup>
        <h5>{invalidIdMessage}</h5>
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={context.previousLocation}
        />
      </Popup>
    );
  };

  /**
   * onChange method handle onChange of form
   * @param {Object} event
   */
  onChange = ({ formData, errors }) => {
    this.setState({
      student: {
        ...this.state.student,
        ...formData,
      },
      isFormChanged: true,
      isSubmitTriggered: false,
      hasError: isEmpty(errors),
    });
  };

  render() {

    const {
      isFetch,
      studentData,
      pageUser,
      tenant,
      context,
      isStudentUpdated,
    } = this.props;

    const {
      onlyOptInForm,
      student,
      isSubmitTriggered,
      isFormChanged,
      hasError,
    } = this.state;

    if (isFetch && studentData) {
      return (
        <CorrectionsForm
          pageUser={pageUser}
          tenant={tenant}
          onlyOptInForm={onlyOptInForm}
          validate={this.validate}
          student={student}
          onChange={this.onChange}
          transformErrors={this.transformErrors}
          submitStudentDataForOnlyOptInCase={this.submitStudentDataForOnlyOptInCase}
          changeIsOnlyOptIn={this.changeIsOnlyOptIn}
          renderBackButton={this.renderBackButton}
          formRef={this.formRef}
          renderSubmitButtons={this.renderSubmitButtons}
        >
          <FormUpdateSuccessMessage
            isSubmitTriggered={isSubmitTriggered}
            isFormChanged={isFormChanged}
            hasError={hasError}
            context={context}
            isStudentUpdated={isStudentUpdated}
          />
        </CorrectionsForm>
      );
    }
    return this.renderNoDataPopUp();
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
  updateStudentDataAction: PropTypes.func,
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
  updateStudentDataAction: () => {},
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
  isUpdatedResetAction,
  updateStudentDataAction,
})(MemberRegistrationCorrectionForm);
