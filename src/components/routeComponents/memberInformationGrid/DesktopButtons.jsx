/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';

import Button from 'ravenjs/lib/Button';
import Col from 'ravenjs/lib/Col';
import FaIcon from 'ravenjs/lib/FaIcon';

import UploadMembersAttendanceFile from './uploadMembersAttendanceFile';
/**
 TODO: This will be use in future scope.
 */
// import UploadMembersOptInFile from './uploadMembersOptInFile';

const DesktopButtonsContainerStyled = styled(Col)`
    display: inline-block;
    margin: 10px 10px 0 0;
    position: absolute;
    right: 0;
    ${({ theme }) => theme.media.down('lg')`
        display: none;
    `}
    ${({ theme }) => theme.media.down('md')`
        margin: 10px 10px 0 10px;
        position: relative;
    `}
`;

const FilesButtonStyled = styled(Button)`
    ${({ theme }) => theme.media.down('xl')`
       min-height: 30px;
       padding: 0;
       width: 55px;
    `}
`;
const IconButtonStyled = styled(Button)`
    ${({ theme }) => theme.media.down('xl')`
       min-height: 30px;
       width: 29px;
       padding: 0;
    `}
`;

const DesktopButtons = ({
  redirectToFile,
  openColumnOption,
  refreshMembersGrid,
}) => (
  <DesktopButtonsContainerStyled size={4}>
    {/**
       TODO: This will be use in future scope.
       */}
    {/* <UploadMembersOptInFile />*/}
    <FilesButtonStyled
      padding="10px"
      width="68px"
      noMinWidth
      noMinHeight
      height="36px"
      margin="0 0 0 10px"
      onClick={redirectToFile}
    >
      <FaIcon icon={faFile} />Files
    </FilesButtonStyled>
    <UploadMembersAttendanceFile />
    <IconButtonStyled
      width="36px"
      padding="10px"
      title="Configure"
      noMinWidth
      noMinHeight
      height="36px"
      margin="0 0 0 10px"
      onClick={openColumnOption}
    >
      <FaIcon icon={faCog} />
    </IconButtonStyled>
    <IconButtonStyled
      width="36px"
      padding="10px"
      noMinWidth
      noMinHeight
      height="36px"
      margin="0 0 0 10px"
      title="Refresh Students Information"
      onClick={refreshMembersGrid}
    >
      <FaIcon icon={faSync} />
    </IconButtonStyled>
  </DesktopButtonsContainerStyled>
);

DesktopButtons.propTypes = {
  openColumnOption: PropTypes.func,
  redirectToFile: PropTypes.func,
  refreshMembersGrid: PropTypes.func,
};

DesktopButtons.defaultProps = {
  openColumnOption: () => {},
  redirectToFile: () => {},
  refreshMembersGrid: () => {},
};

export default DesktopButtons;
