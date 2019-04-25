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
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  formName: PropTypes.string,
  styles: PropTypes.object,
};

Button.defaultProps = {
  disabled: false,
  buttonText: '',
  onClick: () => {},
  type: 'button',
  formName: '',
  styles: {},
};

export default Button;
