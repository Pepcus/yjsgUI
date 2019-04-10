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
  stateOfAdminLogin,
} from '../reducers/studentRegistrationReducer';
import {
  getFileData,
  getFilesConfig,
  isLoading,
} from '../reducers/assetFilesReducer';
import {
  fetchFilesConfigAction,
} from '../actions/assetFilesActions';
import { goBackBtnText, yjsgHeader, SUPPORTED_FILE_TYPES } from '../utils/yjsgConstants';
import { MESSAGE_FOR_PDF_FILE_DOWNLOAD } from '../utils/messagesConstants';
import LinkButton from './commonComponents/LinkButton';
import { manageStudentTableWidth } from '../utils/dataGridUtils';
import {
  formatXlsxToJson,
  getDataGridHeadersForFileView,
} from '../utils/fileUtils';
import {
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  resetVisibleColumnConfigAction,
  setLoadingStateAction,
} from '../actions/studentRegistrationActions';
import reactLogo1 from '../assets/images/react-logo-1.png';
import CustomLoader from './commonComponents/CustomLoader';
import { Popup } from './Popup';
import { fetchFile } from '../sagas/assetFilesAPI';

/**
 *  Files component render files list and file data table.
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
    };
  }

  componentDidMount() {
    this.props.fetchFilesConfigAction();
  }

  componentDidUpdate() {
    manageStudentTableWidth(this.widthRef);
  }
  returnDisableEnable = (fileView, fileType) => {
    if (SUPPORTED_FILE_TYPES.CSV === fileType || SUPPORTED_FILE_TYPES.XLS === fileType
|| SUPPORTED_FILE_TYPES.XLSX === fileType) {
      return 'file-label-heading';
    }
    return 'file-label-heading';
  };
  returnFlexClassName = (fileView, fileType) => {
    if (SUPPORTED_FILE_TYPES.CSV === fileType || SUPPORTED_FILE_TYPES.XLS === fileType
      || SUPPORTED_FILE_TYPES.XLSX === fileType) {
      return 'file-flex-wrapper';
    }
    return 'file-flex-wrapper';
  };
  performLogout = () => {
    this.props.resetAdminCredentialsAction();
    this.props.setAdminLoginStateAction(false);
    this.props.setRedirectValueAction(false);
    this.props.resetVisibleColumnConfigAction();
    localStorage.clear();
  };
  onClickViewFile = (file, index, href, fileView) => {
    this.setState({
      showFileDetails: true,
      currentFileDetails: file,
      activeFileId: index,
      otherExtensionFileDetails: {},
      backPageButton: false,
      fileData: [],
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
   * fetchFileData mathode will when click on any file and
   * it fetch that file data and save it in state.
   * @param{Object} file
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

  onClickBackButton = () => {
    this.setState({
      backPageButton: true,
    });
  };
  returnFileListDisplayBlock = () => {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (this.state.showFileDetails) {
      if (isMobile) {
        if (this.state.backPageButton) {
          return 'file-list-wrapper';
        }
        return 'file-list-none';
      }
      return 'file-list-wrapper';
    }
    return 'file-list-wrapper';
  };
  returnTableWidthComponentClass = () => {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (this.state.showFileDetails) {
      if (isMobile) {
        if (this.state.backPageButton) {
          return 'file-component-none';
        }
        return 'file-component-mobile-wrapper';

      }
      return 'file-component';
    }
    return 'file-component';
  };
  renderLoginPopup = () => (
    <Popup>
      <h5>Please Login</h5>
      <LinkButton
        type="button"
        buttonText={goBackBtnText}
        linkPath="/admin?fromRoute=/files"
      />
    </Popup>
  );

  renderFileList = () => {
    if (!(this.props.adminLoginState)) {
      return this.renderLoginPopup();
    } else if (!isEmpty(this.props.filesConfig)) {
      if (hasIn(this.props.filesConfig, 'files')) {
        return (
          <div className={this.returnFileListDisplayBlock()}>
            <h1 className="file-heading">Available Files</h1>
            {this.props.filesConfig.files.map((file, index) => {
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
                      className={`fa fa-file ${this.state.activeFileId === index ? 'active-class-icon' : 'file-card-icon'}`}
                      aria-disabled="true"
                    />
                    <span className={this.state.activeFileId === index ? 'active-link' : 'file-text-ellipsis'} title={file.fileLabel}>{file.fileLabel}</span>
                  </div>
                </div>
                <div>
                  <a
                    download={`${file.fileLabel}.${file.fileType}`}
                    href={href}
                    className={this.state.activeFileId === index ? 'active-download-link' : 'download-link'}
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
  renderFileDetails = () => {
    const { width } = this.state;
    const isMobile = width <= 500;
    if (this.state.showFileDetails) {
      if (!isEmpty(this.state.fileData)) {
        if (isMobile) {
          return (
            <div
              className={this.returnTableWidthComponentClass()}
              ref={this.widthRef}
            >
              <div onClick={this.onClickBackButton} className="file-view-list-button">
                <a className="grid-small-button file-button-mobile">
                  <i className="fa fa-list" />
                </a>
              </div>
              <DataGrid
                data={this.state.fileData}
                metaData={
                  getDataGridHeadersForFileView(this.state.fileData, this.state.currentFileDetails)}
              />
            </div>
          );
        }
        return (
          <div
            className={this.returnTableWidthComponentClass()}
            ref={this.widthRef}
          >
            <DataGrid
              data={this.state.fileData}
              metaData={getDataGridHeadersForFileView(
                this.state.fileData,
                this.state.currentFileDetails)
              }
            />
          </div>);
      } else if (!isEmpty(this.state.otherExtensionFileDetails)) {
        if (isMobile) {
          return (
            <div
              className={this.returnTableWidthComponentClass()}
              ref={this.widthRef}
            >
              <div onClick={this.onClickBackButton} className="file-view-list-button">
                <a className="grid-small-button file-button-mobile">
                  <i className="fa fa-list" />
                </a>
              </div>
              <div className="file-text-panel">
                <span className="file-text-format-wrapper">
                  <span>
                    { MESSAGE_FOR_PDF_FILE_DOWNLOAD }
                  </span>
                  <div className="file-extension-download-btn">
                    <a
                      download={`${this.state.otherExtensionFileDetails.file.fileName}.${this.state.otherExtensionFileDetails.file.fileType}`}
                      href={this.state.otherExtensionFileDetails.href}
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
          >
            <div className="file-text-panel">
              <span className="file-text-format-wrapper">
                <span>
                  { MESSAGE_FOR_PDF_FILE_DOWNLOAD }
                </span>
                <div className="file-extension-download-btn">
                  <a
                    download={`${this.state.otherExtensionFileDetails.file.fileName}.${this.state.otherExtensionFileDetails.file.fileType}`}
                    href={this.state.otherExtensionFileDetails.href}
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
          >
            <div onClick={this.onClickBackButton} className="file-view-list-button">
              <a className="grid-small-button file-button-mobile">
                <i className="fa fa-list" />
              </a>
            </div>
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
      !isEmpty(this.props.filesConfig)
      && hasIn(this.props.filesConfig, 'files')) {
      return (
        <div className="file-component" ref={this.widthRef}>
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

  renderLoader = () => {
    if (this.props.isLoading) {
      return (
        <div>
          <CustomLoader loaderColor="var(--app-loader-color)" />
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div className="registration-file-container">
        {this.renderLoader()}
        <div className="student-logo-header">
          <div className="yjsg-logo">
            <img src={reactLogo1} alt="logo" className="yjsg-logo-img" />
          </div>
          {/* FIXME: Create a separate reusable component to render header*/}
          <h2 className="student-info-heading">{yjsgHeader}</h2>
          <div className="logoutButtonContainer display-mobile-none">
            <div className="logoutLinkContainer print-media-none">
              <Link to={this.props.context.previousLocation} className="grid-small-button">
                <i className="fa fa-arrow-left card-icon" />Back
              </Link>
              <Link to="/admin" className="grid-small-button" onClick={this.performLogout}>
                <i className="fa fa-power-off card-icon" />Logout
              </Link>
            </div>
          </div>
          <div className="logoutButtonContainer file-logout-container display-logout-desktop">
            <div className="logoutLinkContainer">
              <Link to={this.props.context.previousLocation} className="grid-small-button">
                <i className="fa fa-arrow-left" />
              </Link>
              <Link to="/admin" className="grid-small-button" onClick={this.performLogout}>
                <i className="fa fa-power-off" />
              </Link>
            </div>
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

Files.propsType = {
  fileData: PropTypes.array,
  fetchFilesConfigAction: PropTypes.func,
  setLoadingStateAction: PropTypes.func,
  adminLoginState: PropTypes.bool,
  filesConfig: PropTypes.object,
  isLoading: PropTypes.bool,
  resetAdminCredentialsAction: PropTypes.func,
  setAdminLoginStateAction: PropTypes.func,
  setRedirectValueAction: PropTypes.func,
  resetVisibleColumnConfigAction: PropTypes.func,
};

Files.defaultProps = {
  fileData: [],
  setLoadingStateAction: () => {},
  fetchFilesConfigAction: () => {},
  resetAdminCredentialsAction: () => {},
  setAdminLoginStateAction: () => {},
  setRedirectValueAction: () => {},
  resetVisibleColumnConfigAction: () => {},
  adminLoginState: false,
  filesConfig: {},
  isLoading: false,
};

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  fileData: getFileData(state),
  filesConfig: getFilesConfig(state),
  isLoading: isLoading(state),
  adminLoginState: stateOfAdminLogin(state),
});

export default connect(mapStateToProps, {
  setLoadingStateAction,
  fetchFilesConfigAction,
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  resetVisibleColumnConfigAction,
})(Files);
