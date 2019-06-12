import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormContainer is the form wrapper
 * @param {Node} children
 * @return {*}
 * @constructor
 */
const FormContainer = ({ children }) => (
  <form>
    { children }
  </form>
);

FormContainer.propTypes = {
  children: PropTypes.node,
};

FormContainer.defaultProps = {
  children: null,
};
export default FormContainer;
