/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons/faFileCsv';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Form from 'pepcus-core/lib/Form';
import Modal from 'pepcus-core/lib/Modal';
import Row from 'pepcus-core/lib/Row';

import {
  resetIsOptInSuccessAction,
  uploadOptInFileAction,
} from 'actions/allMembersDataActions';
import {
  getSecretKey,
} from 'reducers/memberRegistrationReducer';
import {
  isOptInSuccess,
  getFailOptIn,
  isUploadOptInFailed,
  unavailableIdErrorMessage,
} from 'reducers/allMembersDataReducer';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from 'constants/messages';
import fields from 'components/common/fields';

import { schema, uiSchema } from './modalFormSchema.json';
import Message from './Message';
import ModalHeader from './ModalHeader';

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
 * UploadMembersOptInFile render upload optIn file modal
 * @type {Class}
 */
class UploadMembersOptInFile extends Component {
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
   * and to reset IsOptIn it call resetIsOptInSuccessAction action
   * @param {Object} event
   */
  closeModal = (event) => {
    const { resetIsOptInSuccess } = this.props;

    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    resetIsOptInSuccess();
    this.setState({
      isModalOpen: false,
      formData: {},
    });
  };

  /**
   * Method set isFormSubmitted to true
   * and call fileUpload method
   * @param {Object} event
   */
  onFormSubmit = (event) => {
    const { hasError, formData } = this.state;

    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    if (!hasError) {
      const { optInFile } = formData;
      this.fileUpload(optInFile[0]);
    }
  };

  /**
   * Method set optIn file in optInFile
   * when browse the file.
   * @param {Object} formData
   * @param {Array} errors
   */
  onChange = ({ formData, errors }) => {
    const { formData: previousFormData } = this.state;

    if (formData !== previousFormData) {
      this.setState({
        formData: {
          ...previousFormData,
          optInFile: formData.optInFile,
        },
        hasError: !isEmpty(errors),
      });
    }
  };

  /**
   * Method upload optIn file by calling uploadOptInFileAction action
   * @param {Array} optInFile
   */
  fileUpload = (optInFile) => {
    const { secretKey, uploadOptInFile } = this.props;

    uploadOptInFile({ secretKey, optInFile });
  };

  /**
   * Method return error message object
   * @param {Array} errors
   * @return {Array} error message object
   */
  transformErrors = (errors) => {
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
   * Method render upload optIn modal
   * @return {HTML} modal
   */
  renderUploadOptInModal = () => {
    const { isModalOpen, formData } = this.state;
    const {
      isSuccessOptIn,
      isOptInUploadFailed,
      failOptIn,
      errorMessageOfUnavailableId,
    } = this.props;

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
            padding="30px 0 0 0"
            borderStyle="none"
            margin="0"
            width="auto"
          >
            <Form
              fields={fields}
              showErrorList={false}
              liveValidate
              externalSubmission
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
              onChange={this.onChange}
              transformErrors={this.transformErrors}
              onSubmit={this.onFormSubmit}
            />
            <Message
              isSuccessOptIn={isSuccessOptIn}
              isOptInUploadFailed={isOptInUploadFailed}
              failOptIn={failOptIn}
              errorMessageOfUnavailableId={errorMessageOfUnavailableId}
            />
            <Row margin="0 0 0 30px">
              <Col size={8}>
                <CloseButtonStyled
                  color="secondary"
                  border
                  noMinWidth
                  margin="0 0 20px 0"
                  onClick={this.closeModal}
                >Close
                </CloseButtonStyled>
              </Col>
              <Col size={4}>
                <Button
                  margin="0 0 20px 0px"
                  noMinWidth
                  onClick={this.onFormSubmit}
                >
                  <FaIcon height="15px" icon={faFileCsv} />
                  Upload
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
    return (
      <Row display="inline-block" margin="0 0 0 10px">
        <ButtonStyled
          color="primary"
          title="Upload Attendance"
          onClick={this.openModal}
        >
          <FaIcon icon={faUpload} />
          Upload Opt In
        </ButtonStyled>
        {this.renderUploadOptInModal()}
      </Row>
    );
  }
}

UploadMembersOptInFile.propTypes = {
  failOptIn: PropTypes.string,
  errorMessageOfUnavailableId: PropTypes.string,
  isOptInUploadFailed: PropTypes.bool,
  isSuccessOptIn: PropTypes.bool,
  resetIsOptInSuccess: PropTypes.func,
  secretKey: PropTypes.string,
  uploadOptInFile: PropTypes.func,
};

UploadMembersOptInFile.defaultProps = {
  failOptIn: '',
  errorMessageOfUnavailableId: '',
  isOptInUploadFailed: false,
  isSuccessOptIn: false,
  resetIsOptInSuccess: () => {},
  secretKey: '',
  uploadOptInFile: () => {},
};

const mapStateToProps = state => ({
  failOptIn: getFailOptIn(state),
  errorMessageOfUnavailableId: unavailableIdErrorMessage(state),
  isOptInUploadFailed: isUploadOptInFailed(state),
  isSuccessOptIn: isOptInSuccess(state),
  secretKey: getSecretKey(state),
});

const mapDispatchToProps = dispatch => ({
  resetIsOptInSuccess: () => dispatch(resetIsOptInSuccessAction()),
  uploadOptInFile: ({ secretKey, optInFile }) => dispatch(uploadOptInFileAction({ secretKey, optInFile })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadMembersOptInFile);
