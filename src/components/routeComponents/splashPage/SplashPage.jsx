import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Col from 'pepcus-core/lib/Col';
import Container from 'pepcus-core/lib/Container';
import { getThemeProps } from 'pepcus-core/utils/theme';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import {
  fetchMemberDataAction,
  resetMemberFetchedFromUrlParamsAction,
  setMemberCredentialsAction,
  setMemberFetchedFromUrlParamsAction,
  setMemberRegistrationCorrectionModeAction,
} from 'actions/memberRegistrationActions';
import {
  setHashLinkForNewRegistrationAction,
  setHashLinkForNewCoordinatorAction,
  setHashLinkForEditCoordinatorAction,
} from 'actions/appActions';
import {
  loginAdminAction,
  setAdminCredentialsAction,
} from 'actions/loginActions';
import {
  getAdminLoginState,
  getAdminId,
  getAdminPassword,
} from 'reducers/loginReducer';
import {
  getMember,
  isFetched,
} from 'reducers/memberRegistrationReducer';
import {
  USER_TYPES,
} from 'constants/member';
import { getParameterByName } from 'apis/http';
import { getTransformedErrors } from 'utils/form';
import { getConstants } from 'reducers/constants';
import { getApplicationConfiguration, getLogoPathConfig } from 'reducers/config';

import LoginForm from './LoginForm';
import ImageWrapper from './ImageWrapper';
import { fetchCoordinatorDepartmentsAction } from 'actions/coordinatorRegistrationActions';

const ContainerStyled = styled(Container)`
  background-color: ${getThemeProps('home.backgroundColor')};
  height: 100%;
  display: flex;
  ${({ theme }) => theme.media.down('sm')`
      height: auto;
      min-height: 100%;
  `}
  @media (max-width: 992px) and (orientation: landscape) {
      height: auto;
  }
`;

const BoxStyled = styled(Box)`
 align-items: center;
 width: 600px;
 ${({ theme }) => theme.media.down('md')`
     margin: 60px auto auto auto;
     height: 85%;
     width: 97%;
 `};
 ${({ theme }) => theme.media.down('sm')`
     margin: 60px auto;
 `}
 @media (max-width: 992px) and (orientation: landscape) {
     width: 64%;
     margin: 60px auto;
 }
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 50%;
`;

const TypographyStyled = styled(Typography)`
  color: ${getThemeProps('colors.header')};
`;

/**
 * SplashPage component will be render home page of admin
 * @type {Class}
 */
