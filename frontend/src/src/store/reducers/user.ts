import {
  REGISTER_USER_REGISTERING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "store/actionTypes";

const initial_state: UserState = {
  loading: false,
  error: "",
  currentUser: {
    id : -1,
    username : '',
    firstName : '',
    lastName : ''
  },
};

const userReducer = (
  state: UserState = initial_state,
  action: any
): UserState => {
  switch (action.type) {
    case REGISTER_USER_REGISTERING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.data,
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
  
    default: {
      return state;
    }
  }
};
export default userReducer;
