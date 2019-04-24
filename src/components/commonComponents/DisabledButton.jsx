import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const styles = {
  color: 'rgb(255, 255, 255)',
  backgroundColor: 'rgb(204, 204, 204) !important',
  textAlign: 'center',
  padding: '13px',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',
  border: '2px solid rgb(204, 204, 204) !important',
};
const DisabledButton = ({ onClick, buttonText }) => (
  <Button
    styles={styles}
    onClick={onClick}
    buttonText={buttonText}
    disabled="disabled"
  />
);

DisabledButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

DisabledButton.defaultProps = {
  buttonText: '',
  onClick: () => {},
};

export default DisabledButton;
