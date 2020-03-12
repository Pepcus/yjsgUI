import React, {useState} from 'react';


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


export default (MemberOptInGridSelectionRadio);
