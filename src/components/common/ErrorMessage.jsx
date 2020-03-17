import React from 'react';
import PropTypes from 'prop-types';

/*
  TODO: This component is deprecated.
 */
const ErrorMessage = ({ message }) => (
  <div className="error-message-wrapper">
    <span className="errorMessage">{message}</span>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: '',
};

export default ErrorMessage;
