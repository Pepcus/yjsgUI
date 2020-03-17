import { GET } from 'apis/http';

/**
 * fetchFormConfig method fetch file data
 * @param {Object} fileDetails
 * @return {Promise}
 */
export const fetchFormConfig = ({ tenant, fileName }) => (
  GET({
    url: `ui_config/tenant/${tenant}/${fileName}.json`,
  }));
