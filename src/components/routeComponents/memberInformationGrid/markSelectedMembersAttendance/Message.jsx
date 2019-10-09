/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';

import {
  MARK_ATTENDANCE_FAILED_MESSAGE,
  MARK_ATTENDANCE_SUCCESS_MESSAGE,
} from 'constants/messages';

/**
 * Message method render the success or failed
 * message of update members Id card status
 * @param {Boolean} isAttendanceMarkSuccess
 * @param {Boolean} isAttendanceMarkFailed
 * @return {HTML} message
 */
const Message = ({
  isAttendanceMarkSuccess,
  isAttendanceMarkFailed,
}) => {
  if (isAttendanceMarkSuccess) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="success">
          {MARK_ATTENDANCE_SUCCESS_MESSAGE}
        </Typography>
      </Box>
    );
  } else if (!isAttendanceMarkSuccess && isAttendanceMarkFailed) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="error">
          {MARK_ATTENDANCE_FAILED_MESSAGE}
        </Typography>
      </Box>
    );
  }
  return null;
};

Message.propTypes = {
  isAttendanceMarkFailed: PropTypes.bool,
  isAttendanceMarkSuccess: PropTypes.bool,
};

Message.defaultProps = {
  isAttendanceMarkFailed: false,
  isAttendanceMarkSuccess: false,
};

export default Message;
