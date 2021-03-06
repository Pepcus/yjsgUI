import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';

import { CORRECTION_MODE, USER_TYPES } from 'constants/member';
import { isUpdatedResetAction, updateMemberDataAction } from 'actions/memberRegistrationActions';
import { setLoadingStateAction } from 'actions/loaderActions';
import {
  getIsMemberFetchedFromUrlParams,
  getMember, getRegistrationCorrectionMode,
  getUserId,
  getUserSecretKey,
  isFetched,
  isUpdated,
} from 'reducers/memberRegistrationReducer';
import {
  getPageUserType,
  getUserType,
} from 'reducers/appReducer';
import {
  getRegisteredMemberData,
  isUserMember,
  updateClassAttended2020InMemberData,
  getFormData,
  getTransformedErrors,
  formValidators,
  // getBusNumberFromBusStop,
} from 'utils/form';
import { getApplicationTenant, getBusCoordinators } from 'reducers/assetFilesReducer';
import {
  initialMemberData,
  isObjectsEqual,
  prePopulateOptIn,
} from 'utils/validations';
import { getConstants } from 'reducers/constants';

import Loader from 'components/common/Loader';
import BusStopChangeWarningPopUp
  from 'components/routeComponents/memberRegistrationCorrectionForm/BusStopChangeWarningPopUp';
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
      margin: 10px 0 10px 0;
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
      width: 100%;
      margin: 10px 0 10px 0;
  }
