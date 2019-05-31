import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import validations from '../../utils/validation';
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
import { memberRegistration } from '../../config/memberRegistrationFormSchema.json';

const JSONSchemaForm = Form;

/**
 * MemberRegistrationForm render member registration form.
 * @type {Class}
 * @return {ReactComponent}
 */
class MemberRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      isSubmitTriggered: false,
      member: {},
      hasError: false,
    };
  }

  handleSubmit = () => {
    if (this.state.hasError) {
      this.props.createStudentData(this.state.member);
      this.setState({
        isSubmitTriggered: true,
        hasError: false,
      });
    } else {
      this.setState({}, () => {
        this.scrollToError();
      });
    }
  };

  scrollToError = () => {
    const errorNode = this.formRef.current.querySelector('.has-danger');
    if (errorNode) {
      window.scrollTo(0, errorNode.offsetTop);
    }
  };

  transformErrors = errors => errors.map((error) => {
    if (error.name === 'required') {
      error.message = THIS_INFORMATION_IS_COMPULSORY_MESSAGE;
    }
    if (error.name === 'format' && error.params.format === 'email') {
      error.message = INVALID_EMAIL_MESSAGE;
    }
    return error;
  });

  renderBackButton = () => {
    const {
      userType,
      context,
    } = this.props;
    if (userType === USER_TYPES.STUDENT) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/"
        />
      );
    } else if (userType === USER_TYPES.ADMIN) {
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

  renderSuccessMessage = () => {
    if (this.props.isCreated && this.state.isSubmitTriggered) {
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

  onChange = (event) => {
    this.setState({
      member: {
        ...this.state.member,
        ...event.formData,
      },
      hasError: isEmpty(event.errors),
    });
  };

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
      <div className="form-container">
        <div className="form-wrapper" ref={this.formRef}>
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
            <div>
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
      </div>
    );
  }
}

MemberRegistrationForm.propTypes = {
  createStudentData: PropTypes.func,
  userType: PropTypes.string,
  context: PropTypes.object,
  isCreated: PropTypes.bool,
  newStudent: PropTypes.object,
  setStudentCredentials: PropTypes.func,
};

MemberRegistrationForm.defaultProps = {
  createStudentData: () => {},
  userType: '',
  context: {},
  isCreated: false,
  newStudent: {},
  setStudentCredentials: () => {},
};

const mapStateToProps = state => ({
  newStudent: getNewStudent(state),
  isCreated: isCreated(state),
  userType: getUserType(state),
});

export default connect(mapStateToProps, {
  createStudentData,
  setStudentCredentials,
})(MemberRegistrationForm);
