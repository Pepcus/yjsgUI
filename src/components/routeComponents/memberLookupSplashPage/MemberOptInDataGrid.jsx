import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getStyles } from 'constants/gridData';
import DataGrid from 'simple-react-data-grid';
import { getConstants } from 'reducers/constants';


/**
 * It renders MemberOptInDataGrid on Splash Page
 * @return {HTML} MemberOptInDataGrid
 * @constructor
 */
const MemberOptInDataGrid = ({
  metaData,
  gridData,
  onChangeGridOptIn,
  constants,
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
    const { rowData: { id, optIn2021 } } = props;
    const { YES_HINDI, NO_HINDI } = constants;
    const [optIn, setOptIn] = useState(optIn2021);

    const onChangeOptIn = (event) => {
      setOptIn(event.target.value);
      onChangeGridOptIn(updateGridData({
        ...props.rowData,
        optIn2021: event.target.value,
      }))
    };
    return (
      <form>
        <fieldset id={id}>
          <input type="radio" value="Y" id="Y" name={id} onChange={onChangeOptIn} checked={optIn === 'Y'}/>
          <label htmlFor="Y">{YES_HINDI}</label>
          <input type="radio" value="N" id="N" name={id} onChange={onChangeOptIn} checked={optIn === 'N'}/>
          <label htmlFor="N">{NO_HINDI}</label>
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

MemberOptInDataGrid.propTypes = {
  metaData: PropTypes.object,
  gridData: PropTypes.array,
  onChangeGridOptIn: PropTypes.func,
  constants: PropTypes.object,
};

MemberOptInDataGrid.defaultProps = {
  metaData: {},
  gridData: [],
  onChangeGridOptIn: () => {},
  constants: {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps)(MemberOptInDataGrid);
