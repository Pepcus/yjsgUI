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
import json2xls from 'json2xls';
import { json2excel, excel2json } from 'js2excel';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { Modal } from 'pepcus-core';

import { getSecretKey } from 'reducers/loginReducer';
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
  BackButtonContainer, BackButtonWrapper, DownloadFileStyle, FaIconStyled, FileDescriptionStyled,
  FileDownloadIcon, FileListTitle, FileListWrapper, FilesListStyled, FileWrapper, ListElementStyle,
  ListElementWrapper, MessageBoxWrapper, MessageWrapper, MobileFileListButtonStyle, NoFileMessageWrapper,
  SelectMessageWrapper, TypographyStyled,
} from 'components/routeComponents/files/FilesStyled';

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
    const { fetchFilesConfig } = this.props;
    fetchFilesConfig();
  }

  componentWillReceiveProps(nextProps) {
    const { filesConfig } = this.props;
    const { PDF, TXT } = SUPPORTED_FILE_TYPES;

    if (filesConfig !== nextProps.filesConfig) {
      const collections = window.location.hash.split('/files/');
      if (collections[1]) {
        nextProps.filesConfig.forEach((fileInfo, index) => {
          if (fileInfo.routeName === collections[1]) {
            if (fileInfo.fileType === PDF) {
              const url = window.location.href.replace(fileInfo.routeName,
                `${fileInfo.fileName}.${fileInfo.fileType}`).replace('/#', '');
              window.open(`${url}`, '_self');
            }
            const href = `files/${fileInfo.fileName}.${fileInfo.fileType ? fileInfo.fileType : TXT}`;
            const hasFileRoute = true;
            this.onClickViewFile(fileInfo, index, href, fileInfo.isViewable, hasFileRoute);
          }
        });
      }
    }
  }

  componentDidUpdate() {
    manageMembersTableWidth(this.widthRef);
  }

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
    const { setLoadingState, tenant } = this.props;
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
          secretKey: 451727,
        },
        urlValuesMap: { displayName, fileType },
        responseType,
      };
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
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvText = event.target.result;
          csv().fromString(csvText).then((csvRow) => {
            this.setState({
              fileData: csvRow,
              oldFileData: csvRow,
              showFileDetails: true,
              currentFileDetails: file,
            });
          }).finally(() => setLoadingState(false));
        };
        reader.readAsText(file);
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
        });
      }, 'excel2json');
    } else if (fileType !== CSV || fileType !== XLSX || fileType !== XLS) {
      setLoadingState(true);
      this.setState({
        notificationMessage: 'File type cannot be displayed on grid.',
        isEditable: false,
        notificationModal: true,
        showUploadUnsupportedFileButton: true,
      });
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
   * Method return file list
   * @return {HTML}
   */
  renderFileList = () => {
    const { hasFileRoute, activeFileId, width, showFileDetails, backPageButton } = this.state;
    const { filesConfig } = this.props;
    const { TXT } = SUPPORTED_FILE_TYPES;
    const isDisplayCondition = getFileListDisplayCondition({ width, showFileDetails, backPageButton });

    if (hasFileRoute) {
      return null;
    }
    if (!isEmpty(filesConfig)) {
      return (
        <FilesListStyled
          isDisplayCondition={isDisplayCondition}
        >
          <form id="uploadForm">
            <input
              type="file"
              id="fileUpload"
              onChange={(event) => { this.loadFileData(event.target.files[0]); }}
            />
          </form>
          <FileListTitle type="headline">Available Files</FileListTitle>
          {filesConfig.map((file, index) => {
                const href = file.url;
                return (
                  <Row
                    display="flex"
                    margin="19px 20px"
                    key={shortId.generate()}
                  >
                    <ListElementWrapper
                      onClick={() => this.onClickViewFile(file, index, href, file.isViewable)}
                    >
                      <Row display="flex" wrap="nowrap">
                        <FaIconStyled
                          icon={faFile}
                          isview={toString(activeFileId === index)}
                        />
                        <ListElementStyle
                          type="caption"
                          isview={toString(activeFileId === index)}
                          title={file.displayName}
                        >
                          {file.displayName}
                        </ListElementStyle>
                      </Row>
                    </ListElementWrapper>
                    <FileDownloadIcon
                      download={`${file.displayName}`}
                      href={href}
                      isview={toString(activeFileId === index)}
                    >
                      <FaIcon icon={faDownload} />
                    </FileDownloadIcon>
                  </Row>
                );
              },
            )}
        </FilesListStyled>
      );
    }
    return null;
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

  closeNotificationModal = () => {
    setTimeout(() => {
      this.setState({
        notificationModal: false,
        notificationMessage: '',
      });
    }, 3000);
  };

  onSave = () => {
    const {
      currentFileDetails: { url, id, displayName, name },
      fileData,
      uploadedExcelData,
      selectedSheet,
    } = this.state;
    const fileType = url
      ? url.slice((Math.max(0, url.lastIndexOf('.')) || Infinity) + 1) : name.split('.').pop();
    const filename = url ? url.substring(url.lastIndexOf('/') + 1) : name;
    let rawData;

    if (fileType === 'csv') {
      const fields = Object.keys(fileData[0]);
      const index = fields.indexOf('gridId');
      if (index > -1) {
        fields.splice(index, 1);
      }
      const json2csvParser = new Parser({ fields });
      rawData = json2csvParser.parse(fileData);
    }
    if (fileType === 'xls' || fileType === 'xlsx') {
      rawData = json2xls(fileData);
    }
   /* if (fileType === 'xlsx') {
      const data = uploadedExcelData.length ? { ...uploadedExcelData, [selectedSheet]: fileData } : fileData;
      rawData = json2excel({
        data,
        name: filename,
        formateDate: 'dd/mm/yyyy',
      }).then(exceldata => {
        console.log('data -then- ', exceldata) });
      console.log('rawData -- ', rawData)
    }*/

    const blob = new Blob([rawData], { type: 'application/octet-stream' });
    const formData = new FormData();

    formData.append('file', blob, filename);
    formData.append('displayName', displayName ? displayName : filename);
    if (id) {
      formData.append('id', id);
    }

    const config = {
      url: 'v1/documents',
      method: 'FILE_UPLOAD',
      headers: {
        secretKey: 451727,
      },
      data: formData,
    };
    this.props.setLoadingState(true);
    callAPIWithConfig(this.props.tenant, 'file', config)
      .then((response) => {
        this.props.setLoadingState(false);
        if (response === 'ACCEPTED') {
          this.setState({
            notificationMessage: 'Data successfully updated.',
            isEditable: false,
            notificationModal: true,
          }, this.closeNotificationModal());
        }
      })
      .catch((error) => {
        this.props.setLoadingState(false);
        this.setState({
          notificationMessage: `Error: ${error}`,
          isEditable: true,
          notificationModal: true,
        }, this.closeNotificationModal());
      });
  };

  onUnSupportedFileUpload = () => {
    const form = document.getElementById('uploadForm');
    const file = document.getElementById('fileUpload').files[0];
    const formData = new FormData(form);

    formData.append('file', file);
    formData.append('displayName', file.name);

    const config = {
      url: 'v1/documents',
      method: 'FILE_UPLOAD',
      headers: {
        secretKey: 451727,
      },
      data: formData,
    };
    callAPIWithConfig(this.props.tenant, 'file', config)
      .then((response) => {
        if (response === 'ACCEPTED') {
          this.setState({
            notificationMessage: 'Uploaded successfully.',
            isEditable: false,
            notificationModal: true,
          }, this.closeNotificationModal());
        }
        console.log('response -- ', response);
      });
  }

  onSwitchEditable = (e) => {
    this.setState({
      isEditable: e.target.checked,
    });
  };

  renderAddEditColumn = () => {
    const { isEditable } = this.state;
    return (
      <Row style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Col size={9}>
          <Button disabled={!isEditable} style={{ margin: '2px' }} onClick={this.onAddColumn}>Add Column</Button>
          <Button disabled={!isEditable} style={{ margin: '2px' }} onClick={this.onAddRow}>Add Row</Button>
          <Button disabled={!isEditable} style={{ margin: '2px' }} onClick={this.onUndo}>Undo</Button>
          <Button disabled={!isEditable} style={{ margin: '2px' }} onClick={this.onSave}>Save</Button>
        </Col>
        <Col size={3}>
          <Row style={{ padding: '4px 10px', display: 'flex', float: 'right' }}>
            <span style={{ padding: '3px', fontWeight: '600' }}>Edit </span>
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
                metaData={{ ...getDataGridHeadersForFileView(fileData, currentFileDetails), isEditable }}
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
              metaData={{ ...getDataGridHeadersForFileView(fileData, currentFileDetails), isEditable }}
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
                      download={`${otherExtensionFileDetails.file.fileName}.${otherExtensionFileDetails.file.fileType}`}
                      href={otherExtensionFileDetails.href}
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
                    download={`${otherExtensionFileDetails.file.fileName}.${otherExtensionFileDetails.file.fileType}`}
                    href={otherExtensionFileDetails.href}
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

  addColumn = (newColumnName) => {
    if (!isEmpty(newColumnName)) {
      const { fileData } = this.state;
      const newData = fileData.map(data => ({ ...data, [newColumnName]: '' }));

      this.setState({
        oldFileData: fileData,
        fileData: newData,
        addColumnModal: false,
      });
    }
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
    const { notificationModal, notificationMessage, showUploadUnsupportedFileButton } = this.state;

    return (
      <Modal open={notificationModal} onClose={() => this.setState({ notificationModal: false })}>
        <Box>
          <Row style={{ paddingBottom: '10px' }}>
            <Col>
              <Row>
                <label>
                  {notificationMessage}
                </label>
              </Row>
              <Row>
                { showUploadUnsupportedFileButton && <button onClick={this.onUnSupportedFileUpload}>Upload</button>}
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
              }}>
                <option />
                {excelSheetsNames.length
                && excelSheetsNames.map(sheetName => (<option value={sheetName}>{sheetName}</option>))}
              </select>
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
          {this.renderSelectExcelSheetModal()}
          {this.renderNotificationModal()}
          {this.renderAddColumnModal()}
          {this.renderFileList()}
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
});

const mapDispatchToProps = dispatch => ({
  setLoadingState: props => dispatch(setLoadingStateAction(props)),
  fetchFilesConfig: props => dispatch(fetchFilesConfigAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Files);
