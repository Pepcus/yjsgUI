import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { isUpdatedResetCoordinatorAction } from 'actions/coordinatorRegistrationActions';
import { getConstants } from 'reducers/constants';

/**
 * It return success message popup
 * @param {Object} constants
 * @param {Boolean} hasError
 * @param {Boolean} isFormChanged
 * @param {Boolean} isCoordinatorUpdated
 * @param {Boolean} isSubmitTriggered
 * @param {Function} isUpdatedReset
 * @param {Function} redirectToPreviousLocation
 * @return {HTML} successMessagePopup
 * @constructor
 */
const FormUpdateSuccessMessageCoordinator = ({
  constants,
  hasError,
  isFormChanged,
  isCoordinatorUpdated,
  isSubmitTriggered,
  isUpdatedReset,
  redirectToPreviousLocation,
}) => {
  const {
    INFO_UPDATE_SUCCESS_MESSAGE_TEXT,
    OK_TEXT,
    NO_INFO_CHANGE_TEXT,
  } = constants;
  const onClick = () => {
    isUpdatedReset();
    redirectToPreviousLocation();
  };

  if (isSubmitTriggered && !isFormChanged && !hasError) {
    // if form data is not update and valid.
    return (
      <Popup>
        <Row display="inline-block" width="100%" justify="center" margin="0">
          <Typography fullWidth type="body" fontSize="16px">{NO_INFO_CHANGE_TEXT}</Typography>
          <Button
            color="tertiary"
            margin="10px 25px"
            onClick={redirectToPreviousLocation}
            width="170px"
          >
            {OK_TEXT}
          </Button>
        </Row>
      </Popup>
    );
  }

  // if form data is update and valid and submitted successfully.
  if (isCoordinatorUpdated) {
    return (
      <Popup>
        <Row display="inline-block" width="100%" justify="center" margin="0">
          <Typography type="body" fontSize="16px">{INFO_UPDATE_SUCCESS_MESSAGE_TEXT}</Typography>
          <Button
            color="tertiary"
            margin="10px 25px"
            onClick={onClick}
            width="170px"
          >
            {OK_TEXT}
          </Button>
        </Row>
      </Popup>
    );
  }
  return null;
};

FormUpdateSuccessMessageCoordinator.propTypes = {
  constants: PropTypes.object,
  hasError: PropTypes.bool,
  isFormChanged: PropTypes.bool,
  isCoordinatorUpdated: PropTypes.bool,
  isSubmitTriggered: PropTypes.bool,
  isUpdatedReset: PropTypes.func,
  redirectToPreviousLocation: PropTypes.func,
};

FormUpdateSuccessMessageCoordinator.defaultProps = {
  constants: {},
  hasError: false,
  isFormChanged: false,
  isCoordinatorUpdated: false,
  isSubmitTriggered: false,
  isUpdatedReset: () => {},
  redirectToPreviousLocation: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

const mapDispatchToProps = dispatch => ({
  isUpdatedReset: props => dispatch(isUpdatedResetCoordinatorAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormUpdateSuccessMessageCoordinator);
