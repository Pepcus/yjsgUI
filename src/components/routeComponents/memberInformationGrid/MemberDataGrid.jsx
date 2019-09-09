/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import DataGrid from 'simple-react-data-grid';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Box from 'ravenjs/lib/Box';
import FaIcon from 'ravenjs/lib/FaIcon';
import Typography from 'ravenjs/lib/Typography';

import {
  INFORMATION_NOT_AVAILABLE_MESSAGE,
  NO_COLUMNS_SELECTED_MESSAGE,
} from 'constants/messages';
import { getStyles } from 'constants/gridData';

const MessageBoxStyled = styled(Box)`
    margin: 20px 10px;
    color: #5d5b5b;
    padding: 15px 20px;
    border: 1px solid #dedddd;
    animation-name: column-message;
    animation-duration: 0.7s;
    transition: 0.3s all;
    background: #f2f2f4;
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
  metaData,
  members,
  getSelectedRow,
  onClickAllExport,
}) => {
  if (isEmpty(metaData.headerConfig)) {
    return (
      <MessageBoxStyled>
        <Typography type="caption" padding="0 15px 0 0">
          <FaIcon icon={faExclamationTriangle} />
        </Typography>
        {NO_COLUMNS_SELECTED_MESSAGE}
      </MessageBoxStyled>
    );
  } else if (isEmpty(members)) {
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
        data={members}
        metaData={metaData}
        styles={getStyles()}
        onClickAllExport={onClickAllExport}
      />
    </GridWrapperStyled>
  );
};

MemberDataGrid.propTypes = {
  getSelectedRow: PropTypes.func,
  members: PropTypes.array,
  metaData: PropTypes.object,
  onClickAllExport: PropTypes.func,
};

MemberDataGrid.defaultProps = {
  getSelectedRow: () => {},
  members: [],
  metaData: {},
  onClickAllExport: () => {},
};

export default MemberDataGrid;
