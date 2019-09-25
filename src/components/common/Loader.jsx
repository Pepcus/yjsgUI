import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoaderState } from '../../reducers/memberRegistrationReducer';
import CustomLoader from './CustomLoader';

/**
 * Loader render loader
 * @param {boolean} isLoading
 * @type {Function}
 * @return {HTML}
 */
const Loader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div>
        <CustomLoader loaderColor="var(--app-loader-color)" />
      </div>
    );
  }
  return null;
};
const mapStateToProps = state => ({
  isLoading: getLoaderState(state),
});

Loader.propTypes = {
  isLoading: PropTypes.bool,
};
Loader.defaultProps = {
  isLoading: false,
};
export default connect(mapStateToProps)(Loader);
