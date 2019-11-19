import PropTypes from 'prop-types';
import React from 'react';

import List from 'pepcus-core/lib/List';
import ListItem from 'pepcus-core/lib/ListItem';
import Typography from 'pepcus-core/lib/Typography';

const ErrorList = ({ errors }) => {
  // Remove the 'is a required property' error,
  // since we're displaying a `REQUIRED` label per field.
  const filteredErrors = errors
    ? errors.filter(e => !e.includes('is a required property') && !e.startsWith('should be'))
    : [];
    // Don't render the error list if there aren't any errors present.
  if (filteredErrors.length === 0) {
    return null;
  }
  // Render the list of errors.
  return (
    <List backgroundColor="unset" margin="10px 0" borderWidth="0">
      {filteredErrors.map(error => (
        <ListItem
          backgroundColor="unset"
          borderWidth="0"
          key={error}
          margin="0"
          padding="0"
        >
          <Typography backgroundColor="unset" color="error" gutterBottom="0">
            {error}
          </Typography>
        </ListItem>
            ))}
    </List>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.array,
};

ErrorList.defaultProps = {
  errors: null,
};

export default ErrorList;
