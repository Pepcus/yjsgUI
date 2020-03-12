import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { resetMemberOptInStatusDataAction, setMemberCredentialsAction } from 'actions/memberRegistrationActions';
import { getConstants } from 'reducers/constants';

const TextWrapper = styled(Typography)`
    font-size: 16px !important;
`;

/**
 * MembersOptInUpdateStatusPopup render success message when member registration done successfully.
 * @param {Object} constants
 * @param {Boolean} isSubmitTriggered
 * @param {Boolean} isMemberCreated
 * @param {Object} newMember
 * @param {Function} redirectToPreviousLocation
 * @param {Function} setStudentCredentials
 * @return {HTML}
 * @constructor
 */
const MembersOptInUpdateStatusPopup = ({
                               constants,
                               redirectToPreviousLocation,
                               resetMemberOptInStatusData,
                             }) => {
  const {
    OPT_IN_MEMBERS_REGISTRATION_SUCCESS_MESSAGE,
  } = constants;

  const handleOnOkButtonClick = () => {
    resetMemberOptInStatusData();
    redirectToPreviousLocation();
  };

    // for pre-population on splash page
    return (
      <Popup>
        <Row width="100%" justify="center" margin="0">
          <TextWrapper>{OPT_IN_MEMBERS_REGISTRATION_SUCCESS_MESSAGE}</TextWrapper>
          <Button
            color="tertiary"
            width="170px"
            margin="10px 25px"
            onClick={handleOnOkButtonClick}
          >
            OK
          </Button>
        </Row>
      </Popup>
    );
};

MembersOptInUpdateStatusPopup.propTypes = {
  constants: PropTypes.object,
  isSubmitTriggered: PropTypes.bool,
  isMemberCreated: PropTypes.bool,
  newMember: PropTypes.object,
  redirectToPreviousLocation: PropTypes.func,
  setStudentCredentials: PropTypes.func,
};

MembersOptInUpdateStatusPopup.defaultProps = {
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
  resetMemberOptInStatusData: () => dispatch(resetMemberOptInStatusDataAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersOptInUpdateStatusPopup);
