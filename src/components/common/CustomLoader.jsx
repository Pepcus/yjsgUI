/* eslint-disable import/no-extraneous-dependencies */
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
              (<LoaderStyled
                padding="0"
                borderStyle="none"
                key={uniqueId('loaderSection')}
               />))
          }
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
