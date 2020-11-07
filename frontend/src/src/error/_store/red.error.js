import {
  REGISTER_ERROR,
  ACK_ALL_ERRORS
} from "./con.error";
  
  const initial_state = {
    messages : []
  };
  
  const errorReducer = ( state = initial_state, action ) => {
    switch (action.type) {
      case REGISTER_ERROR: {
        let messages = [...state.messages];
        messages.push( action.message )
        return {
          ...state, 
          messages
        };
      }
      case ACK_ALL_ERRORS: {
        return {
          ...state,
          messages: []
        };
      }
    
      default: {
        return state;
      }
    }
  };
  export default errorReducer;
  