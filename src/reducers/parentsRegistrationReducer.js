const parentsRegistrationReducerInitialState = {};

export const parentsRegistrationReducer = (state = parentsRegistrationReducerInitialState, action) => {
  switch (action.type) {
    case 'PARENTS_REGISTRATION_RESULT_SUCCESS':
      return {
        ...state,
      };
    case 'PARENTS_REGISTRATION_RESULT_FAILED':
      return {
        ...state,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
