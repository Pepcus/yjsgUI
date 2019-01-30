import React from 'react';

import {
  yjsgFooterText,
  yjsgFooterContactInfo,
} from '../../utils/yjsgConstants';

const Footer = (props) => {
    return (
      <div className="footer print-media-none">
        <p className="footer-text">{yjsgFooterText} <span className="contact-no-footer">{yjsgFooterContactInfo}</span></p>
      </div>)
};


export default Footer;
