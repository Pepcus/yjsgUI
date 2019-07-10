/**
* this class level component will converted into functional level
* */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  footerText,
  footerContactInfo,
} from '../../constants/yjsg';
import { isLoading } from '../../reducers/studentRegistrationReducer';
import { getTenantName } from '../../reducers/appConfigReducer';

/**
 * Footer component is common footer for all route.
 * It will be render in bottom of all page.
 * @type {Class}
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
    return (
      <div className={this.getClassName()} >
        <p className="footer-text">{footerText} <span className="contact-no-footer">{footerContactInfo[this.props.tenant]}</span>
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
  tenant: getTenantName(state),
});

export default connect(mapStateToProps, {
  getTenantName,
})(Footer);

