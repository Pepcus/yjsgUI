
const PRODUCTION_COLORS = {
  HOVER: '#d24c0c',
  PRIMARY: '#f9570a',
  PRIMARY_LIGHT: '#F57F17',
  PRIMARY_LIGHTER: '#f6c458',
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

const DEVELOPMENT_COLORS = {
  HOVER: '#015b9a',
  PRIMARY: '#0868ac',
  PRIMARY_LIGHT: '#087DAC',
  PRIMARY_LIGHTER: '#b6dfef',
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
      header: DEVELOPMENT_COLORS.PRIMARY,
      smallHeader: DEVELOPMENT_COLORS.PRIMARY_LIGHTER,
    },
    typography: {
      mapping: {
        heading: 'h5',
      },
      root: {
        fontFamily: "'Poppins', sans-serif",
      },
      titleFieldColor: {
        color: DEVELOPMENT_COLORS.LIGHT_GRAY_1,
      },
    },
    home: {
      backgroundColor: DEVELOPMENT_COLORS.LIGHTER,
    },
    palette: {
      advancedSearch: {
        color: DEVELOPMENT_COLORS.LIGHT_GRAY_4,
      },
      primary: {
        borderColor: DEVELOPMENT_COLORS.HOVER,
        color: DEVELOPMENT_COLORS.HOVER,
        dark: DEVELOPMENT_COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${DEVELOPMENT_COLORS.PRIMARY}, ${DEVELOPMENT_COLORS.PRIMARY})`,
        light: DEVELOPMENT_COLORS.HOVER,
        text: DEVELOPMENT_COLORS.WHITE,
      },
      secondary: {
        borderColor: DEVELOPMENT_COLORS.HOVER,
        color: DEVELOPMENT_COLORS.WHITE,
        dark: DEVELOPMENT_COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${DEVELOPMENT_COLORS.WHITE}, ${DEVELOPMENT_COLORS.WHITE})`,
        light: DEVELOPMENT_COLORS.HOVER,
        text: DEVELOPMENT_COLORS.HOVER,
      },
      tertiary: {
        borderColor: DEVELOPMENT_COLORS.LIGHT_1,
        color: DEVELOPMENT_COLORS.LIGHT_1,
        dark: DEVELOPMENT_COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${DEVELOPMENT_COLORS.LIGHT_GRAY_3}, ${DEVELOPMENT_COLORS.LIGHT_GRAY_3})`,
        light: DEVELOPMENT_COLORS.LIGHT_1,
        text: DEVELOPMENT_COLORS.DARKER,
      },
      popup: {
        borderColor: DEVELOPMENT_COLORS.PRIMARY,
        color: DEVELOPMENT_COLORS.LIGHT_1,
        dark: DEVELOPMENT_COLORS.DARKER,
        light: DEVELOPMENT_COLORS.LIGHT_1,
        text: DEVELOPMENT_COLORS.DARKER,
        backgroundColor: DEVELOPMENT_COLORS.PRIMARY,
      },
      transparent: {
        color: DEVELOPMENT_COLORS.TRANSPARENT,
      },
      modal: {
        borderColor: DEVELOPMENT_COLORS.LIGHT_GRAY_2,
        color: DEVELOPMENT_COLORS.LIGHT_GRAY_4,
        dark: DEVELOPMENT_COLORS.DARKER,
        light: DEVELOPMENT_COLORS.LIGHT_GRAY_4,
      },
      checkbox: {
        color: DEVELOPMENT_COLORS.LIGHT_GRAY_2,
      },
      footer: {
        color: DEVELOPMENT_COLORS.LIGHT_GRAY_2,
        backgroundColor: DEVELOPMENT_COLORS.LIGHT_GRAY_3,
        borderColor: DEVELOPMENT_COLORS.LIGHT_GRAY_3,
      },
      idCard: {
        colors: DEVELOPMENT_COLORS.PRIMARY_LIGHT,
      },
    },
  },
  production: {
    colors: {
      header: PRODUCTION_COLORS.PRIMARY,
      smallHeader: PRODUCTION_COLORS.PRIMARY_LIGHTER,
    },
    typography: {
      mapping: {
        heading: 'h5',
      },
      root: {
        fontFamily: "'Poppins', sans-serif",
      },
      titleFieldColor: {
        color: PRODUCTION_COLORS.LIGHT_GRAY_1,
      },
    },
    home: {
      backgroundColor: PRODUCTION_COLORS.LIGHTER,
    },
    palette: {
      advancedSearch: {
        color: PRODUCTION_COLORS.LIGHT_GRAY_4,
      },
      primary: {
        borderColor: PRODUCTION_COLORS.HOVER,
        color: PRODUCTION_COLORS.HOVER,
        dark: PRODUCTION_COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${PRODUCTION_COLORS.PRIMARY}, ${PRODUCTION_COLORS.PRIMARY})`,
        light: PRODUCTION_COLORS.HOVER,
        text: PRODUCTION_COLORS.WHITE,
      },
      secondary: {
        borderColor: PRODUCTION_COLORS.HOVER,
        color: PRODUCTION_COLORS.WHITE,
        dark: PRODUCTION_COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${PRODUCTION_COLORS.WHITE}, ${PRODUCTION_COLORS.WHITE})`,
        light: PRODUCTION_COLORS.HOVER,
        text: PRODUCTION_COLORS.HOVER,
      },
      tertiary: {
        borderColor: PRODUCTION_COLORS.LIGHT_1,
        color: PRODUCTION_COLORS.LIGHT_1,
        dark: PRODUCTION_COLORS.DARKER,
        gradientColor: `linear-gradient(to top, ${PRODUCTION_COLORS.LIGHT_GRAY_3}, ${PRODUCTION_COLORS.LIGHT_GRAY_3})`,
        light: PRODUCTION_COLORS.LIGHT_1,
        text: PRODUCTION_COLORS.DARKER,
      },
      popup: {
        borderColor: PRODUCTION_COLORS.PRIMARY,
        color: PRODUCTION_COLORS.LIGHT_1,
        dark: PRODUCTION_COLORS.DARKER,
        light: PRODUCTION_COLORS.LIGHT_1,
        text: PRODUCTION_COLORS.DARKER,
        backgroundColor: PRODUCTION_COLORS.PRIMARY,
      },
      transparent: {
        color: PRODUCTION_COLORS.TRANSPARENT,
      },
      modal: {
        borderColor: PRODUCTION_COLORS.LIGHT_GRAY_2,
        color: PRODUCTION_COLORS.LIGHT_GRAY_4,
        dark: PRODUCTION_COLORS.DARKER,
        light: PRODUCTION_COLORS.LIGHT_GRAY_4,
      },
      checkbox: {
        color: PRODUCTION_COLORS.LIGHT_GRAY_2,
      },
      footer: {
        color: PRODUCTION_COLORS.LIGHT_GRAY_2,
        backgroundColor: PRODUCTION_COLORS.LIGHT_GRAY_3,
        borderColor: PRODUCTION_COLORS.LIGHT_GRAY_3,
      },
      idCard: {
        colors: PRODUCTION_COLORS.PRIMARY_LIGHT,
      },
    },
  },
};

export default APP_THEME;
