import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';

import { getConstants } from 'reducers/constants';

/**
 * Message method render the success or failed
 * message of update members Id card status
 * @param {Object} constants
 * @param {Boolean} isIdCardUpdateStatusSuccess
 * @param {Boolean} isIdCardUpdateStatusFailed
 * @return {HTML} message
 */
const Message = ({
  constants,
  isIdCardUpdateStatusSuccess,
  isIdCardUpdateStatusFailed,
}) => {
  const {
    UPDATED_ID_CARD_STATUS_SUCCESS_MESSAGE,
    UPDATED_ID_CARD_STATUS_FAILED_MESSAGE,
  } = constants;
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
  constants: PropTypes.object,
  isIdCardUpdateStatusFailed: PropTypes.bool,
  isIdCardUpdateStatusSuccess: PropTypes.bool,
};

Message.defaultProps = {
  constants: {},
  isIdCardUpdateStatusFailed: false,
  isIdCardUpdateStatusSuccess: false,
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(Message);
