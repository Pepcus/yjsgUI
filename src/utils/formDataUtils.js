import {
  TENANT,
  USER_TYPES,
} from 'constants/yjsg';
import { isUserMember } from './registrationFormUtils';

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
  const { INDORE } = TENANT;
  let schema = {};
  let uiSchema = {};
  let formData = {};
  if (isUserMember({ user }) && onlyOptInForm) {
    schema = formConfig.schema;
    uiSchema = formConfig.uiSchema;
    formData = {
      ...formConfig.data,
      ...member,
    };

  } else if (tenant === INDORE) {
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

  } else return null;
  return { schema, uiSchema, formData };
};
