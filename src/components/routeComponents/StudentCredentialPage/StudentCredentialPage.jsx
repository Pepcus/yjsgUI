/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import {
  Button,
  Box,
  Container,
  Col,
  Form,
  getThemeProps,
  Row,
  Typography,
} from 'ravenjs';

import {
  fetchStudentData,
  setStudentCredentials,
  setUserTypeAction,
} from '../../../actions/studentRegistrationActions';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getHash,
  getUserId,
  getUserSecretKey,
} from '../../../reducers/studentRegistrationReducer';
import { getApplicationTenant } from '../../../reducers/assetFilesReducer';
import yjsgLogo from '../../../assets/images/yjsgLogo.png';
import {
  eventDate,
  eventVenue,
  goBackBtnText,
  viewEditInfoBtnText,
  USER_TYPES,
} from '../../../constants/yjsg';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../../../constants/messages';

import { getParameterByName } from '../../../utils/http';
import ImageWrapper from './ImageWrapper';
import {
  schema,
  uiSchema,
} from './studentCredentialFormSchema.json';
import { getTransformedErrors } from '../../../utils/formUtil';
import { RedirectToRoute } from './RedirectToRoute';
import fields from '../../common/fields';


const BoxStyled = styled(Box)`
 align-items: center;
 @media (max-width: 768px) {
    margin: 60px auto auto auto;
    height: 65%;
    width: 97%;
  }
`;

const ContainerStyled = styled(Container)`
  background-color: ${getThemeProps('HOME.BACKGROUND_COLOR')};
  height: 100%;
  display: flex;
`;

// FixMe:This component is unnecessary.
//  Please use splash page to show pre-populated data and remove this component

/**
 * StudentCredentialPage is render student credential form
 * @type {Class}
 */
class StudentCredentialPage extends Component {
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

    this.fetchStudentById = this.fetchStudentById.bind(this);
  }

  componentWillMount() {
    const {
      context,
      studentId,
      secretKey,
    } = this.props;

    // If admin redirect to student credential page in that case
    // pre populate the id and secretKey of previous login student
    if (context.previousLocation === '/admin') {
      this.setState({
        credentials: { studentId, secretKey },
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
   * fetchStudentByURLParams method fetch
   * the particular student data according id and secretKey
   * @param {String} id
   * @param {String} secretCode
   */
  fetchStudentByURLParams(id, secretCode) {
    this.props.setStudentCredentials(id, secretCode);
    this.props.fetchStudentData(id, secretCode);
    this.setState({
      isURLParams: true,
    });
  }

  /**
   * onChange method handle onChange of student login form
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
   * fetchStudentById method fetch the student
   * data on submit of student credential
   * @param {Object} event
   */
  fetchStudentById(event) {
    const {
      credentials,
      hasError,
    } = this.state;
    const { STUDENT } = USER_TYPES;

    event.preventDefault();
    if (hasError) {
      this.props.setStudentCredentials(credentials.studentId,
        credentials.secretKey);
      this.props.fetchStudentData(credentials.studentId,
        credentials.secretKey);
      this.props.setUserTypeAction(STUDENT);
      this.setState({
        redirectToStudentCorrectionLogin: true,
      });
    }
  }

  /**
   * return array of errors object by transforming them error
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
   * redirect to previous location
   */
  redirectToPreviousLocation = () => {
    const { hashLink } = this.props;
    const {
      ADMIN,
      STUDENT,
    } = USER_TYPES;

    if (hashLink === ADMIN) {
      this.setState({
        isAdminLocation: true,
      });
    } else if (hashLink === STUDENT) {
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
      <ContainerStyled
        width="100%"
      >
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
          boxShadow="0 2px 1px 0 #eeecec"
        >
          <Col>
            <Row width="100%" display="inline-block">
              <Typography
                type="title"
                fontWeight="600"
                fontSize="18px"
                color="#f9570a"
                align="center"
              >
                {eventDate[tenant ? tenant : 'DEFAULT_EVENT_DATE']}
              </Typography>
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
              <img
                src={yjsgLogo}
                alt="yjsg logo"
                style={{ width: '100%' }}
              />
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
              />
              <Row
                justify="space-between"
                width="65%"
              >
                <Button
                  color="primary"
                  width="170px"
                  padding="5px 8px"
                  onClick={this.redirectToPreviousLocation}
                >
                  {goBackBtnText}
                </Button>
                <Button
                  color="primary"
                  width="170px"
                  padding="5px 8px"
                  onClick={this.fetchStudentById}
                >
                  {viewEditInfoBtnText}
                </Button>
              </Row>
            </Row>
          </Col>
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

StudentCredentialPage.propTypes = {
  fetchStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
  context: PropTypes.object,
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secretKey: PropTypes.string,
  hashLink: PropTypes.string,
  tenant: PropTypes.string,
  setUserTypeAction: PropTypes.func,
};

StudentCredentialPage.defaultProps = {
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
  context: {},
  studentId: '',
  secretKey: '',
  hashLink: '',
  tenant: '',
  setUserTypeAction: () => {},
};
const mapStateToProps = state => ({
  studentId: getUserId(state),
  id: getAdminId(state),
  secretKey: getUserSecretKey(state),
  password: getAdminPassword(state),
  searchResults: getSearchResults(state),
  hashLink: getHash(state),
  tenant: getApplicationTenant(state),
});
export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
  setUserTypeAction,
  getApplicationTenant,
})(StudentCredentialPage);
