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
import Typography from 'pepcus-core/lib/Typography';
import { getConstants } from 'reducers/constants';
import { isEmpty } from 'pepcus-core';
import {
  fetchUserFromPhoneAction,
  setDefaultUserData,
  storeSearchPageData,
} from 'actions/userActions';
import { getIsUserCreated, getIsUserFailed, getUsers } from 'reducers/userReducer';
import SuccessPopup from '../userRegistration/SuccessPopup';
import ErrorPopup from '../userRegistration/ErrorPopup';

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

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('colors.header')};
`;

const TypographyHeadingStyled = styled(Typography)`
   margin-top: 25px;
`;

const TypographyFormHeadingStyled = styled(Typography)`
   padding-left: 8px;
`;

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      continueClicked: false,
      formConfig: props.config.searchFormConfig,
      formData: {},
      hasError: true,
      isPartialRegistrationSubmitClicked: false,
      isSubmitClicked: false,
      selectedUser: '',
      schema: props.config.searchFormConfig.schema,
      uiSchema: props.config.searchFormConfig.uiSchema,
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

  renderUserList = () => (
    this.props.users).map(user => (
      <div>
        <div className="radio" style={{ padding: '0 10px 0 10px', marginBottom: '10px' }}>
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
      </div>
  ),
  );

  renderUserListContainer = () => {
    if ((this.props.users).length > 0) {
      return (
        <div>
          <div style={{ display: 'block', padding: '0 10px 0 10px', width: '100%', marginBottom: '10px', fontWeight: 'bold', color: '#4c4c4c' }}>
            <label>{this.props.constants.USER_LIST_HEADING}</label>
          </div>
          {this.renderUserList()}
        </div>
      );
    }
    return null;
  };

  handleContinue = () => {
    const formData = {
      ...this.state.formData,
      selectedUser: this.state.selectedUser,
      mode: 'Edit',
    };
    (this.props.users).forEach((user) => {
      if (user.id === this.state.selectedUser) {
        if ((user.paymentStatus).toLowerCase() === this.props.constants.PENDING) {
          this.setState({
            continueClicked: true,
          });
        } else {
          this.props.storeSearchPageData(formData);
          window.location.href = '#/user-registration';
        }
      }
    });
  };

  renderContinueAndNewUserButton = () => {
    if ((this.props.users).length > 0) {
      return (
        <Row justify="center" margin="0 0 25px 0">
          <Col size={{ xs: 12, sm: 12, md: 6, lg: 6 }} padding="10px 15px 10px 15px">
            <Button
              width="100%"
              onClick={this.handleContinue}
              disabled={this.state.selectedUser === ''}
            >
              Continue
            </Button>
          </Col>
          <Col size={{ xs: 12, sm: 12, md: 6, lg: 6 }} padding="10px 15px 10px 15px">
            <Button
              width="100%"
              onClick={this.handleNewRegistration}
            >
              {this.props.constants.NEW_REGISTRATION}
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
        <Col size={{ xs: 12, sm: 12, md: 12, lg: 12 }} padding="10px 15px 10px 15px">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              width="200px"
              onClick={this.handleSubmit}
              disabled={this.isSubmitButtonDisabled()}
            >
              {this.props.constants.SUBMIT}
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  handleNewRegistration = () => {
    this.handleSubmit();
    window.location.href = '#/user-registration';
  };

  closePopup = () => {
    this.props.setDefaultUserData();
    this.setState({
      continueClicked: false,
      formData: {},
      hasError: true,
      isPartialRegistrationSubmitClicked: false,
      isSubmitClicked: false,
      selectedUser: '',
      schema: this.state.formConfig.schema,
      uiSchema: this.state.formConfig.uiSchema,
    });
  };

  renderErrorPopup = () => {
    if (this.state.isPartialRegistrationSubmitClicked && this.props.isUserFailed) {
      return (
        <ErrorPopup
          redirectToPreviousLocation={this.closePopup}
          message={this.props.constants.REGISTRATION_FAILED_MESSAGE}
        />
      );
    }
    return null;
  };

  render() {
    const { FieldTemplate } = fields;
    return (
      <ContainerStyled width="100%" style={{ backgroundColor: 'rgba(244,233,227,0.21176470588235294)', height: '100vh' }} ref={this.formRef}>
        <BoxStyled
          maxWidth="500px"
          height="max-content"
          borderStyle="none"
          elevation={5}
          padding="10px 20px 0 20px"
          margin="100px auto 70px auto"
          backgroundColor="#FFFFFF !important"
        >
          <Row width="100%" display="inline-block">
            <TypographyStyled
              type="title"
              fontWeight="600"
              fontSize="18px"
              align="center"
            >
              {this.props.constants.EVENT_DATE}
            </TypographyStyled>
            <Typography
              type="title"
              fontSize="16px"
              align="center"
            >
              {this.props.constants.EVENT_VENUE}
            </Typography>
            <TypographyHeadingStyled
              type="title"
              fontSize="16px"
              align="center"
              marginTop="10px"
            >
              {this.props.constants.SEARCH_PAGE_HEADING}
            </TypographyHeadingStyled>
          </Row>
          <div
            style={{
              marginBottom: '10px',
              marginTop: '10px',
              backgroundColor: 'rgb(248, 248, 248)',
              padding: '10px 0px 1px 0px',
            }}
          >
            <TypographyFormHeadingStyled
              type="title"
              fontSize="16px"
            >
              {this.props.constants.SEARCH_PAGE_FORM_HEADING}
            </TypographyFormHeadingStyled>
            <Form
              enableDirtyCheck
              externalSubmission
              FieldTemplate={FieldTemplate}
              fields={fields}
              formData={this.state.formData}
              showErrorList={false}
              validate={formValidators(this.state.schema, this.props.constants)}
              liveValidate
              schema={this.state.schema}
              uiSchema={this.state.uiSchema}
              onChange={this.onChange}
              onSubmit={this.handleSubmit}
            />
            {this.renderSubmitButton()}
            <div>{this.renderUserListContainer()}</div>
            {this.renderContinueAndNewUserButton()}
          </div>
          <SuccessPopup
            isSubmitTriggered={this.state.isPartialRegistrationSubmitClicked}
            isUserCreated={this.props.isUserCreated}
            isFromPartialContinue={this.state.continueClicked}
            redirectToPreviousLocation={this.closePopup}
            messageOf={this.props.constants.PARTIAL}
          />
          {this.renderErrorPopup()}
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

SearchPage.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  fetchUserFromPhoneAction: PropTypes.func,
  isUserCreated: PropTypes.bool,
  isUserFailed: PropTypes.bool,
  setDefaultUserData: PropTypes.func,
  storeSearchPageData: PropTypes.func,
  users: PropTypes.array,
};

SearchPage.defaultProps = {
  config: {},
  constants: {},
  fetchUserFromPhoneAction: () => {
  },
  isUserCreated: false,
  isUserFailed: false,
  setDefaultUserData: () => {
  },
  storeSearchPageData: () => {
  },
  users: [],
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  isUserCreated: getIsUserCreated(state),
  isUserFailed: getIsUserFailed(state),
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUserFromPhoneAction: formData => dispatch(fetchUserFromPhoneAction(formData)),
  storeSearchPageData: formData => dispatch(storeSearchPageData(formData)),
  setDefaultUserData: () => dispatch(setDefaultUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
