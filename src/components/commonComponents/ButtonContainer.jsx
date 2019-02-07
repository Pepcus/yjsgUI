import React from 'react';
import PropTypes from 'prop-types';

const ButtonContainer = (props) => {
  return (
    <div style={props.style} className={'buttonContainer'}>
      {props.children}
    </div>
  );
};

ButtonContainer.propTypes = {
  style: PropTypes.object,
};

ButtonContainer.defaultProps = {
  style: {},
};

export default ButtonContainer;