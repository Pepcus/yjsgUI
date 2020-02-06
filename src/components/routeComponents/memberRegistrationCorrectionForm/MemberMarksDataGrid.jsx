import React from 'react';
import PropTypes from 'prop-types';

import { getStyles } from 'constants/gridData';
import DataGrid from 'simple-react-data-grid';

/**
 * It return a grid for member marks
 * @return {HTML} MemberMarksDataGrid
 * @constructor
 */
const MemberMarksDataGrid = ({
  metaData,
  gridData,
}) => {
  return (
    <DataGrid
      data={gridData}
      metaData={metaData}
      styles={getStyles()}
    />
  )
};

MemberMarksDataGrid.propTypes = {
  metaData: PropTypes.object,
  gridData: PropTypes.array,
};

MemberMarksDataGrid.defaultProps = {
  metaData: {},
  gridData: [],
};


export default (MemberMarksDataGrid);
