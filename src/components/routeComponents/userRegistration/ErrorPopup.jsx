import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { getConstants } from 'reducers/constants';

const renderErrorMessage = (errorMessage) => {
  if (errorMessage) {
    const message = `Error - ${errorMessage}`;
    return <Typography align="center" type="body" fontSize="16px" style={{ width: '100%' }}>{message}</Typography>;
  }
  return null;
};

/**
 * Method return back button
 * @param {Object} constants
 * @param {String} message
 * @param {Function} redirectToPreviousLocation
 * @return {HTML} Button
 * @constructor
 */
const ErrorPopup = ({
  constants,
  message,
  redirectToPreviousLocation,
  errorMessage,
}) => {
  const {
    BACK,
  } = constants;

  return (
    <Popup>
      <Row width="100%" justify="center" margin="0">
        <Typography align="center" type="body" fontSize="16px">{message}</Typography>
        {renderErrorMessage(errorMessage)}
        <Button
          color="tertiary"
          width="170px"
          margin="10px 25px"
          onClick={redirectToPreviousLocation}
        >
          {BACK}
        </Button>
      </Row>
    </Popup>
  );
};

ErrorPopup.propTypes = {
  constants: PropTypes.object,
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  redirectToPreviousLocation: PropTypes.func,
};

ErrorPopup.defaultProps = {
  constants: {},
  errorMessage: '',
  message: '',
  redirectToPreviousLocation: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(ErrorPopup);
