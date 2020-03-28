import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

import Box from 'pepcus-core/lib/Box';
import Container from 'pepcus-core/lib/Container';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Link from 'pepcus-core/lib/Link';
import { getThemeProps } from 'pepcus-core/utils/theme';

const MobileButtonsContainerStyled = styled(Container)`
    top: 11px;
    z-index: 2;
    display: none;
    ${({ theme }) => theme.media.down('lg')`
        position: unset;
        float: right;
        top: 66px;
        right: 0;
        z-index: 1;
        display: block;
    `};
    ${({ theme }) => theme.media.down('md')`
        position: unset;
        float: right;
        right: 0;
        margin-top: 17px;
        z-index: 1;
    `};
`;

const MobileButtonsBoxStyled = styled(Box)`
    padding: 0px 12px
    display: flex;
    &:hover {
    border-radius: 4px;
    transition: 0.3s all;
    }
    ${({ theme }) => theme.media.down('lg')`
      margin: 0;
    `};
    ${({ theme }) => theme.media.down('md')`
      margin: 0;
    `};
`;

const LinkStyled = styled(Link)`
    color: ${getThemeProps('palette.white.color')};
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    padding: 4px 6px;
    border: 1px solid ${getThemeProps('palette.white.color')};
    margin-right: 10px;
    border-radius: 3px;
    background-color: ${getThemeProps('colors.header')}
    ${({ theme }) => theme.media.down('lg')`
        color: ${getThemeProps('palette.white.color')};
        background-color: ${getThemeProps('colors.header')};
        outline: none;
        text-align: center;
        line-height: 20px;
        padding: 10px;
        box-shadow: none;
        font-size: 14px;
        margin-right: 0;
        border-radius: 4px;
        padding: 4px 6px;
    `};
    ${({ theme }) => theme.media.down('md')`
        color: ${getThemeProps('palette.white.color')};;
        background-color: ${getThemeProps('colors.header')};
        outline: none;
        text-align: center;
        line-height: 20px;
        padding: 10px;
        box-shadow: none;
        font-size: 14px;
        margin-right: 0;
        border-radius: 4px;
        padding: 4px 6px;
    `}
    &:hover {
    color: ${getThemeProps('palette.white.color')};;
    background-color: ${getThemeProps('palette.primary.color')};
    transition: 0.3s all;}
`;

const MobileButtons = ({
  openColumnOption,
  performLogout,
  refreshMembersGrid,
  setIsAdminRouteFlag,
  redirectToCoordinatorView,
  redirectToFile,
}) => (
  <MobileButtonsContainerStyled width="auto">
    <MobileButtonsBoxStyled borderStyle="none" backgroundColor="unset">
      <LinkStyled onClick={setIsAdminRouteFlag}>
        <FaIcon icon={faArrowLeft} />
      </LinkStyled>
      <LinkStyled onClick={redirectToCoordinatorView}>
        <FaIcon icon={faUsers} />
      </LinkStyled>
      <LinkStyled onClick={redirectToFile}>
        <FaIcon icon={faFile} />
      </LinkStyled>
      <LinkStyled onClick={openColumnOption}>
        <FaIcon icon={faCog} />
      </LinkStyled>
      <LinkStyled onClick={performLogout}>
        <FaIcon icon={faPowerOff} />
      </LinkStyled>
      <LinkStyled title="Refresh Students Information" onClick={refreshMembersGrid}>
        <FaIcon icon={faSync} />
      </LinkStyled>
    </MobileButtonsBoxStyled>
  </MobileButtonsContainerStyled>
);

MobileButtons.propTypes = {
  openColumnOption: PropTypes.func,
  performLogout: PropTypes.func,
  redirectToFile: PropTypes.func,
  refreshMembersGrid: PropTypes.func,
  setIsAdminRouteFlag: PropTypes.func,
  redirectToCoordinatorView: PropTypes.func,
};

MobileButtons.defaultProps = {
  openColumnOption: () => {},
  performLogout: () => {},
  redirectToFile: () => {},
  refreshMembersGrid: () => {},
  setIsAdminRouteFlag: () => {},
  redirectToCoordinatorView: () => {},
};
export default MobileButtons;
