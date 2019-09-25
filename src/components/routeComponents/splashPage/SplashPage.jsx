/* eslint-disable import/no-extraneous-dependencies */
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
  setAdminCredentialsAction,
  setAdminLoginStateAction,
  setHashLinkForNewRegistrationAction,
  setMemberCredentialsAction,
} from 'actions/memberRegistrationActions';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getMember,
  isFetched,
  isLoading,
  stateOfAdminLogin,
} from 'reducers/memberRegistrationReducer';
import yjsgLogo from 'assets/images/yjsgLogo.png';
import {
  adminId,
  adminPassword,
  eventDate,
  eventVenue,
  USER_TYPES,
} from 'constants/yjsg';
import { getParameterByName } from 'utils/http';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import {
  GIVEN_INFORMATION_WRONG_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from 'constants/messages';
import { getTransformedErrors } from 'utils/formUtils';
import LoginForm from './LoginForm';
import ImageWrapper from './ImageWrapper';

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
      hasError: true,
      isAdmin: false,
      isNewRegistration: false,
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

    if (redirectToRoute) {
      this.setRedirectToRoute(redirectToRoute);
    }
    if (id && secretCode) {
      this.fetchMemberByURLParams(id, secretCode);
    }
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
  fetchMemberByURLParams = (id, secretCode) => {
    const { setMemberCredentials, fetchMemberData } = this.props;
    setMemberCredentials({ id, secretKey: secretCode });
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
   * Method redirect to admin page on some condition.
   * @return {HTML}
   */
  handleAdminScreenRedirection = () => {
    // IF admin initial login.
    const {
      adminCredentialErrorMessage,
      redirectToRoute,
    } = this.state;
    const {
      adminLoginState,
      id,
      password,
      setAdminLoginState,
    } = this.props;

    if (!adminLoginState) {
      // Verify admin credential
      if (adminCredentialErrorMessage) {
        if (id !== adminId || password !== adminPassword) {
          // If admin credential is not valid it gives the error message.
          return (
            <Row
              justify="center"
              width="100%"
              margin="0 0 18px 0"
            >
              <Typography
                type="title"
                fontSize="12px"
                align="center"
                color="error"
              >
                {GIVEN_INFORMATION_WRONG_MESSAGE}
              </Typography>
            </Row>
          );
        }
        // if admin credential is valid then it set admin login true in redux store
        // and redirect to "/member-search" route
        setAdminLoginState({ adminLoginState: true });
        if (redirectToRoute) {
          this.setRedirectToRoute('');
          return <Switch><Redirect to={redirectToRoute} /></Switch>;
        }
        return <Switch><Redirect to="/member-search" /></Switch>;
      }
      return null;
    }
    if (redirectToRoute) {
      this.setRedirectToRoute('');
      return <Switch><Redirect to={redirectToRoute} /></Switch>;
    }
    // if admin is already login then it redirect to "/member-search"
    // without any credential.
    return <Switch><Redirect to="/member-search" /></Switch>;
  };


  /**
   * Method set the admin login credential
   */
  setAdminLogin = () => {
    const { admin } = this.state;
    const { setAdminCredentials } = this.props;

    if (this.state.hasError) {
      this.setState({
        adminCredentialErrorMessage: true,
      });
      setAdminCredentials({ id: admin.adminId, password: admin.adminPassword });
    }
  };

  /**
   * Method set the value of isNewRegistration true on Onclick of new registration button.
   */
  redirectToNewRegistrationPage = () => {
    const { setHashLinkForNewRegistration } = this.props;
    const { ADMIN } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    setHashLinkForNewRegistration(ADMIN);
  };

  render() {
    const {
      admin,
      isAdmin,
      isNewRegistration,
      isURLParams,
    } = this.state;
    const { tenant } = this.props;

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
                {eventDate[tenant ? tenant : 'DEFAULT_EVENT_DATE']}
              </TypographyStyled>
              <Typography
                align="center"
                fontSize="16px"
                type="title"
              >
                {eventVenue[tenant ? tenant : 'DEFAULT_EVENT_VENUE']}
              </Typography>
            </Row>
            <ImageWrapper
              margin="auto"
              padding="20px"
              tagname="div"
              width="50%"
            >
              <ImageStyled src={yjsgLogo} alt="yjsg logo" />
            </ImageWrapper>
            <LoginForm
              admin={admin}
              enableAdminLoginButtons={this.enableAdminLoginButtons}
              handleAdminScreenRedirection={this.handleAdminScreenRedirection}
              handleDisableAdminLoginButtons={this.handleDisableAdminLoginButtons}
              isAdmin={isAdmin}
              isNewRegistration={isNewRegistration}
              onChange={this.onChange}
              redirectToNewRegistrationPage={this.redirectToNewRegistrationPage}
              setAdminLogin={this.setAdminLogin}
              transformErrors={this.transformErrors}
            />
          </Col>
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

SplashPage.propTypes = {
  adminLoginState: PropTypes.bool,
  fetchMemberData: PropTypes.func,
  id: PropTypes.string,
  password: PropTypes.string,
  setAdminCredentials: PropTypes.func,
  setAdminLoginState: PropTypes.func,
  setHashLinkForNewRegistration: PropTypes.func,
  setMemberCredentials: PropTypes.func,
  tenant: PropTypes.string,
};

SplashPage.defaultProps = {
  adminLoginState: false,
  fetchMemberData: () => {},
  id: '',
  password: '',
  setAdminCredentials: () => {},
  setAdminLoginState: () => {},
  setHashLinkForNewRegistration: () => {},
  setMemberCredentials: () => {},
  tenant: '',
};

const mapStateToProps = state => ({
  adminLoginState: stateOfAdminLogin(state),
  id: getAdminId(state),
  isFetched: isFetched(state),
  isLoading: isLoading(state),
  password: getAdminPassword(state),
  searchResults: getSearchResults(state),
  studentData: getMember(state),
  tenant: getApplicationTenant(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMemberData: ({ id, secretKey }) => dispatch(fetchMemberDataAction({ id, secretKey })),
  setAdminCredentials: ({ id, password }) => dispatch(setAdminCredentialsAction({ id, password })),
  setAdminLoginState: ({ adminLoginState }) => dispatch(setAdminLoginStateAction({ adminLoginState })),
  setHashLinkForNewRegistration: userType => dispatch(setHashLinkForNewRegistrationAction(userType)),
  setMemberCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashPage);
