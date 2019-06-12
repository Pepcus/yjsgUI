import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ButtonContainer from './ButtonContainer';

/**
 * render link button which will use for redirection.
 * @param {String} linkPath
 * @param {Function} onClick
 * @param {String} buttonText
 * @return {*}
 * @constructor
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
  linkPath: PropTypes.string,
  onClick: PropTypes.func,
};

LinkButton.defaultProps = {
  buttonText: '',
  linkPath: '',
  onClick: () => {},
};

export default LinkButton;
