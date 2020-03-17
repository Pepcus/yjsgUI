import React from 'react';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import { getThemeProps } from 'pepcus-core/utils/theme';

/**
 * CustomLoader will render loader.
 * @param {Object} props
 * @return {ReactComponent}
 * @constructor
 */

const LoaderStyled = styled(Box)`
  background: ${getThemeProps('colors.header')}
`;

const CustomLoader = () => {
  const customStyles = {
    loaderWrapper: {
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.8)',
      zIndex: '100',
      display: 'block',
      position: 'fixed',
      top: '0',
      left: '0'
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: 0,
      display: 'inline',
      transform: 'translate(-50%, -50%)',
      zIndex: 99,
    },
  };
  return (
    <div style={customStyles.loaderWrapper}>
      <div style={customStyles.loader}>
        <div className="lds-css">
          <div className="lds-spinner">
            {times(12,
              () =>
                (<LoaderStyled
                  padding="0"
                  borderStyle="none"
                  key={uniqueId('loaderSection')}
                />))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
