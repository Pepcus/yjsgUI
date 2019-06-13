import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as shortId from 'shortid';
import isEmpty from 'lodash/isEmpty';
import hasIn from 'lodash/hasIn';
import PropTypes from 'prop-types';
import DataGrid from 'simple-react-data-grid';
import { Link } from 'react-router-dom';
import csv from 'csvtojson';

import {
  getSecretKey,
} from '../../reducers/studentRegistrationReducer';
import {
  getFileData,
  getFilesConfig,
} from '../../reducers/assetFilesReducer';
import {
  fetchFilesConfigAction,
} from '../../actions/assetFilesActions';
import { SUPPORTED_FILE_TYPES } from '../../constants/yjsg';
import { MESSAGE_FOR_PDF_FILE_DOWNLOAD } from '../../constants/messages';
import { manageStudentTableWidth } from '../../utils/dataGridUtils';
import {
  formatXlsxToJson,
  getDataGridHeadersForFileView,
} from '../../utils/fileUtils';
import { setLoadingStateAction } from '../../actions/studentRegistrationActions';
// import Popup from '../common/Popup';
import { fetchFile } from '../../sagas/assetFilesAPI';

/**
 * Files component render files list and file data table.
 * @type {Class}
 */
class Files extends Component {
  constructor(props) {
    super(props);
    this.widthRef = React.createRef();
    this.state = {
      showFileDetails: false,
      otherExtensionFileDetails: {},
      currentFileDetails: {},
      activeFileId: null,
      backPageButton: true,
      width: window.innerWidth,
      fileData: [],
      hasFileRoute: false,
    };
  }

