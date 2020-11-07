import {
    USER_LOADING,
    USER_ABORT,
    
    REGISTER_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS
} from "./con.auth";
  
  const initial_state = {
    loading: false,
    loggedIn : null,
  };
  
  const userReducer = ( state = initial_state, action ) => {
    switch (action.type) {
      case USER_LOADING: {
        return {
          ...state,
          loading: true
        };
      }
      case USER_ABORT: {
        return {
          ...state,
          loading: false
        };
      }
      case REGISTER_USER_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case LOGIN_USER_SUCCESS: {
        return {
          ...state,
          loggedIn : action.data,
          loading: false
        };
      }
      case LOGOUT_USER_SUCCESS: {
        return {
          ...state,
          loggedIn : null,
          loading: false
        };
      }
      default: {
        return state;
      }
    }
  };
  export default userReducer;
  