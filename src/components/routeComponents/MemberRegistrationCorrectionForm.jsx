import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
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
import {
  InitialStudentData,
  isObjectsEqual,
  prePopulateOptIn,
} from '../../utils/SampleFormValidation';
import CorrectionsForm from '../CorrectionsForm';
import FormUpdateSuccessMessage from '../FormUpdateSuccessMessage';
import { fetchJsonSchemaFile } from '../../sagas/assetFilesAPI';


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
      fileData: {},
    };
    this.changeIsOnlyOptIn = this.changeIsOnlyOptIn.bind(this);
  }

  componentDidMount() {
    const { studentData } = this.props;
    const { onlyOptInForm } = this.state;
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const finalStudentData = getFinalMemberData({ studentData });
    const prePopulateOptInStudentData = prePopulateOptIn(finalStudentData);

    this.props.setLoadingStateAction(false);
    this.DecideJsonFile({ prePopulateOptInStudentData, finalStudentData, onlyOptInForm });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { studentData } = nextProps;
    const { onlyOptInForm } = nextState;
    // get student data from session if present
    // If student data is not present in props then it will get from session store
    // for maintain the student credential in case student get back to student correction form
    const finalStudentData = getFinalMemberData({ studentData });
    const prePopulateOptInStudentData = prePopulateOptIn(finalStudentData);
    this.props.setLoadingStateAction(false);
    this.DecideJsonFile({ prePopulateOptInStudentData, finalStudentData, onlyOptInForm });
  }

  /**
   * It decide that which JSON file will be fetch
   * @param {Object} prePopulateOptInStudentData
   * @param {Object} finalStudentData
   * @param {Boolean} onlyOptInForm
   * @return {Object}
   */
  DecideJsonFile = ({ prePopulateOptInStudentData, finalStudentData, onlyOptInForm }) => {
    const { tenant, pageUser } = this.props;
    const { ADMIN } = USER_TYPES;
    if (isPageUserStudent({ pageUser }) && onlyOptInForm) {
      return this.fetchFileData({
        pageUser,
        tenant,
        file: 'onlyEditOptIn',
        prePopulateOptInStudentData,
        finalStudentData,
        onlyOptInForm,
      });

    } else if (isPageUserStudent({ pageUser })) {
      return this.fetchFileData({
        pageUser,
        tenant,
        file: 'STUDENT',
        prePopulateOptInStudentData,
        finalStudentData,
        onlyOptInForm,
      });

    } else if (pageUser === ADMIN) {
      return this.fetchFileData({
        pageUser,
        tenant,
        file: 'ADMIN',
        prePopulateOptInStudentData,
        finalStudentData,
        onlyOptInForm,
      });
    }
    return null;
  };

  /**
   * It fetch the JSON form schema for form
   * @param {String} pageUser
   * @param {String} tenant
   * @param {String} file
   * @param {Object} prePopulateOptInStudentData
   * @param {Object} finalStudentData
   * @param {Boolean} onlyOptInForm
   */
  fetchFileData = ({ pageUser, tenant, file, prePopulateOptInStudentData, finalStudentData, onlyOptInForm }) => {
    try {
      fetchJsonSchemaFile({ tenant, file })
        .then((response) => {
          if (response) {
            if (!isEmpty(prePopulateOptInStudentData)) {
              this.setState({
                student: InitialStudentData({
                  studentData: prePopulateOptInStudentData,
                  pageUser,
                  tenant,
                  onlyOptInForm,
                  fileData: response,
                }),
                oldStudentDate: InitialStudentData({
                  studentData: finalStudentData,
                  pageUser,
                  tenant,
                  onlyOptInForm,
                  fileData: response,
                }),
                isSubmitTriggered: false,
                fileData: response,
                onlyOptInForm,
              });
              this.prePopulateCourse2019(InitialStudentData({
                studentData: prePopulateOptInStudentData,
                pageUser,
                tenant,
                onlyOptInForm,
                fileData: response,
              }));
            }
          } else {
            this.props.setLoadingStateAction(false);
          }
        }, () => {
          this.props.setLoadingStateAction(false);
        });
    } catch (e) {
      this.props.setLoadingStateAction(false);
      console.error(e);
    }
  };

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
   * @return {Array}
   */
  validate = () => {
    const { student, fileData } = this.state;

    if (student.optIn2019 === 'Y') {
      return fileData.validation;
    }
    return [];

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
    const finalStudentData = getFinalMemberData({ studentData: this.props.studentData });
    const prePopulateOptInStudentData = prePopulateOptIn(finalStudentData);

    this.props.setLoadingStateAction(false);
    this.DecideJsonFile({ prePopulateOptInStudentData, finalStudentData, onlyOptInForm: value });
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
      fileData,
    } = this.state;

    if (isFetch && studentData && !isEmpty(fileData)) {
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
          fileData={fileData}
        >
          <FormUpdateSuccessMessage
            isSubmitTriggered={isSubmitTriggered}
            isFormChanged={isFormChanged}
            hasError={hasError}
            context={context}
            isStudentUpdated={isStudentUpdated}
            isUpdatedReset={this.props.isUpdatedResetAction}
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
  setLoadingStateAction: PropTypes.string,
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
  setLoadingStateAction: () => {},
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
