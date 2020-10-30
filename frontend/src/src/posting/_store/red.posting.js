import {
    LOAD_POSTINGS_ERROR,
    LOAD_POSTINGS_LOADING,
    LOAD_POSTINGS_SUCCESS,
    INSERT_POSTING_LOADING,
    INSERT_POSTING_SUCCESS,
    INSERT_POSTING_ERROR,
    UPDATE_POSTING_LOADING,
    UPDATE_POSTING_SUCCESS,
    UPDATE_POSTING_ERROR,
    DELETE_POSTING_LOADING,
    DELETE_POSTING_SUCCESS,
    DELETE_POSTING_ERROR,
    LOGOUT_POSTING,
  } from "./con.posting";
  
  const initial_state = {
    loaded: false,
    loading: false,
    error: "",
    postings: [],
  };
  
  const postingReducer = ( state = initial_state, action ) => {
    switch (action.type) {
      case LOAD_POSTINGS_LOADING: {
        return {
          ...state,
          loading: true,
          error: "",
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
      case LOAD_POSTINGS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }
      case INSERT_POSTING_LOADING: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case INSERT_POSTING_SUCCESS: {
  
        let postings = [
          ...state.postings,
          action.data
        ]
  
        return {
          postings: postings,
          loading: false,
          error: "",
        };
      }
      case INSERT_POSTING_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }
      case UPDATE_POSTING_LOADING: {
        return {
          ...state,
          loading: true,
          error: "",
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
          loading: false,
          error: "",
        };
  
      }
      case UPDATE_POSTING_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }
      case DELETE_POSTING_LOADING: {
        return {
          ...state,
          loading: true,
          error: "",
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
          loading: false,
          error: "",
        };
  
      }
      case DELETE_POSTING_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
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
  