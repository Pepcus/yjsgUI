import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { getLoaderState } from '../reducers/studentRegistrationReducer';
import spinner from '../assets/images/spinner.gif';

const Loader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="new-loader-wrapper">
        <div className="loader">
          <img src={spinner} alt="logo" className="loader-img" />
        </div>
      </div>);
  }
  return null;
};
const mapStateToProps = (state) => ({
  isLoading: getLoaderState(state),
});
export default connect(mapStateToProps)(Loader);
