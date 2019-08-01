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

import Box from 'ravenjs/lib/Box';
import Col from 'ravenjs/lib/Col';
import Container from 'ravenjs/lib/Container';
import { getThemeProps } from 'ravenjs/utils/theme';
import Row from 'ravenjs/lib/Row';
import Typography from 'ravenjs/lib/Typography';

import {
  fetchStudentDataAction,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
  setHashLinkForNewRegistrationAction,
  setStudentCredentialsAction,
} from 'actions/studentRegistrationActions';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getStudent,
  isFetched,
  isLoading,
  stateOfAdminLogin,
} from 'reducers/studentRegistrationReducer';
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
import { getTransformedErrors } from 'utils/formUtil';
import LoginForm from './LoginForm';
import ImageWrapper from './ImageWrapper';

const ContainerStyled = styled(Container)`
  background-color: ${getThemeProps('home.backgroundColor')};
  height: 100%;
  display: flex;
`;

const BoxStyled = styled(Box)`
 align-items: center;
 ${({ theme }) => theme.media.down('md')`
        margin: 60px auto auto auto;
        height: 65%;
        width: 97%;
    `};
`;

const ImageStyled = styled.img`
  width: 100%;
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
   * When student login through URL then this method will
   * get id and secretCode form URL and fetch data of that particular student.
   */
  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');
    const redirectToRoute = getParameterByName('fromRoute');

    if (redirectToRoute) {
      this.setRedirectToRoute(redirectToRoute);
    }
    if (id && secretCode) {
      this.fetchStudentByURLParams(id, secretCode);
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
   * Method fetch student data.
   * And verify the student credential and if fetch student data is
   * success then it set the value of isURLParams to true.
   * @param {String} id
   * @param {String} secretCode
   */
  fetchStudentByURLParams = (id, secretCode) => {
    const { setStudentCredentials, fetchStudentData } = this.props;
    setStudentCredentials({ id, secretKey: secretCode });
    fetchStudentData({ id, secretKey: secretCode });
    this.setState({
      isURLParams: true,
    });
  };

  /**
   * Method enable the admin login
   * button by onClick of admin login button.
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
        // and redirect to "/student-search" route
        setAdminLoginState(true);
        if (redirectToRoute) {
          this.setRedirectToRoute('');
          return <Switch><Redirect to={redirectToRoute} /></Switch>;
        }
        return <Switch><Redirect to="/student-search" /></Switch>;
      }
      return null;
    }
    if (redirectToRoute) {
      this.setRedirectToRoute('');
      return <Switch><Redirect to={redirectToRoute} /></Switch>;
    }
    // if admin is already login then it redirect to "/student-search"
    // without any credential.
    return <Switch><Redirect to="/student-search" /></Switch>;
  };


  /**
   * Method set the admin login credential
   * @param {Object} event
   */
  setAdminLogin = (event) => {
    const { admin } = this.state;
    const { setAdminCredentials } = this.props;

    event.preventDefault();
    if (this.state.hasError) {
      this.setState({
        adminCredentialErrorMessage: true,
      });
      setAdminCredentials({ id: admin.adminId, password: admin.adminPassword });
    }
  };

  /**
   * Method set the value of isNewRegistration true on Onclick
   * of new registration button.
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
      return <Switch><Redirect to="/studentCorrection" /></Switch>;
    }
    return (
      <ContainerStyled width="100%">
        <BoxStyled
          borderStyle="none"
          elevation={5}
          margin="auto"
          maxHeight="100%"
          maxWidth="97%"
          width="600px"
        >
          <Col>
            <Row width="100%" display="inline-block">
              <Typography
                align="center"
                color="#f9570a"
                fontSize="18px"
                fontWeight="600"
                type="title"
              >
                {eventDate[tenant ? tenant : 'DEFAULT_EVENT_DATE']}
              </Typography>
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
  fetchStudentData: PropTypes.func,
  id: PropTypes.string,
  password: PropTypes.string,
  setAdminCredentials: PropTypes.func,
  setAdminLoginState: PropTypes.func,
  setHashLinkForNewRegistration: PropTypes.func,
  setStudentCredentials: PropTypes.func,
  tenant: PropTypes.string,
};

SplashPage.defaultProps = {
  adminLoginState: false,
  fetchStudentData: () => {},
  id: '',
  password: '',
  setAdminCredentials: () => {},
  setAdminLoginState: () => {},
  setHashLinkForNewRegistration: () => {},
  setStudentCredentials: () => {},
  tenant: '',
};

const mapStateToProps = state => ({
  adminLoginState: stateOfAdminLogin(state),
  id: getAdminId(state),
  isFetched: isFetched(state),
  isLoading: isLoading(state),
  password: getAdminPassword(state),
  searchResults: getSearchResults(state),
  studentData: getStudent(state),
  tenant: getApplicationTenant(state),
});

const mapDispatchToProps = dispatch => ({
  fetchStudentData: props => dispatch(fetchStudentDataAction(props)),
  setAdminCredentials: props => dispatch(setAdminCredentialsAction(props)),
  setAdminLoginState: props => dispatch(setAdminLoginStateAction(props)),
  setHashLinkForNewRegistration: props => dispatch(setHashLinkForNewRegistrationAction(props)),
  setStudentCredentials: props => dispatch(setStudentCredentialsAction(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashPage);
