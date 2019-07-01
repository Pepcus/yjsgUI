import {
  defaultAdmin,
  defaultStudent,
  indoreAdmin,
  indoreStudent,
  onlyOptIn,
} from '../config/memberRegistrationCorrectionFormSchema.json';
import {
  TENANT,
  USER_TYPES,
} from '../constants/yjsg';
import { isPageUserStudent } from './registrationFormUtils';

/**
 * getFormData method return the form data for json form schema
 * @param {String} pageUser
 * @param {Boolean} onlyOptInForm
 * @param {String} tenant
 * @param {Object} student
 * @param {Function} renderBackButton
 * @param {Function} renderSubmitButtons
 * @return {{schema: Object, uiSchema: Object , formData: Object}}
 */
export const getFormData = ({
  pageUser,
  onlyOptInForm,
  tenant,
  student,
  renderBackButton,
  renderSubmitButtons,
}) => {

  const { STUDENT_WITH_URL, STUDENT, ADMIN } = USER_TYPES;
  const { INDORE } = TENANT;
  let schema = {};
  let uiSchema = {};
  let formData = {};

  if (isPageUserStudent({ pageUser }) && onlyOptInForm) {
    schema = onlyOptIn.Schema;
    uiSchema = onlyOptIn.UISchema;
    formData = {
      ...onlyOptIn.Data,
      ...student,
    };

  } else if (tenant === INDORE) {
    if (pageUser === ADMIN) {
      schema = indoreAdmin.Schema;
      uiSchema = {
        ...indoreAdmin.UISchema,
        backButton: {
          ...indoreAdmin.UISchema.backButton,
          'ui:widget': () => (
            renderBackButton()
          ),
        },
        submitButton: {
          ...indoreAdmin.UISchema.submitButton,
          'ui:widget': () => (
            renderSubmitButtons()
          ),
        },
      };
      formData = {
        ...indoreAdmin.Data,
        ...student,
      };

    } else if (pageUser === STUDENT || pageUser === STUDENT_WITH_URL) {
      schema = indoreStudent.Schema;
      uiSchema = {
        ...indoreStudent.UISchema,
        backButton: {
          ...indoreStudent.UISchema.backButton,
          'ui:widget': () => (
            renderBackButton()
          ),
        },
        submitButton: {
          ...indoreStudent.UISchema.submitButton,
          'ui:widget': () => (
            renderSubmitButtons()
          ),
        },
      };
      formData = {
        ...indoreStudent.Data,
        ...student,
      };
    }

  } else if (pageUser === ADMIN) {
    schema = defaultAdmin.Schema;
    uiSchema = {
      ...defaultAdmin.UISchema,
      backButton: {
        ...defaultAdmin.UISchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...defaultAdmin.UISchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    formData = {
      ...defaultAdmin.Data,
      ...student,
    };

  } else if (pageUser === STUDENT || pageUser === STUDENT_WITH_URL) {
    schema = defaultStudent.Schema;
    uiSchema = {
      ...defaultStudent.UISchema,
      backButton: {
        ...defaultStudent.UISchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...defaultStudent.UISchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    formData = {
      ...defaultStudent.Data,
      ...student,
    };

  } else return null;

  return { schema, uiSchema, formData };
};