class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: {},
      adminCredentialErrorMessage: false,
      hasError: false,
      isAdmin: false,
      isNewRegistration: false,
      isNewCoordinator: false,
      isEditCoordinator: false,
      isURLParams: false,
      redirectToRoute: '',
    };
  }

  /**
   * When member login through URL then this method will
   * get id and secretCode form URL and fetch data of that particular member.
   */
  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');
    const redirectToRoute = getParameterByName('fromRoute');
    const mode = getParameterByName('mode');
    if (redirectToRoute) {
      this.setRedirectToRoute(redirectToRoute);
    }
    if (id && secretCode) {
      this.fetchMemberByURLParams({ id, secretCode, mode});
    }
  }

  componentDidMount() {
    this.props.fetchCoordinatorDepartments();
  }

  /**
   * Handle the onChange of admin login form
   * @param {Object} formData
   * @param {Array} errors
   */
  onChange = ({ formData, errors }) => {
    this.setState({
      admin: formData,
      hasError: isEmpty(errors),
      adminCredentialErrorMessage: false,
    });
  };

  /**
   * Method return error message object
   * @param {Array} errors
   * @return {Array}
   */
  transformErrors = (errors) => {
    const { constants } = this.props;
    const { THIS_INFORMATION_IS_COMPULSORY_MESSAGE } = constants;

    const transformErrors = {
      'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
      'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    };

    return getTransformedErrors({ errors, transformErrors });
  };

  /**
   * Method set the path to which redirect
   * @param {String} redirectToRoute
   */
  setRedirectToRoute = (redirectToRoute) => {
    this.setState({
      redirectToRoute,
    });
  };

  /**
   * Method fetch member data.
   * And verify the member credential and if fetch member data is
   * success then it set the value of isURLParams to true.
   * @param {String} id
   * @param {String} secretCode
   */
  fetchMemberByURLParams = ({ id, secretCode, mode}) => {
    const { setMemberCredentials, fetchMemberData, setMemberFetchedFromUrlParams } = this.props;
    setMemberFetchedFromUrlParams();
    setMemberCredentials({ id, secretKey: secretCode });
    this.props.setMemberRegistrationCorrectionMode({ mode });
    fetchMemberData({ id, secretKey: secretCode });
    this.setState({
      isURLParams: true,
    });
  };

  /**
   * Method enable the admin login button by onClick of admin login button.
   * It set the value of isAdmin to true.
   */
  enableAdminLoginButtons = () => {
    this.setState({
      isAdmin: true,
    });
  };

  /**
   * Method disable the admin login
   * button by onClick of go back button.
   * It set the value of isAdmin to false.
   */
  handleDisableAdminLoginButtons = () => {
    this.setState({
      isAdmin: false,
    });
  };

  /**
   * Method set the admin login credential
   */
  setAdminLogin = () => {
    const { admin, hasError } = this.state;
    const { setAdminCredentials, loginAdmin, appConfig, resetMemberFetchedFromUrlParams } = this.props;
    if (hasError) {
      this.setState({
        adminCredentialErrorMessage: true,
      });
      resetMemberFetchedFromUrlParams();
      setAdminCredentials({ id: admin.adminId, password: admin.adminPassword });
      loginAdmin({
        adminId: admin.adminId,
        adminPassword: admin.adminPassword,
        preStoredAdminCredentials: appConfig.adminCredentials,
      });
    }
  };

  /**
   * Method set the value of isNewRegistration true on Onclick of newStudentRegistration button.
   */
  redirectToNewRegistrationPage = () => {
    const { setHashLinkForNewRegistration, resetMemberFetchedFromUrlParams } = this.props;
    const { ADMIN } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    resetMemberFetchedFromUrlParams();
    setHashLinkForNewRegistration(ADMIN);
  };

  /**
   * Method set the value of isNewCoordinator true on Onclick of newCoordinatorRegistration button.
   */
  redirectToNewCoordinatorPage = () => {
    const { setHashLinkForNewCoordinator } = this.props;
    const { COORDINATOR } = USER_TYPES;

    this.setState({
      isNewCoordinator: true,
    });
    setHashLinkForNewCoordinator(COORDINATOR);
  };

  /**
   * Method set the value of isEditCoordinator true on Onclick of editCoordinatorRegistration button.
   */
  redirectToEditCoordinatorPage = () => {
    const { setHashLinkForEditCoordinator } = this.props;
    const { COORDINATOR } = USER_TYPES;

    this.setState({
      isEditCoordinator: true,
    });
    setHashLinkForEditCoordinator(COORDINATOR);
  };

  render() {
    const {
      admin,
      isAdmin,
      isNewRegistration,
      isNewCoordinator,
      isEditCoordinator,
      isURLParams,
    } = this.state;
    const {
      constants,
      logoPathConfig,
      config,
    } = this.props;
    const { pageBodyLogo } = logoPathConfig;
    const {
      EVENT_DATE,
      EVENT_VENUE,
    } = constants;

    if (isURLParams) {
      return <Switch><Redirect to="/member-registration-correction" /></Switch>;
    }
    return (
      <ContainerStyled width="100%">
        <BoxStyled
          maxWidth="97%"
          maxHeight="100%"
          margin="auto"
          borderStyle="none"
          elevation={5}
        >
          <Col>
            <Row width="100%" display="inline-block">
              <TypographyStyled
                align="center"
                fontSize="18px"
                fontWeight="600"
                type="title"
              >
                {EVENT_DATE}
              </TypographyStyled>
              <Typography
                align="center"
                fontSize="16px"
                type="title"
              >
                {EVENT_VENUE}
              </Typography>
            </Row>
            <ImageWrapper
              margin="auto"
              padding="20px"
              tagname="div"
              width="50%"
            >
              <ImageStyled src={pageBodyLogo} alt="yjsg logo" />
            </ImageWrapper>
            <LoginForm
              admin={admin}
              config={config}
              enableAdminLoginButtons={this.enableAdminLoginButtons}
              handleDisableAdminLoginButtons={this.handleDisableAdminLoginButtons}
              isAdmin={isAdmin}
              isNewRegistration={isNewRegistration}
              isNewCoordinator={isNewCoordinator}
              isEditCoordinator={isEditCoordinator}
              onChange={this.onChange}
              redirectToNewRegistrationPage={this.redirectToNewRegistrationPage}
              redirectToNewCoordinatorPage={this.redirectToNewCoordinatorPage}
              redirectToEditCoordinatorPage={this.redirectToEditCoordinatorPage}
              setAdminLogin={this.setAdminLogin}
              transformErrors={this.transformErrors}
              adminCredentialErrorMessage={this.state.adminCredentialErrorMessage}
              redirectToRoute={this.state.redirectToRoute}
              id={this.props.id}
              password={this.props.password}
              isAdminLogin={this.props.isAdminLogin}
              setRedirectToRoute={this.setRedirectToRoute}
            />
          </Col>
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

SplashPage.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  isAdminLogin: PropTypes.bool,
  fetchMemberData: PropTypes.func,
  id: PropTypes.string,
  logoPathConfig: PropTypes.object,
  password: PropTypes.string,
  setAdminCredentials: PropTypes.func,
  setHashLinkForNewRegistration: PropTypes.func,
  setHashLinkForNewCoordinator: PropTypes.func,
  setHashLinkForEditCoordinator: PropTypes.func,
  setMemberCredentials: PropTypes.func,
  setMemberFetchedFromUrlParams: PropTypes.func,
  resetMemberFetchedFromUrlParams: PropTypes.func,
  loginAdmin: PropTypes.func,
  fetchCoordinatorDepartments: PropTypes.func,
};

SplashPage.defaultProps = {
  config: {},
  constants: {},
  isAdminLogin: false,
  fetchMemberData: () => {},
  logoPathConfig: {},
  id: '',
  password: '',
  setAdminCredentials: () => {},
  setHashLinkForNewRegistration: () => {},
  setHashLinkForNewCoordinator: () => {},
  setHashLinkForEditCoordinator: () => {},
  setMemberCredentials: () => {},
  setMemberFetchedFromUrlParams: () => {},
  resetMemberFetchedFromUrlParams: () => {},
  loginAdmin: () => {},
  fetchCoordinatorDepartments: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  id: getAdminId(state),
  isFetched: isFetched(state),
  logoPathConfig: getLogoPathConfig(state),
  password: getAdminPassword(state),
  memberData: getMember(state),
  isAdminLogin: getAdminLoginState(state),
  appConfig: getApplicationConfiguration(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMemberData: ({ id, secretKey }) => dispatch(fetchMemberDataAction({ id, secretKey })),
  setAdminCredentials: ({ id, password }) => dispatch(setAdminCredentialsAction({ id, password })),
  setHashLinkForNewRegistration: userType => dispatch(setHashLinkForNewRegistrationAction(userType)),
  setHashLinkForNewCoordinator: userType => dispatch(setHashLinkForNewCoordinatorAction(userType)),
  setHashLinkForEditCoordinator: userType => dispatch(setHashLinkForEditCoordinatorAction(userType)),
  setMemberCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
  loginAdmin: ({ adminId, adminPassword, preStoredAdminCredentials }) => dispatch(loginAdminAction({ adminId, adminPassword, preStoredAdminCredentials })),
  setMemberFetchedFromUrlParams: () => dispatch(setMemberFetchedFromUrlParamsAction()),
  resetMemberFetchedFromUrlParams: () => dispatch(resetMemberFetchedFromUrlParamsAction()),
  fetchCoordinatorDepartments: () => dispatch(fetchCoordinatorDepartmentsAction()),
  setMemberRegistrationCorrectionMode: ({ mode }) => dispatch(setMemberRegistrationCorrectionModeAction({ mode })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashPage);
