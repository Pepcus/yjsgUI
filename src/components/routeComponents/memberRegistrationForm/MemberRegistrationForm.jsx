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
import MemberAlreadyRegisteredMessagePopup
  from 'components/routeComponents/memberRegistrationForm/MemberAlreadyRegisteredMessagePopup';

import {
  USER_TYPES,
} from 'constants/member';
import {
  createMemberDataAction,
} from 'actions/memberRegistrationActions';
import {
  getNewMember,
  isCreated,
  isExactMemberAlreadyRegistered,
  isPartialMemberAlreadyRegistered,
} from 'reducers/memberRegistrationReducer';
import {
  getUserType,
} from 'reducers/appReducer';
import {
  formValidators,
  getTransformedErrors,
} from 'utils/form';
import fields from 'components/common/fields';
import { getConstants } from 'reducers/constants';

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
      hasError: true,
      formConfig: props.config.registrationFormConfig,
      isAdminLocation: false,
      isStudentLocation: false,
      isPreviousLocation: false,
      mandatoryField: false,
    };
  }

  /**
   * Method submit registration form data if form data is valid
   * onClick of submit button.
   */
  handleSubmit = () => {
    const { hasError, member } = this.state;
    const { createStudentData } = this.props;
    if (!hasError) {
      createStudentData(member);
      this.setState({
        isSubmitTriggered: true,
        hasError: false,
        mandatoryField: false,
      });
    } else {
      this.setState({ mandatoryField: true }, () => {
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
    const { mandatoryField } = this.state;
    const { constants } = this.props;
    const { THIS_INFORMATION_IS_COMPULSORY_MESSAGE } = constants;
    if (mandatoryField) {
      const transformErrors = {
        'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
        'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
      };
      return getTransformedErrors({ errors, transformErrors });
    }
    return errors;
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
      hasError: !isEmpty(event.errors),
    });
  };

  render() {
    const { FieldTemplate } = fields;
    const {
      formConfig,
      isAdminLocation,
      isPreviousLocation,
      isStudentLocation,
      isSubmitTriggered,
      member,
    } = this.state;
    const {
      constants,
      isMemberCreated,
      isPartialMemberMatchFound,
      isExactMemberMatchFound,
      newMember,
      context,
    } = this.props;
    const {
      BACK,
      SUBMIT,
    } = constants;
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
              FieldTemplate={FieldTemplate}
              fields={fields}
              showErrorList={false}
              validate={formValidators(schema, constants)}
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
                  {BACK}
                </Button>
              </Col>
              <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
                <Button
                  width="100%"
                  onClick={this.handleSubmit}
                >
                  {SUBMIT}
                </Button>
              </Col>
            </Row>
            <SuccessMessagePopup
              isSubmitTriggered={isSubmitTriggered}
              isMemberCreated={isMemberCreated}
              newMember={newMember}
              redirectToPreviousLocation={this.redirectToPreviousLocation}
            />
            <MemberAlreadyRegisteredMessagePopup
              isSubmitTriggered={isSubmitTriggered}
              isExactMemberMatchFound={isExactMemberMatchFound}
              isPartialMemberMatchFound={isPartialMemberMatchFound}
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
  config: PropTypes.object,
  constants: PropTypes.object,
  context: PropTypes.object,
  createStudentData: PropTypes.func.isRequired,
  isMemberCreated: PropTypes.bool,
  isPartialMemberMatchFound: PropTypes.bool,
  isExactMemberMatchFound: PropTypes.bool,
  newMember: PropTypes.object,
  userType: PropTypes.string,
};

MemberRegistrationForm.defaultProps = {
  config: {},
  constants: {},
  context: {},
  isMemberCreated: false,
  isPartialMemberMatchFound: false,
  isExactMemberMatchFound: false,
  newMember: {},
  userType: '',
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  isMemberCreated: isCreated(state),
  newMember: getNewMember(state),
  userType: getUserType(state),
  isPartialMemberMatchFound: isPartialMemberAlreadyRegistered(state),
  isExactMemberMatchFound: isExactMemberAlreadyRegistered(state),
});

const mapDispatchToProps = dispatch => ({
  createStudentData: member => dispatch(createMemberDataAction(member)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberRegistrationForm);
