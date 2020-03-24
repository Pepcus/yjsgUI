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
import { convertAgeToNumeric } from 'utils/common/string';
import widgets from 'components/common/widgets';

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
        mobile: props.searchData.mobile,
      },
      hasError: props.searchData.mode !== 'Edit',
      isSubmitTriggered: false,
      userSelected: {},
    };
    if (props.searchData.selectedUser) {
      (props.users).forEach((user) => {
        if (user.id === this.props.searchData.selectedUser) {
          this.state.userSelected = user;
          this.state.formData = {
            name: user.name,
            address: user.address,
            city: user.city !== props.constants.INDORE_CITY ? this.props.constants.OTHER_CITY : user.city,
            cityName: user.city !== props.constants.INDORE_CITY ? user.city : undefined,
            mobile: user.mobile,
            age: user.age,
            isWhatsApp: user.isWhatsApp,
            email: user.email,
            previousShivir: user.previousShivir ? this.deformatShivirData(user.previousShivir, props) : undefined,
          };
        }
      });
    }
    if (!this.state.formData.mobile) {
      this.redirectToPreviousLocation();
    }
  }

  deformatShivirData = (data, props) => {
    const shivir = data.split(',');
    const shivirData = [];
    shivir.forEach((str) => {
      (props.config.registrationFormConfig.schema.properties.previousShivir.items.enum).forEach((name) => {
        if (str === name) {
          shivirData.push(name);
        }
      });
    });
    return shivirData;
  };

  isDataChanged = () => {
    const {
      name,
      address,
      city,
      mobile,
      age,
      isWhatsApp,
      cityName,
      email,
      previousShivir,
    } = this.state.formData;
    let cityString = city;
    if (city === this.props.constants.OTHER_CITY) {
      cityString = cityName;
    }
    let shivir;
    if (previousShivir) {
      shivir = this.formatShivirData(this.state.formData);
    }
    if (this.state.userSelected.name === name
      && this.state.userSelected.address === address
      && this.state.userSelected.city === cityString
      && this.state.userSelected.mobile === mobile
      && this.state.userSelected.age === age
      && this.state.userSelected.isWhatsApp === isWhatsApp
      && this.state.userSelected.email === email
      && this.state.userSelected.previousShivir === shivir) {
      return false;
    }
    return true;
  };

  formatShivirData = (formData) => {
    let data = '';
    (formData.previousShivir).forEach((shivir, index) => {
      if (index + 1 === (formData.previousShivir).length) {
        data = `${data}${shivir}`;
      } else {
        data = `${data}${shivir},`;
      }
    });
    return data;
  };

  handleSubmit = () => {
    if (!this.state.hasError) {
      const data = {
        ...this.state.formData,
        registrationStatus: this.props.constants.REGISTERED,
        city: this.state.formData.city === this.props.constants.OTHER_CITY
          ? this.state.formData.cityName : this.state.formData.city,
        cityName: undefined,
        previousShivir: this.state.formData.previousShivir ? this.formatShivirData(this.state.formData) : undefined,
      };
      if (this.props.searchData.mode === 'Edit') {
        if (this.isDataChanged()) {
          // Edit User
          this.props.editUserAction({
            ...data,
            registrationStatus: this.state.userSelected.registrationStatus !== this.props.constants.REGISTERED
              ? this.state.userSelected.registrationStatus : this.props.constants.REGISTERED,
          }, this.state.userSelected.id);
        } else {
          // Patch
          this.props.patchUserAction({ registrationStatus: this.state.userSelected.registrationStatus !== this.props.constants.REGISTERED
            ? this.state.userSelected.registrationStatus : this.props.constants.REGISTERED }, this.state.userSelected.id);
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
        age: data.formData.age ? convertAgeToNumeric(data.formData.age) : undefined,
      },
      hasError: !isEmpty(data.errors),
    });
  };

  isSubmitButtonDisabled = () => {
    if (!isEmpty(this.state.formData)
      && !this.state.hasError
      && this.state.formData.name
      && this.state.formData.age
      && this.state.formData.mobile
      && this.state.formData.city
      && this.state.formData.isWhatsApp
      && this.state.formData.address
      && this.state.formData.email) {
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
      <ContainerStyled width="100%" style={{ backgroundColor: 'rgba(244,233,227,0.21176470588235294)', height: '100vh' }} ref={this.formRef}>
        <BoxStyled
          maxWidth="1170px"
          height="max-content"
          borderStyle="none"
          elevation={5}
          padding="40px 20px 0 20px"
          margin="100px auto 70px auto"
          backgroundColor="#FFFFFF !important"
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
            widgets={widgets}
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
            messageOf={this.props.constants.COMPLETE}
            data={this.state.formData}
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
