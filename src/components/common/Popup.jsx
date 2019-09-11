/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'ravenjs/lib/Box';
import Row from 'ravenjs/lib/Row';
import { getThemeProps } from 'ravenjs/utils/theme';

const BoxStyled = styled(Box)`
    top: 0;
    left:0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${getThemeProps('palette.white.color')};
`;

const RowStyled = styled(Row)`
    border-radius: 4px;
    padding: 50px;
    background: ${getThemeProps('palette.popup.backgroundColor')};
    max-width: 50%;
    text-align: center;
    line-height: 30px;
     @media (max-width: 992px) and (orientation: landscape) {
        max-width: 60%;
    } 
    ${({ theme }) => theme.media.down('sm')`
        width: 300px;
        padding: 20px;
        max-width: 80%;
    `}
`;

/**
 * Popup render popup
 * @param {Node} children
 * @type {Function}
 * @return {HTML}
 * @constructor
 */
const Popup = ({ children }) => (
  <BoxStyled
    elevation="1"
    backgroundColor="transparent"
    height="100%"
    position="fixed"
    borderColor="white"
    width="100%"
  >
    <RowStyled >
      { children }
    </RowStyled>
  </BoxStyled>
);

Popup.propTypes = {
  children: PropTypes.node,
};
Popup.defaultProps = {
  children: '',
};

export default Popup;
