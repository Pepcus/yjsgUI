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
    this.clearFilter = this.clearFilter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.onAdvanceSearchChange();
    }
  }
  setInputValue(e){
    this.setState({
      inputValue: e.target.value,
    });
  }
  clearFilter(){
    if(!isEmpty(this.state.inputValue)) {
      this.setState({
        inputValue: '',
      });
    }
    this.props.onFiIlter(this.props.students);
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
        <label htmlFor = "search_input">
          <input type="text" onChange={this.setInputValue} value={this.state.inputValue} className = "search-input-advance"  onKeyPress={this.handleKeyPress}/>
          <div className="search" onClick={this.onAdvanceSearchChange}>
            <div className="search__circle" />
            <div className="search__rectangle" />
          </div>
        </label>
        <button onClick={this.clearFilter}>Clear</button>
        <div className = "advance-input-radio">
          <div className="input-radio-container">
            <input type="radio" name="thresholdValue" value="0.0" onChange={this.onChangeCheckBox}  defaultChecked />
            <label htmlFor = "normal_search">Normal Search</label>
          </div>
          <div className="input-radio-container">
            <input type="radio" name="thresholdValue" value="0.6" onChange={this.onChangeCheckBox} />
            <label htmlFor="deep_search">Deep Search</label>
          </div>
        </div>
      </div>
    );
  }
}
export default AdvanceSearch;