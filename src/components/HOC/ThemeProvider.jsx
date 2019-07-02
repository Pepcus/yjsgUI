import React from 'react';
import { createTheming } from '@callstack/react-theme-provider';
import theme from 'theme';

const { withTheme, useTheme } = createTheming(theme);

export {
  withTheme,
  useTheme,
}