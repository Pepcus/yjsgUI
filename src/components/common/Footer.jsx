/*
* this class laval component will converted into functional laval*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  yjsgFooterText,
  yjsgFooterContactInfo,
} from '../../constants/yjsg';
import { isLoading } from '../../reducers/memberRegistrationReducer';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';

/**
 * Footer component is comment footer will will be render in bottom of all page
 * @type {Class}
 * @return {ReactComponent}
 */
class Footer extends Component {

  /**
   * getClassName method render className according where footer show and hide
   * @return {string}
   */
  getClassName = () => {
    if (this.props.isLoading) {
      return ('disable-footer');
    }
    return ('footer print-media-none footer-none');
  };
  render() {
    const { tenant } = this.props;
    return (
      <div className={this.getClassName()} >
        <p className="footer-text">{yjsgFooterText} <span className="contact-no-footer">{yjsgFooterContactInfo[tenant ? tenant : 'DEFAULT_FOOTER_CONTACT_INFORMATION']}</span>
        </p>
      </div>
    );
  }
}


Footer.propTypes = {
  isLoading: PropTypes.bool,
  tenant: PropTypes.string,
};

Footer.defaultProps = {
  isLoading: false,
  tenant: '',
};

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, {
  getApplicationTenant,
})(Footer);

