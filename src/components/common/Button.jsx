import React from 'react';
import PropTypes from 'prop-types';

import ButtonContainer from './ButtonContainer';

const Button = ({ onClick, disabled, buttonText, type, formName, styles }) => (
  <ButtonContainer>
    <button
      style={styles}
      className="buttonOrange"
      form={formName}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  </ButtonContainer>
);

Button.propTypes = {
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  formName: PropTypes.string,
  onClick: PropTypes.func,
  styles: PropTypes.object,
  type: PropTypes.string,
};

Button.defaultProps = {
  buttonText: '',
  disabled: false,
  formName: '',
  onClick: () => {},
  styles: {},
  type: 'button',
};

export default Button;
