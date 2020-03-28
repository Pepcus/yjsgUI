import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { setCoordinatorCredentialsAction } from 'actions/coordinatorRegistrationActions';
import { getConstants } from 'reducers/constants';

const TextWrapper = styled(Typography)`
    font-size: 16px !important;
`;

/**
 * SuccessMessagePopup render success message when coordinator registration done successfully.
 * @param {Object} constants
 * @param {Boolean} isSubmitTriggered
 * @param {Boolean} isCoordinatorCreated
 * @param {Object} newCoordinator
 * @param {Function} redirectToPreviousLocation
 * @param {Function} setCoordinatorCredentials
 * @return {HTML}
 * @constructor
 */
const SuccessMessagePopup = ({
  constants,
  isSubmitTriggered,
  isCoordinatorCreated,
  newCoordinator,
  redirectToPreviousLocation,
  setCoordinatorCredentials,
}) => {
  const {
    REGISTRATION_SUCCESS_MESSAGE_COORDINATOR,
    YOUR_ID_TEXT_COORDINATOR,
    YOUR_SECRET_CODE_TEXT_COORDINATOR,
    ID_NOTE_MESSAGE_COORDINATOR,
    OK_TEXT,
  } = constants;

  if (isCoordinatorCreated && isSubmitTriggered) {
    // for pre-population on splash page
    const { id, secretKey } = newCoordinator;
    setCoordinatorCredentials({ id, secretKey });
    return (
      <Popup>
        <Row width="100%" justify="center" margin="0">
          <TextWrapper>{REGISTRATION_SUCCESS_MESSAGE_COORDINATOR}</TextWrapper>
          <br />
          <TextWrapper>{YOUR_ID_TEXT_COORDINATOR}<strong>{id}</strong></TextWrapper>
          <br />
          <TextWrapper>{YOUR_SECRET_CODE_TEXT_COORDINATOR}<strong>{secretKey}</strong></TextWrapper>
          <br />
          <TextWrapper>{ID_NOTE_MESSAGE_COORDINATOR}</TextWrapper>
          <Button
            color="tertiary"
            width="170px"
            margin="10px 25px"
            onClick={redirectToPreviousLocation}
          >
            {OK_TEXT}
          </Button>
        </Row>
      </Popup>
    );
  }
  return null;
};

SuccessMessagePopup.propTypes = {
  constants: PropTypes.object,
  isSubmitTriggered: PropTypes.bool,
  isCoordinatorCreated: PropTypes.bool,
  newCoordinator: PropTypes.object,
  redirectToPreviousLocation: PropTypes.func,
  setCoordinatorCredentials: PropTypes.func,
};

SuccessMessagePopup.defaultProps = {
  constants: {},
  isSubmitTriggered: false,
  isCoordinatorCreated: false,
  newCoordinator: {},
  redirectToPreviousLocation: () => {},
  setCoordinatorCredentials: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

const mapDispatchToProps = dispatch => ({
  setCoordinatorCredentials: ({ id, secretKey }) => dispatch(setCoordinatorCredentialsAction({ id, secretKey })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessMessagePopup);
