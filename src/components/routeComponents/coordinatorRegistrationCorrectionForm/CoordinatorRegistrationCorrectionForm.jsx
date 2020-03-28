import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Container from 'pepcus-core/lib/Container';
import Col from 'pepcus-core/lib/Col';
import Form from 'pepcus-core/lib/Form';
import Row from 'pepcus-core/lib/Row';
import { getThemeProps } from 'pepcus-core/utils/theme';
import Loader from 'components/common/Loader';

import { isUpdatedResetAction, updateCoordinatorDataAction } from 'actions/coordinatorRegistrationActions';
import {
  getCoordinator,
  getCoordinatorDepartments,
  getUserId,
  getUserSecretKey,
  isFetched,
  isUpdated,
} from 'reducers/coordinatorRegistrationReducer';
import {
  getTransformedErrors,
  formValidators
} from 'utils/form';
import {
  getAdminLoginState,
} from 'reducers/loginReducer';
import fields from 'components/common/fields';
import { getConstants } from 'reducers/constants';
import InvalidCoordinatorPopUp from './InvalidCoordinatorPopUp';
import FormUpdateSuccessMessageCoordinator from './FormUpdateSuccessMessageCoordinator';
import RedirectToRoute from './RedirectToRoute';
import MultiSelect from 'components/common/fields/widgets';
import CoordinatorAssignDepartmentPopup
  from 'components/routeComponents/coordinatorRegistrationCorrectionForm/CoordinatorAssignDepartmentPopup';
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
 * CoordinatorRegistrationCorrectionForm render coordinator registration correction form.
 * @type {Class}
 * @return {HTML} Correction form
 */
class CoordinatorRegistrationCorrectionForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      formConfig: updateCoordinatorDepartmentsInFormConfig({
        formConfig: props.config.coordinatorFormConfig,
        coordinatorDepartments: props.coordinatorDepartments,
      }),
      isFormChanged: false,
      hasError: false,
      isSubmitTriggered: false,
      isPreviousLocation: false,
      coordinator: props.coordinator,
      mandatoryField: false,
      isCoordinatorAssignDepartmentPopupOpen: false,
      coordinatorDepartments: props.coordinatorDepartments,
    };
  }

  componentDidMount() {
    const { isAdminLogin, config = {}, coordinatorDepartments, coordinator } = this.props;
    if (isAdminLogin) {
      this.setState({
        formConfig: updateCoordinatorDepartmentsInFormConfig({
          formConfig: config.adminCoordinatorFormConfig,
          coordinatorDepartments: coordinatorDepartments,
        }),
        coordinator,
      });
    } else {
      this.setState({
        formConfig: updateCoordinatorDepartmentsInFormConfig({
          formConfig: config.coordinatorFormConfig,
          coordinatorDepartments: coordinatorDepartments,
          coordinator,
        }),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coordinator !== this.props.coordinator) {
      this.setState({
        coordinator: nextProps.coordinator
      })
    }
  }

  /**
   * Method will update data by onClick of submit button
   */
  updateCoordinatorData = () => {
    const {
      id,
      secretKey,
      updateCoordinatorData,
    } = this.props;
    const { coordinator } = this.state;

    // Calls api to update coordinator data
    updateCoordinatorData({
      id,
      secretKey,
      coordinator,
    });
  };


  /**
   * Method submit registration form data if form data is valid
   * onClick of submit button.
   */
  handleSubmit = () => {
    const { hasError } = this.state;
    if (!hasError) {
      this.setState({
        isSubmitTriggered: true,
        hasError: false,
        mandatoryField: false,
      });
      this.updateCoordinatorData();
    } else {
      this.setState({
        mandatoryField: true,
        isSubmitTriggered: true,
        isFormChanged: false,
       }, () => {
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
    this.setState({
      isPreviousLocation: true,
    });
  };

  /**
   * Method handle on change of form fields
   * @param {Object} event
   */
  onChange = ({ formData, errors }) => {
    const { coordinator } = this.state;
    this.setState({
      coordinator: {
        ...coordinator,
        ...formData,
      },
      isFormChanged: true,
      isSubmitTriggered: false,
      hasError: !isEmpty(errors),
    });
  };

  renderCoordinatorAssignDepartmentPopup = () => {
    const { assignDepartmentsFormConfig } = this.props.config;
    if (this.state.isCoordinatorAssignDepartmentPopupOpen) {
      return (
        <CoordinatorAssignDepartmentPopup
          coordinator={this.state.coordinator}
          coordinatorDepartments={this.state.coordinatorDepartments}
          formConfig={assignDepartmentsFormConfig}
          onSubmit={this.onSubmitCoordinatorAssignDepartmentPopup}
          onBack={this.onBackCoordinatorAssignDepartmentPopup}
        />
      )
    }
    return null;
  };

  openCoordinatorAssignDepartmentPopup = () => {
    this.setState({
      isCoordinatorAssignDepartmentPopupOpen: true,
    })
  };

  onSubmitCoordinatorAssignDepartmentPopup = (assignedDepartments) => {
    this.setState({
      isCoordinatorAssignDepartmentPopupOpen: false,
      isFormChanged: true,
      coordinator: {
        ...this.state.coordinator,
        assignedDepartments,
      }
    })
  };

  onBackCoordinatorAssignDepartmentPopup = () => {
    this.setState({
      isCoordinatorAssignDepartmentPopupOpen: false,
    })
  };

  renderAssignDepartmentsButton = () => {
    const { isAdminLogin, constants } = this.props;
    const {
      ASSIGN_DEPARTMENTS_TEXT
    } = constants;
    if (isAdminLogin) {
      return (
        <Button
          width="100%"
          onClick={this.openCoordinatorAssignDepartmentPopup}
        >
          {ASSIGN_DEPARTMENTS_TEXT}
        </Button>
      )
    }
    return null;
  };

  render() {
    const { FieldTemplate } = fields;
    const {
      formConfig,
      isPreviousLocation,
      isSubmitTriggered,
      isUpdatedReset,
      coordinator,
      hasError,
      isFormChanged,
    } = this.state;
    const {
      constants,
      context,
      isCoordinatorUpdated,
      isFetch,
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
    if (isFetch && !isEmpty(this.props.coordinator) && !isEmpty(formConfig)) {
      return (
        <ContainerStyled width="100%" ref={this.formRef}>
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
              isUpdatedReset={isUpdatedReset}
              isCoordinatorUpdated={isCoordinatorUpdated}
              isSubmitTriggered={isSubmitTriggered}
              isAdminLogin={this.props.isAdminLogin}
            />
            <RedirectToRoute
              context={context}
              isPreviousLocation={isPreviousLocation}
            />
            <FormUpdateSuccessMessageCoordinator
              hasError={hasError}
              isFormChanged={isFormChanged}
              isCoordinatorUpdated={isCoordinatorUpdated}
              isSubmitTriggered={isSubmitTriggered}
              isUpdatedReset={isUpdatedReset}
              redirectToPreviousLocation={this.redirectToPreviousLocation}
            />
            {
              this.renderCoordinatorAssignDepartmentPopup()
            }
            <Row justify="center" margin="0 0 25px 0">
              <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
                {
                  this.renderAssignDepartmentsButton()
                }
              </Col>
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
          </BoxStyled>
        </ContainerStyled>
      );
    } else if (isFetch && isEmpty(this.props.coordinator)) {
      return (
        <Box>
          <InvalidCoordinatorPopUp
            redirectToPreviousLocation={this.redirectToPreviousLocation}
          />
          <RedirectToRoute
            context={context}
            isPreviousLocation={isPreviousLocation}
          />
        </Box>
      );
    }
    return (
      <Loader isLoading />
    )
  }
}

CoordinatorRegistrationCorrectionForm.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  context: PropTypes.object,
  isFetch: PropTypes.bool,
  isUpdatedReset: PropTypes.func,
  isAdminLogin: PropTypes.bool,
  updateCoordinatorData: PropTypes.func,
  isCoordinatorUpdated: PropTypes.bool,
  secretKey: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  coordinatorDepartments: PropTypes.array,
};

CoordinatorRegistrationCorrectionForm.defaultProps = {
  config: {},
  constants: {},
  context: {},
  isUpdatedReset: () => {},
  updateCoordinatorData: () => {},
  isCoordinatorUpdated: false,
  isFetch: false,
  secretKey: '',
  id: '',
  isAdminLogin: false,
  coordinatorDepartments: [],
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  coordinator: getCoordinator(state),
  isCoordinatorUpdated: isUpdated(state),
  id: getUserId(state),
  isFetch: isFetched(state),
  secretKey: getUserSecretKey(state),
  isAdminLogin: getAdminLoginState(state),
  coordinatorDepartments: getCoordinatorDepartments(state),
});

const mapDispatchToProps = dispatch => ({
  isUpdatedReset: props => dispatch(isUpdatedResetAction(props)),
  updateCoordinatorData: props => dispatch(updateCoordinatorDataAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoordinatorRegistrationCorrectionForm);
