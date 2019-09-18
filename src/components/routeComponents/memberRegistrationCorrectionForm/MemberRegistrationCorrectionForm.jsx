/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'ravenjs/lib/Box';
import Button from 'ravenjs/lib/Button';

import {
  ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG,
  formSubmitBtnText,
  FILES_NAME,
  goBackBtnText,
  USER_TYPES,
} from 'constants/yjsg';
import {
  isUpdatedResetAction,
  setLoadingStateAction,
  updateMemberDataAction,
} from 'actions/memberRegistrationActions';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from 'constants/messages';
import {
  getPageUserType,
  getMember,
  getUserId,
  getUserSecretKey,
  getUserType,
  isFetched,
  isUpdated,
} from 'reducers/memberRegistrationReducer';
import {
  getRegisteredMemberData,
  isUserMember,
  updateClassAttended2019InMemberData,
} from 'utils/registrationFormUtils';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import { fetchFormConfig } from 'sagas/formConfigAPI';
import {
  initialMemberData,
  isObjectsEqual,
  prePopulateOptIn,
} from 'utils/formValidations';
import {
  getTransformedErrors,
  verifyFormDataValidations,
} from 'utils/formUtils';
import { getFormData } from 'utils/formDataUtils';

import CorrectionsForm from './CorrectionsForm';
import FormUpdateSuccessMessage from './FormUpdateSuccessMessage';
import InvalidMemberPopUp from './InvalidMemberPopUp';
import RedirectToRoute from './RedirectToRoute';

const SubmitButtonStyled = styled(Button)`
    ${({ theme }) => theme.media.down('lg')`
       width: 100%;
   `}
   @media (max-width: 992px) and (orientation: landscape) {
      width: 100%;
      margin: 10px 0px 10px 0px;
  }
`;

const BackButtonStyled = styled(Button)`
    float: right;
    margin-right: 25px;
    ${({ theme }) => theme.media.down('lg')`
       float: unset;
       width: 100%;
       margin-right: 0;
   `}
   @media (max-width: 992px) and (orientation: landscape) {
      margin-right: 0;
      width: 100%;
      margin: 10px 0px 10px 0px;
  }
`;

/**
 * MemberRegistrationCorrectionForm render member registration correction form.
 * @type {Class}
 * @return {HTML} Correction form
 */
