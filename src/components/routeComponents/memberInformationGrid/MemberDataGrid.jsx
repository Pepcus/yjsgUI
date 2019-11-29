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

import { getStyles } from 'constants/gridData';
import { getConstants } from 'reducers/constants';
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

/**
 * It return DataGrid with member information.
 * In case if data is not present than it will return
 * "यहाँ जानकारी उपलब्ध नहीं है।" message instead
 * of DataGrid OR when data is present and headerConfig is empty(column not present)
 * than it will render "आपने शून्य स्तंभों को चुना है इसलिए वहाँ जानकारी उपलब्ध नहीं है।" message.
 * @return {HTML}
 */
const MemberDataGrid = ({
  gridDataFormatter,
  constants,
  metaData,
  members,
  getSelectedRow,
  onClickAllExport,
}) => {
  const {
    NO_COLUMNS_SELECTED_MESSAGE,
    INFORMATION_NOT_AVAILABLE_MESSAGE,
  } = constants;
  let membersData = members;
  if (gridDataFormatter) {
    membersData = DataFormatter[gridDataFormatter]({ members: membersData });
  }
  if (isEmpty(metaData.headerConfig)) {
    return (
      <MessageBoxStyled>
        <Typography type="caption" padding="0 15px 0 0">
          <FaIcon icon={faExclamationTriangle} />
        </Typography>
        {NO_COLUMNS_SELECTED_MESSAGE}
      </MessageBoxStyled>
    );
  } else if (isEmpty(membersData)) {
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
    <GridWrapperStyled padding="0" borderStyle="none" backgroundColor="unset">
      <DataGrid
        getSelectedRow={getSelectedRow}
        data={membersData}
        metaData={metaData}
        styles={getStyles()}
        onClickAllExport={onClickAllExport}
      />
    </GridWrapperStyled>
  );
};

MemberDataGrid.propTypes = {
  constants: PropTypes.object,
  getSelectedRow: PropTypes.func,
  members: PropTypes.array,
  metaData: PropTypes.object,
  onClickAllExport: PropTypes.func,
};

MemberDataGrid.defaultProps = {
  constants: {},
  getSelectedRow: () => {},
  members: [],
  metaData: {},
  onClickAllExport: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(MemberDataGrid);
