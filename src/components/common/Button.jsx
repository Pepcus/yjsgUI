import React from 'react';
import PropTypes from 'prop-types';

import ButtonContainer from './ButtonContainer';
import { withTheme } from './../HOC/ThemeProvider';

// TODO: Add PropTypes
const Button = ({ theme, onClick, disabled, buttonText, type, form, }) => (
  <ButtonContainer>
    <button
      // TODO: Rename form to formId or formName. Whichever is applicable.
      form={formName}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={theme.buttonStyles}
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

export default withTheme(Button);
