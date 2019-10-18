import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import Form from 'pepcus-core/lib/Form';
import Row from 'pepcus-core/lib/Row';

import { getAppConstantsConfig } from 'reducers/constants';

import {
  schema,
  uiSchema,
} from './adminLoginFormSchema.json';

/**
 * @param {Object} appConstants
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
  appConstants,
  admin,
  handleAdminScreenRedirection,
  handleDisableAdminLoginButtons,
  isAdmin,
  onChange,
  setAdminLogin,
  transformErrors,
}) => {
  const {
    BACK,
    SUBMIT,
  } = appConstants;

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
                {BACK}
              </Button>
            </Col>
            <Col size={{ xs: 12, sm: 12, md: 5, lg: 5 }} padding="10px 20px 10px 20px">
              <Button
                width="100%"
                onClick={setAdminLogin}
              >
                {SUBMIT}
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
  appConstants: PropTypes.object,
  admin: PropTypes.object,
  handleAdminScreenRedirection: PropTypes.func,
  handleDisableAdminLoginButtons: PropTypes.func,
  isAdmin: PropTypes.bool,
  onChange: PropTypes.func,
  setAdminLogin: PropTypes.func,
  transformErrors: PropTypes.func,
};

AdminLoginForm.defaultProps = {
  appConstants: {},
  admin: {},
  handleAdminScreenRedirection: () => {},
  handleDisableAdminLoginButtons: () => {},
  isAdmin: false,
  onChange: () => {},
  setAdminLogin: () => {},
  transformErrors: () => {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, {})(AdminLoginForm);
