import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'pepcus-core/lib/Box';
import { getThemeProps } from 'pepcus-core/utils/theme';
import Container from 'pepcus-core/lib/Container';
import Form from 'pepcus-core/lib/Form';
import fields from 'components/common/fields';
import { formValidators } from 'utils/form';
import Row from 'pepcus-core/lib/Row';
import Col from 'pepcus-core/lib/Col';
import Button from 'pepcus-core/lib/Button';
import { getConstants } from 'reducers/constants';
import { isEmpty } from 'pepcus-core';
import { createUserAction, editUserAction, patchUserAction } from 'actions/userActions';
import { getIsUserCreated, getIsUserFailed, getSearchData, getUsers } from 'reducers/userReducer';
import SuccessPopup from 'components/routeComponents/userRegistration/SuccessPopup';
import ErrorPopup from 'components/routeComponents/userRegistration/ErrorPopup';

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

class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formConfig: props.config.registrationFormConfig,
      formData: {
        city: props.searchData.city === props.constants.OTHER_CITY ? props.searchData.cityName : props.searchData.city,
        mobile: props.searchData.mobile,
      },
      hasError: props.searchData.mode !== 'Edit',
      isSubmitTriggered: false,
      userSelected: {},
    };
    if (this.props.searchData.selectedUser) {
      (this.props.users).forEach((user) => {
        if (user.id === this.props.searchData.selectedUser) {
          this.state.userSelected = user;
          this.state.formData = {
            name: user.name,
            address: user.address,
            city: user.city,
            mobile: user.mobile,
            age: user.age,
            isWhatsApp: user.isWhatsApp,
            foodOpt: user.foodOpt,
          };
        }
      });
    }
  }

  isDataChanged = () => {
    const {
      name,
      address,
      city,
      mobile,
      age,
      isWhatApp,
      foodOpt,
    } = this.state.formData;
    if (this.state.userSelected.name === name
      && this.state.userSelected.address === address
      && this.state.userSelected.city === city
      && this.state.userSelected.mobile === mobile
      && this.state.userSelected.age === age
      && this.state.userSelected.isWhatApp === isWhatApp
      && this.state.userSelected.foodOpt === foodOpt) {
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (!this.state.hasError) {
      const data = {
        ...this.state.formData,
        registrationStatus: 'REG',
      };
      if (this.props.searchData.mode === 'Edit') {
        if (this.isDataChanged()) {
          // Edit User
          this.props.editUserAction(data, this.state.userSelected.id);
        } else {
          // Patch
          this.props.patchUserAction({ registrationStatus: 'REG' }, this.state.userSelected.id);
        }
      } else {
        // Create New Student
        this.props.createUserAction(data);
      }
      this.setState({
        isSubmitTriggered: true,
      });
    }
  };

  redirectToPreviousLocation = () => {
    window.location.href = '#/gms';
  };

  onChange = (data) => {
    this.setState({
      formData: {
        ...data.formData,
      },
      hasError: !isEmpty(data.errors),
    });
  };

  isSubmitButtonDisabled = () => {
    if (!isEmpty(this.state.formData)
      && !this.state.hasError) {
      return false;
    }
    return true;
  };

  renderErrorPopup = () => {
    if (this.state.isSubmitTriggered && this.props.isUserFailed) {
      return (
        <ErrorPopup
          redirectToPreviousLocation={this.redirectToPreviousLocation}
          message={this.props.constants.REGISTRATION_FAILED_MESSAGE}
        />
      );
    }
    return null;
  };

  render() {
    const { FieldTemplate } = fields;
    const {
      schema,
      uiSchema,
    } = this.state.formConfig;

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
            formData={this.state.formData}
            showErrorList={false}
            validate={formValidators(schema, this.props.constants)}
            liveValidate
            schema={schema}
            uiSchema={uiSchema}
            onChange={this.onChange}
            onSubmit={this.handleSubmit}
          />
          <Row justify="center" margin="0 0 25px 0">
            <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
              <Button
                width="100%"
                onClick={this.redirectToPreviousLocation}
              >
                {this.props.constants.BACK}
              </Button>
            </Col>
            <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
              <Button
                width="100%"
                onClick={this.handleSubmit}
                disabled={this.isSubmitButtonDisabled()}
              >
                {this.props.constants.SUBMIT}
              </Button>
            </Col>
          </Row>
          <SuccessPopup
            isSubmitTriggered={this.state.isSubmitTriggered}
            isUserCreated={this.props.isUserCreated}
            redirectToPreviousLocation={this.redirectToPreviousLocation}
            message1={this.props.constants.REGISTRATION_COMPLETE_MESSAGE_1}
            message2={this.props.constants.REGISTRATION_COMPLETE_MESSAGE_2}
            message3={this.props.constants.REGISTRATION_COMPLETE_MESSAGE_3}
          />
          {this.renderErrorPopup()}
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

UserRegistration.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  createUserAction: PropTypes.func,
  editUserAction: PropTypes.func,
  isUserCreated: PropTypes.bool,
  isUserFailed: PropTypes.bool,
  patchUserAction: PropTypes.func,
  searchData: PropTypes.object,
  users: PropTypes.array,
};

UserRegistration.defaultProps = {
  config: {},
  constants: {},
  createUserAction: () => {},
  editUserAction: () => {},
  isUserCreated: false,
  isUserFailed: false,
  patchUserAction: () => {},
  searchData: {},
  users: [],
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  searchData: getSearchData(state),
  users: getUsers(state),
  isUserCreated: getIsUserCreated(state),
  isUserFailed: getIsUserFailed(state),
});

const mapDispatchToProps = dispatch => ({
  createUserAction: member => dispatch(createUserAction(member)),
  editUserAction: (member, id) => dispatch(editUserAction(member, id)),
  patchUserAction: (member, id) => dispatch(patchUserAction(member, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
