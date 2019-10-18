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
 * @param {Boolean} isMarkOptOutOrOptInSuccess
 * @param {Boolean} isMarkOptOutOrOptInFailed
 * @return {HTML} message
 */
const Message = ({
  appConstants,
  isMarkOptOutOrOptInSuccess,
  isMarkOptOutOrOptInFailed,
}) => {
  const {
    OPT_IN_OR_OPT_OUT_SUCCESS_MESSAGE,
    OPT_IN_OR_OPT_OUT_FAILED_MESSAGE,
  } = appConstants;

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
  appConstants: PropTypes.object,
  isMarkOptOutOrOptInFailed: PropTypes.bool,
  isMarkOptOutOrOptInSuccess: PropTypes.bool,
};

Message.defaultProps = {
  appConstants: {},
  isMarkOptOutOrOptInFailed: false,
  isMarkOptOutOrOptInSuccess: false,
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(Message);
