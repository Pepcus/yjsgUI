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
 * @param {Function} redirectToPreviousLocation
 * @return {HTML} Button
 * @constructor
 */
const InvalidMemberPopUp = ({
  constants,
  redirectToPreviousLocation,
}) => {
  const {
    INVALID_ID_MESSAGE,
    BACK,
  } = constants;

  return (
    <Popup>
      <Row width="100%" justify="center" margin="0">
        <Typography align="center" type="body" fontSize="16px">{INVALID_ID_MESSAGE}</Typography>
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

InvalidMemberPopUp.propTypes = {
  constants: PropTypes.object,
  redirectToPreviousLocation: PropTypes.func,
};

InvalidMemberPopUp.defaultProps = {
  constants: {},
  redirectToPreviousLocation: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(InvalidMemberPopUp);
