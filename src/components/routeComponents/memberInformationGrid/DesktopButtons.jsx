import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import FaIcon from 'pepcus-core/lib/FaIcon';

import { getConstants } from 'reducers/constants';

import UploadMembersAttendanceFile from './uploadMembersAttendanceFile';
/**
 TODO: This will be use in future scope.
 */
import UploadMembersOptInFile from './uploadMembersOptInFile';

const DesktopButtonsContainerStyled = styled(Box)`
    background-color: unset;
    border-style: none; 
    display: flex;
    flex-flow: row-reverse
    width: 35%;
    ${({ theme }) => theme.media.down('xl')`
        width: 40%;
    `}
    ${({ theme }) => theme.media.down('lg')`
        display: none;
    `}
    ${({ theme }) => theme.media.down('md')`
        margin: 10px 10px 0 10px;
    `}
`;

const CoordinatorViewStyled = styled(Button)`
    ${({ theme }) => theme.media.down('xl')`
       min-height: 30px;
       padding: 0;
       width: 160px;
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
  constants,
  redirectToFile,
  redirectToCoordinatorView,
  openColumnOption,
  refreshMembersGrid,
  attendanceFileModalFormSchema,
  optInFileModalFormSchema,
  isUploadAttendanceFileEnable,
  isUploadOptInFileEnable,
}) => {
  const { FILES, COORDINATOR, COORDINATOR_VIEW } = constants;
  return (
    <DesktopButtonsContainerStyled>
      <Box width="auto" borderStyle="none" backgroundColor="unset">
        {/**
         TODO: This will be use in future scope.
         */}

        <UploadMembersOptInFile
          optInFileModalFormSchema={optInFileModalFormSchema}
          acl={isUploadOptInFileEnable}
        />
        <CoordinatorViewStyled
          padding="10px"
          width="160px"
          noMinWidth
          noMinHeight
          height="36px"
          margin="5px"
          onClick={redirectToCoordinatorView}
        >
          <FaIcon padding="0 3px 0 0" icon={faUsers} />
          {COORDINATOR_VIEW}
        </CoordinatorViewStyled>
        <FilesButtonStyled
          padding="10px"
          width="68px"
          noMinWidth
          noMinHeight
          height="36px"
          margin="5px"
          onClick={redirectToFile}
        >
          <FaIcon padding="0 3px 0 0" icon={faFile} />
          {FILES}
        </FilesButtonStyled>
        <UploadMembersAttendanceFile
          attendanceFileModalFormSchema={attendanceFileModalFormSchema}
          acl={isUploadAttendanceFileEnable}
        />
        <IconButtonStyled
          width="36px"
          padding="10px"
          title="Configure"
          noMinWidth
          noMinHeight
          height="36px"
          margin="5px"
          onClick={openColumnOption}
        >
          <FaIcon padding="0 3px 0 0" icon={faCog} />
        </IconButtonStyled>
        <IconButtonStyled
          width="36px"
          padding="10px"
          noMinWidth
          noMinHeight
          height="36px"
          margin="5px"
          title="Refresh Students Information"
          onClick={refreshMembersGrid}
        >
          <FaIcon padding="0 3px 0 0" icon={faSync} />
        </IconButtonStyled>
      </Box>
    </DesktopButtonsContainerStyled>
  );
};

DesktopButtons.propTypes = {
  constants: PropTypes.object,
  openColumnOption: PropTypes.func,
  redirectToFile: PropTypes.func,
  redirectToCoordinator: PropTypes.func,
  refreshMembersGrid: PropTypes.func,
  attendanceFileModalFormSchema: PropTypes.object,
  optInFileModalFormSchema: PropTypes.object,
  isUploadAttendanceFileEnable: PropTypes.bool,
  isUploadOptInFileEnable: PropTypes.bool,
};

DesktopButtons.defaultProps = {
  constants: {},
  openColumnOption: () => {},
  redirectToFile: () => {},
  redirectToCoordinator: () => {},
  refreshMembersGrid: () => {},
  attendanceFileModalFormSchema: {},
  optInFileModalFormSchema: {},
  isUploadAttendanceFileEnable: false,
  isUploadOptInFileEnable: false,
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(DesktopButtons);
