/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'ravenjs/lib/Button';
import Row from 'ravenjs/lib/Row';
import Typography from 'ravenjs/lib/Typography';

import Popup from 'components/common/Popup';
import {
  goBackBtnText,
  invalidIdMessage,
} from 'constants/yjsg';

/**
 * Method return back button
 * @param {Function} redirectToPreviousLocation
 * @return {HTML} Button
 * @constructor
 */
const InvalidMemberPopUp = ({ redirectToPreviousLocation }) => (
  <Popup>
    <Row width="100%" justify="center" margin="0">
      <Typography align="center" type="body" fontSize="16px">{invalidIdMessage}</Typography>
      <Button
        color="tertiary"
        width="170px"
        margin="10px 25px"
        onClick={redirectToPreviousLocation}
      >
        {goBackBtnText}
      </Button>
    </Row>
  </Popup>
);

InvalidMemberPopUp.propTypes = {
  redirectToPreviousLocation: PropTypes.func,
};

InvalidMemberPopUp.defaultProps = {
  redirectToPreviousLocation: () => {},
};

export default InvalidMemberPopUp;
