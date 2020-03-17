import React from 'react';
import PropsTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import * as shortId from 'shortid';

import { getFileListDisplayCondition } from 'utils/routes';
import {
  FaIconStyled, FileDeleteIcon, FileDownloadIcon,
  FileListTitle,
  FilesListStyled,
  FileUploadIcon, ListElementStyle,
  ListElementWrapper,
} from 'components/routeComponents/files/FilesStyled';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Row from 'pepcus-core/lib/Row';
import Box from 'pepcus-core/lib/Box';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Accordion, AccordionContent, AccordionHeader } from 'pepcus-core';

/**
 * Method return file list
 * @return {HTML}
 */
const FilesListView = (props) => {
  const {
    hasFileRoute,
    activeFileId,
    width,
    showFileDetails,
    showFileViewFrame,
    backPageButton,
    showUploadIcon,
    filesConfig,
    adminLoginState,
    changeState,
    loadFileData,
    onUnSupportedFileUpload,
    onClickViewFile,
  } = props;
  const isDisplayCondition = getFileListDisplayCondition({
    width,
    showFileDetails,
    backPageButton,
    showFileViewFrame,
  });

  function renderUploadForm() {
    if (!adminLoginState) {
      return null;
    }
    const style = {
      display: 'flex',
      paddingBottom: '10px',
    };
    return (
      <div style={style}>
        <form id="uploadForm">
          <input
            style={{ width: '80%' }}
            type="file"
            id="fileUpload"
            onChange={(event) => { loadFileData(event.target.files[0]); }}
          />
        </form>
        { showUploadIcon
          ? <FileUploadIcon onClick={onUnSupportedFileUpload}><FaIcon icon={faUpload} /></FileUploadIcon>
          : null
        }
      </div>
    );
  }

  function renderFilesList() {
    const excelFilesList = [];
    const pdfFilesList = [];
    const docsFilesList = [];
    const otherFilesList = [];
    const accordionHeaderMap = [
      'EXCELS',
      'PDF',
      'DOCS',
      'OTHERS',
    ];
    const accordionHeaderStyles = {
      fontSize: '12px',
      color: '#897e7e',
      fontFamily: "'Roboto Condensed', Serif",
    };

    filesConfig.length && filesConfig.forEach((file, index) => {
      const href = file.url;
      const fileType = file.url.slice((Math.max(0, file.url.lastIndexOf('.')) || Infinity) + 1);

      if (fileType === 'csv' || fileType === 'xlsx' || fileType === 'xls') {
        excelFilesList.push(
          <Row
            display="flex"
            margin="19px 20px"
            key={shortId.generate()}
          >
            <ListElementWrapper
              onClick={() => onClickViewFile(file, index, href, file.isViewable)}
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
              target="_blank"
              onClick={() => { window.open(file.url); }}
              isview={toString(activeFileId === index)}
            >
              <FaIcon icon={faDownload} />
            </FileDownloadIcon>
            <FileDeleteIcon onClick={() => changeState({
              showConfirmationModal: true,
              deleteKey: file.id,
              deleteType: 'deleteFile',
            })}
            >
              <FaIcon icon={faTrash} />
            </FileDeleteIcon>
          </Row>,
        );
      } else if (fileType === 'pdf') {
        pdfFilesList.push(
          <Row
            display="flex"
            margin="19px 20px"
            key={shortId.generate()}
          >
            <ListElementWrapper
              onClick={() => onClickViewFile(file, index, href, file.isViewable)}
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
              target="_blank"
              onClick={() => { window.open(file.url); }}
              isview={toString(activeFileId === index)}
            >
              <FaIcon icon={faDownload} />
            </FileDownloadIcon>
            <FileDeleteIcon onClick={() => changeState({
              showConfirmationModal: true,
              deleteKey: file.id,
              deleteType: 'deleteFile',
            })}
            >
              <FaIcon icon={faTrash} />
            </FileDeleteIcon>
          </Row>,
        );
      } else if (fileType === 'doc' || fileType === 'docx') {
        docsFilesList.push(
          <Row
            display="flex"
            margin="19px 20px"
            key={shortId.generate()}
          >
            <ListElementWrapper
              onClick={() => onClickViewFile(file, index, href, file.isViewable)}
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
              target="_blank"
              onClick={() => { window.open(file.url); }}
              isview={toString(activeFileId === index)}
            >
              <FaIcon icon={faDownload} />
            </FileDownloadIcon>
            <FileDeleteIcon onClick={() => changeState({
              showConfirmationModal: true,
              deleteKey: file.id,
              deleteType: 'deleteFile',
            })}
            >
              <FaIcon icon={faTrash} />
            </FileDeleteIcon>
          </Row>,
        );
      } else {
        otherFilesList.push(
          <Row
            display="flex"
            margin="19px 20px"
            key={shortId.generate()}
          >
            <ListElementWrapper
              onClick={() => onClickViewFile(file, index, href, file.isViewable)}
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
              target="_blank"
              onClick={() => { window.open(file.url); }}
              isview={toString(activeFileId === index)}
            >
              <FaIcon icon={faDownload} />
            </FileDownloadIcon>
            <FileDeleteIcon onClick={() => changeState({
              showConfirmationModal: true,
              deleteKey: file.id,
              deleteType: 'deleteFile',
            })}
            >
              <FaIcon icon={faTrash} />
            </FileDeleteIcon>
          </Row>,
        );
      }
    });
    return (
      <div>
        {[excelFilesList, pdfFilesList, docsFilesList, otherFilesList].map((fileSection, idx) => (fileSection.length ? (
          <Accordion
            headerComponent={AccordionHeader}
            HeaderProps={{ iconPosition: 'right', style: accordionHeaderStyles }}
            defaultExpanded
            description={accordionHeaderMap[idx]}
            contentComponent={AccordionContent}
            ContentProps={{ padding: '12px, 0px' }}
            key={shortId.generate()}
          >
            {fileSection}
          </Accordion>
        ) : null))}
      </div>
    );
  }

  if (hasFileRoute) {
    return null;
  }

  return (
    <FilesListStyled isDisplayCondition={isDisplayCondition} >
      {renderUploadForm()}
      {renderFilesList()}
    </FilesListStyled>
  );
};


FilesListView.propTypes = {
  adminLoginState: PropsTypes.bool.isRequired,
  activeFileId: PropsTypes.number,
  backPageButton: PropsTypes.bool.isRequired,
  filesConfig: PropsTypes.array,
  hasFileRoute: PropsTypes.bool,
  showFileDetails: PropsTypes.bool,
  showFileViewFrame: PropsTypes.bool,
  showUploadIcon: PropsTypes.bool,
  width: PropsTypes.number,
  changeState: PropsTypes.func.isRequired,
  loadFileData: PropsTypes.func.isRequired,
  onUnSupportedFileUpload: PropsTypes.func.isRequired,
  onClickViewFile: PropsTypes.func.isRequired,
};

FilesListView.defaultProps = {
  activeFileId: null,
  hasFileRoute: undefined,
  filesConfig: [],
  showFileDetails: false,
  showFileViewFrame: false,
  showUploadIcon: false,
  width: null,
};

export default FilesListView;
