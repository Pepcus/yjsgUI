/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'ravenjs/lib/Box';
import Typography from 'ravenjs/lib/Typography';
import { getThemeProps } from 'ravenjs/utils/theme';

import { CLOSE_BROWSER_MANUALLY_MESSAGE } from 'constants/yjsg';
import Popup from 'components/common/Popup';

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
 * Method return close browser message
 * @return {HTML}
 */
const CloseBrowserPopup = ({ isCloseBrowserPopMessage }) => {
  if (isCloseBrowserPopMessage) {
    return (
      <PopupWrapper>
        <Popup>
          <Typography fontSize="16px">{CLOSE_BROWSER_MANUALLY_MESSAGE}</Typography>
        </Popup>
      </PopupWrapper>
    );
  }
  return null;
};

CloseBrowserPopup.propTypes = {
  isCloseBrowserPopMessage: PropTypes.bool,
};

CloseBrowserPopup.defaultProps = {
  isCloseBrowserPopMessage: false,
};

export default CloseBrowserPopup;
