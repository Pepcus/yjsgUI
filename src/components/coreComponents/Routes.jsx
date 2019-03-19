import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import SplashPage from '../SplashPage';
import StudentRegistrationForm from '../StudentRegistrationForm';
import StudentRegistrationCorrectionForm from '../StudentRegistrationCorrectionForm';
import Footer from './Footer';
import Loader from '../Loader';
import SplashPagePrePopulated from '../SplashPagePrePopulated';
import AdminPanel from '../AdminPanel';
import StudentInformationGrid from '../StudentInformationGrid';
import StudentCredentialPage from '../StudentCredentialPage';
import StudentPage from '../StudentPage';
import Context from './ConfigProvider';
import ParentsRegistration from '../ParentsRegistrationForm';

/**
 * Routes component maintain all routes
 * And send all previous location path to all routes.
 * @type {Class}
 */
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousLocation: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        previousLocation: this.props.location.pathname,
      });
    }
  }

  render() {
    const { Consumer } = Context;
    return (
      <div>
        <Context.Provider previousLocation={this.state.previousLocation}>
          <Route
            exact
            path="/"
            component={() => (
              <Consumer>
                {context => <StudentPage context={context} />}
              </Consumer>
            )}
          />
          <Route
            exact
            path="/admin"
            component={() => (
              <Consumer>
                {context => <SplashPage context={context} />}
              </Consumer>
            )}
          />
          <Route
            exact
            path="/student-search"
            component={() => (
              <Consumer>
                {context => <StudentInformationGrid context={context} />}
              </Consumer>
            )}
          />
          <Route
            exact
            path="/home"
            component={() => (
              <Consumer>
                {context => <SplashPagePrePopulated context={context} />}
              </Consumer>
            )}
          />
          <Route
            exact
            path="/studentRegister"
            component={() => (
              <Consumer>
                {context => <StudentRegistrationForm context={context} />}
              </Consumer>
            )}
          />
          <Route
            exact
            path="/studentCorrection"
            component={() => (
              <Consumer>
                {context => <StudentRegistrationCorrectionForm context={context} />}
              </Consumer>
            )}
          />
          <Route
            exact
            path="/adminPanel"
            component={() => (
              <Consumer>
                {context => <AdminPanel context={context} />}
              </Consumer>
            )}
          />
          <Route
            exact
            path="/student-login"
            component={() => (
              <Consumer>
                {context => <StudentCredentialPage context={context} />}
              </Consumer>
            )}
          />
          <Route
            exact
            path="/event"
            component={() => (
              <Consumer>
                {context => <ParentsRegistration context={context} />}
              </Consumer>
            )}
          />
          <Loader />
          <Footer />
        </Context.Provider>
      </div>
    );
  }
}

Routes.propTypes = {
  location: PropTypes.object,
};

Routes.defaultProps = {
  location: {},
};
export default Routes;
