/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import Popup from 'components/common/Popup';
import { FILE_DOWNLOAD_MESSAGE } from 'constants/text';
import { OK_TEXT } from 'constants/yjsg';

const MessageStyled = styled(Typography)`
  color: ${getThemeProps('palette.white.color')};
  width: 100%;
`;

/**
 * FileDownloadMessagePopup render popup of file download
 * @param {Boolean} fileDownloadMessage
 * @param {Boolean} onClickAllExport
 * @return {HTML}
 */
const FileDownloadMessagePopup = ({
  fileDownloadMessage,
  onClickAllExport,
}) => {
  if (fileDownloadMessage) {
    return (
      <Popup>
        <MessageStyled
          fontSize="18px"
        >
          {FILE_DOWNLOAD_MESSAGE}
        </MessageStyled>
        <Row
          width="100%"
          display="inline-block"
          margin="10px 0px 0 0px"
        >
          <Button
            color="tertiary"
            onClick={() => { onClickAllExport(false); }}
          >
            { OK_TEXT }
          </Button>
        </Row>
      </Popup>
    );
  }
  return null;
};

FileDownloadMessagePopup.propTypes = {
  fileDownloadMessage: PropTypes.bool,
  onClickAllExport: PropTypes.func,
};

FileDownloadMessagePopup.defaultProps = {
  fileDownloadMessage: false,
  onClickAllExport: () => {},
};

export default FileDownloadMessagePopup;
