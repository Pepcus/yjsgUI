import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import FaIcon from 'pepcus-core/lib/FaIcon';
import moment from 'moment';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

import Button from 'pepcus-core/lib/Button';
import { getThemeProps } from 'pepcus-core/utils/theme';
import { accessControl } from 'pepcus-core/utils';

const DisabledButtonStyled = styled(Button)`
   margin: 0;
   padding: 5px 10px;
   display: ${props => (props.isView ? null : 'none')};
   ${({ theme }) => theme.media.down('lg')`
     display: none;
   `};
`;

const CSVLinkStyled = styled(CSVLink)`
    display: ${props => (props.disable === 'true' ? 'none' : 'all')};
    cursor: ${props => (props.disable === 'true' ? 'not-allowed' : null)};
    font-size: 14px;
    border-radius: 4px;
    background-color: ${getThemeProps('palette.action.hover')};
    color: ${props => (props.disable === 'true' ? getThemeProps('palette.common.placeholder')
    : getThemeProps('palette.common.darker'))};
    padding: 8px 11px;
    position: relative;
    text-decoration: none;
    box-shadow: ${props => (props.disable === 'true' ? null : getThemeProps('palette.action.disabled'))};
    &:hover {
        background-color: ${props => (props.disable === 'true' ? getThemeProps('palette.action.hover')
    : getThemeProps('palette.action.selected'))};
    }
    &:active {
        box-shadow: none;
    }
    ${({ theme }) => theme.media.down('lg')`
     display: none;
    `};
`;

const CSVExportButton = ({
  selectedMembers,
  constants,
  metaData,
}) => {
  const { EXPORT } = constants;
  const filterHeader = metaData.headerConfig.filter(obj =>
    obj.excludeFromExport !== true);
  const header = filterHeader.map(item =>
    ({ label: item.label, key: item.key, disable: item.disable }),
  );
  if (isEmpty(selectedMembers)) {
    return (
      <DisabledButtonStyled
        isView={isEmpty(selectedMembers)}
        softDisable={isEmpty(selectedMembers)}
        color="tertiary"
        noMinWidth
      >
        <FaIcon icon={faDownload} />
        {EXPORT}
      </DisabledButtonStyled>
    );
  }
  return (
    <CSVLinkStyled
      disable={isEmpty(selectedMembers) ? 'true' : 'false'}
      headers={header}
      data={selectedMembers}
      filename={`StudentData-${moment().format('DD-MM-YYYY-LT')}.csv`}
    >
      <FaIcon icon={faDownload} />
      {EXPORT}
    </CSVLinkStyled>
  );
};

CSVExportButton.propTypes = {
  constants: PropTypes.object,
  selectedMembers: PropTypes.array,
  metaData: PropTypes.object,
};

CSVExportButton.defaultProps = {
  constants: {},
  selectedMembers: [],
  metaData: {},
};

export default accessControl(CSVExportButton);
