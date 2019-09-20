/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'ravenjs/lib/Typography';

import { CLOSE_BROWSER_MANUALLY_MESSAGE } from 'constants/yjsg';
import Popup from 'components/common/Popup';


/**
 * Method return close browser message
 * @return {HTML}
 */
const CloseBrowserPopup = ({ isCloseBrowserPopMessage }) => {
  if (isCloseBrowserPopMessage) {
    return (
      <Popup>
        <Typography>{CLOSE_BROWSER_MANUALLY_MESSAGE}</Typography>
      </Popup>
    );
  }
  return null;
};

CloseBrowserPopup.propTypes = {
  isCloseBrowserPopMessage: PropTypes.bool,
};

CloseBrowserPopup.defaultProps = {
  isCloseBrowserPopMessage: false,
};

export default CloseBrowserPopup;
