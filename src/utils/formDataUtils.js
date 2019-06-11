import {
  defaultAdmin,
  defaultStudent,
  indoreAdmin,
  indoreStudent,
  onlyOptIn,
} from '../config/memberRegisrationCurrectionFormShema.json';
import {
  TENANT,
  USER_TYPES,
} from '../constants/yjsg';

export const getFormData = ({
  pageUser,
  onlyOptInForm,
  tenant,
  student,
  renderBackButton,
  renderSubmitButtons,
}) => {
  let schema = {};
  let uiSchema = {};
  let formData = {};
  if ((pageUser === USER_TYPES.STUDENT_WITH_URL || pageUser === USER_TYPES.STUDENT) && onlyOptInForm) {
    schema = onlyOptIn.Schema;
    uiSchema = onlyOptIn.UISchema;
    formData = {
      ...onlyOptIn.Data,
      ...student,
    };
  } else if (tenant === TENANT.INDORE) {
    if (pageUser === USER_TYPES.ADMIN) {
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
    } else if (pageUser === USER_TYPES.STUDENT || pageUser === USER_TYPES.STUDENT_WITH_URL) {
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
  } else if (pageUser === USER_TYPES.ADMIN) {
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
  } else if (pageUser === USER_TYPES.STUDENT || pageUser === USER_TYPES.STUDENT_WITH_URL) {
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
