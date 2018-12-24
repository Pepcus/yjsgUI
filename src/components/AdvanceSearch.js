import React, {Component} from 'react';
import Fuse from 'fuse.js';
import isEmpty from 'lodash/isEmpty';

class AdvanceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thresholdValue: '0.0',
      inputValue:'',
    };
    this.onAdvanceSearchChange = this.onAdvanceSearchChange.bind(this);
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
  }
  setInputValue(e){
    if(isEmpty(e.target.value)){
      this.props.onFiIlter(this.props.students);
    }
    this.setState({
      inputValue: e.target.value,
    });
  }
  onChangeCheckBox(e) {
    this.setState({
      thresholdValue: e.target.value,
    });
  }
  onAdvanceSearchChange() {
    const foundKeys = this.props.metaData.headerConfig.map((object) => {
        return object.key;
      }
    );
    const options = {
      shouldSort: true,
      threshold: Number(this.state.thresholdValue),
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: foundKeys,
    };
    if(!isEmpty(this.state.inputValue)) {
      const fuse = new Fuse(this.props.students, options);
      const result = fuse.search(this.state.inputValue);
      this.props.onFiIlter(result);
    }
  }

  render(){
    return(
      <div className = "input-radio">
        <div className = "advance-input-radio">

            <div className="input-radio-container">
              <input type="radio" name="thresholdValue" value="0.0" onChange={this.onChangeCheckBox}  defaultChecked />
              {/*<span className="label-text"></span>*/}
              <label for = "normal_search">Normal Search</label>
            </div>
            <div className="input-radio-container">
              <input type="radio" name="thresholdValue" value="0.6" onChange={this.onChangeCheckBox} />
              <label for="deep_search">Deep Search</label>
            </div>
        </div>
        <label for = "search_input">
          <input type="text" onChange={this.setInputValue} className = "search-input-advance"/>
          <div class="search"><div class="search__circle"></div><div class="search__rectangle"></div></div>
        </label>

        <button onClick={this.onAdvanceSearchChange} className = "advance-search-button">Search</button>
      </div>
    );
  }
}
export default AdvanceSearch;