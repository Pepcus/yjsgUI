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
 * @param {Object} fileData
 * @return {{schema: Object, uiSchema: Object , formData: Object}}
 */
export const getFormData = ({
  pageUser,
  onlyOptInForm,
  tenant,
  student,
  renderBackButton,
  renderSubmitButtons,
  fileData,
}) => {
  const { ADMIN } = USER_TYPES;
  const { INDORE } = TENANT;
  let schema = {};
  let uiSchema = {};
  let formData = {};

  if (isPageUserStudent({ pageUser }) && onlyOptInForm) {
    schema = fileData.Schema;
    uiSchema = fileData.UISchema;
    formData = {
      ...fileData.Data,
      ...student,
    };

  } else if (tenant === INDORE) {
    if (pageUser === ADMIN) {
      schema = fileData.Schema;
      uiSchema = {
        ...fileData.UISchema,
        backButton: {
          ...fileData.UISchema.backButton,
          'ui:widget': () => (
            renderBackButton()
          ),
        },
        submitButton: {
          ...fileData.UISchema.submitButton,
          'ui:widget': () => (
            renderSubmitButtons()
          ),
        },
      };
      formData = {
        ...fileData.Data,
        ...student,
      };

    } else if (isPageUserStudent({ pageUser })) {
      schema = fileData.Schema;
      uiSchema = {
        ...fileData.UISchema,
        backButton: {
          ...fileData.UISchema.backButton,
          'ui:widget': () => (
            renderBackButton()
          ),
        },
        submitButton: {
          ...fileData.UISchema.submitButton,
          'ui:widget': () => (
            renderSubmitButtons()
          ),
        },
      };
      formData = {
        ...fileData.Data,
        ...student,
      };
    }

  } else if (pageUser === ADMIN) {
    schema = fileData.Schema;
    uiSchema = {
      ...fileData.UISchema,
      backButton: {
        ...fileData.UISchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...fileData.UISchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    formData = {
      ...fileData.Data,
      ...student,
    };

  } else if (isPageUserStudent({ pageUser })) {
    schema = fileData.Schema;
    uiSchema = {
      ...fileData.UISchema,
      backButton: {
        ...fileData.UISchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...fileData.UISchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    formData = {
      ...fileData.Data,
      ...student,
    };

  } else return null;

  return { schema, uiSchema, formData };
};
