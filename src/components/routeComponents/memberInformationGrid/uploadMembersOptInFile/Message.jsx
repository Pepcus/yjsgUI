import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';

import { getAppConstantsConfig } from 'reducers/constants';

/**
 * Method render success or failure message of upload optIn file
 * @param {Object} appConstants
 * @param {String} failRecordIds
 * @param {String} errorMessageOfUnavailableId
 * @param {Boolean} isOptInUploadFailed
 * @param {Boolean} isSuccessOptIn
 * @return {HTML} message
 */
const Message = ({
  appConstants,
  failOptIn,
  errorMessageOfUnavailableId,
  isOptInUploadFailed,
  isSuccessOptIn,
}) => {
  const {
    OPT_IN_FILE_UPLOAD_SUCCESS_MESSAGE,
    OPT_IN_FILE_UPLOAD_FAILURE_MESSAGE,
    FAILED_RECORDS_ARE,
  } = appConstants;
  /**
   * renderFailOptIn method render failed records Ids
   * @return {HTML} failed records
   */
  const renderFailOptIn = () => {
    if (failOptIn) {
      return (
        <Typography color="error">
          {FAILED_RECORDS_ARE}
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
  appConstants: PropTypes.object,
  errorMessageOfUnavailableId: PropTypes.string,
  failOptIn: PropTypes.string,
  isOptInUploadFailed: PropTypes.bool,
  isSuccessOptIn: PropTypes.bool,
};

Message.defaultProps = {
  appConstants: {},
  errorMessageOfUnavailableId: '',
  failOptIn: '',
  isOptInUploadFailed: false,
  isSuccessOptIn: false,
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(Message);
