import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';

import { getConstants } from 'reducers/constants';

/**
 * Method render success or failure message of upload attendance
 * @param {Object} constants
 * @param {String} errorMessageOfIdNotExist
 * @param {String} failRecordIds
 * @param {Boolean} isAttendanceUploadFailed
 * @param {Boolean} isUploadAttendanceSuccess
 * @return {HTML} message
 */
const Message = ({
  constants,
  errorMessageOfIdNotExist,
  failRecordIds,
  isAttendanceUploadFailed,
  isUploadAttendanceSuccess,
}) => {
  const {
    ATTENDANCE_FILE_UPLOAD_SUCCESS_MESSAGE,
    ATTENDANCE_FILE_UPLOAD_FAILURE_MESSAGE,
  } = constants;

  /**
   * Method method render failed records Ids
   * @return {HTML} failed records
   */
  const renderFailRecordIds = () => {
    if (failRecordIds) {
      return (
        <Typography color="error">
          Failed Records are:
          <Typography color="black">{failRecordIds}</Typography>
        </Typography>);
    }
    return null;
  };

  /**
   * Method render Id not exist message
   * @return {HTML} not exist Id's
   */
  const renderIdNotExistMessage = () => {
    if (errorMessageOfIdNotExist) {
      return (
        <Typography>
          {errorMessageOfIdNotExist}
        </Typography>);
    }
    return null;
  };

  if (isUploadAttendanceSuccess) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="success">
          {ATTENDANCE_FILE_UPLOAD_SUCCESS_MESSAGE}
        </Typography>
        {renderFailRecordIds()}
        {renderIdNotExistMessage()}
      </Box>
    );
  } else if (!isUploadAttendanceSuccess && isAttendanceUploadFailed) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="error">
          {ATTENDANCE_FILE_UPLOAD_FAILURE_MESSAGE}
        </Typography>
      </Box>
    );
  }
  return null;
};

Message.propTypes = {
  constants: PropTypes.object,
  errorMessageOfIdNotExist: PropTypes.string,
  failRecordIds: PropTypes.string,
  isAttendanceUploadFailed: PropTypes.bool,
  isUploadAttendanceSuccess: PropTypes.bool,
};

Message.defaultProps = {
  constants: {},
  errorMessageOfIdNotExist: '',
  failRecordIds: '',
  isAttendanceUploadFailed: false,
  isUploadAttendanceSuccess: false,
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(Message);
