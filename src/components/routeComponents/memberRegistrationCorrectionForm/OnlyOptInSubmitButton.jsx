/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'ravenjs/lib/Button';
import Row from 'ravenjs/lib/Row';

import { isUserMember } from 'utils/registrationFormUtils';
import { formSubmitBtnText } from 'constants/yjsg';

const SubmitButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('sm')`
       width: 100%;
   `}
`;

/**
 * OnlyOptInSubmitButton render back button conditionally
 * @param {Boolean} onlyOptInForm
 * @param {Function} submitMemberDataForOnlyOptInCase
 * @param {String} user
 * @return {HTML} back button
 * @constructor
 */
const OnlyOptInSubmitButton = ({
  onlyOptInForm,
  submitMemberDataForOnlyOptInCase,
  user,
}) => {
  if (isUserMember({ user }) && onlyOptInForm) {
    return (
      <Row margin="0 50px">
        <SubmitButtonStyled
          onClick={submitMemberDataForOnlyOptInCase}
        >
          {formSubmitBtnText}
        </SubmitButtonStyled>
      </Row>
    );
  } return null;
};

OnlyOptInSubmitButton.propTypes = {
  onlyOptInForm: PropTypes.bool,
  submitMemberDataForOnlyOptInCase: PropTypes.func,
  user: PropTypes.string,
};

OnlyOptInSubmitButton.defaultProps = {
  onlyOptInForm: false,
  submitMemberDataForOnlyOptInCase: () => {},
  user: '',
};

export default OnlyOptInSubmitButton;
