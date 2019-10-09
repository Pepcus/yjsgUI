/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

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

const TextWrapper = styled(Typography)`
    font-size: 16px !important;
`;

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
        <Row width="100%" justify="center" margin="0">
          <TextWrapper>{REGISTRATION_SUCCESS_MESSAGE}</TextWrapper>
          <TextWrapper>{YOUR_ID_TEXT}<strong>{id}</strong>{IS_THERE_TEXT}</TextWrapper>
          <TextWrapper>{YOUR_SECRET_CODE_TEXT}<strong>{secretKey}</strong>{IS_THERE_TEXT}</TextWrapper>
          <TextWrapper>{ID_NOTE_MESSAGE}</TextWrapper>
          <TextWrapper>{ID_CARD_SUGGESTION_MESSAGE}</TextWrapper>
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
