/**
 * setLoadingStateAction action set the loading state
 * @param {Boolean} isLoading
 * @return {{isLoading: Boolean, type: String}}
 */
export const setLoadingStateAction = isLoading => ({
  type: 'SET_LOADING_STATE',
  isLoading,
});
