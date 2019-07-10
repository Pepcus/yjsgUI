import { GET } from '../utils/http';

/**
* fetchFormConfig method fetch file data
* @param {Object} fileDetails
* @return {Promise}
  */
export const fetchFormConfig = ({ tenant, fileName }) => (
  GET({
    url: `src/config/tenant/${tenant}/${fileName}.json`,
  }));
