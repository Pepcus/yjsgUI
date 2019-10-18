import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import * as shortId from 'shortid';
import isEmpty from 'lodash/isEmpty';
import hasIn from 'lodash/hasIn';
import PropTypes from 'prop-types';
import DataGrid from 'simple-react-data-grid';
import csv from 'csvtojson';
import styled from 'styled-components';
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
import { getThemeProps } from 'pepcus-core/utils/theme';

import {
  getSecretKey,
} from 'reducers/loginReducer';
import {
  getFilesConfig,
} from 'reducers/assetFilesReducer';
import {
  fetchFilesConfigAction,
} from 'actions/assetFilesActions';
import { SUPPORTED_FILE_TYPES } from 'constants/file';
import { manageMembersTableWidth } from 'utils/common';
import {
  formatXlsxToJson,
  getDataGridHeadersForFileView,
  getFileListDisplayCondition,
  getMessageDisplayCondition,
} from 'utils/routes';
import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import { fetchFile } from 'apis/file';
import { getAppConstantsConfig } from 'reducers/constants';

const FileWrapper = styled(Box)`
    min-height: 100%;
    padding-bottom: 35px;
    padding-top: 100px;
    ${({ theme }) => theme.media.down('xl')`
        padding-top: 0;
        margin-top: 100px;
    `}
    ${({ theme }) => theme.media.down('lg')`
        padding-top: 0;
        margin-top: 0;
    `}
`;

const BackButtonContainer = styled(Row)`
    top: 11px;
    z-index: 2;
    position: absolute;
    right: 28px;
    display: none;
    ${({ theme }) => theme.media.down('lg')`
        display: block;
        position: absolute;
        top: 66px;
        right: 0;
        z-index: 1;
    `}
    ${({ theme }) => theme.media.down('md')`
        position: absolute;
        right: 0;
        margin-top: 17px;
        z-index: 1;
    `}
`;

const BackButtonWrapper = styled(Col)`
    display: flex;
    &:hover {
        border-radius: 4px;
        border: 1px solid ${getThemeProps('palette.primary.borderColor')};
        background-color: ${getThemeProps('palette.primary.borderColor')};
        transition: 0.3s all;
    }
    ${({ theme }) => theme.media.down('lg')`
        margin: 0 10px;
    `}
`;

const FileListWrapper = styled(Row)`
    display: flex;
    height: 100%;
    ${({ theme }) => theme.media.down('lg')`
        padding-top: 30px;
    `}
    ${({ theme }) => theme.media.down('sm')`
        padding: 45px 10px 0;
    `}
    ${({ theme }) => theme.media.down('xs')`
        margin: 10px;
    `}
`;

const FilesListStyled = styled(Box)`
        max-height: 523px;
        height: 100%;
        overflow-y: scroll;
        width: 300px;
        position: fixed;
        left: 0;
        background-color: ${getThemeProps('palette.advancedSearch.color')};
    ${({ theme }) => theme.media.down('lg')`
        max-height: ${props => (props.isDisplayCondition ? 'initial' : 'none')};;
        height: 100%;
        width: 260px;
        display: ${props => (props.isDisplayCondition ? 'block' : 'none')};
        overflow-y: ${props => (props.isDisplayCondition ? 'unset' : 'scroll')};
        position: fixed;
        left: 0;
        background-color: ${getThemeProps('palette.advancedSearch.color')};
    `}
    @media (max-width: 992px) and (orientation: landscape) {
        position: relative;
    }
    ${({ theme }) => theme.media.down('md')`
        max-height: initial;
        height: 100%;
        width: ${props => (props.isDisplayCondition ? '100%' : '260px')};
        left: ${props => (props.isDisplayCondition ? 'auto' : 'none')};
        margin: 0;
        overflow-y: ${props => (props.isDisplayCondition ? 'inherit' : 'scroll')};
        position: relative;
        display: ${props => (props.isDisplayCondition ? 'block' : 'none')}
    `}
    ${({ theme }) => theme.media.down('sm')`
        margin: 0;
        display: ${props => (props.isDisplayCondition ? 'block' : 'none')}
    `}
`;

