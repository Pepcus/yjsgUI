import React, { Component } from 'react';
import Modal from 'react-modal';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import {
  PLEASE_SELECT_COLUMNS_TEXT,
} from '../utils/textConstants';
import {
  columnsList,
} from '../config/appConfig.json';

const customColumnOptionStyles = {
  overlay: {
    zIndex: '999',
    backgroundColor: 'rgba(21, 20, 20, 0.75)',
  },
  content: {
    top: '50%',
    position: 'absolute',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(205, 68, 3)',
    boxShadow: 'rgb(99, 99, 99) 0px 2.3px 3px 0px',
    padding: '0px !important',
    marginRight: '-50%',
    width: '80%',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
  },
};

/**
 * ColumnConfig component render column config option
 * @type {Class}
 */
class ColumnConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleColumnConfig: {},
      selectValue: '',
    };
    this.setValuesOfVisibleColumnConfig = this.setValuesOfVisibleColumnConfig.bind(this);
    this.setCheckValue = this.setCheckValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderColumnOptions = this.renderColumnOptions.bind(this);
  }

  componentWillMount() {
    this.setState({
      visibleColumnConfig: this.props.visibleColumnConfig,
      selectValue: this.props.selectValue,
    });
  }

  /**
   * renderColumns method render the column options in column config.
   * @return {ReactComponent}
   */
  renderColumnOptions = () => {
    let totalColumnCollection = [];
    let tenColumnOptions = [];
    columnsList.forEach((column) => {
      tenColumnOptions.push(
        <label className="label">
          <input type="checkbox" name={column.key} onChange={this.handleChange} checked={this.state.visibleColumnConfig[column.key] ? 'checked' : ''} />
          <span>{column.label}</span>
        </label>);
      if (tenColumnOptions.length === 10) {
        totalColumnCollection.push(<div className="column-group-container"> {tenColumnOptions} </div>);
        tenColumnOptions = [];
      }
    });
    if (!isEmpty(tenColumnOptions)) {
      totalColumnCollection.push(<div className="column-group-container"> {tenColumnOptions} </div>);
      tenColumnOptions = [];
    }
    return <div className="column-group">{totalColumnCollection}</div>;
  };
  /**
   * setValuesOfVisibleColumnConfig method call callBack setValuesOfVisibleColumnConfig()
   * and call closeColumnOption() method.
   */
  setValuesOfVisibleColumnConfig() {
    this.props.setValuesOfVisibleColumnConfig(this.state.visibleColumnConfig, this.state.selectValue);
    this.props.closeColumnOption();
  }

  /**
   * setCheckValue method set value of selectValue(select all)(true or false) and on the basis
   * of selectValue value set the value of visibleColumnConfig(all column value)
   */
  setCheckValue() {
    const temporarySelectValue = this.state.selectValue !== true;
    const temporaryVisibleColumnConfig = cloneDeep(this.props.visibleColumnConfig);
    if (temporarySelectValue) {
      for (const key in temporaryVisibleColumnConfig) {
        temporaryVisibleColumnConfig[key] = true;
      }
      this.setState({
        selectValue: temporarySelectValue,
        visibleColumnConfig: temporaryVisibleColumnConfig,
      });
    } else if (!temporarySelectValue) {
      for (const key in temporaryVisibleColumnConfig) {
        temporaryVisibleColumnConfig[key] = false;
      }
      this.setState({
        selectValue: temporarySelectValue,
        visibleColumnConfig: temporaryVisibleColumnConfig,
      });
    }
  }
  /**
   * handleChange method set value of visibleColumnConfig(all columns value)
   * @param {Object} event
   */
  handleChange = (event) => {
    if (event.target.checked) {
      this.setState({
        visibleColumnConfig: {
          ...this.state.visibleColumnConfig,
          [event.target.name]: true,
        },
      });
    } else if (!event.target.checked) {
      this.setState({
        visibleColumnConfig: {
          ...this.state.visibleColumnConfig,
          [event.target.name]: false,
        },
      });
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.columnOptionIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.closeColumnOption}
        style={customColumnOptionStyles}
        contentLabel="Column Options"
        overlayLabel="Overlay Options"
        className="custom-modal"
      >
        <div>
          <div className="column-modal">
            <h2 className="column-modal-container">{PLEASE_SELECT_COLUMNS_TEXT}</h2>
          </div>
          <form>
            <div className="column-group-wrapper">
              <div className="select-button-wrapper">
                <label className="label">
                  <input type="checkbox" onChange={() => this.setCheckValue()} checked={this.state.selectValue ? 'checked' : ''} />
                  <span className="select-none-wrapper">Select All</span>
                </label>
              </div>
              {this.renderColumnOptions()}
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button className="button-modal button-close" onClick={this.props.closeColumnOption}>Close</button>
                  <button className="button-modal button-save" onClick={this.setValuesOfVisibleColumnConfig}>Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

ColumnConfig.propTypes = {
  visibleColumnConfig: PropTypes.object,
  setValuesOfVisibleColumnConfig: PropTypes.func,
  selectValue: PropTypes.bool,
  closeColumnOption: PropTypes.func,
  columnOptionIsOpen: PropTypes.bool,
};

ColumnConfig.defaultProps = {
  visibleColumnConfig: {},
  setValuesOfVisibleColumnConfig: () => {},
  selectValue: true,
  closeColumnOption: () => {},
  columnOptionIsOpen: false,
};
export default ColumnConfig;