class MemberRegistrationCorrectionForm extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.mounted = false;
    this.state = {
      formData: {},
      formConfig: {},
      hasError: false,
      isFormChanged: false,
      isSubmitTriggered: false,
      isPreviousLocation: false,
      member: {},
      oldMemberData: {},
      onlyOptInForm: true,
    };
    this.changeIsOnlyOptIn = this.changeIsOnlyOptIn.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    const { memberData, setLoadingState, user } = this.props;
    if (isUserMember({ user })) {
      const { onlyOptInForm } = this.state;
      // If member data is not present in props then it will get from session store
      // for maintain the member credential in case member get back to member correction form
      const registeredMemberData = getRegisteredMemberData({ memberData });
      const prePopulateOptInMemberData = prePopulateOptIn({ memberData: registeredMemberData });

      setLoadingState(false);
      this.getFormConfig({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { memberData, setLoadingState } = nextProps;
    const { onlyOptInForm } = this.state;
    // get member data from session if present
    // If member data is not present in props then it will get from session store
    // for maintain the member credential in case member get back to member correction form
    const registeredMemberData = getRegisteredMemberData({ memberData });
    const prePopulateOptInMemberData = prePopulateOptIn({ memberData: registeredMemberData });
    setLoadingState(false);
    this.getFormConfig({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * It fetch the JSON form schema for form
   * @param {String} user
   * @param {Object} prePopulateOptInMemberData
   * @param {Object} registeredMemberData
   * @param {Boolean} onlyOptInForm
   */
  getFormConfig = ({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm }) => {
    const { tenant, user, setLoadingState } = this.props;
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
            if (this.mounted) {
              if (!isEmpty(prePopulateOptInMemberData)) {
                this.setState({
                  formData: initialMemberData({
                    memberData: prePopulateOptInMemberData,
                    formConfig: response,
                  }),
                  member: initialMemberData({
                    memberData: prePopulateOptInMemberData,
                    formConfig: response,
                  }),
                  oldMemberData: initialMemberData({
                    memberData: registeredMemberData,
                    formConfig: response,
                  }),
                  isSubmitTriggered: false,
                  formConfig: getFormData({
                    user,
                    onlyOptInForm,
                    tenant,
                    member: this.state.member,
                    renderBackButton: this.renderBackButton,
                    renderSubmitButtons: this.renderSubmitButtons,
                    formConfig: response,
                  }),
                  onlyOptInForm,
                });
                this.prePopulateCourse2019(initialMemberData({
                  memberData: prePopulateOptInMemberData,
                  formConfig: response,
                }));
              }
            }
          } else {
            console.error(ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG);
            setLoadingState(false);
          }
        });
    } catch (e) {
      console.error(ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG);
      console.error(e);
    } finally {
      setLoadingState(false);
    }
  };

  /**
   * Method scroll to first form file which is in valid in mobile view only.
   */
  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-danger');

    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };

  /**
   * Method check validation for only optIn is 'Y' form field and return conditional error for form field
   * @param {Object} formData
   * @param {Object} errors
   * @return {Array}
   */
  validate = (formData, errors) => {
    const { member, formConfig } = this.state;
    const { validation } = formConfig;

    if (member.optIn2019 === 'N') {
      return [];
    } else if (member.optIn2019 !== 'N') {
      return verifyFormDataValidations({ formData, errors, validate: validation });
    } return [];
  };

  /**
   * Method will update data by onClick of submit button
   */
  updateMemberData = () => {
    const {
      id,
      secretKey,
      updateMemberData,
    } = this.props;
    const { member } = this.state;

    // Calls api to update member data
    updateMemberData({
      id,
      secretKey,
      member,
    });
  };

  /**
   * Method pre populate course (level) of year 2019
   * @param {Object} memberData
   */
  prePopulateCourse2019 = (memberData) => {
    const updatedData = updateClassAttended2019InMemberData(memberData);
    this.setState({
      member: updatedData,
    });
  };

  /**
   * Method set only optIn file form
   * @param {Boolean} value
   */
  changeIsOnlyOptIn = (value) => {
    const { member } = this.state;
    const registeredMemberData = getRegisteredMemberData({ memberData: member });
    const prePopulateOptInMemberData = prePopulateOptIn({ memberData: registeredMemberData });
    this.getFormConfig({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm: value });
  };

  /**
   * Redirect to previous location
   */
  redirectToPreviousLocation = () => {
    this.setState({
      isPreviousLocation: true,
    });
  };

  /**
   * Call Back for changeIsOnlyOptIn
   */
  onlyOptInChanged = () => {
    this.changeIsOnlyOptIn(true);
  };

  /**
   * Method render submit button
   * @return {HTML} submit button
   */
  renderSubmitButtons = () => (
    <SubmitButtonStyled onClick={this.handleSubmit}>
      {formSubmitBtnText}
    </SubmitButtonStyled>
  );

  /**
   * Method submit updated form data on conditional
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
   * Method submit form data for only optIn field
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
   * Method transform error of form field conditionally
   * optIn value should not be 'N'
   * @param {Array} errors
   * @return {Array} errors
   */
  transformErrors = (errors) => {
    const { member } = this.state;
    const transformErrors = {
      'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
      'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    };

    if (member.optIn2019 === 'N') {
      return [];
    } else if (member.optIn2019 !== 'N') {
      return getTransformedErrors({ errors, transformErrors });
    } return [];
  };

  /**
   * Method render back button conditionally for redirect to previous location .
   * @return {HTML}
   */
  renderBackButton = () => {
    const { user } = this.props;
    const { ADMIN } = USER_TYPES;

    if (user === ADMIN) {
      return (
        <BackButtonStyled
          onClick={this.redirectToPreviousLocation}
        >
          {goBackBtnText}
        </BackButtonStyled>
      );

    } else if (isUserMember({ user })) {
      return (
        <BackButtonStyled
          onClick={this.onlyOptInChanged}
        >
          {goBackBtnText}
        </BackButtonStyled>
      );
    }

    return (
      <BackButtonStyled
        onClick={this.redirectToPreviousLocation}
      >
        {goBackBtnText}
      </BackButtonStyled>
    );
  };

  /**
   * Method handle onChange of form
   * @param {Object} event
   */
  onChange = ({ formData, errors }) => {
    const { member, formConfig, formData: previousFormData } = this.state;
    this.setState({
      member: {
        ...member,
        ...formData,
      },
      formData: {
        ...previousFormData,
        ...formData,
      },
      formConfig: {
        ...formConfig,
        data: {
          ...formConfig.data,
          ...formData,
        },
      },
      isFormChanged: true,
      isSubmitTriggered: false,
      hasError: isEmpty(errors),
    });
  };

  render() {
    const {
      context,
      isMemberUpdated,
      isFetch,
      isUpdatedReset,
      memberData,
      tenant,
      user,
    } = this.props;

    const {
      formConfig,
      hasError,
      isFormChanged,
      isPreviousLocation,
      isSubmitTriggered,
      member,
      onlyOptInForm,
      formData,
    } = this.state;

    if (isFetch && memberData && !isEmpty(formConfig)) {
      return (
        <CorrectionsForm
          formData={formData}
          changeIsOnlyOptIn={this.changeIsOnlyOptIn}
          formConfig={formConfig}
          formRef={this.formRef}
          member={member}
          onChange={this.onChange}
          onlyOptInForm={onlyOptInForm}
          renderBackButton={this.renderBackButton}
          renderSubmitButtons={this.renderSubmitButtons}
          submitMemberDataForOnlyOptInCase={this.submitMemberDataForOnlyOptInCase}
          tenant={tenant}
          transformErrors={this.transformErrors}
          user={user}
          validate={this.validate}
        >
          <RedirectToRoute
            context={context}
            isPreviousLocation={isPreviousLocation}
          />
          <FormUpdateSuccessMessage
            hasError={hasError}
            isFormChanged={isFormChanged}
            isMemberUpdated={isMemberUpdated}
            isSubmitTriggered={isSubmitTriggered}
            isUpdatedReset={isUpdatedReset}
            redirectToPreviousLocation={this.redirectToPreviousLocation}
          />
        </CorrectionsForm>
      );
    }
    return (
      <Box>
        <InvalidMemberPopUp
          redirectToPreviousLocation={this.redirectToPreviousLocation}
        />
        <RedirectToRoute
          context={context}
          isPreviousLocation={isPreviousLocation}
        />
      </Box>
    );
  }
}

