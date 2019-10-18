import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';

import { getAppConstantsConfig } from 'reducers/constants';

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('sm')`
       width: 100%;
   `}
   @media (max-width: 992px) and (orientation: landscape) {
        width: 60%
    }
`;

const AlreadyRegisteredButton = ({
  appConstants,
  isAlreadyRegisteredButtonEnabled,
  redirectToMemberLogin,
}) => {
  const { ALREADY_REGISTERED } = appConstants;
  if (isAlreadyRegisteredButtonEnabled) {
    return (
      <ButtonStyled margin="10px" onClick={redirectToMemberLogin}>
        {ALREADY_REGISTERED}
      </ButtonStyled>
    );
  } return null;
};

AlreadyRegisteredButton.propTypes = {
  appConstants: PropTypes.object,
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  redirectToMemberLogin: PropTypes.func,
};

AlreadyRegisteredButton.defaultProps = {
  appConstants: {},
  isAlreadyRegisteredButtonEnabled: false,
  redirectToMemberLogin: () => {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(AlreadyRegisteredButton);
