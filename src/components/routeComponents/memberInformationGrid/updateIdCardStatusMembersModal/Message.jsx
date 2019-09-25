/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';

import {
  UPDATED_ID_CARD_STATUS_FAILED_MESSAGE,
  UPDATED_ID_CARD_STATUS_SUCCESS_MESSAGE,
} from 'constants/messages';

/**
 * Message method render the success or failed
 * message of update members Id card status
 * @param {Boolean} isIdCardUpdateStatusSuccess
 * @param {Boolean} isIdCardUpdateStatusFailed
 * @return {HTML} message
 */
const Message = ({
  isIdCardUpdateStatusSuccess,
  isIdCardUpdateStatusFailed,
}) => {
  if (isIdCardUpdateStatusSuccess) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="success">
          {UPDATED_ID_CARD_STATUS_SUCCESS_MESSAGE}
        </Typography>
      </Box>
    );
  } else if (!isIdCardUpdateStatusSuccess && isIdCardUpdateStatusFailed) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="error">
          {UPDATED_ID_CARD_STATUS_FAILED_MESSAGE}
        </Typography>
      </Box>
    );
  }
  return null;
};

Message.propTypes = {
  isIdCardUpdateStatusFailed: PropTypes.bool,
  isIdCardUpdateStatusSuccess: PropTypes.bool,
};

Message.defaultProps = {
  isIdCardUpdateStatusFailed: false,
  isIdCardUpdateStatusSuccess: false,
};

export default Message;
