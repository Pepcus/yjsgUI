import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ButtonContainer from './ButtonContainer';

/*
  TODO: This component is deprecated.
 */
const LinkButton = ({ linkPath, onClick, buttonText }) => (
  <ButtonContainer>
    <Link
      to={linkPath}
      className="linkButton"
      onClick={onClick}
    >
      {buttonText}
    </Link>
  </ButtonContainer>
);

LinkButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  linkPath: PropTypes.string,
};

LinkButton.defaultProps = {
  buttonText: '',
  onClick: () => {},
  linkPath: '',
};

export default LinkButton;
