import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { getConstants } from 'reducers/constants';

/**
 * Method return back button
 * @param {Object} constants
 * @param {Function} onConfirmation
 * @return {HTML} Button
 * @constructor
 */
const BusStopChangeWarningPopUp = ({
  constants,
  onConfirmation,
}) => {
  const {
    BUS_STOP_CHANGE_WARNING_MESSAGE,
    BACK,
  } = constants;

  return (
    <Popup>
      <Row width="100%" justify="center" margin="0">
        <Typography align="center" type="body" fontSize="16px">{BUS_STOP_CHANGE_WARNING_MESSAGE}</Typography>
        <Button
          color="tertiary"
          width="170px"
          margin="10px 25px"
          onClick={onConfirmation}
        >
          {BACK}
        </Button>
      </Row>
    </Popup>
  );
};

BusStopChangeWarningPopUp.propTypes = {
  constants: PropTypes.object,
  onConfirmation: PropTypes.func,
};

BusStopChangeWarningPopUp.defaultProps = {
  constants: {},
  onConfirmation: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(BusStopChangeWarningPopUp);
