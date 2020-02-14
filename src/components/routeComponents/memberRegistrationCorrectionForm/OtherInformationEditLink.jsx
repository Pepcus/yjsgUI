import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'pepcus-core/lib/Link';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import { isUserMember } from 'utils/form';
import { getConstants } from 'reducers/constants';

const LinkStyled = styled(Link)`
  &:hover {
     color: ${getThemeProps('colors.PRIMARY')};
     text-decoration: underline;
  }
  color: ${getThemeProps('colors.PRIMARY')};
`;

/**
 * Render link of update other information conditionally
 * @param {Object} constants
 * @param {Function} changeIsOnlyOptIn
 * @param {Boolean} onlyOptInForm
 * @param {String} user
 * @return {HTML} update other information link
 * @constructor
 */
const OtherInformationEditLink = ({
  constants,
  changeIsOnlyOptIn,
  onlyOptInForm,
  user,
}) => {
  const {
    UPDATE_FURTHER_INFORMATION_TEXT,
    CLICK_HERE_TEXT,
  } = constants;

  const onlyOptInChanged = () => {
    changeIsOnlyOptIn(false);
  };

  if (isUserMember({ user }) && onlyOptInForm) {
    return (
      <Typography padding="25px 0 45px 50px" fontSize="16px">{UPDATE_FURTHER_INFORMATION_TEXT}
        <LinkStyled padding="0 0px 0px 4px" fontSize="16px" onClick={onlyOptInChanged}>{CLICK_HERE_TEXT}
        </LinkStyled>
      </Typography>
    );
  }
  return null;
};

OtherInformationEditLink.propTypes = {
  constants: PropTypes.object,
  changeIsOnlyOptIn: PropTypes.func,
  onlyOptInForm: PropTypes.bool,
  user: PropTypes.string,
};

OtherInformationEditLink.defaultProps = {
  constants: {},
  changeIsOnlyOptIn: () => {},
  onlyOptInForm: false,
  user: '',
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(OtherInformationEditLink);
