import React from 'react';
import PropTypes from 'prop-types';

const ButtonContainer = props => (
  <div style={props.style} className="button-container">
    {props.children}
  </div>
);

ButtonContainer.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};

ButtonContainer.defaultProps = {
  style: {},
  children: null,
};

export default ButtonContainer;
