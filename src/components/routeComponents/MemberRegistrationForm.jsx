import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {
  formSubmitBtnText,
  goBackBtnText,
  USER_TYPES,
} from '../../constants/yjsg';
import {
  createStudentDataAction,
  setStudentCredentialsAction,
} from '../../actions/studentRegistrationActions';
import {
  ID_CARD_SUGGESTION_MESSAGE,
  ID_NOTE_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
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
import Form from '../form';
import { fetchJsonSchemaFile } from '../../sagas/assetFilesAPI';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';


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
      fileData: {},
    };
  }

  componentWillMount() {
    const { tenant } = this.props;
    this.props.setLoadingStateAction(true);
    try {
      fetchJsonSchemaFile({ tenant, file: 'Registration' })
        .then((response) => {
          if (response) {
            this.setState({
              fileData: response,
            });

          } else {
            this.props.setLoadingStateAction(false);
          }
        }, () => {
          this.props.setLoadingStateAction(false);
        });
    } catch (e) {
      this.props.setLoadingStateAction(false);
      console.error(e);
    }
  }

  /**
   * handleSubmit method submit registration form data if form data is valid
   * onClick of submit button.
   */
  handleSubmit = () => {

    const { notHasAnError, member } = this.state;

    if (notHasAnError) {
      this.props.createStudentDataAction(member);
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
   * @return {Array} errors
   */
  transformErrors = () => ({
    'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  });

  /**
   * renderBackButton method render back button conditionally into form
   * @return {HTML} back button
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
   * @return {HTML} success message popup
   */
  renderSuccessMessage = () => {

    const { isSubmitTriggered } = this.state;
    const { isStudentCreated, newStudent } = this.props;

    if (isStudentCreated && isSubmitTriggered) {
      // for pre-population on splash page
      this.props.setStudentCredentialsAction(newStudent.id, newStudent.secretKey);

      return (
        <Popup>
          <p>{REGISTRATION_SUCCESS_MESSAGE}</p>
          <p>{YOUR_ID_TEXT}<strong>{newStudent.id}</strong>{IS_THERE_TEXT}</p>
          <p>{YOUR_SECRET_CODE_TEXT}<strong>{newStudent.secretKey}</strong>{IS_THERE_TEXT}</p>
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
   //* @param {Object} formData
   //* @param {Object} errors
   * @return {Object} errors
   */
  validate = () => this.state.fileData.validation;

  render() {
    const { fileData } = this.state;
    const { schema, UISchema, Data } = fileData;

    if (!isEmpty(fileData)) {
      return (
        <div ref={this.formRef} className="member-registration-form">
          <Form
            showErrorList={false}
            validate={this.validate}
            liveValidate
            schema={schema}
            uiSchema={UISchema}
            formData={{ ...Data, ...this.state.member }}
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
          </Form>
          {this.renderSuccessMessage()}
        </div>
      );
    }
    return null;
  }
}

MemberRegistrationForm.propTypes = {
  context: PropTypes.object,
  createStudentDataAction: PropTypes.func,
  isStudentCreated: PropTypes.bool,
  newStudent: PropTypes.object,
  setLoadingStateAction: PropTypes.string,
  setStudentCredentialsAction: PropTypes.func,
  tenant: PropTypes.string,
  userType: PropTypes.string,
};

MemberRegistrationForm.defaultProps = {
  context: {},
  createStudentDataAction: () => {},
  isStudentCreated: false,
  newStudent: {},
  setLoadingStateAction: () => {},
  setStudentCredentialsAction: () => {},
  tenant: '',
  userType: '',
};

const mapStateToProps = state => ({
  isStudentCreated: isCreated(state),
  newStudent: getNewStudent(state),
  tenant: getApplicationTenant(state),
  userType: getUserType(state),
});

export default connect(mapStateToProps, {
  createStudentDataAction,
  setStudentCredentialsAction,
})(MemberRegistrationForm);
