import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {
  ADDRESS_LABEL,
  AGE_LABEL, BUS_STOP_LABEL, EDUCATION_LABEL, EMAIL_LABEL,
  FATHER_OR_HUSBAND_NAME_LABEL,
  GENDER_LABEL,
  MOBILE_NUMBER_LABEL, MOTHER_MOBILE_NUMBER_LABEL,
  NAME_LABEL, OCCUPATION_LABEL, PREVIOUS_YEAR_LEVEL_LABEL, WHAT_YOU_WANT_TO_STUDY_LABEL,
} from '../../constants/label';
import { busStops, formSubmitBtnText, gender, goBackBtnText, studiesArray, USER_TYPES } from '../../constants/yjsg';
import { createStudentData, setStudentCredentials } from '../../actions/studentRegistrationActions';
import { validates } from '../../utils/SampleFormValidation';
import {
  ID_CARD_SUGGESTION_MESSAGE,
  ID_NOTE_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  YJSG_REGISTRATION_SUCCESS_MESSAGE,
} from '../../constants/messages';
import { getNewStudent, getUserType, isCreated } from '../../reducers/studentRegistrationReducer';
import Popup from '../common/Popup';
import { IS_THERE_TEXT, PLEASE_SELECT_ANY_ONE_TEXT, YOUR_ID_TEXT, YOUR_SECRET_CODE_TEXT } from '../../constants/text';
import LinkButton from '../common/LinkButton';
import Button from '../common/Button';

const schema = {
  type: 'object',
  required: [
    'name',
    'fatherName',
    'gender',
    'age',
    'mobile',
    'busStop',
    'address',
    'classAttended2019',
  ],
  dependencies: {
    gender: {
      oneOf: [
        {
          properties: {
            gender: {
              enum: [
                'Female',
              ],
            },
            ID1: {
              type: 'number',
            },
          },
          required: ['ID1'],
        },
        {
          properties: {
            gender: {
              enum: [
                'Male',
              ],
            },
            'ID2': {
              type: 'number',
            },
          },
        },
      ],
    },
  },
  properties: {
    name: {
      title: NAME_LABEL,
      type: 'string',
    },
    fatherName: {
      title: FATHER_OR_HUSBAND_NAME_LABEL,
      type: 'string',
    },
    gender: {
      title: GENDER_LABEL,
      type: 'string',
      enum: gender.map(option => (option.value)),
      enumNames: gender.map(option => (option.text)),
    },
    age: {
      title: AGE_LABEL,
      type: 'integer',
    },
    mobile: {
      title: MOBILE_NUMBER_LABEL,
      type: 'integer',
    },
    motherMobile: {
      title: MOTHER_MOBILE_NUMBER_LABEL,
      type: 'integer',
    },
    occupation: {
      title: OCCUPATION_LABEL,
      type: 'string',
    },
    education: {
      title: EDUCATION_LABEL,
      type: 'string',
    },
    email: {
      title: EMAIL_LABEL,
      type: 'string',
      format: 'email',
    },
    address: {
      title: ADDRESS_LABEL,
      type: 'string',
    },
    busStop: {
      title: BUS_STOP_LABEL,
      type: 'string',
      enum: busStops.map(busStop => (busStop.value)),
      enumNames: busStops.map(busStop => (busStop.text)),
    },
    classAttended2019: {
      title: WHAT_YOU_WANT_TO_STUDY_LABEL,
      type: 'string',
      enum: studiesArray.map(level => (level.value)),
      enumNames: studiesArray.map(level => (level.text)),
    },
    classAttended2018: {
      title: PREVIOUS_YEAR_LEVEL_LABEL,
      type: 'string',
    },
  },
};

const UISchema = {
  address: {
    'ui:widget': 'textarea',
  },
  busStop: {
    'ui:placeholder': PLEASE_SELECT_ANY_ONE_TEXT,
  },
  age: {
    'ui:widget': 'updown',
  },
  gender: {
    'ui:placeholder': PLEASE_SELECT_ANY_ONE_TEXT,
  },
  classAttended2019: {
    'ui:placeholder': PLEASE_SELECT_ANY_ONE_TEXT,
  },
};
const Data = {
  optIn2019: 'Y',
  classAttended2018: '',
  education: '',
  occupation: '',
};

class MemberRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      isSubmitTriggered: false,
      student: {},
      hasError: false,
    };
  }
  handleSubmit = () => {
    if (this.state.hasError) {
      this.props.createStudentData(this.state.student);
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
  renderBackButton() {
    if (this.props.userType === USER_TYPES.STUDENT) {
      return (
        <LinkButton
          buttonText={goBackBtnText}
          linkPath="/"
        />
      );
    } else if (this.props.userType === USER_TYPES.ADMIN) {
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
        linkPath={this.props.context.previousLocation}
      />
    );
  }
  renderSuccessMessage = () => {
    if (this.props.isCreated && this.state.isSubmitTriggered) {
      const student = this.props.newStudent;

      // for pre-population on splash page
      this.props.setStudentCredentials(student.id, student.secretKey);

      return (
        <Popup>
          <p>{YJSG_REGISTRATION_SUCCESS_MESSAGE}</p>
          <p>{YOUR_ID_TEXT}<strong>{student.id}</strong>{IS_THERE_TEXT}</p>
          <p>{YOUR_SECRET_CODE_TEXT}<strong>{student.secretKey}</strong>{IS_THERE_TEXT}</p>
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
      student: {
        ...this.state.student,
        ...event.formData,
      },
      hasError: isEmpty(event.errors),
    });
  };
  render() {
    return (
      <div className="form-container">
        <div className="form-wrapper" ref={this.formRef}>
          <Form
            showErrorList={false}
            noHtml5Validate
            validate={validates}
            liveValidate
            schema={schema}
            uiSchema={UISchema}
            formData={{ ...Data, ...this.state.student }}
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
          </Form>
          {this.renderSuccessMessage()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newStudent: getNewStudent(state),
  isCreated: isCreated(state),
  userType: getUserType(state),

});
export default connect(mapStateToProps, {
  createStudentData,
  setStudentCredentials,
})(MemberRegistrationForm);
