import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import SplashPage from '../SplashPage';
import StudentRegistrationForm from '../StudentRegistrationForm';
import StudentRegistrationCorrectionForm from '../StudentRegistrationCorrectionForm';
import Footer from './Footer';
import SplashPagePrePopulated from '../SplashPagePrePopulated';
import AdminPanel from '../AdminPanel';
import DataGrid from '../DataGrid';
import StudentCredentialPage from '../StudentCredentialPage';
import StudentPage from '../StudentPage';
import Context from './ConfigProvider';

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
                {context => <DataGrid context={context} />}
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
          <Footer />
        </Context.Provider>
      </div>
    );
  }
}

export default Routes;
