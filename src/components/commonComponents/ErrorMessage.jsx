import React from 'react';
import PropTypes from 'prop-types';

// TODO: Rename errorMessage to message
const ErrorMessage = ({ errorMessage }) => (
  // TODO: Incorrect class name convention
  <div className="errorMessageWrapper">
    <span className="errorMessage">{errorMessage}</span>
  </div>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorMessage.defaultProps = {
  errorMessage: '',
};

export default ErrorMessage;
