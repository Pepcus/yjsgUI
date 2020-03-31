import React from 'react';
import PropTypes from 'prop-types';

import FaIcon from 'pepcus-core/lib/FaIcon';
import Button from 'pepcus-core/lib/Button';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

export const TrashIconButton = (props) => {
  const { buttonStyle, onClickHandler, isVisible } = props;
  if (!isVisible) {
    return null;
  }
  return (
    <Button style={buttonStyle} onClick={onClickHandler}>
      <FaIcon icon={faTrash} />
    </Button>
  );
};

TrashIconButton.propTypes = {
  buttonStyle: PropTypes.object,
  onClickHandler: PropTypes.func,
  isVisible: PropTypes.bool,
};

TrashIconButton.defaultProps = {
  buttonStyle: {},
  onClickHandler: () => {},
  isVisible: false,
};
