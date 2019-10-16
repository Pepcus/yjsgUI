import {
  TENANT,
  USER_TYPES,
} from 'constants/yjsg';
import { isUserMember } from './registrationFormUtils';
// TODO: remove tenant check condition
/**
 * getFormData method return the form data for json form schema
 * @param {String} user
 * @param {Boolean} onlyOptInForm
 * @param {String} tenant
 * @param {Object} member
 * @param {Function} renderBackButton
 * @param {Function} renderSubmitButtons
 * @param {Object} formDetail
 * @return {{schema: Object, uiSchema: Object , formData: Object}}
 */
export const getFormData = ({
  user,
  onlyOptInForm,
  tenant,
  member,
  renderBackButton,
  renderSubmitButtons,
  formConfig,
}) => {
  const { ADMIN } = USER_TYPES;
  const { INDORE, DEFAULT } = TENANT;
  let schema = {};
  let uiSchema = {};
  let formData = {};
  let validation = [];
  let defaultStudentDataFormat = [];
  if (isUserMember({ user }) && onlyOptInForm) {
    schema = formConfig.schema;
    uiSchema = formConfig.uiSchema;
    formData = {
      ...formConfig.data,
      ...member,
    };
    validation = formConfig.validation;
    defaultStudentDataFormat = formConfig.defaultStudentDataFormat;

  } else if (tenant === INDORE || tenant === DEFAULT || !tenant) {
    if (user === ADMIN) {
      schema = formConfig.schema;
      uiSchema = {
        ...formConfig.uiSchema,
        backButton: {
          ...formConfig.uiSchema.backButton,
          'ui:widget': () => (
            renderBackButton()
          ),
        },
        submitButton: {
          ...formConfig.uiSchema.submitButton,
          'ui:widget': () => (
            renderSubmitButtons()
          ),
        },
      };
      formData = {
        ...formConfig.data,
        ...member,
      };
      validation = formConfig.validation;
      defaultStudentDataFormat = formConfig.defaultStudentDataFormat;
    } else if (isUserMember({ user })) {
      schema = formConfig.schema;
      uiSchema = {
        ...formConfig.uiSchema,
        backButton: {
          ...formConfig.uiSchema.backButton,
          'ui:widget': () => (
            renderBackButton()
          ),
        },
        submitButton: {
          ...formConfig.uiSchema.submitButton,
          'ui:widget': () => (
            renderSubmitButtons()
          ),
        },
      };
      formData = {
        ...formConfig.data,
        ...member,
      };
      validation = formConfig.validation;
      defaultStudentDataFormat = formConfig.defaultStudentDataFormat;
    }

  } else if (user === ADMIN) {
    schema = formConfig.schema;
    uiSchema = {
      ...formConfig.uiSchema,
      backButton: {
        ...formConfig.uiSchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...formConfig.uiSchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    formData = {
      ...formConfig.data,
      ...member,
    };
    validation = formConfig.validation;
    defaultStudentDataFormat = formConfig.defaultStudentDataFormat;

  } else if (isUserMember({ user })) {
    schema = formConfig.schema;
    uiSchema = {
      ...formConfig.uiSchema,
      backButton: {
        ...formConfig.uiSchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...formConfig.uiSchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    formData = {
      ...formConfig.data,
      ...member,
    };
    validation = formConfig.validation;
    defaultStudentDataFormat = formConfig.defaultStudentDataFormat;
  } else return null;
  return { schema, uiSchema, formData, validation, defaultStudentDataFormat };
};
