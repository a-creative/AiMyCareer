import {
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_LOADING,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR
} from "store/actionTypes";

const initial_state: UserState = {
  loading: false,
  error: "",
  loggedIn : null,
};

const userReducer = (
  state: UserState = initial_state,
  action: any
): UserState => {
  switch (action.type) {
    case REGISTER_USER_LOADING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case LOGIN_USER_LOADING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loggedIn : action.data,
        loading: false,
        error: "",
      };
    }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case LOGOUT_USER_LOADING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        loggedIn : null,
        loading: false,
        error: "",
      };
    }
    case LOGOUT_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
  
    default: {
      return state;
    }
  }
};
export default userReducer;
