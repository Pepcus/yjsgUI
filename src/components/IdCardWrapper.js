import React, {Component} from 'react';

class IdCardWrapper extends Component{

  render(){
    return(
        <div className = "id-card-wrapper">
            <div className="buttons-wrapper">
                <div className="buttonContainer">
                    <button className="linkButton">Export</button>
                </div>
                <div className="buttonContainer">
                    <button className="linkButton">Print Now</button>
                </div>
                <div className="buttonContainer">
                    <button className="linkButton">Print Later</button>
                </div>
                <div className="buttonContainer">
                    <button className="linkButton">Present</button>
                </div>
            </div>
        </div>

    );
  }
}
export default IdCardWrapper;