const MessageBoxWrapper = styled(Box)`
    width: 100%;
    max-width: 78%
    padding-top: 10px;
    margin: 0 0 0 300px;
    overflow-x: hidden;
    ${({ theme }) => theme.media.down('lg')`
        display:  ${props => (props.isDisplayMessage ? 'unset' : 'none')}
        max-width: ${props => (props.isMobile ? '100%' : '64%')}
        margin: ${props => (props.isMobile ? '0' : '0 0 0 270px')};
    `}
    ${({ theme }) => theme.media.down('md')`
        padding: 0;
        max-width: ${props => (props.isMobile ? '100%' : '64%')}
        margin: ${props => (props.isMobile ? '0' : 'unset')};
        width: 100%;
    `}
`;

const FileListTitle = styled(Typography)`
    font-size: 21px !important;
    color: ${getThemeProps('typography.titleFieldColor.color')};
    padding: 10px 20px 8px;
    ${({ theme }) => theme.media.down('lg')`
        padding: 15px 15px 10px;
    `}
    ${({ theme }) => theme.media.down('md')`
        padding: 15px 15px 0;
    `}
`;

const ListElementWrapper = styled(Col)`
    flex: 1;
    font-size: 14px;
    overflow: hidden;
    color: ${getThemeProps('palette.checkbox.color')};
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover{
        color: ${getThemeProps('palette.primary.borderColor')};
        transition: 0.3s all;
    }
`;

const FaIconStyled = styled(FaIcon)`
     margin-right: 10px;
     font-size: 14px;
     color: ${props => (props.isview === 'true' ? getThemeProps('colors.header') : 'unset')};
     cursor: ${props => (props.isview === 'true' ? 'unset' : 'text')};
`;

const ListElementStyle = styled(Typography)`
     font-size: 14px !important;
     text-overflow: ellipsis;
     overflow: hidden;
     max-width: 100%;
     white-space: nowrap;
     display: inline-block;
     color: ${props => (props.isview === 'true' ? getThemeProps('colors.header') : 'unset')};  
`;

const FileDownloadIcon = styled('a')`
    cursor: pointer;
    margin-left: 10px;
    color: ${props => (props.isview === 'true' ? getThemeProps('colors.header') : getThemeProps('palette.checkbox.color'))};
    transition: 0.3s all;
    &:hover{
        color: ${getThemeProps('palette.primary.borderColor')};
        transition: 0.3s all;
    }
`;

const MobileFileListButtonStyle = styled('a')`
    display: none;
    ${({ theme }) => theme.media.down('lg')`
        display: block;
        color: ${getThemeProps('colors.WHITE')};
        background-color: ${getThemeProps('colors.header')};
        outline: none;
        text-align: center;
        padding: 7px;
        box-shadow: none;
        font-size: 14px;
        border-radius: 4px;
        &:hover{
            color: ${getThemeProps('colors.WHITE')};
            background-color: ${getThemeProps('palette.primary.borderColor')};
            transition: 0.3s all;
        }
    `}
    @media (max-width: 992px) and (orientation: landscape) {
        display: block;
        position: absolute;
        right: 10px;
        z-index: 2;
    }
    ${({ theme }) => theme.media.down('md')`
        display: block;
        position: absolute;
        right: 10px;
        z-index: 2;
    `}
    ${({ theme }) => theme.media.down('sm')`
        display: block;
        position: absolute;
        right: 0;
        z-index: 2;
    `}
    ${({ theme }) => theme.media.down('xs')`
        display: block;
        position: absolute;
        right: 0;
        z-index: 2;
    `}
`;

const SelectMessageWrapper = styled(Box)`
    margin: ${props => (props.hasFileRoute ? 'auto' : null)};
    width: 100%;
    max-width: 78%;
    padding-top: 10px;
    margin: 0 0 0 300px;
    overflow-x: hidden;
    ${({ theme }) => theme.media.down('lg')`
        max-width: 64%;
        margin: 0 0 0 270px;
    `}
    ${({ theme }) => theme.media.down('md')`
        display: none;
    `}
`;

const TypographyStyled = styled(Typography)`
    color: ${getThemeProps('palette.tertiary.color')};
`;

const NoFileMessageWrapper = styled(Box)`
    width: 100%;
    padding-top: 30px;
    overflow-x: hidden;
`;

const FileDescriptionStyled = styled(Typography)`
    color: ${getThemeProps('colors.header')},
    margin-top: ${props => (props.isMobile ? '45px' : 'unset')}
`;

