/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'pepcus-core/lib/Link';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import {
  CLICK_HERE_TEXT,
  UPDATE_FURTHER_INFORMATION_TEXT,
} from 'constants/text';
import { isUserMember } from 'utils/registrationFormUtils';

const LinkStyled = styled(Link)`
  &:hover {
     color: ${getThemeProps('colors.PRIMARY')};
     text-decoration: underline;
  }
`;

/**
 * Render link of update other information conditionally
 * @param {Function} changeIsOnlyOptIn
 * @param {Boolean} onlyOptInForm
 * @param {String} user
 * @return {HTML} update other information link
 * @constructor
 */
const OtherInformationEditLink = ({
  changeIsOnlyOptIn,
  onlyOptInForm,
  user,
}) => {

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
  changeIsOnlyOptIn: PropTypes.func,
  onlyOptInForm: PropTypes.bool,
  user: PropTypes.string,
};

OtherInformationEditLink.defaultProps = {
  changeIsOnlyOptIn: () => {},
  onlyOptInForm: false,
  user: '',
};

export default OtherInformationEditLink;