`;

/**
 * MemberRegistrationCorrectionForm render member registration correction form.
 * @type {Class}
 */
class MemberRegistrationCorrectionForm extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.mounted = false;
    this.state = {
      formData: {},
      formConfig: {},
      isFormChanged: false,
      isSubmitTriggered: false,
      isPreviousLocation: false,
      member: {},
      oldMemberData: {},
      onlyOptInForm: (props.config.isOptInEnable
        && props.isMemberFetchedFromUrlParams
        && props.registrationCorrectionMode !== CORRECTION_MODE.EDIT
      ),
      mandatoryField: false,
      isBusStopChangeWarningPopupVisible: false,
      hasUserSeenBusStopChangeWarning: false,
    };
    this.changeIsOnlyOptIn = this.changeIsOnlyOptIn.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    const { memberData, setLoadingState, isMemberFetched } = this.props;
    const { onlyOptInForm } = this.state;
    if (isMemberFetched) {
      // If member data is not present in props then it will get from session store
      // for maintain the member credential in case member get back to member correction form
      const registeredMemberData = getRegisteredMemberData({ memberData });
      const prePopulateOptInMemberData = prePopulateOptIn({ memberData: registeredMemberData });

      setLoadingState(false);
      this.getFormConfig({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { memberData, setLoadingState, isMemberFetched } = nextProps;
    const { onlyOptInForm } = this.state;

    if (isMemberFetched) {
      // get member data from session if present
      // If member data is not present in props then it will get from session store
      // for maintain the member credential in case member get back to member correction form
      const registeredMemberData = getRegisteredMemberData({ memberData });
      const prePopulateOptInMemberData = prePopulateOptIn({ memberData: registeredMemberData });
      setLoadingState(false);
      this.getFormConfig({ prePopulateOptInMemberData, registeredMemberData, onlyOptInForm });
    }
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
    const { config, tenant, user } = this.props;
    const { ADMIN } = USER_TYPES;

    let formConfig = {};
    if (isUserMember({ user }) && onlyOptInForm) {
      formConfig = config.onlyOptInFormConfig;
    } else if (isUserMember({ user })) {
      formConfig = config.memberFormConfig;
    } else if (user === ADMIN) {
      formConfig = config.adminFormConfig;
    }

    if (this.mounted) {
      if (!isEmpty(prePopulateOptInMemberData)) {
        this.setState({
          formData: initialMemberData({
            memberData: prePopulateOptInMemberData,
            formConfig,
          }),
          member: initialMemberData({
            memberData: prePopulateOptInMemberData,
            formConfig,
          }),
          oldMemberData: initialMemberData({
            memberData: registeredMemberData,
            formConfig,
          }),
          isSubmitTriggered: false,
          formConfig: getFormData({
            user,
            onlyOptInForm,
            tenant: tenant ? tenant : 'default',
            member: this.state.member,
            formConfig,
          }),
          onlyOptInForm,
        });
      }
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
   * Method set only optIn file form
   * @param {Boolean} value
   */
  changeIsOnlyOptIn = (value) => {
    const { member } = this.state;
    const { memberData } = this.props;
    const registeredMemberData = getRegisteredMemberData({ memberData });
    const currentRegisteredMemberData = getRegisteredMemberData({ memberData: member });
    const prePopulateOptInMemberData = prePopulateOptIn({ memberData: currentRegisteredMemberData });
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
  renderSubmitButtons = () => {
    const { constants } = this.props;
    const { SUBMIT } = constants;
    return (
      <SubmitButtonStyled onClick={this.handleSubmit}>
        {SUBMIT}
      </SubmitButtonStyled>
    );
  };

  /**
   * Method submit updated form data on conditional
   * @param {Object} event
   */
  handleSubmit = (event) => {
    const { member, oldMemberData, hasError } = this.state;
    const { config } = this.props;
    const { isOptInEnable } = config;
    delete member.backButton;
    delete member.submitButton;
    event.preventDefault();
    if (isOptInEnable) {
      if (member.optIn2021 === 'N') {
        this.setState({
          isSubmitTriggered: true,
        });
        this.updateMemberData();
      } else {
        if (!isObjectsEqual({ object1: oldMemberData, object2: member }) && !hasError) {
          this.setState({
            isSubmitTriggered: true,
            mandatoryField: false,
          });
          this.updateMemberData();
        } else {
          this.setState({
            isFormChanged: false,
            mandatoryField: true,
            isSubmitTriggered: true,
          }, () => { this.scrollToError(); });
        }
      }
    }
  };

  /**
   * Method submit form data for only optIn field
   * @param {Object} event
   */
  submitMemberDataForOnlyOptInCase = (event) => {
    const { member } = this.state;
    const { config } = this.props;
    const { isOptInEnable } = config;
    event.preventDefault();
    if (isOptInEnable) {
      if (!isEmpty(member.optIn2021)) {
        this.setState({
          isSubmitTriggered: true,
        });
        this.updateMemberData();
      }
    }
  };
  /**
   * Method transform error of form field conditionally
   * optIn value should not be 'N'
   * @param {Array} errors
   * @return {Array} errors
   */
  transformErrors = (errors) => {
    const { constants, config } = this.props;
    const { isOptInEnable } = config;
    const { THIS_INFORMATION_IS_COMPULSORY_MESSAGE } = constants;
    const { member, mandatoryField } = this.state;
    const transformErrors = {
      'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
      'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    };
    if (isOptInEnable) {
      if (member.optIn2021 === 'N') {
        return [];
      }
      if (mandatoryField) {
        return getTransformedErrors({ errors, transformErrors });
      }
      return errors;
    }
  };

  /**
   * Method render back button conditionally for redirect to previous location .
   * @return {HTML}
   */
  renderBackButton = () => {
    const { user, constants, config } = this.props;
    const { onlyOptInForm } = this.state;
    const { ADMIN } = USER_TYPES;
    const { BACK } = constants;

    if (isUserMember({ user }) && onlyOptInForm) {
      return (
        <BackButtonStyled
          onClick={this.onlyOptInChanged}
        >
          {BACK}
        </BackButtonStyled>
      );
    }

    return (
      <BackButtonStyled
        onClick={this.redirectToPreviousLocation}
      >
        {BACK}
      </BackButtonStyled>
    );
  };
  /*
  Commenting out this code for now as it could be useful in future.
  handleMemberBusStopChange = (busStopValue) => {
    const { ADMIN, MEMBER } = USER_TYPES;
    const { user } = this.props;
    // If user is not coming from self vehicle.
    if ( busStopValue !== 'Self Vehicle') {
      // Then display a warning for the member for only once.
      if (!this.state.hasUserSeenBusStopChangeWarning && user !== ADMIN) {
        this.setState({
          isBusStopChangeWarningPopupVisible: true,
        });
      }
      /!*
      // TODO: This requirement is currently not been finalized. Waiting for the approval.
      // if user is admin then prepopulate the designated busNumber on change of busStop.
      if (user === ADMIN) {
        const busNumber = getBusNumberFromBusStop({
          busDetails: this.props.busCoordinators,
          busStop: busStopValue,
        });
        this.setState({
          formData: {
            ...this.state.formData,
            busNumber,
          },
          member: {
            ...this.state.member,
            busNumber,
          },
        })
      }
      *!/
    }
  };

  */
  onConfirmBusStopChangeWarning = () => {
    this.setState({
      hasUserSeenBusStopChangeWarning: true,
      isBusStopChangeWarningPopupVisible: false,
    });
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
      hasError: !isEmpty(errors),
    });
    // if (previousFormData.busStop !== formData.busStop) {
    //   this.handleMemberBusStopChange(formData.busStop);
    // }
  };
  /*
  Commenting out this code for now as it could be useful in future
  renderBusStopChangeWarningPopup = () => {
    const {
      hasUserSeenBusStopChangeWarning,
      isBusStopChangeWarningPopupVisible,
    } = this.state;
    if (isBusStopChangeWarningPopupVisible && !hasUserSeenBusStopChangeWarning) {
      return (
        <Box>
          <BusStopChangeWarningPopUp
            onConfirmation={this.onConfirmBusStopChangeWarning}
          />
        </Box>
      )
    }
    return null;
  }
  */
  render() {
    const {
      context,
      isMemberUpdated,
      isMemberFetched,
      isUpdatedReset,
      memberData,
      tenant,
      user,
      constants,
      config,
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
    if (isMemberFetched && memberData && !isEmpty(formConfig)) {
      return (
        <CorrectionsForm
          constants={constants}
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
          tenant={tenant ? tenant : 'default'}
          transformErrors={this.transformErrors}
          user={user}
          validate={formValidators(formConfig.schema, constants)}
          memberMarksGridMetaData={config.memberMarksGridMetaData}
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
    if (isMemberFetched && isEmpty(memberData)) {
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
    return (
      <Loader isLoading />
    );
  }
}

MemberRegistrationCorrectionForm.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  context: PropTypes.object,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isMemberFetched: PropTypes.bool,
  isMemberUpdated: PropTypes.bool,
  isMemberFetchedFromUrlParams: PropTypes.bool,
  isUpdatedReset: PropTypes.func,
  memberData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  secretKey: PropTypes.string,
  setLoadingState: PropTypes.func.isRequired,
  tenant: PropTypes.string,
  updateMemberData: PropTypes.func,
  user: PropTypes.string,
  registrationCorrectionMode: PropTypes.string,
};

MemberRegistrationCorrectionForm.defaultProps = {
  config: {},
  constants: {},
  context: {},
  id: '',
  isMemberFetched: false,
  isMemberUpdated: false,
  isMemberFetchedFromUrlParams: false,
  isUpdatedReset: () => {},
  memberData: {},
  secretKey: '',
  tenant: '',
  updateMemberData: () => {},
  user: '',
  registrationCorrectionMode: '',
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  id: getUserId(state),
  isMemberFetched: isFetched(state),
  isMemberUpdated: isUpdated(state),
  memberData: getMember(state),
  secretKey: getUserSecretKey(state),
  tenant: getApplicationTenant(state),
  user: getPageUserType(state),
  userType: getUserType(state),
  isMemberFetchedFromUrlParams: getIsMemberFetchedFromUrlParams(state),
  busCoordinators: getBusCoordinators(state),
  registrationCorrectionMode: getRegistrationCorrectionMode(state),
});

const mapDispatchToProps = dispatch => ({
  isUpdatedReset: props => dispatch(isUpdatedResetAction(props)),
  setLoadingState: props => dispatch(setLoadingStateAction(props)),
  updateMemberData: props => dispatch(updateMemberDataAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberRegistrationCorrectionForm);
