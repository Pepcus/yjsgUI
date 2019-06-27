import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId';

/**
 * CustomLoader will render loader.
 * @param {Object} props
 * @return {HTML}
 */
const CustomLoader = (props) => {
  const styles = {
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: 0,
      display: 'inline',
      transform: 'translate(-50%, -50%)',
    },
  };
  const { loaderColor } = props;

  return (
    <div style={styles.loader}>
      <div className="lds-css">
        <div className="lds-spinner" style={{ 'width': '100%', 'height': '100%' }}>
          {times(12,
            () =>
              (<div
                className="lds-spinner-color"
                key={uniqueId('loaderSection')}
                style={{ 'background': loaderColor }}
               />))
          }
        </div>
      </div>
    </div>
  );
};

CustomLoader.propTypes = {
  loaderColor: PropTypes.string,
};

CustomLoader.defaultProps = {
  loaderColor: '',
};

export default CustomLoader;
