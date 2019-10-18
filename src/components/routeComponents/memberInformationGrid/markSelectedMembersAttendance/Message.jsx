import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';

import { getAppConstantsConfig } from 'reducers/constants';

/**
 * Message method render the success or failed
 * message of update members Id card status
 * @param {Object} appConstants
 * @param {Boolean} isAttendanceMarkSuccess
 * @param {Boolean} isAttendanceMarkFailed
 * @return {HTML} message
 */
const Message = ({
  appConstants,
  isAttendanceMarkSuccess,
  isAttendanceMarkFailed,
}) => {
  const {
    MARK_ATTENDANCE_SUCCESS_MESSAGE,
    MARK_ATTENDANCE_FAILED_MESSAGE,
  } = appConstants;
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
  appConstants: PropTypes.object,
  isAttendanceMarkFailed: PropTypes.bool,
  isAttendanceMarkSuccess: PropTypes.bool,
};

Message.defaultProps = {
  appConstants: {},
  isAttendanceMarkFailed: false,
  isAttendanceMarkSuccess: false,
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(Message);
