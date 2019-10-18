import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import { getConstants } from 'reducers/constants';

const FooterStyled = styled(Box)`
    z-index: 1000;
    text-align: center;
    position: fixed;
    bottom: 5px;
    padding: 0;
    margin: 0;
    width: 100%;
    color: ${getThemeProps('palette.footer.color')};
    background: ${getThemeProps('palette.footer.backgroundColor')};
    border-top: 1px solid ${getThemeProps('palette.footer.backgroundColor')};
    ${({ theme }) => theme.media.down('lg')`
        position: relative;
        padding: 0;
        margin: 0;
    `}
    ${({ theme }) => theme.media.down('md')`
        padding: 0;
        margin: 0;
    `}
    @media print {
        display: none;
    }
`;

const FooterTextWrapper = styled(Typography)`
    font-size: 14px;
    background: ${getThemeProps('palette.footer.backgroundColor')};
    z-index: 1000;
    padding: 0;
    margin: 0;
    margin-bottom: 0 !important;
    ${({ theme }) => theme.media.down('md')`
        padding: 0;
        margin: 0;
    `}
`;

const FooterTextStyled = styled(Typography)`
    padding: 0;
    margin: 0 !important;
    z-index: 1000;
    font-weight: 600;
    ${({ theme }) => theme.media.down('md')`
        display: block;
        padding: 0;
        margin: 0;
    `}
`;
/**
 * It return the custom footer
 * @return {HTML}
 */
const CustomFooter = ({ constants }) => {
  const {
    CUSTOM_FOOTER_INFORMATION,
    THANKS,
  } = constants;

  return (
    <FooterStyled>
      <FooterTextWrapper>
        <FooterTextStyled>
          {CUSTOM_FOOTER_INFORMATION}
        </FooterTextStyled>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterTextStyled>
          {THANKS}
        </FooterTextStyled>
      </FooterTextWrapper>
    </FooterStyled>
  );
};

CustomFooter.propTypes = {
  constants: PropTypes.object,
};

CustomFooter.defaultProps = {
  constants: {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(CustomFooter);
