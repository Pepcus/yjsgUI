import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Switch } from 'react-router-dom';

import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import Form from 'pepcus-core/lib/Form';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import { getConstants } from 'reducers/constants';

/**
 * @param {Object} config
 * @param {Object} constants
 * @param {Object} admin
 * @param {Boolean} adminCredentialErrorMessage
 * @param {String} redirectToRoute
 * @param {String} id
 * @param {String} password
 * @param {Boolean} isAdminLogin
 * @param {Function} setRedirectToRoute,
 * @param {Function} handleDisableAdminLoginButtons
 * @param {Boolean} isAdmin
 * @param {Function} onChange
 * @param {Function} setAdminLogin
 * @param {Function} transformErrors
 * @return {HTML}
 */
const AdminLoginForm = ({
  config,
  constants,
  admin,
  adminCredentialErrorMessage,
  redirectToRoute,
  id,
  password,
  isAdminLogin,
  setRedirectToRoute,
  handleDisableAdminLoginButtons,
  isAdmin,
  onChange,
  setAdminLogin,
  transformErrors,
}) => {
  const {
    BACK,
    SUBMIT,
    GIVEN_INFORMATION_WRONG_MESSAGE,
  } = constants;
  const { adminLoginFormSchema } = config;
  const { schema, uiSchema } = adminLoginFormSchema;

  /**
   * Method redirect to admin page on some condition.
   * @return {HTML}
   */
  const handleAdminScreenRedirection = () => {
    // IF admin initial login.
    if (!isAdminLogin) {
      // Verify admin credential
      if (adminCredentialErrorMessage) {
        if (!isEmpty(id) || !isEmpty(password)) {
          // If admin credential is not valid it gives the error message.
          return (
            <Row
              justify="center"
              width="100%"
              margin="0 0 18px 0"
            >
              <Typography
                type="title"
                fontSize="14px"
                align="center"
                color="error"
              >
                {GIVEN_INFORMATION_WRONG_MESSAGE}
              </Typography>
            </Row>
          );
        }
        // if admin credential is valid then it set admin login true in redux store
        // and redirect to "/member-search" route
        if (redirectToRoute) {
          setRedirectToRoute('');
          return <Switch><Redirect to={redirectToRoute} /></Switch>;
        }
      }
      return null;
    }
    if (redirectToRoute) {
      setRedirectToRoute('');
      return <Switch><Redirect to={redirectToRoute} /></Switch>;
    }
    // if admin is already login then it redirect to "/member-search"
    // without any credential.
    return <Switch><Redirect to="/member-search" /></Switch>;
  };

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
  config: PropTypes.object,
  constants: PropTypes.object,
  admin: PropTypes.object,
  handleDisableAdminLoginButtons: PropTypes.func,
  isAdmin: PropTypes.bool,
  onChange: PropTypes.func,
  setAdminLogin: PropTypes.func,
  transformErrors: PropTypes.func,
  adminCredentialErrorMessage: PropTypes.bool,
  redirectToRoute: PropTypes.string,
  id: PropTypes.string,
  password: PropTypes.string,
  isAdminLogin: PropTypes.bool,
  setRedirectToRoute: PropTypes.func,
};

AdminLoginForm.defaultProps = {
  config: {},
  constants: {},
  admin: {},
  handleDisableAdminLoginButtons: () => {},
  isAdmin: false,
  onChange: () => {},
  setAdminLogin: () => {},
  transformErrors: () => {},
  adminCredentialErrorMessage: false,
  redirectToRoute: '',
  id: '',
  password: '',
  isAdminLogin: false,
  setRedirectToRoute: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, {})(AdminLoginForm);
