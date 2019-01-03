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
    this.advanceSearch = this.advanceSearch.bind(this);
    this.onClickRadioButton = this.onClickRadioButton.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  setInputValue(e){
    if(isEmpty(e.target.value)){
      this.props.onFilter(this.props.students);
    }
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
    this.setState({
      thresholdValue: '0.0',
    });
    this.props.onFilter(this.props.students);
  }

  onClickRadioButton(e) {
    this.setState({
      thresholdValue: e.target.value,
    });
  }

  advanceSearch(e) {
    e.preventDefault();
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
      this.props.onFilter(result);
    }
  }

  render(){
    return(
      <form id="advanceSearch">
        <div className = "input-radio">
        <label htmlFor = "search_input">
          <input type="text" onChange={this.setInputValue} value={this.state.inputValue} className = "search-input-advance" />
          <button type="submit" form="advanceSearch" value="Submit" className="search" onClick={this.advanceSearch}>
            <div className="search__circle" />
            <div className="search__rectangle" />
          </button>
        </label>
        <button type="reset" value="Reset" onClick={this.clearFilter}>Clear</button>
        <div className = "advance-input-radio">
          <div className="input-radio-container">
            <input type="radio" name="thresholdValue" value="0.0" onClick={this.onClickRadioButton}  defaultChecked />
            <label htmlFor = "normal_search">Normal Search</label>
          </div>
          <div className="input-radio-container">
            <input type="radio" name="thresholdValue" value="0.6" onClick={this.onClickRadioButton} />
            <label htmlFor="deep_search">Deep Search</label>
          </div>
        </div>
      </div>
      </form>
    );
  }
}
export default AdvanceSearch;