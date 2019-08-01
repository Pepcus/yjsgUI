/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'ravenjs/lib/Box';
import Button from 'ravenjs/lib/Button';
import Col from 'ravenjs/lib/Col';
import Container from 'ravenjs/lib/Container';
import { getThemeProps } from 'ravenjs//utils/theme';
import Row from 'ravenjs/lib/Row';
import Typography from 'ravenjs/lib/Typography';

import {
  fetchStudentDataAction,
  setStudentCredentialsAction,
  setHashLinkForStudentCredentialAction,
  setHashLinkForNewRegistrationAction,
  setUserTypeAction,
} from 'actions/studentRegistrationActions';
import yjsgLogo from 'assets/images/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  newRegistrationBtnText,
  USER_TYPES,
} from 'constants/yjsg';
import { getParameterByName } from 'utils/http';
import { getStudent } from 'reducers/studentRegistrationReducer';
import {
  getApplicationTenant,
  isRegisterCorrectionEnabled,
} from 'reducers/assetFilesReducer';
import AlreadyRegisteredButton from './AlreadyRegistereButton';
import RedirectToRoute from './RedirectToRoute';
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

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('colors.HEADER')};
`;

// TODO: responsive css @media remaining

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
    const { fetchStudentData, setStudentCredentials, setUserType } = this.props;
    const { STUDENT_WITH_URL } = USER_TYPES;

    setStudentCredentials({ id, secretKey: secretCode });
    fetchStudentData({ id, secretKey: secretCode });
    setUserType(STUDENT_WITH_URL);
    this.setState({
      isURLParams: true,
    });
  }

  /**
   * Method call by onClick of button already register
   * it set the value of isStudentLogin is true.
   * And set user is student in reducer through setHashLinkForStudentCredential action.
   */
  redirectToStudentLogin = () => {
    const { setHashLinkForStudentCredential } = this.props;
    const { STUDENT } = USER_TYPES;

    this.setState({
      isStudentLogin: true,
    });
    setHashLinkForStudentCredential(STUDENT);
  };

  /**
   * Method call by onclick of button new registration
   * it set the value of isNewRegistration is true.
   * And set user is student in reducer through setHashLinkForNewRegistration action.
   */
  redirectToNewRegistrationPage = () => {
    const { setHashLinkForNewRegistration } = this.props;
    const { STUDENT } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    setHashLinkForNewRegistration(STUDENT);
  };

  render() {
    const {
      tenant,
      isAlreadyRegisteredButtonEnabled,
    } = this.props;
    const {
      isURLParams,
      isStudentLogin,
      isNewRegistration,
    } = this.state;

    return (
      <ContainerStyled width="100%">
        <RedirectToRoute
          isURLParams={isURLParams}
          isStudentLogin={isStudentLogin}
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
                {eventDate[tenant ? tenant : 'DEFAULT_EVENT_DATE']}
              </TypographyStyled>
              <Typography
                type="title"
                fontSize="16px"
                align="center"
              >
                {eventVenue[tenant ? tenant : 'DEFAULT_EVENT_VENUE']}
              </Typography>
            </Row>
            <ImageWrapper
              tagname="div"
              width="50%"
              margin="auto"
              padding="20px"
            >
              <ImageStyled src={yjsgLogo} alt="yjsg logo" />
            </ImageWrapper>
            <Row justify="center">
              <AlreadyRegisteredButton
                isAlreadyRegisteredButtonEnabled={isAlreadyRegisteredButtonEnabled}
                redirectToStudentLogin={this.redirectToStudentLogin}
              />
              <Button margin="10px" onClick={this.redirectToNewRegistrationPage}>
                {newRegistrationBtnText}
              </Button>
            </Row>
          </Col>
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

StudentPage.propTypes = {
  fetchStudentData: PropTypes.func,
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  setStudentCredentials: PropTypes.func,
  setHashLinkForStudentCredential: PropTypes.func,
  setHashLinkForNewRegistration: PropTypes.func,
  setUserType: PropTypes.func,
  tenant: PropTypes.string,
};

StudentPage.defaultProps = {
  fetchStudentData: () => {},
  isAlreadyRegisteredButtonEnabled: false,
  setStudentCredentials: () => {},
  setHashLinkForStudentCredential: () => {},
  setHashLinkForNewRegistration: () => {},
  setUserType: () => {},
  tenant: '',
};

const mapStateToProps = state => ({
  isAlreadyRegisteredButtonEnabled: isRegisterCorrectionEnabled(state),
  studentData: getStudent(state),
  tenant: getApplicationTenant(state),
});

const mapDispatchToProps = dispatch => ({
  fetchStudentData: props => dispatch(fetchStudentDataAction(props)),
  setStudentCredentials: props => dispatch(setStudentCredentialsAction(props)),
  setHashLinkForStudentCredential: props => dispatch(setHashLinkForStudentCredentialAction(props)),
  setHashLinkForNewRegistration: props => dispatch(setHashLinkForNewRegistrationAction(props)),
  setUserType: props => dispatch(setUserTypeAction(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentPage);
