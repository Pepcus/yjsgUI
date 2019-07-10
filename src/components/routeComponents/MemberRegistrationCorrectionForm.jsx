import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import {
  formSubmitBtnText,
  goBackBtnText,
  invalidIdMessage,
  USER_TYPES,
  FILES_NAME, ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG,
} from '../../constants/yjsg';
import {
  isUpdatedResetAction,
  setLoadingStateAction,
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
  getRegisteredMemberData,
  isUserMember,
  updateClassAttended2019InMemberData,
} from '../../utils/registrationFormUtils';
import { getTenantName } from '../../reducers/appConfigReducer';
import {
  initialMemberData,
  isObjectsEqual,
  prePopulateOptIn,
} from '../../utils/formValidations';
import CorrectionsForm from '../CorrectionsForm';
import FormUpdateSuccessMessage from '../FormUpdateSuccessMessage';
import { fetchFormConfig } from '../../sagas/formConfigAPI';

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
      member: {},
      oldMemberData: {},
      onlyOptInForm: true,
      isSubmitTriggered: false,
      hasError: false,
      isFormChanged: false,
      formConfig: {},
    };
    this.changeIsOnlyOptIn = this.changeIsOnlyOptIn.bind(this);
  }

  componentDidMount() {
    const { memberData } = this.props;
    const { onlyOptInForm } = this.state;
    // If member data is not present in props then it will get from session store
    // for maintain the member credential in case member get back to member correction form
    const registeredMemberData = getRegisteredMemberData({ memberData });
    const prePopulateOptInMemberData = prePopulateOptIn({ memberData: registeredMemberData });

    this.props.setLoadingStateAction(false);
    this.getFormConfig({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { memberData } = nextProps;
    const { onlyOptInForm } = nextState;
    // get member data from session if present
    // If member data is not present in props then it will get from session store
    // for maintain the member credential in case member get back to member correction form
    const registeredMemberData = getRegisteredMemberData({ memberData });
    const prePopulateOptInMemberData = prePopulateOptIn({ memberData: registeredMemberData });
    this.props.setLoadingStateAction(false);
    this.getFormConfig({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm });
  }

  /**
   * It fetch the JSON form schema for form
   * @param {String} user
   * @param {Object} prePopulateOptInMemberData
   * @param {Object} registeredMemberData
   * @param {Boolean} onlyOptInForm
   */
  getFormConfig = ({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm }) => {
    const { tenant, user } = this.props;
    const { ONLY_OPT_IN_JSON, MEMBER_JSON, ADMIN_JSON } = FILES_NAME;
    const { ADMIN } = USER_TYPES;

    let fileName = '';
    if (isUserMember({ user }) && onlyOptInForm) {
      fileName = ONLY_OPT_IN_JSON;
    } else if (isUserMember({ user })) {
      fileName = MEMBER_JSON;
    } else if (user === ADMIN) {
      fileName = ADMIN_JSON;
    }
    try {
      fetchFormConfig({ tenant, fileName })
        .then((response) => {
          if (response) {
            if (!isEmpty(prePopulateOptInMemberData)) {
              this.setState({
                member: initialMemberData({
                  memberData: prePopulateOptInMemberData,
                  formConfig: response,
                }),
                oldMemberData: initialMemberData({
                  memberData: registeredMemberData,
                  formConfig: response,
                }),
                isSubmitTriggered: false,
                formConfig: response,
                onlyOptInForm,
              });
              this.prePopulateCourse2019(initialMemberData({
                memberData: prePopulateOptInMemberData,
                formConfig: response,
              }));
            }
          } else {
            console.error(ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG);
            this.props.setLoadingStateAction(false);
          }
        });
    } catch (e) {
      console.error(ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG);
      console.error(e);
    } finally {
      this.props.setLoadingStateAction(false);
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
    const { member, formConfig } = this.state;

    if (member.optIn2019 === 'Y') {
      return formConfig.validation;
    }
    return [];

  };

  /**
   * updateMemberData method will update  data by onClick of submit button
   */
  updateMemberData = () => {
    const {
      id,
      secretKey,
    } = this.props;
    const { member } = this.state;

    // Calls api to update member data
    this.props.updateStudentDataAction({
      id,
      secretKey,
      student: member,
    });
  };

  /**
   * prePopulateCourse2019 method pre populate course (level) of year 2019
   * @param {Object} memberData
   */
  prePopulateCourse2019 = (memberData) => {
    const updatedData = updateClassAttended2019InMemberData(memberData);

    this.setState({
      member: updatedData,
    });
  };

  /**
   * changeIsOnlyOptIn method set only optIn file form
   * @param {String} value
   */
  changeIsOnlyOptIn = (value) => {
    const { memberData } = this.props;
    const registeredMemberData = getRegisteredMemberData({ memberData });
    const prePopulateOptInMemberData = prePopulateOptIn({ memberData: registeredMemberData });

    this.getFormConfig({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm: value });
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
      value="Submit"
      onClick={this.handleSubmit}
    />
  );

  /**
   * handleSubmit submit updated form data on conditional
   * @param {Object} event
   */
  handleSubmit = (event) => {
    const { member, oldMemberData, hasError } = this.state;
    delete member.backButton;
    delete member.submitButton;
    event.preventDefault();
    if (member.optIn2019 === 'N') {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateMemberData();

    } else if (!isObjectsEqual({ object1: oldMemberData, object2: member }) && hasError) {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateMemberData();

    } else {
      this.setState({
        isFormChanged: false,
        isSubmitTriggered: true,
      }, () => { this.scrollToError(); });
    }
  };

  /**
   * submitMemberDataForOnlyOptInCase method submit form data for only optIn field
   * @param {Object} event
   */
  submitMemberDataForOnlyOptInCase = (event) => {

    const { member } = this.state;

    event.preventDefault();
    if (!isEmpty(member.optIn2019)) {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateMemberData();
    }
  };

  /**
   * transformErrors method transform error of form field conditionally
   * optIn value should not be 'N'
   * @return {Array} temError
   */
  transformErrors = () => {
    const { member } = this.state;
    let transFormErrorObject = {};
    if (member.optIn2019 === 'N') {
      transFormErrorObject = {};
    }
    if (member.optIn2019 !== 'N') {
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
      user,
      context,
    } = this.props;
    const { ADMIN } = USER_TYPES;

    if (user === ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={context.previousLocation}
        />
      );

    } else if (isUserMember({ user })) {
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
      member: {
        ...this.state.member,
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
      memberData,
      user,
      tenant,
      context,
      isMemberUpdated,
    } = this.props;

    const {
      onlyOptInForm,
      member,
      isSubmitTriggered,
      isFormChanged,
      hasError,
      formConfig,
    } = this.state;

    if (isFetch && memberData && !isEmpty(formConfig)) {
      return (
        <CorrectionsForm
          user={user}
          tenant={tenant}
          onlyOptInForm={onlyOptInForm}
          validate={this.validate}
          member={member}
          onChange={this.onChange}
          transformErrors={this.transformErrors}
          submitMemberDataForOnlyOptInCase={this.submitMemberDataForOnlyOptInCase}
          changeIsOnlyOptIn={this.changeIsOnlyOptIn}
          renderBackButton={this.renderBackButton}
          formRef={this.formRef}
          renderSubmitButtons={this.renderSubmitButtons}
          formConfig={formConfig}
        >
          <FormUpdateSuccessMessage
            isSubmitTriggered={isSubmitTriggered}
            isFormChanged={isFormChanged}
            hasError={hasError}
            context={context}
            isMemberUpdated={isMemberUpdated}
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
  isMemberUpdated: PropTypes.bool,
  isUpdatedResetAction: PropTypes.func,
  user: PropTypes.string,
  secretKey: PropTypes.string,
  setLoadingStateAction: PropTypes.func.isRequired,
  memberData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tenant: PropTypes.string,
  updateStudentDataAction: PropTypes.func,
};

MemberRegistrationCorrectionForm.defaultProps = {
  context: {},
  id: '',
  isFetch: false,
  isMemberUpdated: false,
  isUpdatedResetAction: () => {},
  user: '',
  secretKey: '',
  memberData: {},
  tenant: '',
  updateStudentDataAction: () => {},
};

const mapStateToProps = state => ({
  id: getUserId(state),
  isFetch: isFetched(state),
  isMemberUpdated: isUpdated(state),
  user: getPageUserType(state),
  secretKey: getUserSecretKey(state),
  memberData: getStudent(state),
  tenant: getTenantName(state),
  userType: getUserType(state),
});

export default connect(mapStateToProps, {
  isUpdatedResetAction,
  setLoadingStateAction,
  updateStudentDataAction,
})(MemberRegistrationCorrectionForm);
