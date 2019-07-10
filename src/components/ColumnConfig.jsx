import React, { Component } from 'react';
import Modal from 'react-modal';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

import {
  columnsList,
} from '../config/appConfig.json';
import {
  chunkArray,
  getChangedVisibleColumnConfig,
} from '../utils/dataGridUtils';
import Form from './form';
import { ColumnConfigJsonSchema } from '../config/fromJsonSchema.json';

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
    maxWidth: '100%',
    minWidth: '50%',
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

    const { visibleColumnConfig, selectValue } = this.props;

    this.setState({
      visibleColumnConfig,
      selectValue,
    });
  }

  /**
   * renderColumns method render the column options in column config.
   * @return {HTML}
   */
  renderColumnOptions = () => {

    const { visibleColumnConfig } = this.state;
    const columnsListTemporary = cloneDeep(columnsList);
    let columnListChunks = [];
    const chunkLength = Math.ceil(columnsList.length / 4);

    if (chunkLength >= 10) {
      columnListChunks = chunkArray(columnsListTemporary, chunkLength);

    } else {
      columnListChunks = chunkArray(columnsListTemporary, 10);
    }

    return (
      <div className="column-group">
        { columnListChunks.map(columnChunk => (
          <div key={shortId.generate()} className="column-group-container">
            {
              columnChunk.map(option => (
                <label key={shortId.generate()} className="label">
                  <input
                    type="checkbox"
                    name={option.key}
                    onChange={this.handleChange}
                    checked={visibleColumnConfig[option.key] ? 'checked' : ''}
                  />
                  <span>{option.label}</span>
                </label>
              ))
            }
          </div>
        ))
        }
      </div>
    );
  };

  /**
   * setValuesOfVisibleColumnConfig method call callBack setValuesOfVisibleColumnConfig()
   * and call closeColumnOption() method.
   */
  setValuesOfVisibleColumnConfig() {

    const { visibleColumnConfig, selectValue } = this.state;

    this.props.setValuesOfVisibleColumnConfig(
      visibleColumnConfig,
      selectValue,
    );
    this.props.closeColumnOption();
  }

  /**
   * setCheckValue method set value of selectValue(select all)(true or false) and on the basis
   * of selectValue value set the value of visibleColumnConfig(all column value)
   */
  setCheckValue({ formData }) {
    const { visibleColumnConfig } = this.props;
    const temporaryVisibleColumnConfig = cloneDeep(visibleColumnConfig);
    const { selectValue } = formData;
    if (selectValue !== this.state.selectValue) {
      if (selectValue) {
        this.setState({
          selectValue,
          visibleColumnConfig: getChangedVisibleColumnConfig({ selectValue, temporaryVisibleColumnConfig }),
        });

      } else if (!selectValue) {
        this.setState({
          selectValue,
          visibleColumnConfig: getChangedVisibleColumnConfig({ selectValue, temporaryVisibleColumnConfig }),
        });
      }
    } else {
      this.setState({
        visibleColumnConfig: formData.visibleColumnConfig,
      });
    }
  }

  /**
   * handleChange method set value of visibleColumnConfig(all columns value)
   * @param {Object} event
   */
  handleChange = (event) => {
    const { visibleColumnConfig } = this.state;

    if (event.target.checked) {
      this.setState({
        visibleColumnConfig: {
          ...visibleColumnConfig,
          [event.target.name]: true,
        },
      });

    } else if (!event.target.checked) {
      this.setState({
        visibleColumnConfig: {
          ...visibleColumnConfig,
          [event.target.name]: false,
          'edit': false,
        },
      });
    }
  };

  render() {
    const uiSchema = {
      ...ColumnConfigJsonSchema.uiSchema,
      visibleColumnConfig: {
        ...ColumnConfigJsonSchema.uiSchema.visibleColumnConfig,
        'ui:widget': () => (
          this.renderColumnOptions()
        ),
      },
      close: {
        ...ColumnConfigJsonSchema.uiSchema.close,
        'ui:widget': () => (
          <button
            className="button-modal button-close"
            onClick={this.props.closeColumnOption}
          >
            Close
          </button>
        ),
      },
      save: {
        ...ColumnConfigJsonSchema.uiSchema.save,
        // 'classNames': this.getSubmitButtonClassName(),
        'ui:widget': () => (
          <button
            className="button-modal button-save"
            onClick={this.setValuesOfVisibleColumnConfig}
          >
            Save
          </button>
        ),
      },
    };
    const { selectValue, visibleColumnConfig } = this.state;

    return (
      <Modal
        isOpen={this.props.columnOptionIsOpen}
        onRequestClose={this.props.closeColumnOption}
        style={customColumnOptionStyles}
        contentLabel="Column Options"
        overlayLabel="Overlay Options"
        className="custom-modal"
        ariaHideApp={false}
      >
        <div className="column-group-wrapper">
          <Form
            showErrorList={false}
            liveValidate
            schema={ColumnConfigJsonSchema.Schema}
            uiSchema={uiSchema}
            onChange={this.setCheckValue}
            formData={{ selectValue, visibleColumnConfig }}
          />
        </div>
      </Modal>
    );
  }
}

ColumnConfig.propTypes = {
  closeColumnOption: PropTypes.func,
  columnOptionIsOpen: PropTypes.bool,
  selectValue: PropTypes.bool,
  setValuesOfVisibleColumnConfig: PropTypes.func,
  visibleColumnConfig: PropTypes.object,
};

ColumnConfig.defaultProps = {
  closeColumnOption: () => {},
  columnOptionIsOpen: false,
  selectValue: true,
  setValuesOfVisibleColumnConfig: () => {},
  visibleColumnConfig: {},
};

export default ColumnConfig;