const MessageWrapper = styled(Box)`
    max-width: 50%;
    display: inline;
    text-align: center;
    background: ${getThemeProps('palette.advancedSearch.color')};
    box-shadow: 0px 1px 2px 0px ${getThemeProps('palette.footer.backgroundColor')};
    padding: 46px 78px;
    color: ${getThemeProps('palette.checkbox.color')};
    line-height: 25px;
    font-size: 16px;
    ${({ theme }) => theme.media.down('md')`
        max-width: 76%;
        padding: 46px 18px;
    `}
    ${({ theme }) => theme.media.down('sm')`
        max-width: 100%;
        padding: 46px 15px;
        line-height: 22px;
        font-size: 16px;
    `}
`;

const DownloadFileStyle = styled('a')`
    color: ${getThemeProps('colors.WHITE')};
    background-color: ${getThemeProps('palette.checkbox.color')};
    outline: none;
    box-shadow: 0 1px 3px 0 ${getThemeProps('palette.tertiary.color')};
    display: inline-block;
    text-align: center;
    line-height: 20px;
    padding: 10px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        transition: 0.3s all;
        background-color: ${getThemeProps('typography.titleFieldColor.color')};
    }
`;

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
    };
  }

  componentDidMount() {
    const { filesConfig, fetchFilesConfig } = this.props;
    const { TXT, PDF } = SUPPORTED_FILE_TYPES;

    fetchFilesConfig();
    const collections = window.location.hash.split('/files/');
    if (collections[1]) {
      if (filesConfig.files) {
        filesConfig.files.forEach((fileInfo, index) => {
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

  componentWillReceiveProps(nextProps) {
    const { filesConfig } = this.props;
    const { PDF, TXT } = SUPPORTED_FILE_TYPES;

    if (filesConfig !== nextProps.filesConfig) {
      const collections = window.location.hash.split('/files/');
      if (collections[1]) {
        nextProps.filesConfig.files.forEach((fileInfo, index) => {
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
    const { setLoadingState } = this.props;
    const { CSV, XLSX, XLS } = SUPPORTED_FILE_TYPES;
    const fileDetails = file;
    let fileData = [];

    try {
      fetchFile(fileDetails)
        .then((response) => {
          if (response) {
            if (fileDetails.fileType === CSV) {
              fileData = csv().fromString(response).then((csvRow) => {
                this.setState({
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
      if (hasIn(filesConfig, 'files')) {
        return (
          <FilesListStyled
            isDisplayCondition={isDisplayCondition}
          >
            <FileListTitle type="headline">Available Files</FileListTitle>
            {filesConfig.files.map((file, index) => {
                const href = `files/${file.fileName}.${file.fileType ? file.fileType : TXT}`;
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
                          title={file.fileLabel}
                        >
                          {file.fileLabel}
                        </ListElementStyle>
                      </Row>
                    </ListElementWrapper>
                    <FileDownloadIcon
                      download={`${file.fileLabel}.${file.fileType}`}
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
    } = this.state;
    const isDisplayMessage = getMessageDisplayCondition({ width, showFileDetails, backPageButton });
    const { filesConfig, appConstants } = this.props;
    const {
      MESSAGE_FOR_PDF_FILE_DOWNLOAD,
      DOWNLOAD,
      NO_DATA_FOUND,
      NOTHING_TO_SHOW,
      PLEASE_SELECT_A_FILE_TO_VIEW,
      NO_FILES_AVAILABLE,
    } = appConstants;
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
              <DataGrid
                data={fileData}
                metaData={
                  getDataGridHeadersForFileView(fileData, currentFileDetails)}
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
            <DataGrid
              data={fileData}
              metaData={getDataGridHeadersForFileView(
                fileData,
                currentFileDetails)
              }
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
          {this.renderFileList()}
          {this.renderFileDetails()}
        </FileListWrapper>
      </FileWrapper>
    );
  }
}

Files.propTypes = {
  appConstants: PropTypes.object,
  fetchFilesConfig: PropTypes.func,
  setLoadingState: PropTypes.func,
  filesConfig: PropTypes.object,
  context: PropTypes.object,
};

Files.defaultProps = {
  appConstants: {},
  setLoadingState: () => {},
  fetchFilesConfig: () => {},
  filesConfig: {},
  context: {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
  secretKey: getSecretKey(state),
  filesConfig: getFilesConfig(state),
});

const mapDispatchToProps = dispatch => ({
  setLoadingState: props => dispatch(setLoadingStateAction(props)),
  fetchFilesConfig: props => dispatch(fetchFilesConfigAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Files);
