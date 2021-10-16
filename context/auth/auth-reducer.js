import authConstants from ".";

export const initialState = {
  user: "",
  token: "",
  loading: true,
  isFetchingUser: true,
  errorMessage: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case authConstants.REQUEST_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
        isFetchingUser: false,
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        user: "",
        token: "",
      };
    case authConstants.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        isFetchingUser: false,
        errorMessage: action.error,
      };
    case authConstants.SET_USER:
      return {
        ...state,
        loading: false,
        isFetchingUser: false,
        user: action.payload.user,
      };
    case authConstants.SET_TOKEN:
      return {
        ...state,
        loading: false,
        isFetchingUser: false,
        token: action.payload.token,
      };
    default:
      state;
  }
};
