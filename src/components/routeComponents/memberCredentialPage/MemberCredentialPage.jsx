/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import Container from 'pepcus-core/lib/Container';
import Form from 'pepcus-core/lib/Form';
import { getThemeProps } from 'pepcus-core//utils/theme';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import {
  fetchMemberDataAction,
  setMemberCredentialsAction,
} from 'actions/memberRegistrationActions';
import {
  setUserTypeAction,
} from 'actions/appActions';
import {
  getUserId,
  getUserSecretKey,
} from 'reducers/memberRegistrationReducer';
import {
  getHash,
} from 'reducers/appReducer';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import yjsgLogo from 'assets/images/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  goBackBtnText,
  viewEditInfoBtnText,
} from 'constants/yjsg';
import {
  USER_TYPES,
} from 'constants/member';
import { THIS_INFORMATION_IS_COMPULSORY_MESSAGE } from 'constants/messages';
import { getParameterByName } from 'apis/http';
import { getTransformedErrors } from 'utils/form';
import fields from 'components/common/fields';

import ImageWrapper from './ImageWrapper';
import {
  schema,
  uiSchema,
} from './memberCredentialFormSchema.json';
import RedirectToRoute from './RedirectToRoute';

const BoxStyled = styled(Box)`
 align-items: center;
 ${({ theme }) => theme.media.down('md')`
     margin: 60px auto auto auto;
     height: 75%;
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

const ImageStyled = styled.img`
  width: 100%;
`;

const TypographyStyled = styled(Typography)`
  color: ${getThemeProps('colors.header')};
`;

/**
 * MemberCredentialPage is render member credential form
 * @type {Class}
 */
class MemberCredentialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {},
      isURLParams: false,
      isAdminLocation: false,
      isStudentLocation: false,
      isPreviousLocation: false,
      hasError: true,
      redirectToStudentCorrectionLogin: false,
    };
  }

  componentWillMount() {
    const {
      context,
      memberId,
      secretKey,
    } = this.props;

    // If admin redirect to member credential page in that case
    // pre populate the id and secretKey of previous login student
    if (context.previousLocation === '/admin') {
      this.setState({
        credentials: { memberId, secretKey },
      });
    // else student credential fields are empty
    } else if (context.previousLocation === '/') {
      this.setState({
        credentials: {},
      });
    }
    // If student login through URL
    // then get the id and secretKey form URL and fetch the student data
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');
    if (id && secretCode) {
      this.fetchStudentByURLParams(id, secretCode);
    }
  }

  /**
   * Method fetch the particular student data according id and secretKey
   * @param {String} id
   * @param {String} secretCode
   */
  fetchStudentByURLParams = (id, secretCode) => {
    const { fetchStudentData, setStudentCredentials } = this.props;
    setStudentCredentials({ id, secretKey: secretCode });
    fetchStudentData({ id, secretKey: secretCode });
    this.setState({
      isURLParams: true,
    });
  };

  /**
   * Method handle onChange of student login form
   * @param {Object} formData
   * @param {Object} errors
   */
  onChange = ({ formData, errors }) => {
    const { credentials } = this.state;
    this.setState({
      credentials: {
        ...credentials,
        ...formData,
      },
      hasError: isEmpty(errors),
    });
  };

  /**
   * Method fetch the student
   * data on submit of student credential
   */
  fetchStudentById = () => {
    const {
      credentials,
      hasError,
    } = this.state;
    const { fetchStudentData, setStudentCredentials, setUserType } = this.props;
    const { MEMBER } = USER_TYPES;

    if (hasError) {
      setStudentCredentials({ id: credentials.memberId, secretKey: credentials.secretKey });
      fetchStudentData({ id: credentials.memberId, secretKey: credentials.secretKey });
      setUserType({ pageUser: MEMBER });
      this.setState({
        redirectToStudentCorrectionLogin: true,
      });
    }
  };

  /**
   * Return array of errors object by transforming them error
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
   * Redirect to previous location
   */
  redirectToPreviousLocation = () => {
    const { hashLink } = this.props;
    const {
      ADMIN,
      MEMBER,
    } = USER_TYPES;

    if (hashLink === ADMIN) {
      this.setState({
        isAdminLocation: true,
      });
    } else if (hashLink === MEMBER) {
      this.setState({
        isStudentLocation: true,
      });
    }
    this.setState({
      isPreviousLocation: true,
    });
  };

  render() {
    const {
      isURLParams,
      redirectToStudentCorrectionLogin,
      credentials,
      hasError,
      isAdminLocation,
      isStudentLocation,
      isPreviousLocation,
    } = this.state;
    const {
      tenant,
      context,
    } = this.props;
    return (
      <ContainerStyled width="100%">
        <RedirectToRoute
          isURLParams={isURLParams}
          redirectToStudentCorrectionLogin={redirectToStudentCorrectionLogin}
          hasError={hasError}
          isAdminLocation={isAdminLocation}
          isStudentLocation={isStudentLocation}
          isPreviousLocation={isPreviousLocation}
          context={context}
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
            <Row width="100%" display="inline-block" margin="10px 0 0 0">
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
              <Form
                enableDirtyCheck
                fields={fields}
                schema={schema}
                uiSchema={uiSchema}
                externalSubmission
                showErrorList={false}
                liveValidate
                formData={credentials}
                onChange={this.onChange}
                transformErrors={this.transformErrors}
                onSubmit={this.fetchStudentById}
              />
              <Row width="100%" justify="center" margin="0 0 25px 0">
                <Col size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding="10px 20px 10px 20px">
                  <Button
                    width="100%"
                    onClick={this.redirectToPreviousLocation}
                  >
                    {goBackBtnText}
                  </Button>
                </Col>
                <Col size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding="10px 20px 10px 20px">
                  <Button
                    width="100%"
                    onClick={this.fetchStudentById}
                  >
                    {viewEditInfoBtnText}
                  </Button>
                </Col>
              </Row>
            </Row>
          </Col>
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

MemberCredentialPage.propTypes = {
  context: PropTypes.object,
  fetchStudentData: PropTypes.func,
  hashLink: PropTypes.string,
  secretKey: PropTypes.string,
  setStudentCredentials: PropTypes.func,
  setUserType: PropTypes.func,
  memberId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tenant: PropTypes.string,
};

MemberCredentialPage.defaultProps = {
  context: {},
  fetchStudentData: () => {},
  hashLink: '',
  secretKey: '',
  setStudentCredentials: () => {},
  setUserType: () => {},
  memberId: '',
  tenant: '',
};

const mapStateToProps = state => ({
  hashLink: getHash(state),
  secretKey: getUserSecretKey(state),
  memberId: getUserId(state),
  tenant: getApplicationTenant(state),
});

const mapDispatchToProps = dispatch => ({
  fetchStudentData: ({ id, secretKey }) => dispatch(fetchMemberDataAction({ id, secretKey })),
  setStudentCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
  setUserType: ({ pageUser }) => dispatch(setUserTypeAction({ pageUser })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberCredentialPage);
