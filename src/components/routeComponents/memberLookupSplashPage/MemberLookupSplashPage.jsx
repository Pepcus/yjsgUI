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
  setHashLinkForMemberCredentialAction,
} from 'actions/appActions';
import {
  USER_TYPES,
} from 'constants/member';
import { getParameterByName } from 'apis/http';
import {
  getMembersFetchedFromMobile,
  getMembersOptInStatusUpdated,
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

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('sm')`
       width: 100%;
   `};
   
   @media (max-width: 992px) and (orientation: landscape) {
        width: 60%
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
      isOptInGridSubmitButtonEnabled: false,
      membersFetchedFromMobile: [],
      formData: {
        ...props.config.memberRegistrationQueryFormConfig.data,
      },
      formConfig: props.config.memberRegistrationQueryFormConfig,
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
    const { REGISTER_NOW } = constants;
    if (formData.isMemberAlreadyRegistered === 'N') {
      return (
        <SubmitButtonStyled
          onClick={this.redirectToNewRegistrationPage}
        >
          {REGISTER_NOW}
        </SubmitButtonStyled>
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
        <SubmitButtonStyled
          onClick={this.handleSubmit}
          disabled={!((formData.mobile) && !hasError)}
        >
          {SUBMIT}
        </SubmitButtonStyled>
      );
    }
    return null;
  };

  handleOnChangeGridOptIn = (gridData) => {
    this.setState({
      isOptInGridSubmitButtonEnabled: true,
      membersFetchedFromMobile: gridData,
    });
  };

  handleOptInGridSubmit = () => {
    const { membersFetchedFromMobile = [] } = this.state;
    const optedInMembers = getOptInMembers({members: membersFetchedFromMobile});
    const notOptedInMembers = getNotOptedInMembers({members: membersFetchedFromMobile});
    this.props.updateMembersOptInStatus({
      optedInMembersIds: getMembersIds({ members: optedInMembers }),
      notOptedInMembersIds: getMembersIds({ members: notOptedInMembers }),
    });
  };

  renderMemberOptInDataGrid = () => {
    const {
      isFetched,
      config,
    } = this.props;
    const { formData, membersFetchedFromMobile } = this.state;
    const { SUBMIT } = this.props.constants;
    if (isFetched && membersFetchedFromMobile.length && formData.isMemberAlreadyRegistered === 'Y') {
      return (
        <div>
          <MemberOptInDataGrid
            metaData={config.memberOptInGridMetaData}
            gridData={this.state.membersFetchedFromMobile}
            onChangeGridOptIn={this.handleOnChangeGridOptIn}
          />
          <SubmitButtonStyled
            onClick={this.handleOptInGridSubmit}
            disabled={!(this.state.isOptInGridSubmitButtonEnabled)}
          >
            {SUBMIT}
          </SubmitButtonStyled>
        </div>
      )
    }
    return null;
  };

  renderMemberOptInStatusPopup = () => {
    if (this.props.isMembersOptInStatusUpdated) {
      return (
        <MembersOptInUpdateStatusPopup />
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
      NEW_REGISTRATION,
    } = constants;
    return (
      <ContainerStyled width="100%">
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
                {
                  this.renderMobileNumberSubmitButton()
                }
                {
                  this.renderAddNewRegistrationButton()
                }
                {
                  this.renderMemberOptInDataGrid()
                }
                {
                  this.renderMemberOptInStatusPopup()
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
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  logoPathConfig: PropTypes.object,
  setHashLinkForMemberCredential: PropTypes.func,
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
  isAlreadyRegisteredButtonEnabled: false,
  logoPathConfig: {},
  membersFetchedFromMobile: [],
  setHashLinkForMemberCredential: () => {},
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
});

const mapDispatchToProps = dispatch => ({
  fetchMemberData: ({ id, secretKey }) => dispatch(fetchMemberDataAction({ id, secretKey })),
  setMemberCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
  setHashLinkForMemberCredential: userType => dispatch(setHashLinkForMemberCredentialAction(userType)),
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
