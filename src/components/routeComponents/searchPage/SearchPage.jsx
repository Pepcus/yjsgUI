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
import {
  createUserAction,
  fetchUserFromPhoneAction,
  setDefaultUserData,
  storeSearchPageData,
} from 'actions/userActions';
import { getIsUserCreated, getUsers } from 'reducers/userReducer';
import SuccessPopup from 'components/routeComponents/userRegistration/SuccessPopup';

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

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formConfig: props.config.searchFormConfig,
      formData: {},
      hasError: true,
      isNewRegistrationClicked: false,
      isPartialRegistrationSubmitClicked: false,
      isSubmitClicked: false,
      partialFormData: {},
      partialFormHasError: true,
      selectedUser: '',
    };
  }

  componentWillMount() {
    this.props.setDefaultUserData();
  }

  handleSubmit = () => {
    this.props.storeSearchPageData(this.state.formData);
    this.props.fetchUserFromPhoneAction(this.state.formData);
    this.setState({
      isSubmitClicked: true,
    });
  };

  onChange = (data) => {
    this.props.setDefaultUserData();
    this.setState({
      formData: data.formData,
      hasError: !isEmpty(data.errors),
      isSubmitClicked: false,
    });
  };

  isSubmitButtonDisabled = () => {
    if (!isEmpty(this.state.formData)
      && !this.state.hasError) {
      return false;
    }
    return true;
  };

  handleOptionChange = (e) => {
    this.setState({
      selectedUser: Number(e.currentTarget.value),
    });
  };

  renderUserList = () => {
    if ((this.props.users).length > 0) {
      console.log(this.state.selectedUser);
      return (this.props.users).map(user => (
        <div className="radio">
          <label>
            <input
              type="radio"
              value={user.id}
              checked={this.state.selectedUser === user.id}
              onChange={this.handleOptionChange}
            />
            {user.name}
          </label>
        </div>
      ));
    }
    return null;
  };

  handleContinue = () => {
    const formData = {
      ...this.state.formData,
      selectedUser: this.state.selectedUser,
      mode: 'Edit',
    };
    this.props.storeSearchPageData(formData);
    window.location.href = '#/user-registration';
  };

  renderContinueAndNewUserButton = () => {
    if ((this.props.users).length > 0) {
      return (
        <Row justify="center" margin="0 0 25px 0">
          <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
            <Button
              width="100%"
              onClick={this.handleContinue}
              disabled={this.state.selectedUser === ''}
            >
              Continue
            </Button>
          </Col>
          <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
            <Button
              width="100%"
              onClick={this.handleNewRegistration}
            >
              New Registration
            </Button>
          </Col>
        </Row>
      );
    }
    return null;
  };

  renderSubmitButton() {
    if ((this.props.users).length > 0
      || this.state.isSubmitClicked) {
      return null;
    }
    return (
      <Row justify="center" margin="0 0 25px 0">
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
    );
  }

  handleNewRegistration = () => {
    if (this.state.formData.city === 'Indore') {
      this.handleSubmit();
      window.location.href = '#/user-registration';
    } else if (this.state.formData.city === 'Other') {
      this.setState({
        isNewRegistrationClicked: true,
      });
    }
  };

  onChangePartialForm = (data) => {
    this.setState({
      partialFormData: data.formData,
      partialFormHasError: !isEmpty(data.errors),
    });
  };

  handlePartialFormSubmit = () => {
    const data = {
      ...this.state.formData,
      ...this.state.partialFormData,
      paymentStatus: 'Pending',
    };
    // Create New Student
    this.props.createUserAction(data);
    this.setState({
      isPartialRegistrationSubmitClicked: true,
    });
  };

  isPartialSubmitButtonDisabled = () => {
    if (!isEmpty(this.state.partialFormData)
      && !this.state.partialFormHasError) {
      return false;
    }
    return true;
  };

  renderPartialUserForm = () => {
    const { FieldTemplate } = fields;
    const {
      partialUserSchema,
      partialUserUISchema,
    } = this.state.formConfig;
    if ((this.state.formData.city === 'Other'
      && (this.props.users).length === 0
      && this.state.isSubmitClicked)
      || this.state.isNewRegistrationClicked) {
      return (
        <div>
          <Form
            enableDirtyCheck
            externalSubmission
            FieldTemplate={FieldTemplate}
            fields={fields}
            formData={this.state.partialFormData}
            showErrorList={false}
            validate={formValidators(partialUserSchema, this.props.constants)}
            liveValidate
            schema={partialUserSchema}
            uiSchema={partialUserUISchema}
            onChange={this.onChangePartialForm}
            onSubmit={this.handlePartialFormSubmit}
          />
          <Row justify="center" margin="0 0 25px 0">
            <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
              <Button
                width="100%"
                onClick={this.handlePartialFormSubmit}
                disabled={this.isPartialSubmitButtonDisabled()}
              >
                {this.props.constants.SUBMIT}
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
    return null;
  };

  closePopup = () => {
    this.props.setDefaultUserData();
    this.setState({
      formData: {},
      hasError: true,
      isNewRegistrationClicked: false,
      isPartialRegistrationSubmitClicked: false,
      isSubmitClicked: false,
      partialFormData: {},
      partialFormHasError: true,
      selectedUser: '',
    });
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
          {this.renderSubmitButton()}
          <div>{this.renderUserList()}</div>
          {this.renderContinueAndNewUserButton()}
          {this.renderPartialUserForm()}
          <SuccessPopup
            isSubmitTriggered={this.state.isPartialRegistrationSubmitClicked}
            isUserCreated={this.props.isUserCreated}
            redirectToPreviousLocation={this.closePopup}
            message="Your Registration is not done. You need to do payment of INR 100 on following mentioned details. Once Payment is received you will be notified to complete your registration."
          />
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

SearchPage.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  createUserAction: PropTypes.func,
  fetchUserFromPhoneAction: PropTypes.func,
  isUserCreated: PropTypes.bool,
  setDefaultUserData: PropTypes.func,
  storeSearchPageData: PropTypes.func,
  users: PropTypes.array,
};

SearchPage.defaultProps = {
  config: {},
  constants: {},
  createUserAction: () => {},
  fetchUserFromPhoneAction: () => {},
  isUserCreated: false,
  setDefaultUserData: () => {},
  storeSearchPageData: () => {},
  users: [],
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  isUserCreated: getIsUserCreated(state),
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
  createUserAction: formData => dispatch(createUserAction(formData)),
  fetchUserFromPhoneAction: formData => dispatch(fetchUserFromPhoneAction(formData)),
  storeSearchPageData: formData => dispatch(storeSearchPageData(formData)),
  setDefaultUserData: () => dispatch(setDefaultUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
