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
import MultiSelect from '../../common/fields/widgets';

import {
  USER_TYPES,
} from 'constants/member';
import {
  createCoordinatorDataAction,
} from 'actions/coordinatorRegistrationActions';
import {
  getCoordinatorDepartments,
  getNewCoordinator,
  isCreated,
} from 'reducers/coordinatorRegistrationReducer';
import {
  getUserType,
} from 'reducers/appReducer';
import {
  getAdminLoginState,
} from 'reducers/loginReducer';
import {
  formValidators,
  getTransformedErrors,
} from 'utils/form';
import fields from 'components/common/fields';
import { getConstants } from 'reducers/constants';

import RedirectToRoute from './RedirectToRoute';
import SuccessMessagePopup from './SuccessMessagePopup';
import { updateCoordinatorDepartmentsInFormConfig } from 'utils/routes/coordinator';

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
 * CoordinatorRegistrationForm will be render coordinator registration form
 * @type {Class}
 */
class CoordinatorRegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      isSubmitTriggered: false,
      coordinator: {},
      hasError: true,
      formConfig: updateCoordinatorDepartmentsInFormConfig({
        formConfig: props.config.coordinatorFormConfig,
        coordinatorDepartments: props.coordinatorDepartments,
      }),
      isAdminLocation: false,
      isPreviousLocation: false,
      mandatoryField: false,
      coordinatorDepartments: props.coordinatorDepartments,
    };
  }

  /**
   * Method submit registration form data if form data is valid
   * onClick of submit button.
   */
  handleSubmit = () => {
    const { hasError, coordinator } = this.state;
    const { createCoordinatorData } = this.props;
    if (!hasError) {
      createCoordinatorData(coordinator);
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
    const { THIS_INFORMATION_IS_MANDATORY_MESSAGE } = constants;
    if (mandatoryField) {
      const transformErrors = {
        'required': THIS_INFORMATION_IS_MANDATORY_MESSAGE,
      };
      return getTransformedErrors({ errors, transformErrors });
    }
    return getTransformedErrors({errors});
  };


  /**
   * Redirect to previous location
   */
  redirectToPreviousLocation = () => {
    const { userType } = this.props;
    const { ADMIN } = USER_TYPES;
    if (userType === ADMIN) {
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
    const { coordinator } = this.state;

    this.setState({
      coordinator: {
        ...coordinator,
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
      isSubmitTriggered,
      coordinator,
    } = this.state;
    const {
      constants,
      isCoordinatorCreated,
      newCoordinator,
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
              formData={{ ...data, ...coordinator }}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
              onSubmit={this.handleSubmit}
              widgets={MultiSelect}
              isAdminLogin={this.props.isAdminLogin}
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
              isCoordinatorCreated={isCoordinatorCreated}
              newCoordinator={newCoordinator}
              redirectToPreviousLocation={this.redirectToPreviousLocation}
            />
          </BoxStyled>
        </ContainerStyled>
      );
    }
    return null;
  }
}

CoordinatorRegistrationForm.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  context: PropTypes.object,
  createCoordinatorData: PropTypes.func.isRequired,
  fetchCoordinatorDepartments: PropTypes.func.isRequired,
  isCoordinatorCreated: PropTypes.bool,
  newCoordinator: PropTypes.object,
  userType: PropTypes.string,
  isAdminLogin: PropTypes.bool,
  coordinatorDepartments: PropTypes.array,
};

CoordinatorRegistrationForm.defaultProps = {
  config: {},
  constants: {},
  context: {},
  isCoordinatorCreated: false,
  newCoordinator: {},
  userType: '',
  isAdminLogin: false,
  fetchCoordinatorDepartments: () => {},
  coordinatorDepartments: [],
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  isCoordinatorCreated: isCreated(state),
  newCoordinator: getNewCoordinator(state),
  userType: getUserType(state),
  isAdminLogin: getAdminLoginState(state),
  coordinatorDepartments: getCoordinatorDepartments(state),
});

const mapDispatchToProps = dispatch => ({
  createCoordinatorData: coordinator => dispatch(createCoordinatorDataAction(coordinator)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(CoordinatorRegistrationForm);
