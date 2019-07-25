/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'ravenjs';

import { alreadyRegisteredBtnText } from '../../../constants/yjsg';

const AlreadyRegisteredButton = ({
  isAlreadyRegisteredButtonEnabled,
  theme,
  redirectToStudentLogin,
}) => {
  if (isAlreadyRegisteredButtonEnabled) {
    return (
      <Button
        margin="10px"
        color="primary"
        theme={theme}
        onClick={redirectToStudentLogin}
      >
        {alreadyRegisteredBtnText}
      </Button>
    );
  } return null;
};

AlreadyRegisteredButton.propTypes = {
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  theme: PropTypes.object,
  redirectToStudentLogin: PropTypes.func,
};

AlreadyRegisteredButton.defaultProps = {
  isAlreadyRegisteredButtonEnabled: false,
  theme: {},
  redirectToStudentLogin: () => {},
};

export default AlreadyRegisteredButton;
