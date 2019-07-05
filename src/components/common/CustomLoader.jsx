import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId';

/**
 * CustomLoader will render loader.
 * @param {Object} props
 * @return {ReactComponent}
 * @constructor
 */


const CustomLoader = (props) => {
  const { loaderColor, styles } = props;
  const customStyles = {
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: 0,
      display: 'inline',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <div style={customStyles.loader}>
      <div className="lds-css">
        <div className="lds-spinner">
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
  styles: PropTypes.object,
};

CustomLoader.defaultProps = {
  loaderColor: '',
  styles: {},
};

export default CustomLoader;
