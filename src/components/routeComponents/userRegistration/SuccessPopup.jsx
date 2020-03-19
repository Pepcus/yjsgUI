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

const renderMessageWithVideoLink = (message, VIDEO_LINK) => {
  if (message) {
    const link = `https://${VIDEO_LINK}`;
    return (
      <div>
        {message}<a href={link} target="_blank">{VIDEO_LINK}</a>
      </div>
    );
  }
  return null;
};

const renderMessageBasedOnCity = (message, additionalMessage, data, cityName) => {
  if (data.city !== cityName) {
    return `${message} ${additionalMessage}`;
  }
  return message;
};

/**
 * SuccessPopup render success message when member registration done successfully.
 * @param {Object} constants
 * @param {Boolean} isFromPartialContinue
 * @param {Boolean} isSubmitTriggered
 * @param {Boolean} isUserCreated
 * @param {Function} redirectToPreviousLocation
 * @param {String} messageOf
 * @param {Object} data
 * @return {HTML}
 * @constructor
 */
const SuccessPopup = ({
  constants,
  isFromPartialContinue,
  isSubmitTriggered,
  isUserCreated,
  redirectToPreviousLocation,
  messageOf,
  data,
}) => {
  const {
    INDORE_CITY,
    POPUP_BUTTON_TEXT,
    VIDEO_LINK,
    REGISTRATION_COMPLETE_ADDITIONAL_MESSAGE,
  } = constants;

  if ((isUserCreated && isSubmitTriggered)
    || isFromPartialContinue) {
    if (messageOf === constants.PARTIAL) {
      return (
        <Popup>
          <Row width="100%" justify="center" margin="0">
            <TextWrapper>{constants.PARTIAL_REGISTRATION_MESSAGE_1}</TextWrapper>
            <TextWrapper>{constants.PARTIAL_REGISTRATION_MESSAGE_2}</TextWrapper>
            <TextWrapper>{constants.PARTIAL_REGISTRATION_MESSAGE_3}</TextWrapper>
            <Button
              color="tertiary"
              width="170px"
              margin="10px 10px"
              onClick={redirectToPreviousLocation}
            >
              {POPUP_BUTTON_TEXT}
            </Button>
          </Row>
        </Popup>
      );
    } else if (messageOf === constants.COMPLETE) {
      return (
        <Popup>
          <Row width="100%" justify="center" margin="0">
            <TextWrapper>
              {renderMessageBasedOnCity(constants.REGISTRATION_COMPLETE_MESSAGE_1,
                REGISTRATION_COMPLETE_ADDITIONAL_MESSAGE, data, INDORE_CITY)}
            </TextWrapper>
            <TextWrapper>
              {renderMessageWithVideoLink(constants.REGISTRATION_COMPLETE_MESSAGE_2, VIDEO_LINK)}
            </TextWrapper>
            <TextWrapper>{constants.REGISTRATION_COMPLETE_MESSAGE_3}</TextWrapper>
            <Button
              color="tertiary"
              width="170px"
              margin="10px 10px"
              onClick={redirectToPreviousLocation}
            >
              {POPUP_BUTTON_TEXT}
            </Button>
          </Row>
        </Popup>
      );
    }
  }
  return null;
};

SuccessPopup.propTypes = {
  constants: PropTypes.object,
  data: PropTypes.object,
  isFromPartialContinue: PropTypes.bool,
  isSubmitTriggered: PropTypes.bool,
  isUserCreated: PropTypes.bool,
  messageOf: PropTypes.string,
  redirectToPreviousLocation: PropTypes.func,
};

SuccessPopup.defaultProps = {
  constants: {},
  data: {},
  isFromPartialContinue: false,
  isSubmitTriggered: false,
  isUserCreated: false,
  messageOf: '',
  redirectToPreviousLocation: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

const mapDispatchToProps = dispatch => ({
  setStudentCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPopup);
