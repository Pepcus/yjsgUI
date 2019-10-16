/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import Container from 'pepcus-core/lib/Container';
import { getThemeProps } from 'pepcus-core//utils/theme';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import {
  fetchMemberDataAction,
  setMemberCredentialsAction,
} from 'actions/memberRegistrationActions';
import {
  setUserTypeAction,
  setHashLinkForNewRegistrationAction,
  setHashLinkForMemberCredentialAction,
} from 'actions/appActions';
import yjsgLogo from 'assets/images/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  newRegistrationBtnText,
  USER_TYPES,
} from 'constants/yjsg';
import { getParameterByName } from 'apis/http';
import { getMember } from 'reducers/memberRegistrationReducer';
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
  @media (max-width: 992px) and (orientation: landscape) {
     width: auto;
     height: auto;
    }
`;

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('sm')`
       width: 100%;
   `}
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

// TODO: responsive css @media remaining

/**
 * The MemberPage component for the member which will render -
 * Two buttons (Already Registered and New Registration) .
 * @type {class}
 * @return {HTML}
 * */
class MemberPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isURLParams: false,
      isMemberLogin: false,
      isNewRegistration: false,
    };
  }

  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');

    if (id && secretCode) {
      this.fetchMemberByURLParams(id, secretCode);
    }
  }

  /** If member login through URL fetchMemberByURLParams method will call.
   * @param {String} id
   * @param {String} secretCode
   */
  fetchMemberByURLParams(id, secretCode) {
    const { fetchMemberData, setMemberCredentials, setUserType } = this.props;
    const { MEMBER_WITH_URL } = USER_TYPES;

    setMemberCredentials({ id, secretKey: secretCode });
    fetchMemberData({ id, secretKey: secretCode });
    setUserType({ pageUser: MEMBER_WITH_URL });
    this.setState({
      isURLParams: true,
    });
  }

  /**
   * Method call by onClick of button already register
   * it set the value of isMemberLogin is true.
   * And set user is member in reducer through setHashLinkForMemberCredential action.
   */
  redirectToMemberLogin = () => {
    const { setHashLinkForMemberCredential } = this.props;
    const { MEMBER } = USER_TYPES;

    this.setState({
      isMemberLogin: true,
    });
    setHashLinkForMemberCredential(MEMBER);
  };

  /**
   * Method call by onclick of button new registration
   * it set the value of isNewRegistration is true.
   * And set user is member in reducer through setHashLinkForNewRegistration action.
   */
  redirectToNewRegistrationPage = () => {
    const { setHashLinkForNewRegistration } = this.props;
    const { MEMBER } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    setHashLinkForNewRegistration(MEMBER);
  };

  render() {
    const {
      tenant,
      isAlreadyRegisteredButtonEnabled,
    } = this.props;
    const {
      isURLParams,
      isMemberLogin,
      isNewRegistration,
    } = this.state;

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
                {eventDate[tenant ? tenant : 'default']}
              </TypographyStyled>
              <Typography
                type="title"
                fontSize="16px"
                align="center"
              >
                {eventVenue[tenant ? tenant : 'default']}
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
                redirectToMemberLogin={this.redirectToMemberLogin}
              />
              <ButtonStyled margin="10px" onClick={this.redirectToNewRegistrationPage}>
                {newRegistrationBtnText}
              </ButtonStyled>
            </Row>
          </Col>
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

MemberPage.propTypes = {
  fetchMemberData: PropTypes.func,
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  setHashLinkForMemberCredential: PropTypes.func,
  setHashLinkForNewRegistration: PropTypes.func,
  setMemberCredentials: PropTypes.func,
  setUserType: PropTypes.func,
  tenant: PropTypes.string,
};

MemberPage.defaultProps = {
  fetchMemberData: () => {},
  isAlreadyRegisteredButtonEnabled: false,
  setHashLinkForMemberCredential: () => {},
  setHashLinkForNewRegistration: () => {},
  setMemberCredentials: () => {},
  setUserType: () => {},
  tenant: '',
};

const mapStateToProps = state => ({
  isAlreadyRegisteredButtonEnabled: isRegisterCorrectionEnabled(state),
  memberData: getMember(state),
  tenant: getApplicationTenant(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMemberData: ({ id, secretKey }) => dispatch(fetchMemberDataAction({ id, secretKey })),
  setMemberCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
  setHashLinkForMemberCredential: userType => dispatch(setHashLinkForMemberCredentialAction(userType)),
  setHashLinkForNewRegistration: userType => dispatch(setHashLinkForNewRegistrationAction(userType)),
  setUserType: ({ pageUser }) => dispatch(setUserTypeAction({ pageUser })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberPage);
