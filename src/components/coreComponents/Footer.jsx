/*
* this class laval component will converted into functional laval*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  yjsgFooterText,
  yjsgFooterContactInfo,
} from '../../utils/yjsgConstants';
import { isLoading } from '../../reducers/studentRegistrationReducer';
/**
 * Footer component is comment footer will will be render in bottom of all page
 * @type {Class}
 * @return {ReactComponent}
 */
class Footer extends Component {

  /**
   * renderClassName method render className according where footer show and hide
   * @return {string}
   */
  renderClassName = () => {
    if (this.props.isLoading) {
      return ('disable-footer');
    }
    return ('footer print-media-none footer-none');
  };
  render() {
    return (
      <div className={this.renderClassName()} >
        <p className="footer-text">{yjsgFooterText} <span className="contact-no-footer">{yjsgFooterContactInfo}</span>
        </p>
      </div>);
  }
}


Footer.propTypes = {
  isLoading: PropTypes.bool,
};

Footer.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  isLoading: isLoading(state),
});

export default connect(mapStateToProps, {
})(Footer);