MemberRegistrationCorrectionForm.propTypes = {
  context: PropTypes.object,
  id: PropTypes.number,
  isFetch: PropTypes.bool,
  isMemberUpdated: PropTypes.bool,
  isUpdatedReset: PropTypes.func,
  memberData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  secretKey: PropTypes.string,
  setLoadingState: PropTypes.func.isRequired,
  tenant: PropTypes.string,
  updateMemberData: PropTypes.func,
  user: PropTypes.string,
};

MemberRegistrationCorrectionForm.defaultProps = {
  context: {},
  id: '',
  isFetch: false,
  isMemberUpdated: false,
  isUpdatedReset: () => {},
  memberData: {},
  secretKey: '',
  tenant: '',
  updateMemberData: () => {},
  user: '',
};

const mapStateToProps = state => ({
  id: getUserId(state),
  isFetch: isFetched(state),
  isMemberUpdated: isUpdated(state),
  memberData: getMember(state),
  secretKey: getUserSecretKey(state),
  tenant: getApplicationTenant(state),
  user: getPageUserType(state),
  userType: getUserType(state),
});

const mapDispatchToProps = dispatch => ({
  isUpdatedReset: props => dispatch(isUpdatedResetAction(props)),
  setLoadingState: props => dispatch(setLoadingStateAction(props)),
  updateMemberData: props => dispatch(updateMemberDataAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberRegistrationCorrectionForm);
