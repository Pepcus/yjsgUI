/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';

import { alreadyRegisteredBtnText } from 'constants/yjsg';

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('sm')`
       width: 100%;
   `}
   @media (max-width: 992px) and (orientation: landscape) {
        width: 60%
    }
`;

const AlreadyRegisteredButton = ({
  isAlreadyRegisteredButtonEnabled,
  redirectToStudentLogin,
}) => {
  if (isAlreadyRegisteredButtonEnabled) {
    return (
      <ButtonStyled margin="10px" onClick={redirectToStudentLogin}>
        {alreadyRegisteredBtnText}
      </ButtonStyled>
    );
  } return null;
};

AlreadyRegisteredButton.propTypes = {
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  redirectToStudentLogin: PropTypes.func,
};

AlreadyRegisteredButton.defaultProps = {
  isAlreadyRegisteredButtonEnabled: false,
  redirectToStudentLogin: () => {},
};

export default AlreadyRegisteredButton;
