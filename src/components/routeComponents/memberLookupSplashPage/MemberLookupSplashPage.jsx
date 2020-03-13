import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import Container from 'pepcus-core/lib/Container';
import { getThemeProps } from 'pepcus-core//utils/theme';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import {
  fetchMembersByMobileNumberAction,
  fetchMemberDataAction,
  resetMemberFetchedFromUrlParamsAction,
  setMemberCredentialsAction,
  setMemberFetchedFromUrlParamsAction,
  updateMembersOptInStatusAction,
  resetMemberOptInStatusDataAction,
} from 'actions/memberRegistrationActions';
import {
  setUserTypeAction,
  setHashLinkForNewRegistrationAction,
} from 'actions/appActions';
import {
  USER_TYPES,
} from 'constants/member';
import { getParameterByName } from 'apis/http';
import {
  getMembersFetchedFromMobile,
  getMembersOptInStatusUpdated,
  getMembersOptInUpdatePerformed,
  isFetched
} from 'reducers/memberRegistrationReducer';
import {
  getApplicationTenant,
} from 'reducers/assetFilesReducer';
import { getConstants } from 'reducers/constants';
import { getLogoPathConfig } from 'reducers/config';

import RedirectToRoute from './RedirectToRoute';
import ImageWrapper from './ImageWrapper';
import MemberRegistrationQueryForm from 'components/routeComponents/memberLookupSplashPage/MemberRegistrationQueryForm';
import { formValidators, getMembersIds, getNotOptedInMembers, getOptInMembers } from 'utils/form';
import MemberOptInDataGrid from 'components/routeComponents/memberLookupSplashPage/MemberOptInDataGrid';
import MembersOptInUpdateStatusPopup
  from 'components/routeComponents/memberLookupSplashPage/MembersOptInUpdateStatusPopup';
import Popup from 'components/common/Popup';


const SubmitButtonStyled = styled(Button)`
    ${({ theme }) => theme.media.down('lg')`
       width: 100%;
   `}
   @media (max-width: 992px) and (orientation: landscape) {
      width: 100%;
      margin: 10px 0 10px 0;
  }
`;

const ContainerStyled = styled(Container)`
  background-color: ${getThemeProps('home.backgroundColor')};
  height: 100%;
  display: flex;
  @media (max-width: 992px) and (orientation: landscape) {
     width: auto;
     height: auto;
    }
`;

const BoxStyled = styled(Box)`
 align-items: center;
 ${({ theme }) => theme.media.down('md')`
        margin: 60px auto auto auto;
        height: 65%;
        width: 97%;
    `};
    @media (max-width: 992px) and (orientation: landscape) {
        margin: 40px auto 40px auto;
        height: 65%;
        width: 65%;
    }     
`;

const ImageStyled = styled.img`
  width: 100%;
`;

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('colors.header')};
`;

const TextWrapper = styled(Typography)`
    font-size: 16px !important;
