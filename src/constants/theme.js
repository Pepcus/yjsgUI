
const COLORS = {
  HOVER: '#d24c0c',
  PRIMARY: '#f9570a',
  YELLOW: '#f6c458',
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
  colors: {
    header: COLORS.PRIMARY,
    smallHeader: COLORS.YELLOW,
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
      borderColor: COLORS.HOVER,
      color: COLORS.HOVER,
      dark: COLORS.DARKER,
      gradientColor: `linear-gradient(to top, ${COLORS.PRIMARY}, ${COLORS.PRIMARY})`,
      light: COLORS.HOVER,
      text: COLORS.WHITE,
    },
    secondary: {
      borderColor: COLORS.HOVER,
      color: COLORS.WHITE,
      dark: COLORS.DARKER,
      gradientColor: `linear-gradient(to top, ${COLORS.WHITE}, ${COLORS.WHITE})`,
      light: COLORS.HOVER,
      text: COLORS.HOVER,
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
      borderColor: COLORS.PRIMARY,
      color: COLORS.LIGHT_1,
      dark: COLORS.DARKER,
      light: COLORS.LIGHT_1,
      text: COLORS.DARKER,
      backgroundColor: COLORS.PRIMARY,
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
  },
};

export default APP_THEME;
