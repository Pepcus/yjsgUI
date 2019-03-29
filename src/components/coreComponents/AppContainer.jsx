import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import { development } from '../../config/developmentColorCode.json';
import { production } from '../../config/productionColorCode.json';
import Routes from './Routes';
import { loadedAppDataAction } from '../../actions/assetFilesActions';
import { getModeVariable, getIsAppLoaded, getIsAppLoadedError } from '../../reducers/assetFilesReducer';
import { setAppColor } from '../../utils/dataGridUtils';
import { ERROR_MESSAGE_OF_LOAD_APP_DATA } from '../../utils/textConstants';

class AppContainer extends Component {
  componentDidMount() {
    this.props.loadedAppDataAction();
    if (this.props.isAppLoaded) {
      setAppColor(this.props.mode.environment === 'production' ? production : development);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAppLoaded) {
      setAppColor(nextProps.mode.environment === 'production' ? production : development);
    }
  }
  render() {
    if (this.props.isAppLoaded && !this.props.isAppLoadedError) {
      return (
        <HashRouter>
          <Route path="/" component={Routes} />
        </HashRouter>
      );
    } else if (this.props.isAppLoadedError) {
      return (
        <div>
          <div className="empty-column-message">
            <span className="circle-icon">
              <i className="fa fa-exclamation-triangle" />
            </span>
            {ERROR_MESSAGE_OF_LOAD_APP_DATA}
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  mode: getModeVariable(state),
  isAppLoaded: getIsAppLoaded(state),
  isAppLoadedError: getIsAppLoadedError(state),
});
export default connect(mapStateToProps, {
  loadedAppDataAction,
})(AppContainer);

