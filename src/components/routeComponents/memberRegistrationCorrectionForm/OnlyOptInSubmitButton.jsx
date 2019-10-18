import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';

import { isUserMember } from 'utils/form';
import { getAppConstantsConfig } from 'reducers/constants';

const SubmitButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('sm')`
       width: 100%;
   `}
`;

/**
 * OnlyOptInSubmitButton render back button conditionally
 * @param {Object} appConstants
 * @param {Boolean} onlyOptInForm
 * @param {Function} submitMemberDataForOnlyOptInCase
 * @param {String} user
 * @return {HTML} back button
 * @constructor
 */
const OnlyOptInSubmitButton = ({
  appConstants,
  onlyOptInForm,
  submitMemberDataForOnlyOptInCase,
  user,
}) => {
  const { SUBMIT } = appConstants;

  if (isUserMember({ user }) && onlyOptInForm) {
    return (
      <Row margin="0 50px">
        <SubmitButtonStyled
          onClick={submitMemberDataForOnlyOptInCase}
        >
          {SUBMIT}
        </SubmitButtonStyled>
      </Row>
    );
  } return null;
};

OnlyOptInSubmitButton.propTypes = {
  appConstants: PropTypes.object,
  onlyOptInForm: PropTypes.bool,
  submitMemberDataForOnlyOptInCase: PropTypes.func,
  user: PropTypes.string,
};

OnlyOptInSubmitButton.defaultProps = {
  appConstants: {},
  onlyOptInForm: false,
  submitMemberDataForOnlyOptInCase: () => {},
  user: '',
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(OnlyOptInSubmitButton);
