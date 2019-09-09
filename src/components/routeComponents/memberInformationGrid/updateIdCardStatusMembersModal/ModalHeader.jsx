/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

import { getThemeProps } from 'ravenjs/utils/theme';
import Row from 'ravenjs/lib/Row';
import Typography from 'ravenjs/esm/lib/Typography';

import {
  ID_CARD_PRINT_STATUS_FOR_SELECTED_STUDENTS_LABEL,
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
      {ID_CARD_PRINT_STATUS_FOR_SELECTED_STUDENTS_LABEL}
    </Typography>
  </RowStyled>
);

export default ModalHeader;
