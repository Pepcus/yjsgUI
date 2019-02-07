import React from 'react';
import PropTypes from 'prop-types';
import ButtonContainer from './ButtonContainer';

const Button = ({ onClick, disabled, buttonText, style, buttonCorrectionStyle }) => (
  <ButtonContainer style={buttonCorrectionStyle}>
    <button
      className="buttonOrange"
      style={style}
      onClick={onClick}
      disabled={disabled}
    >{buttonText}
    </button>
  </ButtonContainer>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  buttonText: 'Button',
  onClick: () => {},
};

export default Button;
