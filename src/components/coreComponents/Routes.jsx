import React, {Component} from 'react';
import { HashRouter, Route } from 'react-router-dom';

import SplashPage from '../SplashPage';
import StudentRegistrationForm from '../StudentRegistrationForm';
import StudentRegistrationCorrectionForm from '../StudentRegistrationCorrectionForm';
import Footer from './Footer';
import SplashPagePrePopulated from '../SplashPagePrePopulated';
import AdminPanel from '../AdminPanel';
import DataGrid from '../DataGrid';

import Context from "./ConfigProvider";

class Routes extends Component{
    constructor(props){
       super(props);
       this.state = {
         previousLocation : '',
       };
    };

  componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        previousLocation: this.props.location.pathname,
      });
    }
  }

  render(){
    const { Consumer } = Context;
    return(
      <div>
          <Context.Provider previousLocation={this.state.previousLocation}>
              <Route exact path={'/'} component={() =>
                <Consumer>
                    {(context) => {
                        return <SplashPage context={context} />;
                    }}
                </Consumer>} />
              <Route exact path={'/dataGrid'} component={() =>
                <Consumer>
                    {(context) => {
                        return <DataGrid context={context} />;
                    }}
                </Consumer>} />
              <Route exact path={'/splashPrePopulated'} component={() =>
                <Consumer>
                  {(context) => {
                    return <SplashPagePrePopulated context={context} />;
                  }}
                </Consumer>} />
              <Route exact path={'/studentRegister'} component={() =>
                <Consumer>
                  {(context) => {
                    return <StudentRegistrationForm context={context} />;
                  }}
                </Consumer>} />
              <Route exact path={'/studentCorrection'} component={() =>
                <Consumer>
                  {(context) => {
                    return <StudentRegistrationCorrectionForm context={context} />;
                  }}
                </Consumer>} />
              <Route exact path={'/adminPanel'} component={() =>
                <Consumer>
                  {(context) => {
                    return <AdminPanel context={context} />;
                  }}
                </Consumer>} />
              <Footer />
          </Context.Provider>
      </div>
        );
    }
}
export default Routes;
