import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { setMemberCredentialsAction } from 'actions/memberRegistrationActions';
import { getConstants } from 'reducers/constants';

const TextWrapper = styled(Typography)`
    font-size: 16px !important;
`;

/**
 * SuccessPopup render success message when member registration done successfully.
 * @param {Object} constants
 * @param {Boolean} isSubmitTriggered
 * @param {Boolean} isUserCreated
 * @param {Function} redirectToPreviousLocation
 * @param {String} message
 * @return {HTML}
 * @constructor
 */
const SuccessPopup = ({
  constants,
  isFromPartialContinue,
  isSubmitTriggered,
  isUserCreated,
  redirectToPreviousLocation,
  message,
}) => {
  const {
    BACK,
  } = constants;

  if ((isUserCreated && isSubmitTriggered)
    || isFromPartialContinue) {
    return (
      <Popup>
        <Row width="100%" justify="center" margin="0">
          <TextWrapper>{message}</TextWrapper>
          <Button
            color="modal"
            width="170px"
            margin="10px 10px"
            onClick={redirectToPreviousLocation}
          >
            {BACK}
          </Button>
        </Row>
      </Popup>
    );
  }
  return null;
};

SuccessPopup.propTypes = {
  constants: PropTypes.object,
  isFromPartialContinue: PropTypes.bool,
  isSubmitTriggered: PropTypes.bool,
  isUserCreated: PropTypes.bool,
  message: PropTypes.string,
  redirectToPreviousLocation: PropTypes.func,
};

SuccessPopup.defaultProps = {
  constants: {},
  isFromPartialContinue: false,
  isSubmitTriggered: false,
  isUserCreated: false,
  message: '',
  redirectToPreviousLocation: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

const mapDispatchToProps = dispatch => ({
  setStudentCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPopup);
