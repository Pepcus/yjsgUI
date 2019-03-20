import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as shortId from 'shortid';
import isEmpty from 'lodash/isEmpty';
import hasIn from 'lodash/hasIn';
import PropTypes from 'prop-types';
import DataGrid from 'simple-react-data-grid';
import { Link } from 'react-router-dom';

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
  fetchFileAction,
  fetchFilesConfigAction,
} from '../actions/assetFilesActions';
import { goBackBtnText, yjsgHeader, SUPPORTED_FILE_TYPES } from '../utils/yjsgConstants';
import LinkButton from './commonComponents/LinkButton';
import { manageStudentTableWidth } from '../utils/dataGridUtils';
import { getDataGridHeadersForFileView } from '../utils/fileUtils';
import {
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  resetVisibleColumnConfigAction,
} from '../actions/studentRegistrationActions';


class Files extends Component {
  constructor(props) {
    super(props);
    this.widthRef = React.createRef();
    this.state = {
      showFileDetails: false,
      currentFileDetails: {},
      activeFileId: null,
    };
  }

  componentDidMount() {
    this.props.fetchFilesConfigAction();
  }

  componentDidUpdate() {
    manageStudentTableWidth(this.widthRef);
  }
	returnDisableEnable = (fileView, fileType) => {
    // if (fileView === false) {
    //   console.log('file viewable::', fileView);
    //   return 'file-label-heading-disabled';
    // } else
    if (SUPPORTED_FILE_TYPES.CSV === fileType || SUPPORTED_FILE_TYPES.XLS === fileType
      || SUPPORTED_FILE_TYPES.XLSX === fileType) {
      return 'file-label-heading';
    }
    // if (fileView === false) {
    //   return 'file-label-heading-disabled';
    // }
    return 'file-label-heading-disabled';
  };
  performLogout = () => {
    this.props.resetAdminCredentialsAction();
    this.props.setAdminLoginStateAction(false);
    this.props.setRedirectValueAction(false);
    this.props.resetVisibleColumnConfigAction();
    localStorage.clear();
  };
  onClickViewFile = (file, index) => {
    this.setState({
      showFileDetails: true,
      currentFileDetails: file,
      activeFileId: index,
    });
    console.log('active field id::', this.state.activeFileId);
    this.props.fetchFileAction(file);
  };
  returnActive = (id) => {
    console.log('span id::', id);
    if (this.state.showFileDetails) {
      console.log('state value of active class::', this.state.showFileDetails);
      return 'active-link';
    }
    return 'file-text-ellipsis';

  };

  renderLoginPopup = () => (
    <div className="popup popupFile">
      <div className="popupContainer">
        <h5>Please Login</h5>
        <LinkButton
          type="button"
          buttonText={goBackBtnText}
          linkPath="/admin"
        />
      </div>
    </div>);

  renderFileList = () => {
    if (!(this.props.adminLoginState)) {
      return this.renderLoginPopup();
    } else if (!isEmpty(this.props.filesConfig)) {
      if (hasIn(this.props.filesConfig, 'files')) {
        return (
          <div className="file-list-wrapper">
            <h1 className="file-heading">Available Files</h1>
            {this.props.filesConfig.files.map((file, index) => {
              console.log('index of active class::', index);
            const href = `files/${file.fileName}.${file.fileType ? file.fileType : 'txt'}`;
            return (
              <div key={shortId.generate()} className="file-flex-wrapper">
                {console.log('file condition::', file.isViewable === false)}
                <div
                  onClick={() => this.onClickViewFile(file, index)}
                  /* className="file-label-heading"*/
                  className={this.returnDisableEnable(file.isViewable,file.fileType)}
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
    if (this.state.showFileDetails) {
      if (!isEmpty(this.props.fileData)) {
        return (
          <div className="file-component" ref={this.widthRef}>
            <DataGrid
              data={this.props.fileData}
              metaData={getDataGridHeadersForFileView(this.props.fileData, this.state.currentFileDetails)}
            />
          </div>);
      }
      return (
        <div className="file-component" ref={this.widthRef}>
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
        <div className="new-loader-wrapper">
          <div className="loader">
            <img src="../../spinner.gif" alt="logo" className="loader-img" />
          </div>
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
            <img src="../../react-logo-1.png" alt="logo" className="yjsg-logo-img" />
          </div>
          {/* FIXME: Create a separate reusable component to render header*/}
          <h2 className="student-info-heading">{yjsgHeader}</h2>
          <div className="logoutButtonContainer display-mobile-none">
            <div className="logoutLinkContainer print-media-none">
              <Link to="/admin" className="grid-small-button" onClick={this.performLogout}>
                <i className="fa fa-power-off card-icon" />Logout
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
  fetchFileAction: PropTypes.func,
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
  fetchFileAction: () => {},
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
  fetchFileAction,
  fetchFilesConfigAction,
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  resetVisibleColumnConfigAction,
})(Files);
