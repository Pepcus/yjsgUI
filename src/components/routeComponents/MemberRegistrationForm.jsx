import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import validations from '../../utils/validation';
import { memberRegistration } from '../../config/memberRegistrationFormSchema.json';
import {
  formSubmitBtnText,
  goBackBtnText,
  USER_TYPES,
} from '../../constants/yjsg';
import {
  createStudentData,
  setStudentCredentials,
} from '../../actions/studentRegistrationActions';
import {
  ID_CARD_SUGGESTION_MESSAGE,
  ID_NOTE_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  YJSG_REGISTRATION_SUCCESS_MESSAGE,
} from '../../constants/messages';
import {
  getNewStudent,
  getUserType,
  isCreated,
} from '../../reducers/studentRegistrationReducer';
import Popup from '../common/Popup';
import {
  IS_THERE_TEXT,
  YOUR_ID_TEXT,
  YOUR_SECRET_CODE_TEXT,
} from '../../constants/text';
import LinkButton from '../common/LinkButton';
import Button from '../common/Button';

const JSONSchemaForm = Form;

/**
 * MemberRegistrationForm render member registration form.
 * @type {Class}
 */
class MemberRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      isSubmitTriggered: false,
      member: {},
      notHasAnError: false,
    };
  }

  /**
   * handleSubmit method submit registration form data if form data is valid
   * onClick of submit button.
   */
  handleSubmit = () => {
    const { notHasAnError, member } = this.state;
    if (notHasAnError) {
      this.props.createStudentData(member);
      this.setState({
        isSubmitTriggered: true,
        notHasAnError: false,
      });
    } else {
      this.setState({}, () => {
        this.scrollToError();
      });
    }
  };

  /**
   * scrollToError scroll page upto first form field which fielded by invalid data
   * onclick of submit button
   */
  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-danger');
    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };

  /**
   * transformErrors method transform required form filed error.
   * @param {Array} errors
   * @return {Array} errors
   */
  transformErrors = errors => errors.map((error) => {
    if (error.name === 'required') {
      error.message = THIS_INFORMATION_IS_COMPULSORY_MESSAGE;
    }
    if (error.name === 'format' && error.params.format === 'email') {
      error.message = INVALID_EMAIL_MESSAGE;
    }
    return error;
  });


  /**
   * renderBackButton method render back button conditionally into form
   * @return {*} back button
   */
  renderBackButton = () => {
    const {
      userType,
      context,
    } = this.props;
    const { STUDENT, ADMIN } = USER_TYPES;
    if (userType === STUDENT) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/"
        />
      );
    } else if (userType === ADMIN) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/admin"
        />
      );
    }
    return (
      <LinkButton
        buttonText={goBackBtnText}
        linkPath={context.previousLocation}
      />
    );
  };

  /**
   * renderSuccessMessage method render success message popup when form submitted successfully
   * @return {*} success message popup
   */
  renderSuccessMessage = () => {
    const { isSubmitTriggered } = this.state;
    if (this.props.isCreated && isSubmitTriggered) {
      const member = this.props.newStudent;
      // for pre-population on splash page
      this.props.setStudentCredentials(member.id, member.secretKey);
      return (
        <Popup>
          <p>{YJSG_REGISTRATION_SUCCESS_MESSAGE}</p>
          <p>{YOUR_ID_TEXT}<strong>{member.id}</strong>{IS_THERE_TEXT}</p>
          <p>{YOUR_SECRET_CODE_TEXT}<strong>{member.secretKey}</strong>{IS_THERE_TEXT}</p>
          <p>{ID_NOTE_MESSAGE}</p>
          <p>{ID_CARD_SUGGESTION_MESSAGE}</p>
          {this.renderBackButton()}
        </Popup>
      );
    }
    return null;
  };

  /**
   * onChange method handle on change of form fields
   * @param {Object} event
   */
  onChange = (event) => {
    this.setState({
      member: {
        ...this.state.member,
        ...event.formData,
      },
      notHasAnError: isEmpty(event.errors),
    });
  };

  /**
   * validate method check the validation for individual form fields
   * @param {Object} formData
   * @param {Object} errors
   * @return {Object} errors
   */
  validate = (formData, errors) => {
    memberRegistration.validation.forEach((valid) => {
      const error = validations[valid.validates](formData[valid.field]);
      if (!isEmpty(error)) {
        errors[valid.field].addError(error);
      }
    });
    return errors;
  };

  render() {
    return (
      <div ref={this.formRef}>
        <JSONSchemaForm
          showErrorList={false}
          noHtml5Validate
          validate={this.validate}
          liveValidate
          schema={memberRegistration.schema}
          uiSchema={memberRegistration.UISchema}
          formData={{
            ...memberRegistration.Data,
            ...this.state.member,
          }}
          onChange={this.onChange}
          transformErrors={this.transformErrors}
        >
          <div className="register-button-wrapper">
            {this.renderBackButton()}
            <Button
              buttonText={formSubmitBtnText}
              type="submit"
              formName=""
              value="Submit"
              onClick={this.handleSubmit}
            />
          </div>
        </JSONSchemaForm>
        {this.renderSuccessMessage()}
      </div>
    );
  }
}

MemberRegistrationForm.propTypes = {
  context: PropTypes.object,
  createStudentData: PropTypes.func,
  isCreated: PropTypes.bool,
  newStudent: PropTypes.object,
  setStudentCredentials: PropTypes.func,
  userType: PropTypes.string,
};

MemberRegistrationForm.defaultProps = {
  context: {},
  createStudentData: () => {},
  isCreated: false,
  newStudent: {},
  setStudentCredentials: () => {},
  userType: '',
};

const mapStateToProps = state => ({
  isCreated: isCreated(state),
  newStudent: getNewStudent(state),
  userType: getUserType(state),
});

export default connect(mapStateToProps, {
  createStudentData,
  setStudentCredentials,
})(MemberRegistrationForm);
