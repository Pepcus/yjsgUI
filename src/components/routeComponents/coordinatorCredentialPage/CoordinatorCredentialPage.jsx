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
  fetchCoordinatorDataAction,
  setCoordinatorCredentialsAction,
} from 'actions/coordinatorRegistrationActions';
import {
  setUserTypeAction,
} from 'actions/appActions';
import {
  getUserId,
  getUserSecretKey,
} from 'reducers/coordinatorRegistrationReducer';
import {
  getHash,
} from 'reducers/appReducer';
import {
  USER_TYPES,
} from 'constants/member';
import { getParameterByName } from 'apis/http';
import { getTransformedErrors } from 'utils/form';
import { getConstants } from 'reducers/constants';
import fields from 'components/common/fields';
import { getLogoPathConfig } from 'reducers/config';

import ImageWrapper from './ImageWrapper';
import RedirectToRoute from './RedirectToRoute';

const BoxStyled = styled(Box)`
 align-items: center;
 ${({ theme }) => theme.media.down('md')`
     margin: 60px auto auto auto;
     height: 75%;
     width: 97%;
 `}
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
 * CoordinatorCredentialPage is render coordinator credential form
 * @type {Class}
 */
class CoordinatorCredentialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {},
      isURLParams: false,
      isAdminLocation: false,
      isPreviousLocation: false,
      hasError: true,
      redirectToCoordinatorCorrectionLogin: false,
    };
  }

  componentWillMount() {
    const {
      context,
      coordinatorId,
      secretKey,
    } = this.props;

    // If admin redirect to coordinator credential page in that case
    // pre populate the id and secretKey of previous login coordinator
    this.setState({
      credentials: { coordinatorId, secretKey },
    });
    // If coordinator login through URL
    // then get the id and secretKey form URL and fetch the coordinator data
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');
    if (id && secretCode) {
      this.fetchCoordinatorByURLParams(id, secretCode);
    }
  }

  /**
   * Method fetch the particular coordinator data according id and secretKey
   * @param {String} id
   * @param {String} secretCode
   */
  fetchCoordinatorByURLParams = (id, secretCode) => {
    const { fetchCoordinatorData, setCoordinatorCredentials } = this.props;
    setCoordinatorCredentials({ id, secretKey: secretCode });
    fetchCoordinatorData({ id, secretKey: secretCode });
    this.setState({
      isURLParams: true,
    });
  };

  /**
   * Method handle onChange of coordinator login form
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
   * Method fetch the coordinator
   * data on submit of coordinator credential
   */
  fetchCoordinatorById = () => {
    const {
      credentials,
      hasError,
    } = this.state;
    const { fetchCoordinatorData, setCoordinatorCredentials, setUserType } = this.props;
    const { COORDINATOR } = USER_TYPES;

    if (hasError) {
      setCoordinatorCredentials({ id: credentials.coordinatorId, secretKey: credentials.secretKey });
      fetchCoordinatorData({ id: credentials.coordinatorId, secretKey: credentials.secretKey });
      setUserType({ pageUser: COORDINATOR});
      this.setState({
        redirectToCoordinatorCorrectionLogin: true,
      });
    }
  };

  /**
   * Return array of errors object by transforming them error
   * @param {Array} errors
   * @return {Array}
   */
  transformErrors = (errors) => {
    const { constants } = this.props;
    const { THIS_INFORMATION_IS_COMPULSORY_MESSAGE_COORDINATOR } = constants;
    const transformErrors = {
      'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE_COORDINATOR,
      'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE_COORDINATOR,
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
    } = USER_TYPES;

    if (hashLink === ADMIN) {
      this.setState({
        isAdminLocation: true,
      });
    }
    this.setState({
      isPreviousLocation: true,
    });
  };

  render() {
    const {
      isURLParams,
      redirectToCoordinatorCorrectionLogin,
      credentials,
      hasError,
      isAdminLocation,
      isPreviousLocation,
    } = this.state;
    const {
      context,
      constants,
      logoPathConfig,
      config,
    } = this.props;
    const { coordinatorCredentialConfig } = config;
    const { schema, uiSchema } = coordinatorCredentialConfig;
    const { pageBodyLogo } = logoPathConfig;
    const {
      EVENT_DATE,
      EVENT_VENUE,
      BACK,
      VIEW_OR_EDIT_INFO,
    } = constants;
    return (
      <ContainerStyled width="100%">
        <RedirectToRoute
          isURLParams={isURLParams}
          redirectToCoordinatorCorrectionLogin={redirectToCoordinatorCorrectionLogin}
          hasError={hasError}
          isAdminLocation={isAdminLocation}
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
                onSubmit={this.fetchCoordinatorById}
              />
              <Row width="100%" justify="center" margin="0 0 25px 0">
                <Col size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding="10px 20px 10px 20px">
                  <Button
                    width="100%"
                    onClick={this.redirectToPreviousLocation}
                  >
                    {BACK}
                  </Button>
                </Col>
                <Col size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding="10px 20px 10px 20px">
                  <Button
                    width="100%"
                    onClick={this.fetchCoordinatorById}
                  >
                    {VIEW_OR_EDIT_INFO}
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

CoordinatorCredentialPage.propTypes = {
  constants: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
  fetchCoordinatorData: PropTypes.func,
  hashLink: PropTypes.string,
  logoPathConfig: PropTypes.object,
  secretKey: PropTypes.string,
  setCoordinatorCredentials: PropTypes.func,
  setUserType: PropTypes.func,
  coordinatorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CoordinatorCredentialPage.defaultProps = {
  constants: {},
  config: {},
  context: {},
  fetchCoordinatorData: () => {},
  hashLink: '',
  logoPathConfig: {},
  secretKey: '',
  setCoordinatorCredentials: () => {},
  setUserType: () => {},
  coordinatorId: '',
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  hashLink: getHash(state),
  logoPathConfig: getLogoPathConfig(state),
  secretKey: getUserSecretKey(state),
  coordinatorId: getUserId(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCoordinatorData: ({ id, secretKey }) => dispatch(fetchCoordinatorDataAction({ id, secretKey })),
  setCoordinatorCredentials: ({ id, secretKey }) => dispatch(setCoordinatorCredentialsAction({ id, secretKey })),
  setUserType: ({ pageUser }) => dispatch(setUserTypeAction({ pageUser })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoordinatorCredentialPage);
