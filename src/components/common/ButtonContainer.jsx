import React from 'react';
import PropTypes from 'prop-types';

const ButtonContainer = props => (
  <div style={props.style} className="button-container">
    {props.children}
  </div>
);

ButtonContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

ButtonContainer.defaultProps = {
  children: null,
  style: {},
};

export default ButtonContainer;
