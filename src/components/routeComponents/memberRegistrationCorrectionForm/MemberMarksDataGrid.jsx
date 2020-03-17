import React from 'react';

import { getStyles } from 'constants/gridData';
import DataGrid from 'simple-react-data-grid';

/**
 * It return success message popup
 * @return {HTML} successMessagePopup
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


export default (MemberMarksDataGrid);
