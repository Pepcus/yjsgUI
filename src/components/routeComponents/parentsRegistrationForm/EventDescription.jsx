import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import { getAppConstantsConfig } from 'reducers/constants';

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
const EventDescription = ({ appConstants }) => {
  const {
    DATE,
    PARENT_EVENT_DATE,
    TIME,
    EVENT_TIME,
    PLACE,
    EVENT_PLACE,
  } = appConstants;

  return (
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
          {PARENT_EVENT_DATE}
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
};

EventDescription.propTypes = {
  appConstants: PropTypes.object,
};

EventDescription.defaultProps = {
  appConstants: {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(EventDescription);
