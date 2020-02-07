import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import { getApplicationTenant } from 'reducers/assetFilesReducer';
import { getConstants } from 'reducers/constants';
import { getApplicationConfiguration } from 'reducers/config';

const FooterWrapper = styled(Box)`
    text-align: center;
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 100%;
    color: ${getThemeProps('palette.footer.color')};
    padding: 10px 0;
    background: ${getThemeProps('palette.footer.backgroundColor')};
    border-top: 1px solid ${getThemeProps('palette.footer.borderColor')};
    ${({ theme }) => theme.media.down('lg')`
        position: relative;
    `}
    @media print {
        display: none;
    }
`;

const FooterStyled = styled(Typography)`
    font-size: 14px !important;
    background: ${getThemeProps('palette.footer.backgroundColor')};
    margin: 0 !important;
`;

const TitleStyled = styled(Typography)`
    font-size: 14px !important;
    font-weight: 600 !important;
    ${({ theme }) => theme.media.down('sm')`
        display: block;
   `}  
`;

/**
 * Footer component is common footer that will be rendered in bottom of all pages
 * @param {Object} config
 * @param {Object} constants
 * @param {String} location
 * @param {String} tenant
 * @return {HTML}
 */
const Footer = ({
  config,
  constants,
  location,
  tenant,
}) => {
  const { routes, footerTitle } = config;
  const { FOOTER_CONTACT_TEXT } = constants;

  const getFooterText = () => (footerTitle ? footerTitle : '');
  const renderFooterName = footerObject => (
    <FooterStyled
      type="title"
      style={footerObject.titleStyle}
    > {FOOTER_CONTACT_TEXT}
      <TitleStyled type="caption">
        {footerObject.title ? footerObject.title : getFooterText()}
      </TitleStyled>
    </FooterStyled>
  );

  return routes.map((route) => {
    const { footer = {}, path } = route;
    if (path === location) {
      return (
        <FooterWrapper
          borderRadius="0"
          padding="0"
          margin="0"
          style={footer.footerWrapperStyle ? footer.footerWrapperStyle : {}}
        >
          {renderFooterName(footer)}
        </FooterWrapper>
      );
    } return null;
  });
};

Footer.propTypes = {
  config: PropTypes.object,
  constants: PropTypes.object,
  location: PropTypes.string,
  routes: PropTypes.array,
  tenant: PropTypes.string,
  title: PropTypes.object,
};

Footer.defaultProps = {
  config: {},
  constants: {},
  location: '',
  routes: [],
  tenant: '',
  title: {},
};

const mapStateToProps = state => ({
  config: getApplicationConfiguration(state),
  constants: getConstants(state),
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, {
  getApplicationTenant,
})(Footer);
