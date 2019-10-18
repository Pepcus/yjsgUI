import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import Popup from 'components/common/Popup';
import { getConstants } from 'reducers/constants';

const MessageStyled = styled(Typography)`
  color: ${getThemeProps('palette.white.color')};
  width: 100%;
`;

/**
 * FileDownloadMessagePopup render popup of file download
 * @param {Object} constants
 * @param {Boolean} fileDownloadMessage
 * @param {Boolean} onClickAllExport
 * @return {HTML}
 */
const FileDownloadMessagePopup = ({
  constants,
  fileDownloadMessage,
  onClickAllExport,
}) => {
  const {
    FILE_DOWNLOAD_MESSAGE,
    OK_TEXT,
  } = constants;

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
            {OK_TEXT}
          </Button>
        </Row>
      </Popup>
    );
  }
  return null;
};

FileDownloadMessagePopup.propTypes = {
  constants: PropTypes.object,
  fileDownloadMessage: PropTypes.bool,
  onClickAllExport: PropTypes.func,
};

FileDownloadMessagePopup.defaultProps = {
  constants: {},
  fileDownloadMessage: false,
  onClickAllExport: () => {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(FileDownloadMessagePopup);
