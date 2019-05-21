import React from 'react';
import PropTypes from 'prop-types';

const FormContainer = props => (
  <form>
    { props.children }
  </form>
);

FormContainer.propTypes = {
  children: PropTypes.node,
};

FormContainer.defaultProps = {
  children: null,
};
export default FormContainer;
