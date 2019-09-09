/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Box from 'ravenjs/lib/Box';
import Typography from 'ravenjs/lib/Typography';

import {
  OPT_IN_FILE_UPLOAD_FAILURE_MESSAGE,
  OPT_IN_FILE_UPLOAD_SUCCESS_MESSAGE,
} from 'constants/messages';

/**
 * Method render success or failure message of upload optIn file
 * @param {String} failRecordIds
 * @param {String} errorMessageOfUnavailableId
 * @param {Boolean} isOptInUploadFailed
 * @param {Boolean} isSuccessOptIn
 * @return {HTML} message
 */
const Message = ({
  failOptIn,
  errorMessageOfUnavailableId,
  isOptInUploadFailed,
  isSuccessOptIn,
}) => {

  /**
   * renderFailOptIn method render failed records Ids
   * @return {HTML} failed records
   */
  const renderFailOptIn = () => {
    if (failOptIn) {
      return (
        <Typography color="error">
          Failed Records are:
          <Typography color="black">{failOptIn}</Typography>
        </Typography>);
    }
    return null;
  };

  /**
   * renderIdNotPresentMessage method render unavailable Id error message
   * @return {HTML} not present Id's
   */
  const renderIdNotPresentMessage = () => {
    if (errorMessageOfUnavailableId) {
      return (
        <Typography>
          {errorMessageOfUnavailableId}
        </Typography>);
    }
    return null;
  };

  if (isSuccessOptIn) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="success">
          {OPT_IN_FILE_UPLOAD_SUCCESS_MESSAGE}
        </Typography>
        {renderFailOptIn()}
        {renderIdNotPresentMessage()}
      </Box>
    );
  } else if (!isSuccessOptIn && isOptInUploadFailed) {
    return (
      <Box padding="10px" margin="10px 20px" borderStyle="none" width="auto">
        <Typography color="error">
          {OPT_IN_FILE_UPLOAD_FAILURE_MESSAGE}
        </Typography>
      </Box>
    );
  }
  return null;
};

Message.propTypes = {
  errorMessageOfUnavailableId: PropTypes.string,
  failOptIn: PropTypes.string,
  isOptInUploadFailed: PropTypes.bool,
  isSuccessOptIn: PropTypes.bool,
};

Message.defaultProps = {
  errorMessageOfUnavailableId: '',
  failOptIn: '',
  isOptInUploadFailed: false,
  isSuccessOptIn: false,
};

export default Message;
