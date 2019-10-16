import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import {
  FOOTER_CONTACT_TEXT,
  DEFAULT_FOOTER_CONTACT_INFORMATION,
} from 'constants/yjsg';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import { routes, footerTitle } from 'config/appConfig.json';

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
 * @param {String} location
 * @param {String} tenant
 * @return {HTML}
 */
const Footer = ({
  location,
  tenant,
}) => {
  const getFooterText = () => (footerTitle[tenant] ? footerTitle[tenant] : DEFAULT_FOOTER_CONTACT_INFORMATION);

  const renderFooterName = footerObject => (
    <FooterStyled
      type="title"
      style={footerObject.titleStyle}
    >
      {FOOTER_CONTACT_TEXT}
      <TitleStyled type="caption">
        {footerObject.title ? footerObject.title : getFooterText()}
      </TitleStyled>
    </FooterStyled>
  );

  const route = routes.find(({ path }) => path === location);
  const { footer = {} } = route;

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
};

Footer.propTypes = {
  location: PropTypes.string,
  tenant: PropTypes.string,
};

Footer.defaultProps = {
  location: '',
  tenant: '',
};

const mapStateToProps = state => ({
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, {
  getApplicationTenant,
})(Footer);

