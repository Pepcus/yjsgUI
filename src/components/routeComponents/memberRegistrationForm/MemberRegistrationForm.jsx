/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Container from 'pepcus-core/lib/Container';
import Col from 'pepcus-core/lib/Col';
import Form from 'pepcus-core/lib/Form';
import Row from 'pepcus-core/lib/Row';
import { getThemeProps } from 'pepcus-core/utils/theme';

import {
  ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG,
  formSubmitBtnText,
  goBackBtnText,
  USER_TYPES,
} from 'constants/yjsg';
import {
  createMemberDataAction,
} from 'actions/memberRegistrationActions';
import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from 'constants/messages';
import {
  getNewMember,
  isCreated,
} from 'reducers/memberRegistrationReducer';
import {
  getUserType,
} from 'reducers/appReducer';
import { fetchFormConfig } from 'apis/core';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import {
  getTransformedErrors,
  verifyFormDataValidations,
} from 'utils/form';
import fields from 'components/common/fields';
import RedirectToRoute from './RedirectToRoute';
import SuccessMessagePopup from './SuccessMessagePopup';

const BoxStyled = styled(Box)`
 align-items: center;
 overflow-x: hidden;
 overflow-y: auto;
 background-color: ${getThemeProps('palette.policyMuted.color')};
 ${({ theme }) => theme.media.down('lg')`
     margin: auto; 
     height: 100%;
 `}
 @media (max-width: 992px) and (orientation: landscape) {
        height: auto;
    }
`;

const ContainerStyled = styled(Container)`
  height: max-content;
  display: flex;
  ${({ theme }) => theme.media.down('lg')`
     height: 100%; 
 `}
 ${({ theme }) => theme.media.down('md')`
     height: auto; 
 `}
 @media (max-width: 992px) and (orientation: landscape) {
        height: auto;
    }
`;

/**
 * MemberRegistrationForm will be render member registration form
 * @type {Class}
 */
class MemberRegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = {
      isSubmitTriggered: false,
      member: {},
      hasError: false,
      formConfig: {},
      isAdminLocation: false,
      isStudentLocation: false,
      isPreviousLocation: false,
    };
  }

  componentWillMount() {
    const { tenant, setLoadingState } = this.props;

    setLoadingState(true);
    try {
      fetchFormConfig({ tenant: tenant ? tenant : 'default', fileName: 'Registration' })
        .then((response) => {
          if (response) {
            this.setState({
              formConfig: response,
            });

          } else {
            console.error(ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG);
            setLoadingState(false);
          }
        });
    } catch (e) {
      console.error(ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG);
      console.error(e);
    } finally {
      setLoadingState(false);
    }
  }

  /**
   * Method submit registration form data if form data is valid
   * onClick of submit button.
   */
  handleSubmit = () => {
    const { hasError, member } = this.state;
    const { createStudentData } = this.props;

    if (hasError) {
      createStudentData(member);
      this.setState({
        isSubmitTriggered: true,
        hasError: false,
      });
    } else {
      this.setState({}, () => {
        this.scrollToError();
      });
    }
  };

  /**
   * Scroll page upto first form field which fielded by invalid data onclick of submit button
   */
  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-danger');

    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };

  /**
   * Method transform required form filed error.
   * @param {Array} errors
   * @return {Array} errors
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
    const { userType } = this.props;
    const { MEMBER, ADMIN } = USER_TYPES;

    if (userType === MEMBER) {
      this.setState({
        isStudentLocation: true,
      });
    } else if (userType === ADMIN) {
      this.setState({
        isAdminLocation: true,
      });
    }
    this.setState({
      isPreviousLocation: true,
    });
  };

  /**
   * Method handle on change of form fields
   * @param {Object} event
   */
  onChange = (event) => {
    const { member } = this.state;
    this.setState({
      member: {
        ...member,
        ...event.formData,
      },
      hasError: isEmpty(event.errors),
    });
  };

  /**
   * Method check the validation for individual form fields
   * @param {Object} formData
   * @param {Object} errors
   * @return {Object} errors
   */
  validate = (formData, errors) => {
    const { formConfig } = this.state;
    const { validation } = formConfig;

    return verifyFormDataValidations({ formData, errors, validate: validation });
  };

  render() {
    const {
      formConfig,
      isAdminLocation,
      isPreviousLocation,
      isStudentLocation,
      isSubmitTriggered,
      member,
    } = this.state;
    const {
      isMemberCreated,
      newMember,
      context,
    } = this.props;
    const {
      schema,
      uiSchema,
      data,
    } = formConfig;

    if (!isEmpty(formConfig)) {
      return (
        <ContainerStyled width="100%" ref={this.formRef}>
          <RedirectToRoute
            context={context}
            isAdminLocation={isAdminLocation}
            isPreviousLocation={isPreviousLocation}
            isStudentLocation={isStudentLocation}
          />
          <BoxStyled
            maxWidth="1170px"
            maxHeight="100%"
            borderStyle="none"
            elevation={5}
            padding="40px 20px 0 20px"
            margin="100px auto 70px auto"
          >
            <Form
              enableDirtyCheck
              externalSubmission
              fields={fields}
              showErrorList={false}
              validate={this.validate}
              liveValidate
              schema={schema}
              uiSchema={uiSchema}
              formData={{ ...data, ...member }}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
              onSubmit={this.handleSubmit}
            />
            <Row justify="center" margin="0 0 25px 0">
              <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
                <Button
                  width="100%"
                  onClick={this.redirectToPreviousLocation}
                >
                  {goBackBtnText}
                </Button>
              </Col>
              <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
                <Button
                  width="100%"
                  onClick={this.handleSubmit}
                >
                  {formSubmitBtnText}
                </Button>
              </Col>
            </Row>
            <SuccessMessagePopup
              isSubmitTriggered={isSubmitTriggered}
              isMemberCreated={isMemberCreated}
              newMember={newMember}
              redirectToPreviousLocation={this.redirectToPreviousLocation}
            />
          </BoxStyled>
        </ContainerStyled>
      );
    }
    return null;
  }
}

MemberRegistrationForm.propTypes = {
  context: PropTypes.object,
  createStudentData: PropTypes.func,
  isMemberCreated: PropTypes.bool,
  newMember: PropTypes.object,
  setLoadingState: PropTypes.func.isRequired,
  tenant: PropTypes.string,
  userType: PropTypes.string,
};

MemberRegistrationForm.defaultProps = {
  context: {},
  createStudentData: () => {},
  isMemberCreated: false,
  newMember: {},
  tenant: '',
  userType: '',
};

const mapStateToProps = state => ({
  isMemberCreated: isCreated(state),
  newMember: getNewMember(state),
  tenant: getApplicationTenant(state),
  userType: getUserType(state),
});

const mapDispatchToProps = dispatch => ({
  createStudentData: member => dispatch(createMemberDataAction(member)),
  setLoadingState: flag => dispatch(setLoadingStateAction(flag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberRegistrationForm);
