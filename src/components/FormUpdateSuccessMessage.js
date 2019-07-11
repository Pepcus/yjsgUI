import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Popup from './common/Popup';
import {
  goBackBtnText,
  infoUpdateSuccessMessage,
  noInfoChangeMessage,
} from '../constants/yjsg';
import LinkButton from './common/LinkButton';
import { isUpdatedResetAction } from '../actions/studentRegistrationActions';

const FormUpdateSuccessMessage = ({
  isSubmitTriggered,
  isFormChanged,
  hasError,
  context,
  isMemberUpdated,
  isUpdatedReset,
}) => {
  // if form data is update and valid and submitted successfully.
  if (isMemberUpdated) {
    return (
      <Popup>
        <h5>{infoUpdateSuccessMessage}</h5>
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={context.previousLocation}
          onClick={isUpdatedReset}
        />
      </Popup>
    );
  } else if (isSubmitTriggered && !isFormChanged && hasError) {

    // if form data is not update and valid.
    return (
      <Popup>
        <h5>{noInfoChangeMessage}</h5>
        <LinkButton
          buttonText={goBackBtnText}
          linkPath={context.previousLocation}
        />
      </Popup>
    );
  } return null;
};

FormUpdateSuccessMessage.propTypes = {
  isSubmitTriggered: PropTypes.bool,
  isFormChanged: PropTypes.bool,
  hasError: PropTypes.bool,
  context: PropTypes.object,
  isMemberUpdated: PropTypes.bool,
  isUpdatedReset: PropTypes.func,
};

FormUpdateSuccessMessage.defaultProps = {
  isSubmitTriggered: false,
  isFormChanged: false,
  hasError: false,
  context: false,
  isMemberUpdated: false,
  isUpdatedReset: () => {},
};

const mapDispatchToProps = dispatch => ({
  isUpdatedReset: () => dispatch(isUpdatedResetAction()),
});

export default connect(null, mapDispatchToProps)(FormUpdateSuccessMessage);
