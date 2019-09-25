/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import Form from 'pepcus-core/lib/Form';
import Row from 'pepcus-core/lib/Row';

import {
  goBackBtnText,
  formSubmitBtnText,
} from 'constants/yjsg';
import {
  schema,
  uiSchema,
} from './adminLoginFormSchema.json';

/**
 * @param {Object} admin
 * @param {Function} handleAdminScreenRedirection
 * @param {Function} handleDisableAdminLoginButtons
 * @param {Boolean} isAdmin
 * @param {Function} onChange
 * @param {Function} setAdminLogin
 * @param {Function} transformErrors
 * @return {HTML}
 * @constructor
 */
const AdminLoginForm = ({
  admin,
  handleAdminScreenRedirection,
  handleDisableAdminLoginButtons,
  isAdmin,
  onChange,
  setAdminLogin,
  transformErrors,
}) => {
  if (isAdmin) {
    return (
      <Col>
        <Row justify="center">
          <Form
            externalSubmission
            formData={admin}
            liveValidate
            onChange={onChange}
            showErrorList={false}
            schema={schema}
            transformErrors={transformErrors}
            uiSchema={uiSchema}
            onSubmit={setAdminLogin}
          />
          {handleAdminScreenRedirection()}
          <Row width="100%" justify="center" margin="0 0 25px 0">
            <Col size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding="10px 20px 10px 20px">
              <Button
                width="100%"
                onClick={handleDisableAdminLoginButtons}
              >
                {goBackBtnText}
              </Button>
            </Col>
            <Col size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding="10px 20px 10px 20px">
              <Button
                width="100%"
                onClick={setAdminLogin}
              >
                {formSubmitBtnText}
              </Button>
            </Col>
          </Row>
        </Row>
      </Col>
    );
  }
  return null;
};

AdminLoginForm.propTypes = {
  admin: PropTypes.object,
  handleAdminScreenRedirection: PropTypes.func,
  handleDisableAdminLoginButtons: PropTypes.func,
  isAdmin: PropTypes.bool,
  onChange: PropTypes.func,
  setAdminLogin: PropTypes.func,
  transformErrors: PropTypes.func,
};

AdminLoginForm.defaultProps = {
  admin: {},
  handleAdminScreenRedirection: () => {},
  handleDisableAdminLoginButtons: () => {},
  isAdmin: false,
  onChange: () => {},
  setAdminLogin: () => {},
  transformErrors: () => {},
};
export default AdminLoginForm;
