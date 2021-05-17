import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { getConstants } from 'reducers/constants';
import { clearAlreadyRegisteredMemberFlagsAction } from 'actions/memberRegistrationActions';

const TextWrapper = styled(Typography)`
    font-size: 16px !important;
`;

/**
 * MemberAlreadyRegisteredMessagePopup render message when already registered member found.
 * @param {Object} constants
 * @param {Boolean} isSubmitTriggered
 * @param {Boolean} isPartialMemberMatchFound
 * @param {Boolean} isExactMemberMatchFound
 * @param {Function} redirectToPreviousLocation
 * @param {Function} clearAlreadyRegisteredMemberFlagsAction
 * @return {HTML}
 */
const MemberAlreadyRegisteredMessagePopup = ({
                               constants,
                               isSubmitTriggered,
                               isPartialMemberMatchFound,
                               isExactMemberMatchFound,
                               redirectToPreviousLocation,
                               clearAlreadyRegisteredMemberFlagsAction,
                             }) => {
  const {
    PARTIAL_MEMBER_ALREADY_REGISTERED_MESSAGE,
    EXACT_MEMBER_ALREADY_REGISTERED_MESSAGE,
    INFO_CONVEYED_VIA_SMS_SHORTLY_MESSAGE,
    CONTACT_YJSG_HELPLINE_MESSAGE,
    BACK,
  } = constants;

  const handleBackButtonClick = () => {
    clearAlreadyRegisteredMemberFlagsAction();
    redirectToPreviousLocation();
  };

  if (isSubmitTriggered && isPartialMemberMatchFound) {
    return (
      <Popup>
        <Row width="100%" justify="center" margin="0">
          <TextWrapper>{PARTIAL_MEMBER_ALREADY_REGISTERED_MESSAGE}</TextWrapper>
          {/*<TextWrapper>{INFO_CONVEYED_VIA_SMS_SHORTLY_MESSAGE}</TextWrapper>*/}
          <TextWrapper>{CONTACT_YJSG_HELPLINE_MESSAGE}</TextWrapper>
          <Button
            color="tertiary"
            width="170px"
            margin="10px 25px"
            onClick={handleBackButtonClick}
          >
            {BACK}
          </Button>
        </Row>
      </Popup>
    );
  } else if (isSubmitTriggered && isExactMemberMatchFound) {
    return (
      <Popup>
        <Row width="100%" justify="center" margin="0">
          <TextWrapper>{EXACT_MEMBER_ALREADY_REGISTERED_MESSAGE}</TextWrapper>
          {/*<TextWrapper>{INFO_CONVEYED_VIA_SMS_SHORTLY_MESSAGE}</TextWrapper>*/}
          <TextWrapper>{CONTACT_YJSG_HELPLINE_MESSAGE}</TextWrapper>
          <Button
            color="tertiary"
            width="170px"
            margin="10px 25px"
            onClick={handleBackButtonClick}
          >
            {BACK}
          </Button>
        </Row>
      </Popup>
    );
  }
  return null;
};

MemberAlreadyRegisteredMessagePopup.propTypes = {
  constants: PropTypes.object,
  isSubmitTriggered: PropTypes.bool,
  isExactMemberMatchFound: PropTypes.bool,
  isPartialMemberMatchFound: PropTypes.bool,
  redirectToPreviousLocation: PropTypes.func,
  clearAlreadyRegisteredMemberFlagsAction: PropTypes.func,
};

MemberAlreadyRegisteredMessagePopup.defaultProps = {
  constants: {},
  isSubmitTriggered: false,
  isExactMemberMatchFound: false,
  isPartialMemberMatchFound: false,
  redirectToPreviousLocation: () => {},
  clearAlreadyRegisteredMemberFlagsAction: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, {
  clearAlreadyRegisteredMemberFlagsAction,
})(MemberAlreadyRegisteredMessagePopup);
