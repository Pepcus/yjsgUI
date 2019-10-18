import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Container from 'pepcus-core/lib/Container';
import Form from 'pepcus-core/lib/Form';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import { parentsRegistrationAction } from 'actions/parentsRegistrationAction';
import fields from 'components/common/fields';
import { getTransformedErrors, verifyFormDataValidations } from 'utils/form';
import { getAppConstantsConfig } from 'reducers/constants';

import { schema, uiSchema, validation } from './formSchema.json';
import CloseBrowserPopup from './CloseBrowserPopup';
import RegistrationSuccessPopup from './RegistrationSuccessPopup';
import EventDescription from './EventDescription';
import CustomFooter from './CustomFooter';

const ContainerStyled = styled(Container)`
    height: max-content;
    display: flex;
    ${({ theme }) => theme.media.down('lg')`
        height: 100%; 
    `} 
    ${({ theme }) => theme.media.down('md')`
        height: 100%; 
    `}
    @media (max-width: 992px) and (orientation: landscape) {
        height: auto;
        padding: 50px;
    }
`;

const BoxStyled = styled(Box)`
     align-items: center;
     overflow-x: hidden;
     overflow-y: auto;
     background-color: ${getThemeProps('palette.policyMuted.color')};
     ${({ theme }) => theme.media.down('lg')`
         margin: 58px auto 0 auto
         height: fit-content;
     `}
     ${({ theme }) => theme.media.down('md')`
         margin: auto; 
         height: 100%;
     `}
     ${({ theme }) => theme.media.down('md')`
        height: 100%; 
        margin: auto;
        overflow-y: hidden;
    `}
    @media (max-width: 992px) and (orientation: landscape) {
        overflow-y: auto;
        margin: 0px auto 0 auto
    }
`;

const HeadingStyled = styled(Typography)`
     color: ${getThemeProps('colors.header')}
`;

const SubmitButtonStyled = styled(Button)`
    ${({ theme }) => theme.media.down('md')`
        width: 100%;
        margin: 0;
    `}
`;

const CustomFooterWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    margin: 0;
    ${({ theme }) => theme.media.down('xl')`
        padding: 0;
        margin: 0;
        min-height: 100%;
        height: 100%;
        background-color: ${getThemeProps('palette.advancedSearch.color')};
    `}
    ${({ theme }) => theme.media.down('md')` 
        display: block;
        padding: 0;
        margin: 0;
    `}
`;

/**
 * ParentsRegistration component render parents registration form.
 * @type {Class}
 */
class ParentsRegistration extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = {
      isSubmitTriggered: false,
      isCloseBrowserPopMessage: false,
      formData: {},
      hasError: true,
    };

  }
  componentDidMount() {
    this.setState({
      isSubmitTriggered: false,
      isCloseBrowserPopMessage: false,
    });
  }

  /**
   * Method call on onClick on close button in popup
   * And set all values of state initial.
   */
  closePopUp = () => {
    this.setState({
      isSubmitTriggered: true,
      isCloseBrowserPopMessage: true,
      formData: {},
    });
  };

  /**
   * It scroll the to first error field in the form only in mobile view
   */
  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-danger');

    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };

  /**
   * It validate the form field
   * @param {Object} formData
   * @param {Object} errors
   * @return {Object}
   */
  validate = (formData, errors) => verifyFormDataValidations({ formData, errors, validate: validation });

  /**
   * It is the onChange of form
   * @param {Object} event
   */
  onChange = (event) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        ...event.formData,
      },
      hasError: !isEmpty(event.errors),
    });
  };

  /**
   * It transform the error
   * @param {Array} errors
   * @return {Array}
   */
  transformErrors = (errors) => {
    const { appConstants } = this.props;
    const { THIS_INFORMATION_IS_COMPULSORY_MESSAGE } = appConstants;

    const transformErrors = {
      'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
      'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    };
    return getTransformedErrors({ errors, transformErrors });
  };

  /**
   * It handle the form submission
   */
  handleSubmit = () => {
    const { hasError, formData } = this.state;
    const { parentsRegistration } = this.props;

    if (hasError) {
      this.setState({}, () => {
        this.scrollToError();
      });
    } else {
      const name = String(formData.name);
      const members = Number(formData.selectedCountOfMembers);
      const { phoneNumber } = formData;
      parentsRegistration({ name, members, phoneNumber });
      this.setState({
        isSubmitTriggered: true,
        hasError: false,
      });
    }
  };

  render() {
    const { formData, isCloseBrowserPopMessage, isSubmitTriggered } = this.state;
    const { appConstants } = this.props;
    const {
      EVENT_TITLE,
      SUBMIT,
    } = appConstants;

    if (!isSubmitTriggered && !isCloseBrowserPopMessage) {
      return (
        <ContainerStyled width="100%" ref={this.formRef}>
          <BoxStyled
            maxWidth="485px"
            maxHeight="100%"
            borderStyle="none"
            elevation={5}
            padding="25px 20px 10px 20px"
            margin="90px auto 75px auto"
          >
            <Row display="block" margin="0 0 15px 0">
              <HeadingStyled
                lineHeight="24px"
                align="center"
                fontWeight="600"
                fontSize="18px"
                padding="0 10px"
              >
                {EVENT_TITLE}
              </HeadingStyled>
            </Row>
            <Form
              enableDirtyCheck
              externalSubmission
              fields={fields}
              showErrorList={false}
              validate={this.validate}
              liveValidate
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
              onSubmit={this.handleSubmit}
            />
            <Row display="block" justify="center" margin="0 0 25px 0">
              <SubmitButtonStyled
                color="primary"
                margin="10px 25px"
                onClick={this.handleSubmit}
              >
                {SUBMIT}
              </SubmitButtonStyled>
            </Row>
            <EventDescription />
          </BoxStyled>
        </ContainerStyled>
      );
    }
    return (
      <CustomFooterWrapper>
        <RegistrationSuccessPopup
          isCloseBrowserPopMessage={isCloseBrowserPopMessage}
          isSubmitTriggered={isSubmitTriggered}
          closePopUp={this.closePopUp}
        />
        <CloseBrowserPopup
          isCloseBrowserPopMessage={isCloseBrowserPopMessage}
        />
        <CustomFooter />
      </CustomFooterWrapper>
    );
  }
}
ParentsRegistration.propTypes = {
  appConstants: PropTypes.object,
  parentsRegistration: PropTypes.func,
};

ParentsRegistration.defaultProps = {
  appConstants: {},
  parentsRegistration: () => {},
};
const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

const mapDispatchToProps = dispatch => ({
  parentsRegistration: ({ name, members, phoneNumber }) =>
    dispatch(parentsRegistrationAction({ name, members, phoneNumber })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentsRegistration);
