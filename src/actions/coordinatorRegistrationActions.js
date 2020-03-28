/**
 * createCoordinatorDataAction action will call when new coordinator will create.
 * @param {Object} coordinator
 * @return {{coordinator: Object, type: string}}
 */
export const createCoordinatorDataAction = coordinator => ({
    type: 'CREATE_COORDINATOR',
    coordinator,
  });

export const fetchCoordinatorsAction = () => ({
  type: 'FETCH_COORDINATORS',
});

export const fetchCoordinatorsSuccessAction = (coordinators) => ({
  type: 'FETCH_COORDINATORS_SUCCESS',
  coordinators,
});

export const fetchCoordinatorsFailedAction = (errorMessage) => ({
  type: 'FETCH_COORDINATORS_FAILED',
  errorMessage,
});

  /**
   * setCoordinatorCredentialsAction call when new coordinator is created,
   * or already coordinator login with their credential.
   * @param {String} id
   * @param {String} secretKey
   * @return {{secretKey: String, id: String, type: string}}
   */
  export const setCoordinatorCredentialsAction = ({ id, secretKey }) => ({
    type: 'SET_COORDINATOR_CREDENTIALS',
    id,
    secretKey,
  });

  /**
   * createCoordinatorSuccessAction action will call when
   * create coordinator AIP response is success
   * @param {Object} newCoordinator
   * @return {{newCoordinator: Object, type: string}}
   */
  export const createCoordinatorSuccessAction = newCoordinator => ({
    type: 'CREATE_COORDINATOR_SUCCESS',
    newCoordinator,
  });

  /**
   * createCoordinatorFailedAction action will call when
   * create coordinator AIP response is fail
   * @param {String} message
   * @return {{type: string, message: String}}
   */
  export const createCoordinatorFailedAction = message => ({
    type: 'CREATE_COORDINATOR_FAILED',
    message,
  });

  /**
   * fetchCoordinatorDataAction action will call when
   * coordinator data will fetched
   * @param {String} id
   * @param {String} secretKey
   * @return {{secretKey: String, id: String, type: string}}
   */
  export const fetchCoordinatorDataAction = ({ id, secretKey }) => ({
    type: 'FETCH_COORDINATOR',
    id,
    secretKey,
  });

  /**
   * fetchCoordinatorSuccessAction action will call when
   * fetch coordinator data AIP response is success
   * @param {Object} coordinator
   * @return {{coordinator: Object, type: string}}
   */
  export const fetchCoordinatorSuccessAction = coordinator => ({
    type: 'FETCH_COORDINATOR_SUCCESS',
    coordinator,
  });

  /**
   * fetchCoordinatorFailedAction action will call when
   * fetch coordinator data AIP response is fail
   * @param {String} message
   * @return {{type: string, message: String}}
   */
  export const fetchCoordinatorFailedAction = message => ({
    type: 'FETCH_COORDINATOR_FAILED',
    message,
  });

  /**
   * updateCoordinatorDataAction action will call when coordinator data will updated.
   * @param {String} id
   * @param {String} secretKey
   * @param {Object} updatedCoordinator
   * @return {{updatedCoordinator: Object, secretKey: String, id: String, type: string}}
   */
  export const updateCoordinatorDataAction = ({ id, secretKey, coordinator }) => ({
    type: 'UPDATE_COORDINATOR',
    id,
    secretKey,
    coordinator,
  });


  /**
   * updateCoordinatorSuccessAction action will call when
   * update coordinator data AIP response is success
   * @param {Object} coordinator
   * @return {{coordinator: Object, type: string}}
   */
  export const updateCoordinatorSuccessAction = coordinator => ({
    type: 'UPDATE_COORDINATOR_SUCCESS',
    coordinator,
  });

  /**
   * updateCoordinatorFailedAction action will call when
   * update coordinator data AIP response is fail
   * @param {String} message
   * @return {{type: string, message: String}}
   */
  export const updateCoordinatorFailedAction = message => ({
    type: 'UPDATE_COORDINATOR_FAILED',
    message,
  });

  export const fetchCoordinatorDepartmentsAction = () => ({
    type: 'FETCH_COORDINATOR_DEPARTMENTS',
  });

  export const fetchCoordinatorDepartmentsSuccessAction = (coordinatorDepartments) => ({
    type: 'FETCH_COORDINATOR_DEPARTMENTS_SUCCESS',
    coordinatorDepartments,
  });

  export const fetchCoordinatorDepartmentsFailedAction = (errorMessage) => ({
    type: 'FETCH_COORDINATOR_DEPARTMENTS_FAILED',
    errorMessage,
  });

  /**
   * setCoordinatorDataAction action will call when click on edit button of particular row
   * in coordinator grid
   * @param {Object} coordinator
   * @return {{coordinator: Object, isFetched: Boolean, type: String}}
   */
  export const setCoordinatorDataAction = ({ coordinator }) => ({
    type: 'SET_COORDINATOR_DATA',
    coordinator,
    isFetched: true,
  });

  /**
   * updateCoordinatorByAdminAction action will call
   * when coordinator data will update by admin
   * @param {String} id
   * @param {String} secretKey
   * @return {{secretKey: String, id: String, type: String}}
   */
  export const updateCoordinatorByAdminAction = ({ id, secretKey }) => ({
    type: 'UPDATE_COORDINATOR_BY_ADMIN',
    id,
    secretKey,
  });

  /**
   * isUpdatedResetAction action will call when reset the update information form store
   * @return {{secretKey: String, coordinator: String, isUpdated: Boolean, id: String, type: String}}
   */
  export const isUpdatedResetCoordinatorAction = () => ({
    type: 'RESET_IS_UPDATE_COORDINATOR',
    isUpdated: false,
    id: '',
    secretKey: '',
    coordinator: {},
  });