`;

/**
 * The MemberLookupSplashPage component for the member which will render -
 * Two buttons (Already Registered and New Registration) .
 * @type {class}
 * @return {HTML}
 * */
class MemberLookupSplashPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isURLParams: false,
      isMemberLogin: false,
      isNewRegistration: false,
      hasError: true,
      membersFetchedFromMobile: [],
      formData: {
        ...props.config.memberRegistrationQueryFormConfig.data,
      },
      formConfig: props.config.memberRegistrationQueryFormConfig,
      isOptInValueChanged: false,
      isSubmitButtonTriggered: false,
    };
    this.formRef = React.createRef();
  }

  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');

    if (id && secretCode) {
      this.fetchMemberByURLParams(id, secretCode);
    }
  }

  componentWillReceiveProps(nextProps, props) {
    if (!isEqual(nextProps.membersFetchedFromMobile, props.membersFetchedFromMobile)) {
      this.setState({
        membersFetchedFromMobile: nextProps.membersFetchedFromMobile,
      })
    }
  }


  componentDidMount() {
   this.props.resetMemberOptInStatusData();
  }

  /** If member login through URL fetchMemberByURLParams method will call.
   * @param {String} id
   * @param {String} secretCode
   */
  fetchMemberByURLParams(id, secretCode) {
    const { fetchMemberData, setMemberCredentials, setUserType, setMemberFetchedFromUrlParams } = this.props;
    const { MEMBER_WITH_URL } = USER_TYPES;
    setMemberFetchedFromUrlParams();
    setMemberCredentials({ id, secretKey: secretCode });
    fetchMemberData({ id, secretKey: secretCode });
    setUserType({ pageUser: MEMBER_WITH_URL });
    this.setState({
      isURLParams: true,
    });
  }


  /**
   * Method call by onclick of button new registration
   * it set the value of isNewRegistration is true.
   * And set user is member in reducer through setHashLinkForNewRegistration action.
   */
  redirectToNewRegistrationPage = () => {
    const { setHashLinkForNewRegistration, resetMemberFetchedFromUrlParams } = this.props;
    const { MEMBER } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    resetMemberFetchedFromUrlParams();
    setHashLinkForNewRegistration(MEMBER);
  };
  handleSubmit = () => {
    const { formData } = this.state;

    this.props.fetchMembersByMobileNumber({ mobile: formData.mobile });
  };

  renderAddNewRegistrationButton = () => {
    const { constants } = this.props;
    const { formData } = this.state;
    const { NEW_REGISTRATION } = constants;
    if (formData.isMemberAlreadyRegistered === 'N') {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <SubmitButtonStyled
            onClick={this.redirectToNewRegistrationPage}
          >
            {NEW_REGISTRATION}
          </SubmitButtonStyled>
        </div>
      );
    }
    return null;
  };

  renderMobileNumberSubmitButton = () => {
    const { constants, isFetched } = this.props;
    const { formData, hasError } = this.state;
    const { SUBMIT } = constants;
    if ((formData.isMemberAlreadyRegistered === 'Y') && !isFetched) {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <SubmitButtonStyled
            onClick={this.handleSubmit}
            disabled={!((formData.mobile) && !hasError)}
          >
            {SUBMIT}
          </SubmitButtonStyled>
        </div>
      );
    }
    return null;
  };

  handleOnChangeGridOptIn = (gridData) => {
    this.setState({
      membersFetchedFromMobile: gridData,
      isOptInValueChanged: true,
    });
  };

  handleOptInGridSubmit = () => {
    const { membersFetchedFromMobile = [], isOptInValueChanged } = this.state;
    if (isOptInValueChanged) {
      const optedInMembers = getOptInMembers({members: membersFetchedFromMobile});
      const notOptedInMembers = getNotOptedInMembers({members: membersFetchedFromMobile});
      this.props.updateMembersOptInStatus({
        optedInMembersIds: getMembersIds({ members: optedInMembers }),
        notOptedInMembersIds: getMembersIds({ members: notOptedInMembers }),
      });
    }
    this.setState({
      isSubmitButtonTriggered: true,
    })
  };

  renderMemberOptInDataGrid = () => {
    const {
      isFetched,
      config,
      constants,
    } = this.props;
    const { formData, membersFetchedFromMobile } = this.state;
    const {
      BACK,
      SUBMIT,
      NEW_REGISTRATION,
      REGISTRATION_FOUND_FOR_MOBILE_MESSAGE,
      NO_REGISTRATION_FOUND_FOR_MOBILE_MESSAGE,
    } = constants;
    if (isFetched && membersFetchedFromMobile.length && formData.isMemberAlreadyRegistered === 'Y') {
      return (
        <div>
          <TypographyStyled
            type="title"
            fontSize="16px"
            align="center"
          >
            {REGISTRATION_FOUND_FOR_MOBILE_MESSAGE}
          </TypographyStyled>
          <MemberOptInDataGrid
            metaData={config.memberOptInGridMetaData}
            gridData={this.state.membersFetchedFromMobile}
            onChangeGridOptIn={this.handleOnChangeGridOptIn}
          />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <SubmitButtonStyled
              onClick={this.handleOptInGridSubmit}
            >
              {SUBMIT}
            </SubmitButtonStyled>
          </div>
        </div>
      )
    } else if (isFetched && !membersFetchedFromMobile.length && formData.isMemberAlreadyRegistered === 'Y') {
      return (
        <Popup>
          <Row width="100%" justify="center" margin="0">
            <TextWrapper>{NO_REGISTRATION_FOUND_FOR_MOBILE_MESSAGE}</TextWrapper>
            <Button
              color="tertiary"
              width="170px"
              margin="10px 25px"
              onClick={() => { this.props.resetMemberOptInStatusData(); }}
            >
              {BACK}
            </Button>
            <Button
              color="tertiary"
              width="170px"
              margin="10px 25px"
              onClick={this.redirectToNewRegistrationPage}
            >
              {NEW_REGISTRATION}
            </Button>
          </Row>
        </Popup>
      )
    }
    return null;
  };

  onConfirmOptInUpdateStatusPopup = () => {
    // Resetting OptIn value change and submit button flags
    this.setState({
      isOptInValueChanged: false,
      isSubmitButtonTriggered: false,
    })
  };

  renderMemberOptInStatusPopup = () => {
    const { isOptInUpdatePerformed, isMembersOptInStatusUpdated } = this.props;
    if (isOptInUpdatePerformed) {
      return (
        <MembersOptInUpdateStatusPopup
          isMembersOptInStatusUpdated={isMembersOptInStatusUpdated}
          onConfirmOptInUpdateStatusPopup={this.onConfirmOptInUpdateStatusPopup}
        />
      )
    }
  };

  /**
   * Method handle onChange of form
   * @param {Object} event
   */
  onChange = ({ formData, errors }) => {
    const { formConfig, formData: previousFormData } = this.state;
    this.setState({
      formData: {
        ...previousFormData,
        ...formData,
      },
      hasError: !isEmpty(errors),
    });
  };

  renderNoInformationUpdatedPopup = () => {
    const { isOptInValueChanged, isSubmitButtonTriggered } = this.state;
    const { NO_CHANGE_IN_OPT_IN_STATUS_MESSAGE, BACK } = this.props.constants;
    if (!isOptInValueChanged && isSubmitButtonTriggered) {
      return (
        <Popup>
          <Row width="100%" justify="center" margin="0">
            <TextWrapper>{NO_CHANGE_IN_OPT_IN_STATUS_MESSAGE}</TextWrapper>
            <Button
              color="tertiary"
              width="170px"
              margin="10px 25px"
              onClick={() => {
                this.setState({
                  isSubmitButtonTriggered: false,
                })
              }}
            >
              {BACK}
            </Button>
          </Row>
        </Popup>
      )
    }
  };

  render() {
    const {
      constants,
      logoPathConfig,
    } = this.props;
    const {
      isURLParams,
      isMemberLogin,
      isNewRegistration,
      formConfig,
    } = this.state;
    const { pageBodyLogo } = logoPathConfig;
    const {
      EVENT_DATE,
      EVENT_VENUE,
    } = constants;
    return (
      <ContainerStyled width="100%" id="root1">
        <RedirectToRoute
          isURLParams={isURLParams}
          isMemberLogin={isMemberLogin}
          isNewRegistration={isNewRegistration}
        />
        <BoxStyled
          width="600px"
          maxWidth="97%"
          maxHeight="100%"
          margin="auto"
          borderStyle="none"
          elevation={5}
        >
          <Col>
            <Row width="100%" display="inline-block">
              <TypographyStyled
                type="title"
                fontWeight="600"
                fontSize="18px"
                align="center"
              >
                {EVENT_DATE}
              </TypographyStyled>
              <Typography
                type="title"
                fontSize="16px"
                align="center"
              >
                {EVENT_VENUE}
              </Typography>
            </Row>
            <ImageWrapper
              tagname="div"
              width="50%"
              margin="auto"
              padding="20px"
            >
              <ImageStyled src={pageBodyLogo} alt="yjsg logo" />
            </ImageWrapper>
            <Row justify="center">
              <MemberRegistrationQueryForm
                formData={this.state.formData}
                formConfig={formConfig}
                formRef={this.formRef}
                onChange={this.onChange}
                validate={formValidators(formConfig.schema, constants)}
              >
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  {this.renderMobileNumberSubmitButton()}
                </div>
                {
                  this.renderAddNewRegistrationButton()
                }
                {
                  this.renderMemberOptInDataGrid()
                }
                {
                  this.renderMemberOptInStatusPopup()
                }
                {
                  this.renderNoInformationUpdatedPopup()
                }
              </MemberRegistrationQueryForm>
            </Row>
          </Col>
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

MemberLookupSplashPage.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  fetchMemberData: PropTypes.func,
  logoPathConfig: PropTypes.object,
  setHashLinkForNewRegistration: PropTypes.func,
  setMemberCredentials: PropTypes.func,
  setUserType: PropTypes.func,
  setMemberFetchedFromUrlParams: PropTypes.func,
  resetMemberFetchedFromUrlParams: PropTypes.func,
  fetchMembersByMobileNumber: PropTypes.func,
  tenant: PropTypes.string,
  membersFetchedFromMobile: PropTypes.array,
  isFetched: PropTypes.bool,
  isMembersOptInStatusUpdated: PropTypes.bool,
};

MemberLookupSplashPage.defaultProps = {
  config: {},
  constants: {},
  fetchMemberData: () => {},
  logoPathConfig: {},
  membersFetchedFromMobile: [],
  setHashLinkForNewRegistration: () => {},
  setMemberCredentials: () => {},
  setUserType: () => {},
  setMemberFetchedFromUrlParams: () => {},
  resetMemberFetchedFromUrlParams: () => {},
  fetchMembersByMobileNumber: () => {},
  tenant: '',
  isFetched: false,
  isMembersOptInStatusUpdated: false,
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  logoPathConfig: getLogoPathConfig(state),
  tenant: getApplicationTenant(state),
  isFetched: isFetched(state),
  membersFetchedFromMobile: getMembersFetchedFromMobile(state),
  isMembersOptInStatusUpdated: getMembersOptInStatusUpdated(state),
  isOptInUpdatePerformed: getMembersOptInUpdatePerformed(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMemberData: ({ id, secretKey }) => dispatch(fetchMemberDataAction({ id, secretKey })),
  setMemberCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
  setHashLinkForNewRegistration: userType => dispatch(setHashLinkForNewRegistrationAction(userType)),
  setUserType: ({ pageUser }) => dispatch(setUserTypeAction({ pageUser })),
  setMemberFetchedFromUrlParams: () => dispatch(setMemberFetchedFromUrlParamsAction()),
  resetMemberFetchedFromUrlParams: () => dispatch(resetMemberFetchedFromUrlParamsAction()),
  fetchMembersByMobileNumber: ({ mobile }) => dispatch(fetchMembersByMobileNumberAction({ mobile })),
  updateMembersOptInStatus: ({ optedInMembersIds, notOptedInMembersIds }) => dispatch(updateMembersOptInStatusAction({ optedInMembersIds, notOptedInMembersIds })),
  resetMemberOptInStatusData: () => dispatch(resetMemberOptInStatusDataAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberLookupSplashPage);
