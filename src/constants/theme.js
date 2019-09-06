
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
  },
  home: {
    backgroundColor: '#f4e9e336',
  },
  palette: {
    primary: {
      borderColor: '#d24c0c',
      color: '#d24c0c',
      dark: '#010306',
      gradientColor: 'linear-gradient(to top, #f9570a, #f9570a)',
      light: '#d24c0c',
      text: '#FFFFFF',
    },
    default: {
      borderColor: '#dbd7d6',
      color: '#dbd7d6',
      dark: '#010306',
      gradientColor: 'linear-gradient(to top, #ebebec, #ebebec)',
      light: '#dbd7d6',
      text: '#010306',
    },
  },
  colors: {
    HEADER: '#f9570a',
  },
};

export default APP_THEME;
