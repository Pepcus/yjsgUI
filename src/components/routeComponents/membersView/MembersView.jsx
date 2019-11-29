import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import DataGrid from 'simple-react-data-grid';

import Box from 'pepcus-core/lib/Box';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import { getStyles, gridHeaderDataForMemberView } from 'constants/gridData';
import { getConstants } from 'reducers/constants';
import { allMembersData } from 'reducers/allMembersDataReducer';
import { formatMembers } from 'utils/common';
import Container from 'pepcus-core/lib/Container';
import * as DataFormatter from 'utils/common/gridDataFormatter/index';

const MessageBoxStyled = styled(Box)`
    margin: 20px 10px;
    color: ${getThemeProps('palette.text.color')};
    padding: 15px 20px;
    border: 1px solid ${getThemeProps('palette.action.disabledBackground')};
    animation-name: column-message;
    animation-duration: 0.7s;
    transition: 0.3s all;
    background: ${getThemeProps('palette.action.hover')};
    width: 98%
    ${({ theme }) => theme.media.down('lg')`
      width: 95%
    `}
    ${({ theme }) => theme.media.down('md')`
        line-height: 22px;
        display: flex;
    `}
`;

const GridWrapperStyled = styled(Box)`
    @media print {
      display: none;
    }
`;

const ContainerStyled = styled(Container)`
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    ${({ theme }) => theme.media.down('lg')`
     overflow-y: inherit;
        display: block;
        height: auto;
        min-height: 100%;
    `};
    @media print {
        height: auto;
        min-height: 100%;
    }
`;

const BoxStyled = styled(Box)`
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    flex-direction: column;
    ${({ theme }) => theme.media.down('lg')`
        overflow-y: unset;
        margin-bottom: 0;
        margin-top: 0;
    `};
    @media print {
        margin-bottom: 0;
        display:block;
        margin-top: 0;
    }
`;

/**
 * It return DataGrid with member information.
 * In case if data is not present than it will return
 * "यहाँ जानकारी उपलब्ध नहीं है।" message instead
 * of DataGrid OR when data is present and headerConfig is empty(column not present)
 * than it will render "आपने शून्य स्तंभों को चुना है इसलिए वहाँ जानकारी उपलब्ध नहीं है।" message.
 * @return {HTML}
 */
const MembersView = ({
  constants,
  config,
  members,
}) => {
  const metaData = gridHeaderDataForMemberView({
    gridMetaData: config.gridMetaData,
  });
  let membersData = formatMembers({ members });
  const { gridDataFormatter } = config;
  if (gridDataFormatter) {
    membersData = DataFormatter[gridDataFormatter]({ members: membersData });
  }
  const {
    INFORMATION_NOT_AVAILABLE_MESSAGE,
  } = constants;

  if (isEmpty(membersData)) {
    return (
      <MessageBoxStyled>
        <Typography type="caption" padding="0 15px 0 0">
          <FaIcon icon={faExclamationTriangle} />
        </Typography>
        {INFORMATION_NOT_AVAILABLE_MESSAGE}
      </MessageBoxStyled>
    );
  }
  return (
    <ContainerStyled width="100%">
      <BoxStyled
        borderStyle="none"
        height="100%"
        width="100%"
        padding="0"
        margin="80px 0 33px"
      >
        <GridWrapperStyled padding="0" borderStyle="none" backgroundColor="unset">
          <DataGrid
            data={membersData}
            metaData={metaData}
            styles={getStyles()}
          />
        </GridWrapperStyled>
      </BoxStyled>
    </ContainerStyled>
  );
};

MembersView.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  members: PropTypes.array,
};

MembersView.defaultProps = {
  config: {},
  constants: {},
  members: [],
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  members: allMembersData(state),
});

export default connect(mapStateToProps, null)(MembersView);
