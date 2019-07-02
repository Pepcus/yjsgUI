import React from 'react';
import PropTypes from 'prop-types';

import { withTheme } from './../HOC/ThemeProvider';
import styled from 'styled-components';

const StyledButton = styled.button`
  text-align: center;
  font-size: 14px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  color: ${props => props.theme.buttonStyles.color }};
  background-color: ${props => props.theme.buttonStyles["background-color"]};
  border: ${props => props.theme.buttonStyles.border};
`;

let Button = ({ theme, onClick, disabled, buttonText, type, as, formName, }) => (
  <StyledButton
    form={formName}
    as={as}
    type={type}
    onClick={onClick}
    disabled={disabled}
    theme={theme}
  >
    {buttonText}
  </StyledButton>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  formName: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  buttonText: '',
  onClick: () => {},
  type: 'button',
  formName: '',
};

export default withTheme(Button);
