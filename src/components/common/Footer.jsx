/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Box from 'ravenjs/lib/Box';
import Typography from 'ravenjs/lib/Typography';

import {
  yjsgFooterText,
  DEFAULT_FOOTER_CONTACT_INFORMATION,
} from 'constants/yjsg';
import { isLoading } from 'reducers/memberRegistrationReducer';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import { routes, footerTitle } from 'config/appConfig.json';

const FooterWrapper = styled(Box)`
    text-align: center;
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 100%;
    color: #858585;
    padding: 10px 0;
    background: #f2f2f2;
    border-top: 1px solid #e8e6e6;
    ${({ theme }) => theme.media.down('lg')`
        position: relative;
    `}
    @media print {
        display: none;
    }
`;

const FooterStyled = styled(Typography)`
    font-size: 14px !important;
    background: #f2f2f2;
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
 * @param {Boolean} isLoaderLoaded
 * @return {HTML}
 */
const Footer = ({
  location,
  tenant,
  isLoaderLoaded,
}) => {
  const getFooterText = () => (footerTitle[tenant] ? footerTitle[tenant] : DEFAULT_FOOTER_CONTACT_INFORMATION);

  const renderFooterName = footerObject => (
    <FooterStyled
      type="title"
      style={footerObject.titleStyle}
    > {yjsgFooterText}
      <TitleStyled type="caption">
        {footerObject.title ? footerObject.title : getFooterText()}
      </TitleStyled>
    </FooterStyled>
  );

  return routes.map((route) => {
    const { footer = {}, path } = route;
    if (path === location && !isLoaderLoaded) {
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
  isLoaderLoaded: PropTypes.bool,
  location: PropTypes.string,
  routes: PropTypes.array,
  tenant: PropTypes.string,
  title: PropTypes.object,
};

Footer.defaultProps = {
  isLoaderLoaded: false,
  location: '',
  routes: [],
  tenant: '',
  title: {},
};

const mapStateToProps = state => ({
  isLoaderLoaded: isLoading(state),
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, {
  getApplicationTenant,
})(Footer);

