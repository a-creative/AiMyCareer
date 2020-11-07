import {
    POSTING_LOADING,
    POSTING_ABORT,

    LOAD_POSTINGS_SUCCESS,
    INSERT_POSTING_SUCCESS,
    UPDATE_POSTING_SUCCESS,
    DELETE_POSTING_SUCCESS,
    
    LOGOUT_POSTING,
  } from "./con.posting";
  
  const initial_state = {
    loaded: false,
    loading: false,
    postings: [],
  };
  
  const postingReducer = ( state = initial_state, action ) => {
    switch (action.type) {
      case POSTING_LOADING: {
        return {
          ...state,
          loading: true
        };
      }
      case POSTING_ABORT: {
        return {
          ...state,
          loading: false
        };
      }
      case LOAD_POSTINGS_SUCCESS: {
        return {
          ...state,
          loaded: true,
          postings: action.data,
          loading: false,
        };
      }
      case INSERT_POSTING_SUCCESS: {
  
        let postings = [
          ...state.postings,
          action.data
        ]
  
        return {
          postings: postings,
          loading: false
        };
      }
      case UPDATE_POSTING_SUCCESS: {
  
        return {
          ...state,
          postings: state.postings.map((posting) => {
             if ( posting.id === action.data.id) {
               return action.data
             }
  
             return posting
           }),
          loading: false
        };
  
      }
      case DELETE_POSTING_SUCCESS: {
  
        return {
          ...state,
          postings: state.postings.filter((posting) => {
             if ( posting.id !== action.data) {
               return true
             }
  
             return false
           }),
          loading: false
        };
  
      }
      case LOGOUT_POSTING: {
        return {
          ...state,
          loaded: false,
          postings: []
        }
      }
      default: {
        return state;
      }
    }
  };
  export default postingReducer;
  