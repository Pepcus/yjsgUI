
/**
 * The default theme for the application
 *
 * @type {Object}
 */
const APP_THEME = {
  typography: {
    mapping: {
      heading: 'h5',
    },
    root: {
      fontFamily: "'Poppins', sans-serif",
    },
    titleFieldColor: {
      color: '#4c4c4c',
    },
  },
  home: {
    backgroundColor: 'rgba(244, 233, 227, 0.21176470588235294)',
  },
  palette: {
    advancedSearch: {
      color: '#f8f8f8',
    },
    primary: {
      borderColor: '#d24c0c',
      color: '#d24c0c',
      dark: '#010306',
      gradientColor: 'linear-gradient(to top, #f9570a, #f9570a)',
      light: '#d24c0c',
      text: '#FFFFFF',
    },
    secondary: {
      borderColor: '#d24c0c',
      color: '#FFFFFF',
      dark: '#010306',
      gradientColor: 'linear-gradient(to top, #FFFFFF, #FFFFFF)',
      light: '#d24c0c',
      text: '#d24c0c',
    },
    tertiary: {
      borderColor: '#dbd7d6',
      color: '#dbd7d6',
      dark: '#010306',
      gradientColor: 'linear-gradient(to top, #ebebec, #ebebec)',
      light: '#dbd7d6',
      text: '#010306',
    },
    transparent: {
      color: 'rgba(255, 255, 255, 0.69)',
    },
    modal: {
      borderColor: '#898787',
      color: '#f8f6f6',
      dark: '#010306',
      light: '#f8f6f6',
    },
    checkbox: {
      color: '#9e9e9e',
    },
  },
  colors: {
    header: '#f9570a',
    smallHeader: '#f6c458',
  },
};

export default APP_THEME;
