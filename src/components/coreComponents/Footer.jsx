import React, {Component} from 'react';

import {
  yjsgFooterText,
  yjsgFooterContactInfo,
} from '../../utils/yjsgConstants';
import { isLoading } from '../../reducers/studentRegistrationReducer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Footer extends Component {
  constructor(props){
    super(props);
  };
  renderClassName = () =>{
    if(this.props.isLoading){
      return ("disable-footer");
    }else {
      return ("footer print-media-none");
    }
  };
  render() {
    return (
      <div className={this.renderClassName()}>
        <p className="footer-text">{yjsgFooterText} <span className="contact-no-footer">{yjsgFooterContactInfo}</span>
        </p>
      </div>)
  };
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


