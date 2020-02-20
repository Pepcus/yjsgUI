const initialState = {
  member: {},
  isLoading: false,
  isFetched: false,
  isUpdated: false,
  isCreated: false,
  isPartialMatchFound: false,
  isExactMatchFound: false,
  id: '',
  secretKey: '',
  updateMessage: '',
  updatedMember: {},
};

export const memberRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_MEMBER':
      return {
        ...state,
        isLoading: true,
        isCreated: false,
      };
    case 'FETCH_MEMBER':
      return {
        ...state,
        isLoading: true,
        isFetched: false,
        isUpdated: false,
      };

    case 'SET_MEMBER_CREDENTIALS':
      return {
        ...state,
        id: action.id,
        secretKey: action.secretKey,
      };

    case 'UPDATE_MEMBER':
      return {
        ...state,
        isLoading: true,
        isUpdated: false,
      };

    case 'CREATE_MEMBER_SUCCESS':
      return {
        ...state,
        newMember: { ...state.newMember, ...action.newMember },
        isLoading: false,
        isCreated: true,
      };

    case 'UPDATE_MEMBER_SUCCESS':
      // store member data in sessionStorage
      // In case member get back on the member correction form
      // member will get their all information
      // maintain member credential session
      sessionStorage.setItem('memberData', JSON.stringify(action.member));
      return {
        ...state,
        updatedMember: { ...state.member, ...action.member },
        isLoading: false,
        isUpdated: true,
      };
    case 'FETCH_MEMBER_SUCCESS':
      // store member data in sessionStorage
      // In case member get back on the member correction form
      // member will get their all information
      // maintain member credential session
      sessionStorage.setItem('memberData', JSON.stringify(action.member));
      return {
        ...state,
        member: { ...action.member },
        isLoading: false,
        isFetched: true,
      };

    case 'CREATE_MEMBER_FAILED':
      return {
        ...state,
        isLoading: false,
        isCreated: false,
      };

    case 'PARTIAL_MEMBER_ALREADY_REGISTERED':
      return {
        ...state,
        isLoading: false,
        isPartialMatchFound: true,
        isCreated: false,
      };

    case 'EXACT_MEMBER_ALREADY_REGISTERED':
      return {
        ...state,
        isLoading: false,
        isExactMatchFound: true,
        isCreated: false,
      };

    case 'CLEAR_ALREADY_REGISTERED_MEMBER_FLAGS':
      return {
        ...state,
        isExactMatchFound: false,
        isPartialMatchFound: false,
      };

    case 'UPDATE_MEMBER_FAILED':
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
      };

    case 'FETCH_MEMBER_FAILED':
      return {
        ...state,
        isLoading: false,
        isFetched: false,
      };

    case 'SET_MEMBER_DATA':
      return {
        ...state,
        member: action.member,
        isFetched: true,
      };
    case 'UPDATE_MEMBER_BY_ADMIN':
      return {
        ...state,
        id: action.id,
        secretKey: action.secretKey,
      };
    case 'RESET_IS_UPDATE':
      return {
        ...state,
        isUpdated: false,
        id: '',
        secretKey: '',
        member: {},
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getMember = state => state.memberRegistrationReducer.member;

export const getNewMember = state => state.memberRegistrationReducer.newMember;

export const isUpdated = state => state.memberRegistrationReducer.isUpdated;

export const isCreated = state => state.memberRegistrationReducer.isCreated;

export const isFetched = state => state.memberRegistrationReducer.isFetched;

export const getUserId = state => state.memberRegistrationReducer.id;

export const getUserSecretKey = state => state.memberRegistrationReducer.secretKey;

export const isPartialMemberAlreadyRegistered = state => state.memberRegistrationReducer.isPartialMatchFound;

export const isExactMemberAlreadyRegistered = state => state.memberRegistrationReducer.isExactMatchFound;
