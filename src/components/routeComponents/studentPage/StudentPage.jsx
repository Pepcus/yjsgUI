/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import {
  Button,
  Box,
  Container,
  Col,
  getThemeProps,
  Row,
  Typography,
} from 'ravenjs';

import {
  fetchStudentData,
  setStudentCredentials,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
  setUserTypeAction,
} from '../../../actions/studentRegistrationActions';
import yjsgLogo from '../../../assets/images/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  newRegistrationBtnText,
  USER_TYPES,
} from '../../../constants/yjsg';
import { getParameterByName } from '../../../utils/http';
import { getStudent } from '../../../reducers/studentRegistrationReducer';
import {
  getApplicationTenant,
  isRegisterCorrectionEnabled,
} from '../../../reducers/assetFilesReducer';
import AlreadyRegisteredButton from './AlreadyRegistereButton';
import { RedirectToRoute } from './RedirectToRoute';
import ImageWrapper from './ImageWrapper';


const ContainerStyled = styled(Container)`
  background-color: ${getThemeProps('HOME.BACKGROUND_COLOR')};
  width: 100%;
  height: 100%;
  display: flex;
  font-family: 'Poppins', sans-serif !important
`;

const BoxStyle = styled(Box)`
 width: 600px;
 max-width: 97%;
 max-height: 100%;
 align-items: center;
 margin: auto;
 @media (max-width: 768px) {
    margin: 60px auto auto auto;
    height: 65%;
    width: 97%;
  }
`;

// TODO: responsive css @media remaining
// TODO: button color remaining
// TODO: code refactoring remaining
/**
* The StudentPage component for the student which will render -
* Two buttons (Already Registered and New Registration) .
 * @type {class}
 * @return {HTML}
 * */
class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isURLParams: false,
      isStudentLogin: false,
      isNewRegistration: false,
    };
    // FIXME: Use arrow functions to avoid binding.
    this.redirectToStudentLogin = this.redirectToStudentLogin.bind(this);
    this.redirectToNewRegistrationPage = this.redirectToNewRegistrationPage.bind(this);
  }

  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');

    if (id && secretCode) {
      this.fetchStudentByURLParams(id, secretCode);
    }
  }

  /** If student login through URL fetchStudentByURLParams method will call.
   * @param {String} id
   * @param {String} secretCode
   */
  fetchStudentByURLParams(id, secretCode) {
    this.props.setStudentCredentials(id, secretCode);
    this.props.fetchStudentData(id, secretCode);
    this.props.setUserTypeAction(USER_TYPES.STUDENT_WITH_URL);
    this.setState({
      isURLParams: true,
    });
  }

  /**
   * redirectToStudentLogin method call by onclick of button already register
   * it set the value of isStudentLogin is true.
   * And set user is student in reducer through setHashLinkForStudentCredentialAction action.
   */
  redirectToStudentLogin() {
    const { STUDENT } = USER_TYPES;

    this.setState({
      isStudentLogin: true,
    });
    this.props.setHashLinkForStudentCredentialAction(STUDENT);
  }

  /**
   * redirectToNewRegistrationPage method call by onclick of button new registration
   * it set the value of isNewRegistration is true.
   * And set user is student in reducer through setHashLinkForNewRegistrationAction action.
   */
  redirectToNewRegistrationPage() {
    const { STUDENT } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    this.props.setHashLinkForNewRegistrationAction(STUDENT);
  }

  render() {
    const {
      tenant,
      isAlreadyRegisteredButtonEnabled,
      theme,
    } = this.props;
    const {
      isURLParams,
      isStudentLogin,
      isNewRegistration,
    } = this.state;

    return (
      <ContainerStyled>
        <RedirectToRoute
          isURLParams={isURLParams}
          isStudentLogin={isStudentLogin}
          isNewRegistration={isNewRegistration}
        />
        <BoxStyle>
          <Col>
            <Row width="100%" display="inline-block">
              <Typography
                as="h5"
                fontWeight="600"
                fontSize="18px"
                color="#f9570a"
                align="center"
                fontFamily="Poppins, sans-serif"
              >
                {eventDate[tenant]}
              </Typography>
              <Typography
                as="h5"
                fontSize="16px"
                align="center"
                fontFamily="Poppins, sans-serif"
              >
                {eventVenue[tenant]}
              </Typography>
            </Row>
            <ImageWrapper tagname="div">
              <img src={yjsgLogo} alt="yjsg logo" style={{ width: '100%' }} />
            </ImageWrapper>
            <Row
              justify="center"
            >
              <AlreadyRegisteredButton
                isAlreadyRegisteredButtonEnabled={isAlreadyRegisteredButtonEnabled}
                theme={theme}
                redirectToStudentLogin={this.redirectToStudentLogin}
              />
              <Button
                margin="10px"
                color="primary"
                theme={this.props.theme}
                onClick={this.redirectToNewRegistrationPage}
              >
                {newRegistrationBtnText}
              </Button>
            </Row>
          </Col>
        </BoxStyle>
      </ContainerStyled>
    );
  }
}

StudentPage.propTypes = {
  fetchStudentData: PropTypes.func,
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  setStudentCredentials: PropTypes.func,
  setHashLinkForStudentCredentialAction: PropTypes.func,
  setHashLinkForNewRegistrationAction: PropTypes.func,
  setUserTypeAction: PropTypes.func,
  tenant: PropTypes.string,
  theme: PropTypes.object,
};

StudentPage.defaultProps = {
  fetchStudentData: () => {},
  isAlreadyRegisteredButtonEnabled: false,
  setStudentCredentials: () => {},
  setHashLinkForStudentCredentialAction: () => {},
  setHashLinkForNewRegistrationAction: () => {},
  setUserTypeAction: () => {},
  tenant: '',
  theme: {},
};

const mapStateToProps = state => ({
  studentData: getStudent(state),
  tenant: getApplicationTenant(state),
  isAlreadyRegisteredButtonEnabled: isRegisterCorrectionEnabled(state),
});

export default withTheme(connect(mapStateToProps, {
  fetchStudentData,
  getApplicationTenant,
  isRegisterCorrectionEnabled,
  setStudentCredentials,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
  setUserTypeAction,
})(StudentPage));
