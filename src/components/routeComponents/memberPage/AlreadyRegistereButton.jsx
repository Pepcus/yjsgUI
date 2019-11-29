import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';

import { getConstants } from 'reducers/constants';

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('sm')`
       width: 100%;
   `}
   @media (max-width: 992px) and (orientation: landscape) {
        width: 60%
    }
`;

const AlreadyRegisteredButton = ({
  constants,
  isAlreadyRegisteredButtonEnabled,
  redirectToMemberLogin,
  config,
}) => {
  const { ALREADY_REGISTERED } = constants;
  const { homePageButtons } = config;
  const { memberLogin } = homePageButtons;
  if (isAlreadyRegisteredButtonEnabled && memberLogin) {
    return (
      <ButtonStyled margin="10px" onClick={redirectToMemberLogin}>
        {ALREADY_REGISTERED}
      </ButtonStyled>
    );
  } return null;
};

AlreadyRegisteredButton.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  isAlreadyRegisteredButtonEnabled: PropTypes.bool,
  redirectToMemberLogin: PropTypes.func,
};

AlreadyRegisteredButton.defaultProps = {
  config: {},
  constants: {},
  isAlreadyRegisteredButtonEnabled: false,
  redirectToMemberLogin: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(AlreadyRegisteredButton);
