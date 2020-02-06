import React from 'react';

import { getStyles } from 'constants/gridData';
import DataGrid from 'simple-react-data-grid';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'pepcus-core/lib/Box';
import { getThemeProps } from 'pepcus-core/utils/theme';

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
 * It return a grid for coordinators
 * @return {HTML} CoordinatorInfoGrid
 * @constructor
 */
const CoordinatorInfoGrid = ({
  constants,
  metaData,
  coordinators,
  getSelectedRow,
  onClickAllExport,
}) => {
  return (
    <GridWrapperStyled padding="0" borderStyle="none" backgroundColor="unset">
      <DataGrid
        getSelectedRow={getSelectedRow}
        data={coordinators}
        metaData={metaData}
        styles={getStyles()}
        onClickAllExport={onClickAllExport}
      />
    </GridWrapperStyled>
  )
};

CoordinatorInfoGrid.propTypes = {
  constants: PropTypes.object,
  getSelectedRow: PropTypes.func,
  coordinators: PropTypes.array,
  metaData: PropTypes.object,
  onClickAllExport: PropTypes.func,
};

CoordinatorInfoGrid.defaultProps = {
  constants: {},
  getSelectedRow: () => {},
  coordinators: [],
  metaData: {},
  onClickAllExport: () => {},
};


export default (CoordinatorInfoGrid);
