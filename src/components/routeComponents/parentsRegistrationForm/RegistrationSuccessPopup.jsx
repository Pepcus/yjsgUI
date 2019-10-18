import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import Button from 'pepcus-core/lib/Button';
import Box from 'pepcus-core/lib/Box/index';
import { getThemeProps } from 'pepcus-core/utils/theme';

import Popup from 'components/common/Popup';
import { getConstants } from 'reducers/constants';

const PopupWrapper = styled(Box)`
    background-color: ${getThemeProps('colors.WHITE')};
    margin-bottom: 0;
    height: 100%;
    padding-top: 50px;
    padding-bottom: 35px;
    ${({ theme }) => theme.media.down('xl')`
        display: block;
        margin-bottom: 0;
        min-height: 100%;
        background-color: ${getThemeProps('palette.advancedSearch.color')};
    `}
    ${({ theme }) => theme.media.down('lg')`
        padding-top: 0;
        margin-bottom: 0;
        padding-bottom: 0;
        height: auto;
        display: flex;
        min-height: 100%;
        background-color: ${getThemeProps('palette.advancedSearch.color')};
    `}
    ${({ theme }) => theme.media.down('md')`
        margin-bottom: 0;
        display: block;
    `}
`;
/**
 * RegistrationSuccessPopup return registration success popup
 * @param {Object} constants
 * @param {Boolean} isSubmitTriggered
 * @param {Boolean} isCloseBrowserPopMessage
 * @param {Function} closePopUp
 * @return {HTML}
 */
const RegistrationSuccessPopup = ({
  constants,
  isSubmitTriggered,
  closePopUp,
  isCloseBrowserPopMessage,
}) => {
  const {
    PARENT_REGISTRATION_SUCCESS_MESSAGE,
    THANKS,
    CLOSE,
  } = constants;

  if (isSubmitTriggered && !isCloseBrowserPopMessage) {
    return (
      <PopupWrapper>
        <Popup>
          <Row display="block" width="100%" justify="center" margin="0">
            <Typography fontSize="16px">{PARENT_REGISTRATION_SUCCESS_MESSAGE}</Typography>
            <Typography fontSize="16px">{THANKS}</Typography>
            <Button
              width="170px"
              margin="10px 25px"
              onClick={closePopUp}
              color="tertiary"
            >
              {CLOSE}
            </Button>
          </Row>
        </Popup>
      </PopupWrapper>
    );
  }
  return null;
};

RegistrationSuccessPopup.propTypes = {
  constants: PropTypes.object,
  closePopUp: PropTypes.func,
  isCloseBrowserPopMessage: PropTypes.bool,
  isSubmitTriggered: PropTypes.bool,
};

RegistrationSuccessPopup.defaultProps = {
  constants: {},
  closePopUp: () => {},
  isCloseBrowserPopMessage: false,
  isSubmitTriggered: false,
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(RegistrationSuccessPopup);
