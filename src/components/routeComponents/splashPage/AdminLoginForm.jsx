/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'ravenjs/lib/Button';
import Col from 'ravenjs/lib/Col';
import Form from 'ravenjs/lib/Form';
import Row from 'ravenjs/lib/Row';

import {
  goBackBtnText,
  formSubmitBtnText,
} from 'constants/yjsg';
import {
  schema,
  uiSchema,
} from './adminLoginFormSchema.json';

const ButtonStyled = styled(Button)`
 ${({ theme }) => theme.media.down('sm')`
     width: 100%
     margin: 10px 10px; 
 `}
 @media (max-width: 992px) and (orientation: landscape) {
     width: 100%;
 }
`;

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
          />
          {handleAdminScreenRedirection()}
          <Row justify="center" margin="0 0 25px 0">
            <ButtonStyled
              width="185px"
              margin="10px 15px"
              onClick={handleDisableAdminLoginButtons}
            >
              {goBackBtnText}
            </ButtonStyled>
            <ButtonStyled
              width="185px"
              margin="10px 15px"
              onClick={setAdminLogin}
            >
              {formSubmitBtnText}
            </ButtonStyled>
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
