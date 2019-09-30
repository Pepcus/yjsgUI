/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

import { getThemeProps } from 'pepcus-core/utils/theme';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import {
  ID_CARD_PRINT_STATUS_FOR_SELECTED_MEMBERS_LABEL,
} from 'constants/label';

const RowStyled = styled(Row)`
    background: ${getThemeProps('colors.header')};
`;

const ModalHeader = () => (
  <RowStyled
    padding="10px"
    margin="-1px -1px 20px -1px"
  >
    <Typography
      gutterLeft="15px"
      gutterRight="15px"
      fontSize="20px"
      color="white"
    >
      {ID_CARD_PRINT_STATUS_FOR_SELECTED_MEMBERS_LABEL}
    </Typography>
  </RowStyled>
);

export default ModalHeader;
