/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

/**
 * CoordinatorInformation method render coordination contact number into the members Id card footer
 * @param {String} busNumber
 * @param {String} value
 * @param {String} label
 * @param {Object} busCoordinators
 * @return {HTML}
 * @constructor
 */
const CoordinatorInformation = ({ busNumber, value, label, busCoordinators }) => {
  if (busNumber && busCoordinators[busNumber]) {
    const busNumbers = busCoordinators[busNumber];
    const information = busNumbers[value];
    if (information) {
      return (
        <Row
          tagname="div"
          margin="0"
          padding="5px 0 0 0"
        >
          <Typography
            type="caption"
            fontSize="9px"
            fontWeight="bold"
          >
            { label }:
          </Typography>
          <Typography
            type="caption"
            fontSize="9px"
            gutterLeft="3px"
          >
            {information}
          </Typography>
        </Row>
      );
    }
    return (
      <Row
        tagname="div"
        margin="0"
        width="50%"
        padding="5px 0 0 0"
      >
        <Typography
          type="caption"
          fontSize="9px"
          fontWeight="bold"
        >
          { label }:
        </Typography>
      </Row>
    );
  }
  return (
    <Row
      tagname="div"
      margin="0"
      width="50%"
      padding="5px 0 0 0"
    >
      <Typography
        type="caption"
        fontSize="9px"
        fontWeight="bold"
      >
        { label }:
      </Typography>
    </Row>
  );
};

CoordinatorInformation.propTypes = {
  busCoordinators: PropTypes.object,
  busNumber: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

CoordinatorInformation.defaultProps = {
  busCoordinators: {},
  busNumber: '',
  label: '',
  value: '',
};

export default CoordinatorInformation;