  componentDidMount() {
    const { filesConfig } = this.props;
    this.props.fetchFilesConfigAction();
    const collections = window.location.hash.split('/files/');
    if (collections[1]) {
      if (filesConfig.files) {
        filesConfig.files.forEach((fileInfo, index) => {
          if (fileInfo.routeName === collections[1]) {
            if (fileInfo.fileType === 'pdf') {
              const url = window.location.href.replace(fileInfo.routeName, `${fileInfo.fileName}.${fileInfo.fileType}`).replace('/#', '');
              window.open(`${url}`, '_self');
            }
            const href = `files/${fileInfo.fileName}.${fileInfo.fileType ? fileInfo.fileType : 'txt'}`;
            const hasFileRoute = true;
            this.onClickViewFile(fileInfo, index, href, fileInfo.isViewable, hasFileRoute);
          }
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filesConfig !== nextProps.filesConfig) {
      const collections = window.location.hash.split('/files/');
      if (collections[1]) {
        nextProps.filesConfig.files.forEach((fileInfo, index) => {
          if (fileInfo.routeName === collections[1]) {
            if (fileInfo.fileType === 'pdf') {
              const url = window.location.href.replace(fileInfo.routeName, `${fileInfo.fileName}.${fileInfo.fileType}`).replace('/#', '');
              window.open(`${url}`, '_self');
            }
            const href = `files/${fileInfo.fileName}.${fileInfo.fileType ? fileInfo.fileType : 'txt'}`;
            const hasFileRoute = true;
            this.onClickViewFile(fileInfo, index, href, fileInfo.isViewable, hasFileRoute);
          }
        });
      }
    }
  }

  componentDidUpdate() {
    manageStudentTableWidth(this.widthRef);
  }

  /**
   * returnDisableEnable return conditional className
   * @param {String} fileView
   * @param {String} fileType
   * @return {string} className
   */
  returnDisableEnable = (fileView, fileType) => {
    const { CSV, XLS, XLSX } = SUPPORTED_FILE_TYPES;
    if (CSV === fileType || XLS === fileType
      || XLSX === fileType) {
      return 'file-label-heading';
    }
    return 'file-label-heading';
  };

  /**
   * returnFlexClassName return conditional className
   * @param {String} fileView
   * @param {String} fileType
   * @return {string} className
   */
  returnFlexClassName = (fileView, fileType) => {
    const { CSV, XLS, XLSX } = SUPPORTED_FILE_TYPES;
    if (CSV === fileType || XLS === fileType
      || XLSX === fileType) {
      return 'file-flex-wrapper';
    }
    return 'file-flex-wrapper';
  };

  /**
   * onClickViewFile handle onClick of file view
   * @param {Object} file
   * @param {Number} index
   * @param {String} href
   * @param {Boolean} fileView
   * @param {Boolean} hasFileRoute
   */
  onClickViewFile = (file, index, href, fileView, hasFileRoute) => {
    this.setState({
      showFileDetails: true,
      currentFileDetails: file,
      activeFileId: index,
      otherExtensionFileDetails: {},
      backPageButton: false,
      fileData: [],
      hasFileRoute,
    });
    if (!fileView) {
      this.setState({
        otherExtensionFileDetails: {
          file,
          href,
          fileView,
        },
      });
    }
    // state Loader state true
    this.props.setLoadingStateAction(true);
    // fetch file data as per file details
    this.fetchFileData(file);
  };

  /**
   * fetchFileData method will when click on any file and
   * it fetch that file data and save it in state.
   * @param{Object} file
   * @return {Object} null
   */
  fetchFileData = (file) => {
    const fileDetails = file;
    let fileData = [];
    try {
      fetchFile(fileDetails)
        .then((response) => {
          if (response) {
            if (fileDetails.fileType === 'csv') {
              fileData = csv().fromString(response).then((csvRow) => {
                this.setState({
                  fileData: csvRow,
                });
                this.props.setLoadingStateAction(false);
              });
            } else if (fileDetails.fileType === 'xlsx' || fileDetails.fileType === 'xls') {
              fileData = formatXlsxToJson(response);
              this.setState({
                fileData,
              });
              this.props.setLoadingStateAction(false);
            }
          } else {
            this.props.setLoadingStateAction(false);
          }
        },
        (error) => {
          this.props.setLoadingStateAction(false);
        });
    } catch (e) {
      this.props.setLoadingStateAction(false);
      console.error(e);
    }
    return null;
  };

  /**
   * onClickBackButton handle onClick event of back button which will display back from file data table to file list.
   */
  onClickBackButton = () => {
    this.setState({
      backPageButton: true,
    });
  };

  /**
   * returnFileListDisplayBlock method will return conditional className of file list wrapper
   * @return {String} className
   */
  returnFileListDisplayBlock = () => {
    const { width, showFileDetails, backPageButton } = this.state;
    const isMobile = width <= 600;
    if (showFileDetails) {
      if (isMobile) {
        if (backPageButton) {
          return 'file-list-wrapper';
        }
        return 'file-list-none';
      }
      return 'file-list-wrapper';
    }
    return 'file-list-wrapper';
  };

  /**
   * returnTableWidthComponentClass return conditional class name of table which contained file data.
   * @return {String} className
   */
  returnTableWidthComponentClass = () => {
    const { width, showFileDetails, backPageButton } = this.state;
    const isMobile = width <= 600;
    if (showFileDetails) {
      if (isMobile) {
        if (backPageButton) {
          return 'file-component-none';
        }
        return 'file-component-mobile-wrapper';
      }
      return 'file-component';
    }
    return 'file-component';
  };

  /**
   * renderFileList method render file list
   * @return {*} file list react component
   */
  renderFileList = () => {
    const { hasFileRoute, activeFileId } = this.state;
    const { filesConfig } = this.props;
    if (hasFileRoute) {
      return null;
    }
    if (!isEmpty(filesConfig)) {
      if (hasIn(filesConfig, 'files')) {
        return (
          <div className={this.returnFileListDisplayBlock()}>
            <h1 className="file-heading">Available Files</h1>
            {filesConfig.files.map((file, index) => {
            const href = `files/${file.fileName}.${file.fileType ? file.fileType : 'txt'}`;
            return (
              <div
                key={shortId.generate()}
                className={this.returnFlexClassName(file.isViewable, file.fileType)}
              >
                <div
                  onClick={() => this.onClickViewFile(file, index, href, file.isViewable)}
                  className={this.returnDisableEnable(file.isViewable, file.fileType)}
                >
                  <div className="flex-text-wrapper">
                    <i
                      className={`fa fa-file ${activeFileId === index ? 'active-class-icon' : 'file-card-icon'}`}
                      aria-disabled="true"
                    />
                    <span className={activeFileId === index ? 'active-link' : 'file-text-ellipsis'} title={file.fileLabel}>{file.fileLabel}</span>
                  </div>
                </div>
                <div>
                  <a
                    download={`${file.fileLabel}.${file.fileType}`}
                    href={href}
                    className={activeFileId === index ? 'active-download-link' : 'download-link'}
                  >
                    <i className="fa fa-download file-icon" />
                  </a>
                </div>
              </div>
            );
            },
          )}
          </div>
        );
      }
      return null;
    }
    return null;
  };

  /**
   * renderFileListViewButton render conditional file view button
   * @return {*} back button react component
   */
  renderFileListViewButton = () => {
    const { hasFileRoute } = this.state;
    if (!hasFileRoute) {
      return (
        <div onClick={this.onClickBackButton} className="file-view-list-button">
          <a className="grid-small-button file-button-mobile">
            <i className="fa fa-list" />
          </a>
        </div>
      );
    } return null;
  };

  /**
   * renderFileDescription method render file description at the top of the table of file data
   * @return {*} paragraph of file description.
   */
  renderFileDescription = () => {
    const { currentFileDetails, width } = this.state;
    const isMobile = width <= 500;
    const fileDescription = currentFileDetails.description || '';
    const style = {
      textAlign: 'center',
      fontSize: '20px',
      color: 'var(--orange-color)',
    };
    if (isMobile) {
      style.marginTop = '45px';
    }
    if (fileDescription) {
      return (
        <p style={style}>
          {fileDescription}
        </p>
      );
    }
    return null;
  };

  /**
   * renderFileDetails method render table of file data
   * @return {*} file data table
   */
  renderFileDetails = () => {
    const { width,
      showFileDetails,
      fileData,
      hasFileRoute,
      currentFileDetails,
      otherExtensionFileDetails,
    } = this.state;
    const { filesConfig } = this.props;
    const isMobile = width <= 500;
    if (showFileDetails) {
      if (!isEmpty(fileData)) {
        if (isMobile) {
          return (
            <div
              className={this.returnTableWidthComponentClass()}
              ref={this.widthRef}
              style={hasFileRoute ? { margin: 'auto' } : null}
            >
              {this.renderFileListViewButton()}
              {this.renderFileDescription()}
              <DataGrid
                data={fileData}
                metaData={
                  getDataGridHeadersForFileView(fileData, currentFileDetails)}
              />
            </div>
          );
        }
        return (
          <div
            className={this.returnTableWidthComponentClass()}
            ref={this.widthRef}
            style={hasFileRoute ? { margin: 'auto' } : null}
          >
            {this.renderFileDescription()}
            <DataGrid
              data={fileData}
              metaData={getDataGridHeadersForFileView(
                fileData,
                currentFileDetails)
              }
            />
          </div>);
      } else if (!isEmpty(otherExtensionFileDetails)) {
        if (isMobile) {
          return (
            <div
              className={this.returnTableWidthComponentClass()}
              ref={this.widthRef}
              style={hasFileRoute ? { margin: 'auto' } : null}
            >
              {this.renderFileListViewButton()}
              <div className="file-text-panel">
                <span className="file-text-format-wrapper">
                  <span>
                    { MESSAGE_FOR_PDF_FILE_DOWNLOAD }
                  </span>
                  <div className="file-extension-download-btn">
                    <a
                      download={`${otherExtensionFileDetails.file.fileName}.${otherExtensionFileDetails.file.fileType}`}
                      href={otherExtensionFileDetails.href}
                      className="file-download-button"
                    >
                      Download
                      <i className="fa fa-download file-icon" />
                    </a>
                  </div>
                </span>
              </div>
            </div>
          );
        }
        return (
          <div
            className={this.returnTableWidthComponentClass()}
            ref={this.widthRef}
            style={hasFileRoute ? { margin: 'auto' } : null}
          >
            <div className="file-text-panel">
              <span className="file-text-format-wrapper">
                <span>
                  { MESSAGE_FOR_PDF_FILE_DOWNLOAD }
                </span>
                <div className="file-extension-download-btn">
                  <a
                    download={`${otherExtensionFileDetails.file.fileName}.${otherExtensionFileDetails.file.fileType}`}
                    href={otherExtensionFileDetails.href}
                    className="file-download-button"
                  >
                    Download
                    <i className="fa fa-download file-icon" />
                  </a>
                </div>
              </span>
            </div>
          </div>
        );
      } else if (isMobile) {
        return (
          <div
            className={this.returnTableWidthComponentClass()}
            ref={this.widthRef}
            style={hasFileRoute ? { margin: 'auto' } : null}
          >
            {this.renderFileListViewButton()}
            <div className="file-text-panel">
              <span className="file-text-message">
                No Data Found.
              </span>
            </div>
          </div>
        );
      }
      return (
        <div
          className={this.returnTableWidthComponentClass()}
          ref={this.widthRef}
          style={hasFileRoute ? { margin: 'auto' } : null}
        >
          <div className="file-text-panel">
            <span className="file-text-message">
            Nothing to show.
            </span>
          </div>
        </div>
      );
    }
    if (
      !isEmpty(filesConfig)
      && hasIn(filesConfig, 'files')) {
      return (
        <div className="file-component" style={hasFileRoute ? { margin: 'auto' } : null} ref={this.widthRef}>
          <div className="file-text-panel">
            <span className="file-text-message">
              Please select a file to view.
            </span>
          </div>
        </div>
      );
    }
    return (
      <div className="no-files-available" ref={this.widthRef}>
        <div className="file-text-panel">
          <span className="file-text-message">
            No files available.
          </span>
        </div>
      </div>
    );
  };

  /**
   * renderBackButton render back button for redirect to previous location.
   * @return {*} back button
   */
  renderBackButton = () => {
    const { hasFileRoute } = this.state;
    const { context } = this.props;
    if (!hasFileRoute) {
      return (
        <Link to={context.previousLocation} className="grid-small-button">
          <i className="fa fa-arrow-left" />
        </Link>
      );
    } return null;
  };

  render() {
    return (
      <div className="registration-file-container">
        <div className="logoutButtonContainer file-logout-container display-logout-desktop">
          <div className="logoutLinkContainer">
            {this.renderBackButton()}
          </div>
        </div>
        <div className="file-wrapper">
          {this.renderFileList()}
          {this.renderFileDetails()}
        </div>
      </div>
    );
  }
}

Files.propTypes = {
  context: PropTypes.object,
  fetchFilesConfigAction: PropTypes.func,
  filesConfig: PropTypes.object,
  setLoadingStateAction: PropTypes.func,
};

Files.defaultProps = {
  context: {},
  fetchFilesConfigAction: () => {},
  filesConfig: {},
  setLoadingStateAction: () => {},
};

const mapStateToProps = state => ({
  fileData: getFileData(state),
  filesConfig: getFilesConfig(state),
  secretKey: getSecretKey(state),
});

export default connect(mapStateToProps, {
  fetchFilesConfigAction,
  setLoadingStateAction,
})(Files);
