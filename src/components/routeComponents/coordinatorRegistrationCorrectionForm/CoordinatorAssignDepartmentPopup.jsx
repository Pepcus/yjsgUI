import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import Row from 'pepcus-core/lib/Row';
import Button from 'pepcus-core/lib/Button';
import { getConstants } from 'reducers/constants';
import styled from 'styled-components';
import Box from 'pepcus-core/lib/Box';
import { getThemeProps } from 'pepcus-core/utils/theme';
import fields from 'components/common/fields';
import Form from 'pepcus-core/lib/Form';
import { updateFormConfigForAssignDepartmentPopup } from 'utils/routes/coordinator';
import MultiSelect from 'components/common/fields/widgets';
import { getTransformedErrors } from 'utils/form';

const BoxStyled = styled(Box)`
    top: 0;
    left:0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const RowStyled = styled(Row)`
    margin: 0 !important;
    border-radius: 4px;
    padding: 30px;
    background: ${getThemeProps('palette.policyMuted.color')};
    max-width: 90%;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    max-height: 80%;
    width: 80%;
    overflow: auto;
    @media (max-width: 992px) and (orientation: landscape) {
        max-width: 80%;
        overflow: auto;
    } 
    ${({ theme }) => theme.media.down('sm')`
        width: 400px;
        padding: 20px;
        max-width: 80%;
        overflow: auto;
    `}
`;

class CoordinatorAssignDepartmentPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formConfig: updateFormConfigForAssignDepartmentPopup({
        formConfig: props.formConfig,
        coordinatorDepartments: props.coordinatorDepartments,
      }),
      formData: {
        coordinatorDepartmentsAssignment: props.coordinator.assignedDepartments.length
          ? props.coordinator.assignedDepartments : props.formConfig.formData.coordinatorDepartmentsAssignment,
      },
      coordinator: props.coordinator,
      coordinatorDepartments: props.coordinatorDepartments,
      hasError: true,
    };
  }

  formatAssignDepartmentsFormData = (formData = {}) => {
    const { coordinatorDepartmentsAssignment } = formData;
    // Since the SelectList for departmentType always returns a string on change,
    // we have to manually convert it into number
    const formattedData = coordinatorDepartmentsAssignment.map((data) => ({
      departmentType: Number(data.departmentType),
      departmentValue: data.departmentValue,
    }));
    return {
      ...formData,
      coordinatorDepartmentsAssignment: formattedData,
    };
  };

  /**
   * Method handle on change of form fields
   * @param {Object} event
   */
  onChange = ({ formData, errors }) => {
    const { formConfig, coordinator, coordinatorDepartments } = this.state;
    this.setState({
      formConfig: updateFormConfigForAssignDepartmentPopup({
        formConfig,
        coordinatorDepartments,
      }),
      formData: this.formatAssignDepartmentsFormData(formData),
      hasError: !isEmpty(errors),
    });
  };


  /**
   * Method transform required form filed error.
   * @param {Array} errors
   * @return {Array} errors
   */
  transformErrors = (errors) => {
    const { constants } = this.props;
    const { THIS_INFORMATION_IS_MANDATORY_MESSAGE } = constants;
    const transformErrors = {
      required: THIS_INFORMATION_IS_MANDATORY_MESSAGE,
    };
    return getTransformedErrors({ errors, transformErrors });
  };

  onClickSubmit = () => {
    if (!this.state.hasError) {
      this.props.onSubmit(this.state.formData.coordinatorDepartmentsAssignment);
    }
  };

  render () {
    const { constants, onSubmit, onBack } = this.props;
    const { schema, uiSchema } = this.state.formConfig;
    const {
      BACK,
      SUBMIT,
    } = constants;
    const { FieldTemplate, ArrayFieldTemplate } = fields;
    return (
      <BoxStyled
        elevation={1}
        backgroundColor="transparent"
        height="100%"
        position="fixed"
        borderColor="white"
        width="100%"
      >
        <RowStyled >
          <Row display="inline-block" width="100%" justify="center" margin="0">
          <Form
            ArrayFieldTemplate={ArrayFieldTemplate}
            enableDirtyCheck
            externalSubmission
            FieldTemplate={FieldTemplate}
            showErrorList={false}
            fields={fields}
            liveValidate
            schema={schema}
            uiSchema={uiSchema}
            formData={this.state.formData}
            onChange={this.onChange}
            widgets={MultiSelect}
            transformErrors={this.transformErrors}
          />
          </Row>
          <Row display="inline-block" width="100%" justify="center" margin="0">
            <Button
              margin="10px 25px"
              onClick={onBack}
              width="170px"
            >
              {BACK}
            </Button>
            <Button
              margin="10px 25px"
              onClick={this.onClickSubmit}
              width="170px"
            >
              {SUBMIT}
            </Button>
          </Row>
        </RowStyled>
      </BoxStyled>
    );
  }
}

CoordinatorAssignDepartmentPopup.propTypes = {};

CoordinatorAssignDepartmentPopup.defaultProps = {};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps) (CoordinatorAssignDepartmentPopup);
