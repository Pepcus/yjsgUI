/* eslint-disable import/no-extraneous-dependencies */
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'ravenjs/lib/Button';
import Row from 'ravenjs/lib/Row';
import Typography from 'ravenjs/lib/Typography';

import Popup from 'components/common/Popup';
import {
  goBackBtnText,
  infoUpdateSuccessMessage,
  noInfoChangeMessage,
} from 'constants/yjsg';
import { isUpdatedResetAction } from 'actions/memberRegistrationActions';

/**
 * It return success message popup
 * @param {Boolean} hasError
 * @param {Boolean} isFormChanged
 * @param {Boolean} isMemberUpdated
 * @param {Boolean} isSubmitTriggered
 * @param {Function} isUpdatedReset
 * @param {Function} redirectToPreviousLocation
 * @return {HTML} successMessagePopup
 * @constructor
 */
const FormUpdateSuccessMessage = ({
  hasError,
  isFormChanged,
  isMemberUpdated,
  isSubmitTriggered,
  isUpdatedReset,
  redirectToPreviousLocation,
}) => {
  // if form data is update and valid and submitted successfully.
  if (isMemberUpdated) {
    const onClick = () => {
      isUpdatedReset();
      redirectToPreviousLocation();
    };

    return (
      <Popup>
        <Row display="inline-block" width="100%" justify="center" margin="0">
          <Typography type="body" fontSize="16px">{infoUpdateSuccessMessage}</Typography>
          <Button
            color="tertiary"
            margin="10px 25px"
            onClick={onClick}
            width="170px"
          >
            {goBackBtnText}
          </Button>
        </Row>
      </Popup>
    );
  } else if (isSubmitTriggered && !isFormChanged && hasError) {
    // if form data is not update and valid.
    return (
      <Popup>
        <Row display="inline-block" width="100%" justify="center" margin="0">
          <Typography fullWidth noWrapWidth type="body" fontSize="16px">{noInfoChangeMessage}</Typography>
          <Button
            color="tertiary"
            margin="10px 25px"
            onClick={redirectToPreviousLocation}
            width="170px"
          >
            {goBackBtnText}
          </Button>
        </Row>
      </Popup>
    );
  } return null;
};

FormUpdateSuccessMessage.propTypes = {
  hasError: PropTypes.bool,
  isFormChanged: PropTypes.bool,
  isMemberUpdated: PropTypes.bool,
  isSubmitTriggered: PropTypes.bool,
  isUpdatedReset: PropTypes.func,
  redirectToPreviousLocation: PropTypes.func,
};

FormUpdateSuccessMessage.defaultProps = {
  hasError: false,
  isFormChanged: false,
  isMemberUpdated: false,
  isSubmitTriggered: false,
  isUpdatedReset: () => {},
  redirectToPreviousLocation: () => {},
};

const mapDispatchToProps = dispatch => ({
  isUpdatedReset: props => dispatch(isUpdatedResetAction(props)),
});

export default connect(null, mapDispatchToProps)(FormUpdateSuccessMessage);
