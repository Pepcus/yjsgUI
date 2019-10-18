import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { getAppConstantsConfig } from 'reducers/constants';

/**
 * Method return back button
 * @param {Object} appConstants
 * @param {Function} redirectToPreviousLocation
 * @return {HTML} Button
 * @constructor
 */
const InvalidMemberPopUp = ({
  appConstants,
  redirectToPreviousLocation,
}) => {
  const {
    INVALID_ID_MESSAGE,
    BACK,
  } = appConstants;

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
  appConstants: PropTypes.object,
  redirectToPreviousLocation: PropTypes.func,
};

InvalidMemberPopUp.defaultProps = {
  appConstants: {},
  redirectToPreviousLocation: () => {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(InvalidMemberPopUp);
