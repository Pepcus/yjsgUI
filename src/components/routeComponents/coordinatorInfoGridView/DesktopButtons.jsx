import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons/faAddressCard';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import FaIcon from 'pepcus-core/lib/FaIcon';

import { getConstants } from 'reducers/constants';

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

const MemberViewStyled = styled(Button)`
    ${({ theme }) => theme.media.down('xl')`
       min-height: 30px;
       padding: 0;
       width: 136px;
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
  redirectToMemberView,
  openColumnOption,
  refreshMembersGrid,
  attendanceFileModalFormSchema,
  optInFileModalFormSchema,
  isUploadAttendanceFileEnable,
  isUploadOptInFileEnable,
}) => {
  const { FILES, COORDINATOR, MEMBER_VIEW } = constants;
  return (
    <DesktopButtonsContainerStyled>
      <Box width="auto" borderStyle="none" backgroundColor="unset">
        <MemberViewStyled
          padding="10px"
          width="136px"
          noMinWidth
          noMinHeight
          height="36px"
          margin="5px"
          onClick={redirectToMemberView}
        >
          <FaIcon padding="0 3px 0 0" icon={faAddressCard} />
          {MEMBER_VIEW}
        </MemberViewStyled>
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
