import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';
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
 * Method return close browser message
 * @return {HTML}
 */
const CloseBrowserPopup = ({
  constants,
  isCloseBrowserPopMessage,
}) => {
  const { CLOSE_BROWSER_MANUALLY_MESSAGE } = constants;
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
  constants: PropTypes.object,
  isCloseBrowserPopMessage: PropTypes.bool,
};

CloseBrowserPopup.defaultProps = {
  constants: {},
  isCloseBrowserPopMessage: false,
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(CloseBrowserPopup);
