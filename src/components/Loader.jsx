import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { getLoaderState } from '../reducers/studentRegistrationReducer';
import spinner from '../assets/images/spinner.gif';
import CustomLoader from './commonComponents/CustomLoader';

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
const mapStateToProps = (state) => ({
  isLoading: getLoaderState(state),
});
export default connect(mapStateToProps)(Loader);
