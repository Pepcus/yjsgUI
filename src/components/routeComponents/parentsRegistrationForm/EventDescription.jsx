/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

import Box from 'ravenjs/lib/Box';
import Row from 'ravenjs/lib/Row';
import Typography from 'ravenjs/lib/Typography';

import {
  DATE,
  EVENT_DATE,
  TIME,
  EVENT_TIME,
  PLACE,
  EVENT_PLACE,
} from 'constants/yjsg';

const TextFieldWrapper = styled(Box)`
    margin-bottom: 5px;
    padding: 0;
    display: flex;
    border-style: none;
    background-color: unset;
`;

const TextFieldStyled = styled(Typography)`
    flex: 0 15%;
    ${({ theme }) => theme.media.down('md')`
        flex: 0 1 20%;
    `}
    ${({ theme }) => theme.media.down('sm')`
        flex: 0 1 24%;
    `}
`;

/**
 * It return the event description
 * @return {HTML}
 */
const EventDescription = () => (
  <Row
    alignContent="center"
    justify="center"
    margin="30px 0 0 0"
    display="block"
  >
    <TextFieldWrapper>
      <TextFieldStyled
        fontWeight="500"
        fontSize="14px"
        type="caption"
      >
        {DATE}
      </TextFieldStyled>
      <Typography
        fontWeight="500"
        fontSize="14px"
        type="caption"
        gutterLeft="5px"
      >
        {EVENT_DATE}
      </Typography>
    </TextFieldWrapper>
    <TextFieldWrapper>
      <TextFieldStyled
        fontWeight="500"
        fontSize="14px"
        type="caption"
      >
        {TIME}
      </TextFieldStyled>
      <Typography
        fontWeight="500"
        fontSize="14px"
        type="caption"
        gutterLeft="5px"
      >
        {EVENT_TIME}
      </Typography>
    </TextFieldWrapper>
    <TextFieldWrapper>
      <TextFieldStyled
        fontWeight="500"
        fontSize="14px"
        type="caption"
      >
        {PLACE}
      </TextFieldStyled>
      <Typography
        fontWeight="500"
        fontSize="14px"
        type="caption"
        gutterLeft="5px"
      >
        {EVENT_PLACE}
      </Typography>
    </TextFieldWrapper>
  </Row>
);

export default EventDescription;
