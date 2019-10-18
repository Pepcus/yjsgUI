import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons/faFileCsv';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Form from 'pepcus-core/lib/Form';
import Modal from 'pepcus-core/lib/Modal';
import Row from 'pepcus-core/lib/Row';

import {
  resetIsSuccessOfMemberAttendanceFileUploadAction,
  uploadMembersAttendanceFileAction,
} from 'actions/allMembersDataActions';
import {
  getSecretKey,
} from 'reducers/loginReducer';
import {
  getSuccess,
  getFailRecordIds,
  isUploadAttendanceFailed,
  idNotExistErrorMessage,
} from 'reducers/allMembersDataReducer';
import fields from 'components/common/fields';
import { getAppConstantsConfig } from 'reducers/constants';

import { schema, uiSchema } from './modalFormShema.json';
import ModalHeader from './ModalHeader';
import Message from './Message';

const CloseButtonStyled = styled(Button)`
    float: right;
`;

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('xl')`
       min-height: 36px;
       padding: 5px;
    `}
`;

/**
 * UploadMembersAttendanceFile render upload members attendance file modal
 * @type {Class}
 */
class UploadMembersAttendanceFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      isModalOpen: false,
      hasError: false,
    };
  }

  /**
   * Method set isModalOpen to true
   */
  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  /**
   * Method set isModalOpen to false
   * and reset isSuccess by calling resetIsSuccessOfMemberAttendanceFileUploadAction action
   * @param {Object} event
   */
  closeModal = (event) => {
    const { resetIsSuccess } = this.props;

    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    resetIsSuccess();
    this.setState({
      isModalOpen: false,
      formData: {},
    });
  };

  /**
   * Method call fileUpload method to upload attendance file
   * @param {Object} event
   */
  onFormSubmit = (event) => {
    const { hasError, formData } = this.state;

    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    if (!hasError) {
      const { attendanceFile } = formData;
      this.fileUpload(attendanceFile[0]);
    }
  };

  /**
   * Method upload attendance file by calling uploadMembersAttendanceFileAction action
   * @param {Array} attendanceFile
   */
  fileUpload = (attendanceFile) => {
    const { secretKey, uploadMembersAttendanceFile } = this.props;
    const { formData } = this.state;
    const { selectedDay } = formData;

    uploadMembersAttendanceFile({ secretKey, attendanceFile, day: selectedDay });
  };

  /**
   * Method return error message object
   * @param {Array} errors
   * @return {Array} error message object
   */
  transformErrors = (errors) => {
    const { appConstants } = this.props;
    const { THIS_INFORMATION_IS_COMPULSORY_MESSAGE } = appConstants;
    const transformErrors = {
      'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    };
    const formattedError = [];

    errors.forEach((error) => {
      if (error.name === 'required') {
        formattedError.push({ ...error, message: transformErrors[error.name] });
      }
    });
    return formattedError;
  };

  /**
   * Method set the value of selected day in selectedDay.
   * @param {Object} formData
   * @param {Array} errors
   */
  handleSelectChange = ({ formData, errors }) => {
    const { formData: previousFormData } = this.state;
    if (formData !== previousFormData) {
      this.setState({
        formData: {
          ...previousFormData,
          attendanceFile: formData.attendanceFile,
          selectedDay: formData.selectedDay,
        },
        hasError: !isEmpty(errors),
      });
    }
  };

  /**
   * Method render upload members attendance file modal
   * @return {HTML} modal
   */
  renderModal = () => {
    const { formData, isModalOpen } = this.state;
    const {
      appConstants,
      isUploadAttendanceSuccess,
      isAttendanceUploadFailed,
      failRecordIds,
      errorMessageOfIdNotExist,
    } = this.props;
    const {
      CLOSE,
      UPLOAD,
    } = appConstants;

    if (isModalOpen) {
      return (
        <Modal
          open={isModalOpen}
          onClose={this.closeModal}
          style={{ padding: '0' }}
        >
          <ModalHeader />
          <Box
            backgroundColor="modal"
            padding="20px 0 0 0"
            borderStyle="none"
            margin="0"
            width="auto"
          >
            <Form
              fields={fields}
              externalSubmission
              showErrorList={false}
              liveValidate
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
              onChange={this.handleSelectChange}
              transformErrors={this.transformErrors}
              onSubmit={this.onFormSubmit}
            />
            <Message
              isUploadAttendanceSuccess={isUploadAttendanceSuccess}
              isAttendanceUploadFailed={isAttendanceUploadFailed}
              failRecordIds={failRecordIds}
              errorMessageOfIdNotExist={errorMessageOfIdNotExist}
            />
            <Row margin="0 0 0 30px">
              <Col size={9}>
                <CloseButtonStyled
                  color="secondary"
                  border
                  noMinWidth
                  margin="0 0 20px 0"
                  onClick={this.closeModal}
                >
                  {CLOSE}
                </CloseButtonStyled>
              </Col>
              <Col size={3}>
                <Button
                  margin="0 0 20px 0px"
                  noMinWidth
                  onClick={this.onFormSubmit}
                >
                  <FaIcon height="15px" icon={faFileCsv} />
                  {UPLOAD}
                </Button>
              </Col>
            </Row>
          </Box>
        </Modal>
      );
    }
    return null;
  };

  render() {
    const { appConstants } = this.props;
    const { UPLOAD_ATTENDANCE } = appConstants;
    return (
      <Row display="inline-block" margin="0 0 0 10px">
        <ButtonStyled
          color="primary"
          title="Upload Attendance"
          onClick={this.openModal}
        >
          <FaIcon icon={faUpload} />
          {UPLOAD_ATTENDANCE}
        </ButtonStyled>
        {this.renderModal()}
      </Row>
    );
  }
}

UploadMembersAttendanceFile.propTypes = {
  appConstants: PropTypes.object,
  failRecordIds: PropTypes.string,
  errorMessageOfIdNotExist: PropTypes.string,
  isAttendanceUploadFailed: PropTypes.bool,
  isUploadAttendanceSuccess: PropTypes.bool,
  resetIsSuccess: PropTypes.func,
  secretKey: PropTypes.string,
  uploadMembersAttendanceFile: PropTypes.func,
};

UploadMembersAttendanceFile.defaultProps = {
  appConstants: {},
  failRecordIds: '',
  errorMessageOfIdNotExist: '',
  isAttendanceUploadFailed: false,
  isUploadAttendanceSuccess: false,
  resetIsSuccess: () => {},
  secretKey: '',
  uploadMembersAttendanceFile: () => {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
  failRecordIds: getFailRecordIds(state),
  errorMessageOfIdNotExist: idNotExistErrorMessage(state),
  isAttendanceUploadFailed: isUploadAttendanceFailed(state),
  isUploadAttendanceSuccess: getSuccess(state),
  secretKey: getSecretKey(state),
});

const mapDispatchToProps = dispatch => ({
  resetIsSuccess: () => dispatch(resetIsSuccessOfMemberAttendanceFileUploadAction()),
  uploadMembersAttendanceFile: ({ secretKey, attendanceFile, day }) =>
    dispatch(uploadMembersAttendanceFileAction({ secretKey, attendanceFile, day })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadMembersAttendanceFile);
