import React, { useState } from 'react';

import { getStyles } from 'constants/gridData';
import DataGrid from 'simple-react-data-grid';


/**
 * It renders MemberOptInDataGrid on Splash Page
 * @return {HTML} MemberOptInDataGrid
 * @constructor
 */
const MemberOptInDataGrid = ({
  metaData,
  gridData,
  onChangeGridOptIn,
}) => {

  const updateGridData = (rowData) => {
    return gridData.map(gridDataRow => {
      if (gridDataRow.id === rowData.id) {
        return {
          ...gridDataRow,
          ...rowData,
        }
      }
      return gridDataRow;
    })
  };
  /**
   * It is custom component for MemberOptInGridSelectionRadio on DataGrid
   * @return {HTML} MemberOptInGridSelectionRadio
   * @constructor
   */
  const MemberOptInGridSelectionRadio = (props) => {
    const { rowData: { id, optIn2020 } } = props;
    const [optIn, setOptIn] = useState(optIn2020);

    const onChangeOptIn = (event) => {
      setOptIn(event.target.value);
      onChangeGridOptIn(updateGridData({
        ...props.rowData,
        optIn2020: event.target.value,
      }))
    };
    return (
      <form>
        <fieldset id={id}>
          <input type="radio" value="Y" id="Y" name={id} onChange={onChangeOptIn} checked={optIn === 'Y'}/>
          <label htmlFor="Y">Y</label>
          <input type="radio" value="N" id="N" name={id} onChange={onChangeOptIn} checked={optIn === 'N'}/>
          <label htmlFor="N">N</label>
        </fieldset>
      </form>
    );
  };

  const getFormattedMetaData = (metaData) => {
    const updatedHeaderConfig = metaData.headerConfig.map(metaConfig => {
      if (metaConfig.key === 'optIn') {
        return {
          ...metaConfig,
          customComponent: MemberOptInGridSelectionRadio
        }
      }
      return {
        ...metaConfig
      }
    });
    return {
      ...metaData,
      headerConfig: updatedHeaderConfig
    }
  };

  return (
    <DataGrid
      data={gridData}
      metaData={getFormattedMetaData(metaData)}
      styles={getStyles()}
    />
  )
};


export default (MemberOptInDataGrid);
