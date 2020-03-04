import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import * as shortId from 'shortid';
import isEmpty from 'lodash/isEmpty';
import hasIn from 'lodash/hasIn';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import DataGrid from 'simple-react-data-grid';
import csv from 'csvtojson';
import { Parser } from 'json2csv';
import { json2excel, excel2json } from 'js2excel';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo';
import omit from 'lodash/omit';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { Modal } from 'pepcus-core';

import { getAdminLoginState, getSecretKey } from 'reducers/loginReducer';
import { getFilesConfig } from 'reducers/assetFilesReducer';
import { fetchFilesConfigAction } from 'actions/assetFilesActions';
import { SUPPORTED_FILE_TYPES } from 'constants/file';
import { manageMembersTableWidth } from 'utils/common';
import {
  fetchFileResponseType, formatXlsxToJson, getDataGridHeadersForFileView, getFileListDisplayCondition,
  getMessageDisplayCondition,
} from 'utils/routes';
import { setLoadingStateAction } from 'actions/loaderActions';
import { getConstants } from 'reducers/constants';
import { getAPIConfig } from 'reducers/api';
import { getTenantName } from 'reducers/app';
import { callAPIWithConfig } from 'apis/apis';
import {
  BackButtonContainer, BackButtonWrapper, DownloadFileStyle, FaIconStyled, FileDeleteIcon, FileDescriptionStyled,
  FileDownloadIcon, FileListTitle, FileListWrapper, FilesListStyled, FileUploadIcon, FileWrapper, ListElementStyle,
  ListElementWrapper, MessageBoxWrapper, MessageWrapper, MobileFileListButtonStyle, NoFileMessageWrapper,
  SelectMessageWrapper, TypographyStyled,
} from 'components/routeComponents/files/FilesStyled';
import FileViewFrame from 'components/routeComponents/files/FileViewFrame';
import { TrashIconButton } from 'components/routeComponents/files/TrashIconButton';
import { csvFileToJson } from 'components/routeComponents/files/csv';
import FilesListView from 'components/routeComponents/files/FilesListView';

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
      isGoBack: false,
      isEditable: false,
      addColumnModal: false,
      excelSheetsNames: [],
    };
  }

  componentDidMount() {
    this.props.fetchFilesConfig();
  }

  APICallWithConfig = ({ config }) => {
    this.props.setLoadingState(true);
    const uploadForm = document.getElementById('uploadForm');

    callAPIWithConfig(this.props.tenant, 'file', config)
      .then((response) => {
        this.props.setLoadingState(false);
        if (response === 'ACCEPTED') {
          this.setState({
            notificationMessage: 'Data successfully updated.',
            isEditable: false,
            notificationType: 'success',
            notificationModal: true,
            showFileDetails: false,
            showUploadIcon: false,
            showFileViewFrame: false,
          }, this.closeNotificationModal());
          uploadForm.reset();
        } else {
          this.setState({
            notificationMessage: response.message,
            isEditable: false,
            notificationType: 'error',
            showFileDetails: false,
            notificationModal: true,
            showUploadIcon: false,
            showFileViewFrame: false,
          });
          uploadForm.reset();
        }
      })
      .catch((error) => {
        this.props.setLoadingState(false);
        this.setState({
          notificationMessage: `Error: ${error}`,
          isEditable: true,
          notificationType: 'error',
          notificationModal: true,
          showFileDetails: false,
          showUploadIcon: false,
          showFileViewFrame: false,
        }, this.closeNotificationModal());
        uploadForm.reset();
      })
      .finally(() => {
        this.props.fetchFilesConfig();
      });
  };

  deleteFile = (fileId) => {
    this.props.setLoadingState(true);
    const config = {
      url: `v1/documents/${fileId}`,
      method: 'DELETE',
      headers: {
        secretKey: parseInt(this.props.secretKey, 10),
      },
    };
    callAPIWithConfig(this.props.tenant, 'file', config)
      .then((response) => {
        this.props.setLoadingState(false);
        if (response === 'ACCEPTED') {
          this.setState({
            notificationMessage: 'File successfully deleted.',
            isEditable: false,
            notificationType: 'success',
            notificationModal: true,
            showConfirmationModal: false,
            deleteType: '',
            showFileDetails: false,
          }, this.closeNotificationModal());
        } else {
          this.setState({
            notificationMessage: response.message,
            notificationType: 'error',
            notificationModal: true,
            showConfirmationModal: false,
            deleteType: '',
            showFileDetails: false,
          });
        }
      })
      .catch((error) => {
        this.props.setLoadingState(false);
        this.setState({
          notificationMessage: `Error: ${error}`,
          notificationType: 'error',
          notificationModal: true,
          showConfirmationModal: false,
          deleteType: '',
          showFileDetails: false,
        }, this.closeNotificationModal());
      })
      .finally(() => {
        this.props.fetchFilesConfig();
      });
  };

  /**
   * Method call the fetch file Data method
   * @param {Object} file
   * @param {Number} index
   * @param {String} href
   * @param {Boolean} fileView
   * @param {Boolean} hasFileRoute
   */
  onClickViewFile = (file, index, href, fileView, hasFileRoute) => {
    const { setLoadingState } = this.props;

    this.setState({
      showFileDetails: true,
      currentFileDetails: file,
      activeFileId: index,
      otherExtensionFileDetails: {},
      backPageButton: false,
      fileData: [],
      hasFileRoute,
      showFileViewFrame: false,
      showUploadIcon: false,
    });
    if (!fileView) {
      this.setState({
        otherExtensionFileDetails: {
          file,
          href: file.url,
          fileView,
        },
      });
    }
    // state Loader state true
    setLoadingState(true);
    // fetch file data as per file details
    this.fetchFileData(file);
  };

  /**
   * Method will when click on any file and
   * it fetch that file data and save it in state.
   * @param{Object} file
   */
  fetchFileData = (file) => {
    const { setLoadingState, tenant, secretKey } = this.props;
    const { CSV, XLSX, XLS } = SUPPORTED_FILE_TYPES;
    const fileDetails = file;
    let fileData = [];
    const { url, displayName } = fileDetails;
    const fileType = url.slice((Math.max(0, url.lastIndexOf('.')) || Infinity) + 1);
    fileDetails.fileType = fileType;
    const responseType = fetchFileResponseType(fileDetails);

    try {
      const config = {
        url: `v1/documents/${file.id}/file`,
        method: 'GET',
        headers: {
          secretKey: parseInt(secretKey, 10),
        },
        urlValuesMap: { displayName, fileType },
        responseType,
      };

      // If file type is not convertible to json data;
      if (![CSV, XLSX, XLS].includes(fileType) && url) {
        let frameSrc = url;
        if (fileType === 'docx') {
          frameSrc = `https://docs.google.com/gview?url=${url}&embedded=true`;
        }
        this.setState({
          showFileDetails: false,
          showFileViewFrame: true,
          frameSrc,
          showUploadIcon: false,
        });
        setLoadingState(false);
      } else {
        callAPIWithConfig(tenant, 'fetchFile', config)
          .then((response) => {
            if (response) {
              if (fileDetails.fileType === CSV) {
                fileData = csv().fromString(response).then((csvRow) => {
                  this.setState({
                    oldFileData: csvRow,
                    fileData: csvRow,
                  });
                  setLoadingState(false);
                });
              } else if (fileDetails.fileType === XLSX || fileDetails.fileType === XLS) {
                fileData = formatXlsxToJson(response);
                this.setState({
                  fileData,
                });
                setLoadingState(false);
              }
            } else {
              setLoadingState(false);
            }
          },
          (error) => {
            setLoadingState(false);
          });
      }
    } catch (e) {
      setLoadingState(false);
      console.error(e);
    }
  };

  loadFileData = (file) => {
    const { setLoadingState } = this.props;
    const { CSV, XLSX, XLS } = SUPPORTED_FILE_TYPES;
    const fileDetails = file;
    const { name } = fileDetails;
    const fileType = name.slice((Math.max(0, name.lastIndexOf('.')) || Infinity) + 1);
    fileDetails.fileType = fileType;
    setLoadingState(true);

    if (fileType === CSV) {
      try {
        csvFileToJson(file).then((csvRow) => {
          this.setState({
            fileData: csvRow,
            oldFileData: csvRow,
            showFileDetails: true,
            currentFileDetails: file,
            showUploadIcon: true,
          });
        }).finally(() => setLoadingState(false));
      } catch (e) {
        setLoadingState(false);
      }
    } else if (fileType === XLSX || fileType === XLS) {
      excel2json([file], (data) => {
        setLoadingState(false);
        const sheets = Object.keys(data);
        this.setState({
          showSelectExcelSheetModal: true,
          excelSheetsNames: sheets,
          uploadedExcelData: data,
          currentFileDetails: file,
          showUploadIcon: true,
        });
      }, 'excel2json');
    } else if (fileType !== CSV || fileType !== XLSX || fileType !== XLS) {
      setLoadingState(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLoadingState(false);
        this.setState({
          showFileDetails: false,
          showFileViewFrame: true,
          frameSrc: e.target.result,
          showUploadIcon: true,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  /**
   * It set backPageButton value
   */
  onClickBackButton = () => {
    this.setState({
      backPageButton: true,
    });
  };

  /**
   * Method return file list view button
   * @return {HTML}
   */
  renderFileListViewButton = () => {
    const { hasFileRoute } = this.state;

    if (!hasFileRoute) {
      return (
        <Box
          padding="0"
          margin="0"
          borderStyle="none"
          backgroundColor="none"
          position="relative"
          onClick={this.onClickBackButton}
        >
          <MobileFileListButtonStyle>
            <FaIcon icon={faList} />
          </MobileFileListButtonStyle>
        </Box>
      );
    } return null;
  };

  /**
   * It return file description
   * @return {HTML}
   */
  renderFileDescription = () => {
    const { currentFileDetails, width } = this.state;
    const isMobile = width <= 500;
    const fileDescription = currentFileDetails.description || '';

    if (fileDescription) {
      return (
        <FileDescriptionStyled isMobile={isMobile} align="center" fontSize="20px">
          {fileDescription}
        </FileDescriptionStyled>
      );
    }
    return null;
  };

  onAddColumn = () => {
    this.setState({
      addColumnModal: true,
    });
  };

  onAddRow = () => {
    const { fileData } = this.state;
    const newRow = {};
    const oldFileData = cloneDeep(fileData);

    Object.keys(fileData[0]).forEach((key) => {
      newRow[key] = '';
    });
    fileData.splice(0, 0, newRow);

    this.setState({
      oldFileData,
      fileData,
    });
  };

  onUndo = () => {
    const { oldFileData } = this.state;
    this.setState({
      fileData: oldFileData,
    });
  };

  onDeleteRows = () => {
    const { fileData } = this.state;
    const updatedFileData = [];
    const fileDataClone = cloneDeep(fileData);

    fileData.forEach((data) => {
      if (!data.isChecked) {
        updatedFileData.push(data);
      }
    });
    this.setState({
      selectedRows: [],
      oldFileData: fileDataClone,
      fileData: updatedFileData,
    });

  };

  closeNotificationModal = () => {
    setTimeout(() => {
      this.setState({
        notificationModal: false,
        notificationMessage: '',
        notificationType: '',
      });
    }, 3000);
  };

  onSave = () => {
    const { secretKey } = this.props;
    const {
      currentFileDetails: { url, id, displayName, name },
      fileData,
      uploadedExcelData,
      selectedSheet,
    } = this.state;
    const filename = url ? url.substring(url.lastIndexOf('/') + 1) : name;
    let rawData;

    const fields = Object.keys(fileData[0]);
    const index = fields.indexOf('gridId');
    if (index > -1) {
      fields.splice(index, 1);
    }
    const json2csvParser = new Parser({ fields });
    rawData = json2csvParser.parse(fileData);

    const blob = new Blob([rawData], { type: 'application/octet-stream' });
    const formData = new FormData();

    formData.append('file', blob, `${filename.split('.')[0]}.csv`);
    formData.append('displayName', displayName ? displayName : filename);
    if (id) {
      formData.append('id', id);
    }
    const config = {
      url: 'v1/documents',
      method: 'FILE_UPLOAD',
      headers: {
        secretKey: parseInt(secretKey, 10),
      },
      data: formData,
    };

    this.props.setLoadingState(true);
    this.APICallWithConfig({ config });
  };

  onUnSupportedFileUpload = () => {
    const { secretKey } = this.props;
    this.props.setLoadingState(true);
    const form = document.getElementById('uploadForm');
    const file = document.getElementById('fileUpload').files[0];
    const formData = new FormData(form);

    formData.append('file', file);
    formData.append('displayName', file.name);

    const config = {
      url: 'v1/documents',
      method: 'FILE_UPLOAD',
      headers: {
        secretKey: parseInt(secretKey, 10),
      },
      data: formData,
    };
    this.APICallWithConfig({ config });
  };

  onSwitchEditable = (e) => {
    this.setState({
      isEditable: e.target.checked,
      showUploadIcon: !e.target.checked,
    });
  };

  addColumn = (newColumnName) => {
    if (!isEmpty(newColumnName)) {
      const { fileData } = this.state;
      const columnNamesArray = Object.keys(fileData[0])
        .map((column) =>
          column.toLowerCase().replace(/\s+/g, ''),
        );
      const newColumnNameWithoutSpace = newColumnName.toLowerCase()
        .replace(/\s+/g, '');
      if (columnNamesArray.includes(newColumnNameWithoutSpace)) {
        this.setState({
          notificationType: 'warning',
          notificationModal: true,
          notificationMessage: 'Column already exists',
        });
      } else {
        const newData = fileData.map(data => ({ ...data, [newColumnName]: '' }));
        this.setState({
          oldFileData: fileData,
          fileData: newData,
          addColumnModal: false,
        });
      }
    }
  };

  renderAddEditColumn = () => {
    const { isEditable, selectedRows } = this.state;
    const { adminLoginState } = this.props;
    const buttonStyle = {
      minWidth: '40px',
      margin: '2px',
    };
    if (!adminLoginState) {
      return null;
    }
    const showDeleteRowButton = selectedRows && selectedRows.length;
    return (
      <Row style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Col size={9}>
          <Button disabled={!isEditable} style={buttonStyle} onClick={this.onAddColumn}>
            <FaIcon icon={faPlus} />Column
          </Button>
          <Button disabled={!isEditable} style={buttonStyle} onClick={this.onAddRow}>
            <FaIcon icon={faPlus} />Row
          </Button>
          <Button disabled={!isEditable} style={buttonStyle} onClick={this.onUndo}>
            <FaIcon icon={faUndo} />
          </Button>
          <Button disabled={!isEditable} style={buttonStyle} onClick={this.onSave}>Save & Upload</Button>
          <TrashIconButton
            buttonStyle={buttonStyle}
            onClickHandler={this.onDeleteRows}
            isVisible={showDeleteRowButton}
          />
        </Col>
        <Col size={3}>
          <Row style={{ padding: '4px 10px', display: 'flex', float: 'right' }}>
            <span style={{ padding: '3px', fontWeight: '600' }}><FaIcon icon={faEdit} /></span>
            <label className="switch">
              <input type="checkbox" checked={this.state.isEditable} onChange={this.onSwitchEditable} />
              <span className="slider round" />
            </label>
          </Row>
        </Col>
      </Row>
    );
  };

  handleRowEdit = (gridId, cellId, event) => {
    const { fileData } = this.state;
    const oldFileData = cloneDeep(fileData);
    fileData[gridId] = { ...fileData[gridId], [cellId]: event.target.value };

    this.setState({
      oldFileData,
      fileData,
    });
  };

  deleteColumnIcon = key => (
    () => (
      <div style={{ position: 'absolute', right: '2px', top: '5px', color: '#898787' }}>
        <FaIcon
          height="15px"
          width="15px"
          icon={faTrash}
          onClick={() => {
            this.setState({
              showConfirmationModal: true,
              deleteKey: key,
              deleteType: 'deleteColumn',
            });
          }}
        />
      </div>)
  );

  deleteColumn = (key) => {
    const { fileData } = this.state;
    const newData = cloneDeep(fileData);

    this.setState({
      showConfirmationModal: false,
      deleteKey: '',
      fileData: newData.map(data => omit(data, [key])),
    });
  };

  getSelectedRow = (selectedRows) => {
    const temporaryTableData = this.state.fileData.map((tableDataObject) => {
      let temporaryObject = tableDataObject;
      selectedRows.forEach((selectedRowObject) => {
        if (selectedRowObject.gridId === tableDataObject.gridId) {
          temporaryObject = selectedRowObject;
        }
      });
      return temporaryObject;
    });
    this.setState({
      selectedRows,
      fileData: temporaryTableData,
    });
  }

  changeState = (stateObj) => {
    this.setState(stateObj);
  };

  renderFileListView = () => (
    <FilesListView
      loadFileData={this.loadFileData}
      onUnSupportedFileUpload={this.onUnSupportedFileUpload}
      onClickViewFile={this.onClickViewFile}
      changeState={this.changeState}
      {...this.props}
      {...this.state}
    />
  );

  /**
   * It return file details
   * @return {HTML}
   */
  renderFileDetails = () => {
    const {
      width,
      showFileDetails,
      fileData,
      hasFileRoute,
      currentFileDetails,
      otherExtensionFileDetails,
      backPageButton,
      isEditable,
      showFileViewFrame,
      frameSrc,
    } = this.state;
    const isDisplayMessage = getMessageDisplayCondition({ width, showFileDetails, backPageButton });
    const { filesConfig, constants } = this.props;
    const {
      MESSAGE_FOR_PDF_FILE_DOWNLOAD,
      DOWNLOAD,
      NO_DATA_FOUND,
      NOTHING_TO_SHOW,
      PLEASE_SELECT_A_FILE_TO_VIEW,
      NO_FILES_AVAILABLE,
    } = constants;
    const isMobile = width <= 500;
    let gridMetaData = getDataGridHeadersForFileView(fileData, currentFileDetails);
    gridMetaData = {
      ...gridMetaData,
      enableRowSelection: isEditable,
      enableAllRowSelection: isEditable,
    };
    const gridHeaderConfig = gridMetaData.headerConfig.map(column => ({
      ...column,
      headerCustomComponent: isEditable ? this.deleteColumnIcon(column.key) : null,
    }));

    if (showFileDetails) {
      if (!isEmpty(fileData)) {
        if (isMobile) {
          return (
            <MessageBoxWrapper
              borderStyle="none"
              isMobile={isMobile}
              isDisplayMessage={isDisplayMessage}
              ref={this.widthRef}
              style={hasFileRoute ? { margin: 'auto' } : null}
            >
              {this.renderFileListViewButton()}
              {this.renderFileDescription()}
              {this.renderAddEditColumn()}
              <DataGrid
                data={fileData}
                getSelectedRow={this.getSelectedRow}
                metaData={{ ...gridMetaData, gridHeaderConfig, isEditable }}
                handleRowEdit={this.handleRowEdit}
              />
            </MessageBoxWrapper>
          );
        }
        return (
          <MessageBoxWrapper
            borderStyle="none"
            isMobile={isMobile}
            isDisplayMessage={isDisplayMessage}
            ref={this.widthRef}
            style={hasFileRoute ? { margin: 'auto' } : null}
          >
            {this.renderFileDescription()}
            {this.renderAddEditColumn()}
            <DataGrid
              data={fileData}
              getSelectedRow={this.getSelectedRow}
              metaData={{ ...gridMetaData, headerConfig: gridHeaderConfig, isEditable }}
              handleRowEdit={this.handleRowEdit}
            />
          </MessageBoxWrapper>);
      } else if (!isEmpty(otherExtensionFileDetails)) {
        if (isMobile) {
          return (
            <MessageBoxWrapper
              borderStyle="none"
              isMobile={isMobile}
              isDisplayMessage={isDisplayMessage}
              ref={this.widthRef}
              style={hasFileRoute ? { margin: 'auto' } : null}
            >
              {this.renderFileListViewButton()}
              <Row display="flex" alignItems="center" justify="center" height="360px">
                <MessageWrapper>
                  <Typography fontSize="16px" type="caption">
                    { MESSAGE_FOR_PDF_FILE_DOWNLOAD }
                  </Typography>
                  <Box padding="0" backgroundColor="unset" borderStyle="none" margin="15px 0 0 0">
                    <DownloadFileStyle
                      download={`${otherExtensionFileDetails.file.displayName}.${otherExtensionFileDetails.file.fileType}`}
                      href="/"
                    >
                      {DOWNLOAD}
                      <FaIcon icon={faDownload} />
                    </DownloadFileStyle>
                  </Box>
                </MessageWrapper>
              </Row>
            </MessageBoxWrapper>
          );
        }
        return (
          <MessageBoxWrapper
            borderStyle="none"
            isMobile={isMobile}
            isDisplayMessage={isDisplayMessage}
            ref={this.widthRef}
            style={hasFileRoute ? { margin: 'auto' } : null}
          >
            <Row display="flex" alignItems="center" justify="center" height="360px">
              <MessageWrapper>
                <Typography fontSize="16px" type="caption">
                  { MESSAGE_FOR_PDF_FILE_DOWNLOAD }
                </Typography>
                <Box padding="0" backgroundColor="unset" borderStyle="none" margin="15px 0 0 0">
                  <DownloadFileStyle
                    download={`${otherExtensionFileDetails.file.displayName}.${otherExtensionFileDetails.file.fileType}`}
                    href="/"
                  >
                    {DOWNLOAD}
                    <FaIcon icon={faDownload} />
                  </DownloadFileStyle>
                </Box>
              </MessageWrapper>
            </Row>
          </MessageBoxWrapper>
        );
      } else if (isMobile) {
        return (
          <MessageBoxWrapper
            borderStyle="none"
            isMobile={isMobile}
            isDisplayMessage={isDisplayMessage}
            ref={this.widthRef}
            style={hasFileRoute ? { margin: 'auto' } : null}
          >
            {this.renderFileListViewButton()}
            <Row display="flex" alignItems="center" justify="center" height="360px">
              <TypographyStyled type="caption" fontSize="25px">
                {NO_DATA_FOUND}
              </TypographyStyled>
            </Row>
          </MessageBoxWrapper>
        );
      }
      return (
        <MessageBoxWrapper
          borderStyle="none"
          isMobile={isMobile}
          isDisplayMessage={isDisplayMessage}
          ref={this.widthRef}
          style={hasFileRoute ? { margin: 'auto' } : null}
        >
          <Row display="flex" alignItems="center" justify="center" height="360px">
            <TypographyStyled type="caption" fontSize="25px">
              {NOTHING_TO_SHOW}
            </TypographyStyled>
          </Row>
        </MessageBoxWrapper>
      );
    }
    if (
      !isEmpty(filesConfig)
      && hasIn(filesConfig, 'files')) {
      return (
        <SelectMessageWrapper
          hasFileRoute={hasFileRoute}
          borderStyle="none"
          backgroundColor="unset"
          ref={this.widthRef}
        >
          <Row display="flex" alignItems="center" justify="center" height="360px">
            <TypographyStyled type="caption" fontSize="25px">
              {PLEASE_SELECT_A_FILE_TO_VIEW}
            </TypographyStyled>
          </Row>
        </SelectMessageWrapper>
      );
    }
    if (showFileViewFrame) {
      if (isMobile) {
        return (
          <MessageBoxWrapper
            borderStyle="none"
            isMobile={isMobile}
            isDisplayMessage={isDisplayMessage}
            ref={this.widthRef}
            style={hasFileRoute ? { margin: 'auto' } : null}
          >
            <FileViewFrame frameSrc={frameSrc} />
          </MessageBoxWrapper>
        );
      }
      return (
        <MessageBoxWrapper
          borderStyle="none"
          isMobile={isMobile}
          isDisplayMessage={isDisplayMessage}
          ref={this.widthRef}
          style={hasFileRoute ? { margin: 'auto' } : null}
        >
          {this.renderFileListViewButton()}
          {this.renderFileDescription()}
          <FileViewFrame frameSrc={frameSrc} />
        </MessageBoxWrapper>);
    }
    return (
      <NoFileMessageWrapper ref={this.widthRef}>
        <Row display="flex" alignItems="center" justify="center" height="360px">
          <TypographyStyled type="caption" fontSize="25px">
            {NO_FILES_AVAILABLE}
          </TypographyStyled>
        </Row>
      </NoFileMessageWrapper>
    );
  };

  /**
   * It set value of isGoBack flag
   */
  setIsGoBack = () => {
    this.setState({
      isGoBack: true,
    });
  };

  /**
   * It return back Button
   * @return {HTML}
   */
  renderBackButton = () => {
    const { hasFileRoute } = this.state;

    if (!hasFileRoute) {
      return (
        <Button
          color="primary"
          noMinWidth
          width="30px"
          minHeight="30px"
          padding="5px"
          margin="5px"
          onClick={this.setIsGoBack}
        >
          <FaIcon icon={faArrowLeft} />
        </Button>
      );
    } return null;
  };

  renderAddColumnModal = () => {
    const { addColumnModal } = this.state;
    let newColumnName = '';

    return (
      <Modal open={addColumnModal} onClose={() => this.setState({ addColumnModal: false })}>
        <Box>
          <Row style={{ paddingBottom: '10px' }}>
            <Col>
              <label>
                Column Name:
              </label>
            </Col>
            <Col>
              <input
                type="text"
                onChange={(event) => { newColumnName = event.target.value; }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => this.addColumn(newColumnName)}>
                Add
              </Button>
            </Col>
            <Col>
              <Button onClick={() => this.setState({ addColumnModal: false })}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Box>
      </Modal>
    );
  };

  renderNotificationModal = () => {
    const { notificationType, notificationModal, notificationMessage } = this.state;
    const closeModal = () => {
      this.setState({ notificationModal: false });
    };
    return (
      <Modal
        open={notificationModal}
        onClose={closeModal}
        onEscKeyDown={closeModal}
      >
        <Box margin="0px">
          <Row style={{ paddingBottom: '10px' }}>
            <Col>
              <Row padding="0px">
                <Typography color={notificationType}>
                  {notificationMessage}
                </Typography>
              </Row>
            </Col>
          </Row>
        </Box>
      </Modal>
    );
  };

  renderSelectExcelSheetModal = () => {
    const { showSelectExcelSheetModal, excelSheetsNames, uploadedExcelData } = this.state;

    return (
      <Modal open={showSelectExcelSheetModal} onClose={() => this.setState({ showSelectExcelSheetModal: false })}>
        <Box>
          <Row style={{ paddingBottom: '10px' }}>
            <Col>
              <label>
                File contains multiple sheets.
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                Select one:
              </label>
              <select onChange={(event) => {
                this.setState({
                  selectedSheet: event.target.value,
                  showSelectExcelSheetModal: false,
                  excelSheetsNames: [],
                  fileData: uploadedExcelData[event.target.value],
                  oldFileData: uploadedExcelData[event.target.value],
                  showFileDetails: true,
                });
              }}
              >
                <option />
                {excelSheetsNames.length
                && excelSheetsNames.map(sheetName =>
                  (<option key={shortId.generate()} value={sheetName}>{sheetName}</option>))}
              </select>
            </Col>
          </Row>
        </Box>
      </Modal>
    );
  };

  renderConfirmationModal = () => {
    const { showConfirmationModal, deleteKey, deleteType } = this.state;

    return (
      <Modal
        open={showConfirmationModal}
        onClose={() => this.setState({
          deleteType: '',
          deleteKey: '',
          showConfirmationModal: false,
        })}
      >
        <Box>
          <Row style={{ paddingBottom: '10px' }}>
            <Col>
              <label>
                Please confirm to delete.
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => { this.setState({ showConfirmationModal: false }); this[deleteType](deleteKey); }}>
                Confirm
              </Button>
            </Col>
            <Col>
              <Button onClick={() => this.setState({ deleteType: '', deleteKey: '', showConfirmationModal: false })}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Box>
      </Modal>
    );
  };

  render() {
    const { context } = this.props;
    const { isGoBack } = this.state;

    if (isGoBack) {
      return <Switch><Redirect to={context.previousLocation} /></Switch>;
    }
    return (
      <FileWrapper borderStyle="none">
        <BackButtonContainer>
          <BackButtonWrapper>
            {this.renderBackButton()}
          </BackButtonWrapper>
        </BackButtonContainer>
        <FileListWrapper>
          {this.renderConfirmationModal()}
          {this.renderSelectExcelSheetModal()}
          {this.renderNotificationModal()}
          {this.renderAddColumnModal()}
          {this.renderFileListView()}
          {this.renderFileDetails()}
        </FileListWrapper>
      </FileWrapper>
    );
  }
}

Files.propTypes = {
  apiConfig: PropTypes.object,
  constants: PropTypes.object,
  fetchFilesConfig: PropTypes.func,
  setLoadingState: PropTypes.func,
  filesConfig: PropTypes.array,
  context: PropTypes.object,
  tenant: PropTypes.string,
};

Files.defaultProps = {
  apiConfig: {},
  constants: {},
  setLoadingState: () => {},
  fetchFilesConfig: () => {},
  filesConfig: [],
  context: {},
  tenant: '',
};

const mapStateToProps = state => ({
  apiConfig: getAPIConfig(state, 'file', 'fetchFile'),
  constants: getConstants(state),
  secretKey: getSecretKey(state),
  filesConfig: getFilesConfig(state),
  tenant: getTenantName(state),
  adminLoginState: getAdminLoginState(state),
});

const mapDispatchToProps = dispatch => ({
  setLoadingState: props => dispatch(setLoadingStateAction(props)),
  fetchFilesConfig: props => dispatch(fetchFilesConfigAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Files);
