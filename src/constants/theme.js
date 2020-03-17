import { rgba } from 'polished';

const COLORS = {
  DARK_ORANGE: '#d24c0c',
  ORANGE: '#f9570a',
  LIGHT_ORANGE: '#F57F17',
  LIGHTER_ORANGE: '#f6c458',
  DARK_BLUE: '#015b9a',
  BLUE: '#0868ac',
  LIGHT_BLUE: '#087DAC',
  LIGHTER_BLUE: '#b6dfef',
  DARKER: '#010306',
  LIGHT_GRAY_1: '#4c4c4c',
  LIGHT_GRAY_2: '#898787',
  LIGHT_GRAY_3: '#ebebec',
  LIGHT_GRAY_4: '#f8f8f8',
  LIGHTER: 'rgba(244, 233, 227, 0.21176470588235294)',
  LIGHT_1: '#dbd7d6',
  WHITE: '#FFFFFF',
  TRANSPARENT: 'rgba(255, 255, 255, 0.69)',
};

/**
 * The default theme for the application
 * @type {Object}
 */
const APP_THEME = {
  development: {
    colors: {
      header: COLORS.BLUE,
      smallHeader: COLORS.LIGHTER_BLUE,
    },
    typography: {
      mapping: {
        heading: 'h5',
      },
      root: {
        fontFamily: "'Poppins', sans-serif",
      },
      titleFieldColor: {
        color: COLORS.LIGHT_GRAY_1,
      },
    },
    home: {
      backgroundColor: COLORS.LIGHTER,
    },
    palette: {
      advancedSearch: {
        color: COLORS.LIGHT_GRAY_4,
      },
      primary: {
        borderColor: COLORS.DARK_BLUE,
        color: COLORS.DARK_BLUE,
        dark: COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${COLORS.BLUE}, ${COLORS.BLUE})`,
        light: COLORS.DARK_BLUE,
        text: COLORS.WHITE,
      },
      secondary: {
        borderColor: COLORS.DARK_BLUE,
        color: COLORS.WHITE,
        dark: COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${COLORS.WHITE}, ${COLORS.WHITE})`,
        light: COLORS.DARK_BLUE,
        text: COLORS.DARK_BLUE,
      },
      tertiary: {
        borderColor: COLORS.LIGHT_1,
        color: COLORS.LIGHT_1,
        dark: COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${COLORS.LIGHT_GRAY_3}, ${COLORS.LIGHT_GRAY_3})`,
        light: COLORS.LIGHT_1,
        text: COLORS.DARKER,
      },
      popup: {
        borderColor: COLORS.BLUE,
        color: COLORS.LIGHT_1,
        dark: COLORS.DARKER,
        light: COLORS.LIGHT_1,
        text: COLORS.DARKER,
        backgroundColor: COLORS.BLUE,
      },
      transparent: {
        color: COLORS.TRANSPARENT,
      },
      modal: {
        borderColor: COLORS.LIGHT_GRAY_2,
        color: COLORS.LIGHT_GRAY_4,
        dark: COLORS.DARKER,
        light: COLORS.LIGHT_GRAY_4,
      },
      checkbox: {
        color: COLORS.LIGHT_GRAY_2,
      },
      footer: {
        color: COLORS.LIGHT_GRAY_2,
        backgroundColor: COLORS.LIGHT_GRAY_3,
        borderColor: COLORS.LIGHT_GRAY_3,
      },
      idCard: {
        colors: COLORS.LIGHT_BLUE,
      },
    },
    effects: {
      inputFocus: {
        '&:focus': {
          outline: 'none',
          borderColor: COLORS.LIGHT_BLUE,
          boxShadow: `inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px ${rgba(COLORS.LIGHT_BLUE, 0.5)}`,
        },
      },
    },
  },
  production: {
    colors: {
      header: COLORS.ORANGE,
      smallHeader: COLORS.LIGHTER_ORANGE,
    },
    typography: {
      mapping: {
        heading: 'h5',
      },
      root: {
        fontFamily: "'Poppins', sans-serif",
      },
      titleFieldColor: {
        color: COLORS.LIGHT_GRAY_1,
      },
    },
    home: {
      backgroundColor: COLORS.LIGHTER,
    },
    palette: {
      advancedSearch: {
        color: COLORS.LIGHT_GRAY_4,
      },
      primary: {
        borderColor: COLORS.DARK_ORANGE,
        color: COLORS.DARK_ORANGE,
        dark: COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${COLORS.ORANGE}, ${COLORS.ORANGE})`,
        light: COLORS.DARK_ORANGE,
        text: COLORS.WHITE,
      },
      secondary: {
        borderColor: COLORS.DARK_ORANGE,
        color: COLORS.WHITE,
        dark: COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${COLORS.WHITE}, ${COLORS.WHITE})`,
        light: COLORS.DARK_ORANGE,
        text: COLORS.DARK_ORANGE,
      },
      tertiary: {
        borderColor: COLORS.LIGHT_1,
        color: COLORS.LIGHT_1,
        dark: COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${COLORS.LIGHT_GRAY_3}, ${COLORS.LIGHT_GRAY_3})`,
        light: COLORS.LIGHT_1,
        text: COLORS.DARKER,
      },
      popup: {
        borderColor: COLORS.ORANGE,
        color: COLORS.LIGHT_1,
        dark: COLORS.DARKER,
        light: COLORS.LIGHT_1,
        text: COLORS.DARKER,
        backgroundColor: COLORS.ORANGE,
      },
      transparent: {
        color: COLORS.TRANSPARENT,
      },
      modal: {
        borderColor: COLORS.LIGHT_GRAY_2,
        color: COLORS.LIGHT_GRAY_4,
        dark: COLORS.DARKER,
        light: COLORS.LIGHT_GRAY_4,
      },
      checkbox: {
        color: COLORS.LIGHT_GRAY_2,
      },
      footer: {
        color: COLORS.LIGHT_GRAY_2,
        backgroundColor: COLORS.LIGHT_GRAY_3,
        borderColor: COLORS.LIGHT_GRAY_3,
      },
      idCard: {
        colors: COLORS.LIGHT_ORANGE,
      },
    },
    effects: {
      inputFocus: {
        '&:focus': {
          outline: 'none',
          borderColor: COLORS.LIGHT_ORANGE,
          boxShadow: `inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px ${rgba(COLORS.LIGHTER_ORANGE, 0.5)}`,
        },
      },
    },
  },
};

export default APP_THEME;
