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
 * SuccessMessagePopup render success message when member registration done successfully.
 * @param {Object} constants
 * @param {Boolean} isSubmitTriggered
 * @param {Boolean} isMemberCreated
 * @param {Object} newMember
 * @param {Function} redirectToPreviousLocation
 * @param {Function} setStudentCredentials
 * @return {HTML}
 * @constructor
 */
const SuccessMessagePopup = ({
  constants,
  isSubmitTriggered,
  isMemberCreated,
  newMember,
  redirectToPreviousLocation,
  setStudentCredentials,
}) => {
  const {
    REGISTRATION_SUCCESS_MESSAGE,
    YOUR_ID_TEXT,
    IS_THERE_TEXT,
    YOUR_SECRET_CODE_TEXT,
    ID_NOTE_MESSAGE,
    ID_CARD_SUGGESTION_MESSAGE,
    BACK,
  } = constants;

  if (isMemberCreated && isSubmitTriggered) {
    // for pre-population on splash page
    const { id, secretKey } = newMember;
    setStudentCredentials({ id, secretKey });
    return (
      <Popup>
        <Row display="block" width="100%" justify="center" margin="0">
          <TextWrapper>{REGISTRATION_SUCCESS_MESSAGE}</TextWrapper>
          <TextWrapper>{YOUR_ID_TEXT}<strong>{ id }</strong>{ IS_THERE_TEXT }</TextWrapper>
          <TextWrapper>{YOUR_SECRET_CODE_TEXT}<strong>{secretKey}</strong>{ IS_THERE_TEXT }</TextWrapper>
          <TextWrapper>{ID_NOTE_MESSAGE}</TextWrapper>
          <TextWrapper>{ID_CARD_SUGGESTION_MESSAGE}</TextWrapper>
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
  }
  return null;
};

SuccessMessagePopup.propTypes = {
  constants: PropTypes.object,
  isSubmitTriggered: PropTypes.bool,
  isMemberCreated: PropTypes.bool,
  newMember: PropTypes.object,
  redirectToPreviousLocation: PropTypes.func,
  setStudentCredentials: PropTypes.func,
};

SuccessMessagePopup.defaultProps = {
  constants: {},
  isSubmitTriggered: false,
  isMemberCreated: false,
  newMember: {},
  redirectToPreviousLocation: () => {},
  setStudentCredentials: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

const mapDispatchToProps = dispatch => ({
  setStudentCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessMessagePopup);
