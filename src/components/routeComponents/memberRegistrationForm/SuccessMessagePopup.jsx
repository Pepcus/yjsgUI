/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'ravenjs/lib/Button';
import Typography from 'ravenjs/lib/Typography';

import Popup from 'components/common/Popup';
import {
  ID_CARD_SUGGESTION_MESSAGE,
  ID_NOTE_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
} from 'constants/messages';
import {
  IS_THERE_TEXT,
  YOUR_ID_TEXT,
  YOUR_SECRET_CODE_TEXT,
} from 'constants/text';
import { goBackBtnText } from 'constants/yjsg';
import { setMemberCredentialsAction } from 'actions/memberRegistrationActions';

/**
 * SuccessMessagePopup render success message when member registration done successfully.
 * @param {Boolean} isSubmitTriggered
 * @param {Boolean} isMemberCreated
 * @param {Object} newMember
 * @param {Function} redirectToPreviousLocation
 * @param {Function} setStudentCredentials
 * @return {HTML}
 * @constructor
 */
const SuccessMessagePopup = ({
  isSubmitTriggered,
  isMemberCreated,
  newMember,
  redirectToPreviousLocation,
  setStudentCredentials,
}) => {
  if (isMemberCreated && isSubmitTriggered) {
    // for pre-population on splash page
    const { id, secretKey } = newMember;
    setStudentCredentials({ id, secretKey });
    return (
      <Popup>
        <Typography type="body" fontSize="16px">{REGISTRATION_SUCCESS_MESSAGE}</Typography>
        <Typography type="body" fontSize="16px">{YOUR_ID_TEXT}<strong>{id}</strong>{IS_THERE_TEXT}</Typography>
        <Typography type="body" fontSize="16px">{YOUR_SECRET_CODE_TEXT}<strong>{secretKey}</strong>{IS_THERE_TEXT}</Typography>
        <Typography type="body" fontSize="16px">{ID_NOTE_MESSAGE}</Typography>
        <Typography type="body" fontSize="16px">{ID_CARD_SUGGESTION_MESSAGE}</Typography>
        <Button
          color="tertiary"
          width="170px"
          margin="10px 25px"
          onClick={redirectToPreviousLocation}
        >
          {goBackBtnText}
        </Button>
      </Popup>
    );
  }
  return null;
};

SuccessMessagePopup.propTypes = {
  isSubmitTriggered: PropTypes.bool,
  isMemberCreated: PropTypes.bool,
  newMember: PropTypes.object,
  redirectToPreviousLocation: PropTypes.func,
  setStudentCredentials: PropTypes.func,
};

SuccessMessagePopup.defaultProps = {
  isSubmitTriggered: false,
  isMemberCreated: false,
  newMember: {},
  redirectToPreviousLocation: () => {},
  setStudentCredentials: () => {},
};

const mapDispatchToProps = dispatch => ({
  setStudentCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
});

export default connect(null, mapDispatchToProps)(SuccessMessagePopup);
