/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

import { getThemeProps } from 'ravenjs/utils/theme';
import Row from 'ravenjs/lib/Row';
import Typography from 'ravenjs/lib/Typography';

import {
  UPLOAD_FILE_TEXT,
} from 'constants/text';

const RowStyled = styled(Row)`
    background: ${getThemeProps('colors.header')};
`;

const ModalHeader = () => (
  <RowStyled
    padding="10px"
    margin="-1px -1px 0 -1px"
  >
    <Typography
      gutterLeft="15px"
      gutterRight="15px"
      fontSize="20px"
      color="white"
    >
      {UPLOAD_FILE_TEXT}
    </Typography>
  </RowStyled>
);

export default ModalHeader;