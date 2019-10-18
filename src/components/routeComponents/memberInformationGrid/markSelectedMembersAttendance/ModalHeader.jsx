import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getThemeProps } from 'pepcus-core/utils/theme';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import { getAppConstantsConfig } from 'reducers/constants';

const RowStyled = styled(Row)`
    background: ${getThemeProps('colors.header')};
`;

const ModalHeader = ({
  appConstants,
}) => {
  const { MARK_SELECTED_MEMBERS_ATTENDANCE_LABEL } = appConstants;

  return (
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
        {MARK_SELECTED_MEMBERS_ATTENDANCE_LABEL}
      </Typography>
    </RowStyled>
  );
};

ModalHeader.propTypes = {
  appConstants: PropTypes.object,
};

ModalHeader.defaultProps = {
  appConstants: {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(ModalHeader);
