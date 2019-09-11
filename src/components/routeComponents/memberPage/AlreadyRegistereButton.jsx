/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'ravenjs/lib/Button';

import { alreadyRegisteredBtnText } from 'constants/yjsg';

const AlreadyRegisteredButton = ({
  isAlreadyRegisteredButtonEnabled,
  redirectToStudentLogin,
}) => {
  if (isAlreadyRegisteredButtonEnabled) {
    return (
      <Button margin="10px" onClick={redirectToStudentLogin}>
        {alreadyRegisteredBtnText}
      </Button>
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
