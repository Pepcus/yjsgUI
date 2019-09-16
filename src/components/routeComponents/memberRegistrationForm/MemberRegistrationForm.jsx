/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import Box from 'ravenjs/lib/Box';
import Button from 'ravenjs/lib/Button';
import Container from 'ravenjs/lib/Container';
import Form from 'ravenjs/lib/Form';
import Row from 'ravenjs/lib/Row';
import { getThemeProps } from 'ravenjs/utils/theme';

import {
  ERROR_MESSAGE_OF_LOAD_APP_FORM_CONFIG,
  formSubmitBtnText,
  goBackBtnText,
  USER_TYPES,
} from 'constants/yjsg';
import {
  createMemberDataAction,
  setLoadingStateAction,
} from 'actions/memberRegistrationActions';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from 'constants/messages';
import {
  getNewMember,
  getUserType,
  isCreated,
} from 'reducers/memberRegistrationReducer';
import { fetchFormConfig } from 'sagas/formConfigAPI';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import {
  getTransformedErrors,
  validateForm,
} from 'utils/formUtils';
import fields from 'components/common/fields';
import RedirectToRoute from './RedirectToRoute';
import SuccessMessagePopup from './SuccessMessagePopup';

const BoxStyled = styled(Box)`
 align-items: center;
 overflow-x: hidden;
 overflow-y: auto;
 background-color: ${getThemeProps('palette.policyMuted.color')};
`;

const ContainerStyled = styled(Container)`
  height: max-content;
  display: flex;
`;

/**
 * MemberRegistrationForm will be render student registration form
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
      fetchFormConfig({ tenant, fileName: 'Registration' })
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
      this.setState({}, () => {
        this.scrollToError();
      });
    } else {
      createStudentData(member);
      this.setState({
        isSubmitTriggered: true,
        hasError: false,
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
    const { STUDENT, ADMIN } = USER_TYPES;

    if (userType === STUDENT) {
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
      hasError: !isEmpty(event.errors),
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

    return validateForm({ formData, errors, validate: validation });
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
            />
            <Row justify="center" margin="0 0 25px 0">
              <Button
                width="170px"
                margin="10px 25px"
                onClick={this.redirectToPreviousLocation}
              >
                {goBackBtnText}
              </Button>
              <Button
                width="170px"
                margin="10px 25px"
                onClick={this.handleSubmit}
              >
                {formSubmitBtnText}
              </Button>
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