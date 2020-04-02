const initialState = {
  coordinator: {},
  coordinators: [],
  isLoading: false,
  isFetched: false,
  isUpdated: false,
  isCreated: false,
  id: '',
  secretKey: '',
  updatedCoordinator: {},
  coordinatorDepartments: [],
};

  export const coordinatorRegistrationReducer = (state = initialState, action) => {
    switch (action.type) {

      case 'CREATE_COORDINATOR':
        return {
          ...state,
          isLoading: true,
          isCreated: false,
        };
      case 'FETCH_COORDINATOR':
        return {
          ...state,
          isLoading: true,
          isFetched: false,
          isUpdated: false,
        };

      case 'SET_COORDINATOR_CREDENTIALS':
        return {
          ...state,
          id: action.id,
          secretKey: action.secretKey,
        };

      case 'UPDATE_COORDINATOR':
        return {
          ...state,
          isLoading: true,
          isUpdated: false,
        };

      case 'CREATE_COORDINATOR_SUCCESS':
        return {
          ...state,
          newCoordinator: { ...state.newCoordinator, ...action.newCoordinator },
          isLoading: false,
          isCreated: true,
        };

      case 'UPDATE_COORDINATOR_SUCCESS':
        // store coordinator data in sessionStorage
        // In case coordinator get back on the coordinator correction form
        // coordinator will get their all information
        // maintain coordinator credential session
        sessionStorage.setItem('coordinatorData', JSON.stringify(action.coordinator));
        return {
          ...state,
          updatedCoordinator: { ...state.coordinator, ...action.coordinator },
          isLoading: false,
          isUpdated: true,
        };
      case 'FETCH_COORDINATOR_SUCCESS':
        // store coordinator data in sessionStorage
        // In case coordinator get back on the coordinator correction form
        // coordinator will get their all information
        // maintain coordinator credential session
        sessionStorage.setItem('coordinatorData', JSON.stringify(action.coordinator));
        return {
          ...state,
          coordinator: { ...action.coordinator },
          isLoading: false,
          isFetched: true,
        };

      case 'CREATE_COORDINATOR_FAILED':
        sessionStorage.setItem('coordinatorData', null);
        return {
          ...state,
          isLoading: false,
          isCreated: false,
        };

      case 'UPDATE_COORDINATOR_FAILED':
        return {
          ...state,
          isLoading: false,
          isUpdated: false,
        };

      case 'FETCH_COORDINATOR_FAILED':
        sessionStorage.setItem('coordinatorData', null);
        return {
          ...state,
          isLoading: false,
          isFetched: true,
          coordinator: {},
        };

      case 'SET_COORDINATOR_DATA':
        return {
          ...state,
          coordinator: action.coordinator,
          isFetched: true,
        };
      case 'UPDATE_COORDINATOR_BY_ADMIN':
        return {
          ...state,
          id: action.id,
          secretKey: action.secretKey,
        };
      case 'RESET_IS_UPDATE_COORDINATOR':
        return {
          ...state,
          isUpdated: false,
          id: '',
          secretKey: '',
          coordinator: {},
        };
      case 'FETCH_COORDINATORS_SUCCESS':
        return {
          ...state,
          isFetched: true,
          coordinators: action.coordinators,
        };
      case 'FETCH_COORDINATORS_FAILED':
        return {
          ...state,
          isFetched: true,
          coordinators: [],
        };

      case 'FETCH_COORDINATOR_DEPARTMENTS_SUCCESS':
        return {
          ...state,
          coordinatorDepartments: action.coordinatorDepartments,
        };

      case 'FETCH_COORDINATOR_DEPARTMENTS_FAILED':
        return {
          ...state,
          coordinatorDepartments: [],
        };

      default: {
        return {
          ...state,
        };
      }
    }
  };

  export const getCoordinator = state => state.coordinatorRegistrationReducer.coordinator;

  export const getNewCoordinator = state => state.coordinatorRegistrationReducer.newCoordinator;

  export const isUpdated = state => state.coordinatorRegistrationReducer.isUpdated;

  export const isCreated = state => state.coordinatorRegistrationReducer.isCreated;

  export const isFetched = state => state.coordinatorRegistrationReducer.isFetched;

  export const getUserId = state => state.coordinatorRegistrationReducer.id;

  export const getUserSecretKey = state => state.coordinatorRegistrationReducer.secretKey;

  export const getCoordinators = state => state.coordinatorRegistrationReducer.coordinators;

  export const getCoordinatorDepartments = state => state.coordinatorRegistrationReducer.coordinatorDepartments;
