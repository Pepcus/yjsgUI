/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';

import {
  OPT_IN_OR_OPT_OUT_FAILED_MESSAGE,
  OPT_IN_OR_OPT_OUT_SUCCESS_MESSAGE,
} from 'constants/messages';

/**
 * Message method render the success or failed
 * message of update members Id card status
 * @param {Boolean} isMarkOptOutOrOptInSuccess
 * @param {Boolean} isMarkOptOutOrOptInFailed
 * @return {HTML} message
 */
const Message = ({
  isMarkOptOutOrOptInSuccess,
  isMarkOptOutOrOptInFailed,
}) => {
  if (isMarkOptOutOrOptInSuccess) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="success">
          {OPT_IN_OR_OPT_OUT_SUCCESS_MESSAGE}
        </Typography>
      </Box>
    );
  } else if (!isMarkOptOutOrOptInSuccess && isMarkOptOutOrOptInFailed) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="error">
          {OPT_IN_OR_OPT_OUT_FAILED_MESSAGE}
        </Typography>
      </Box>
    );
  }
  return null;
};

Message.propTypes = {
  isMarkOptOutOrOptInFailed: PropTypes.bool,
  isMarkOptOutOrOptInSuccess: PropTypes.bool,
};

Message.defaultProps = {
  isMarkOptOutOrOptInFailed: false,
  isMarkOptOutOrOptInSuccess: false,
};

export default Message;
