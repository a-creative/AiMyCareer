import {
    LOAD_EXPERIENCES_ERROR,
    LOAD_EXPERIENCES_LOADING,
    LOAD_EXPERIENCES_SUCCESS,
    INSERT_EXPERIENCE_LOADING,
    INSERT_EXPERIENCE_SUCCESS,
    INSERT_EXPERIENCE_ERROR,
    UPDATE_EXPERIENCE_LOADING,
    UPDATE_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_ERROR,
    DELETE_EXPERIENCE_LOADING,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_ERROR,
    LOGOUT_EXPERIENCE,
  } from "./con.experience";
  
  const initial_state = {
    loaded: false,
    loading: false,
    error: "",
    experiences: [],
  };
  
  const experienceReducer = ( state = initial_state, action ) => {
    switch (action.type) {
      case LOAD_EXPERIENCES_LOADING: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case LOAD_EXPERIENCES_SUCCESS: {
        return {
          ...state,
          loaded: true,
          experiences: action.data,
          loading: false,
        };
      }
      case LOAD_EXPERIENCES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }
      case INSERT_EXPERIENCE_LOADING: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case INSERT_EXPERIENCE_SUCCESS: {
  
        let experiences = [
          ...state.experiences,
          action.data
        ]
  
        return {
          experiences: experiences,
          loading: false,
          error: "",
        };
      }
      case INSERT_EXPERIENCE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }
      case UPDATE_EXPERIENCE_LOADING: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case UPDATE_EXPERIENCE_SUCCESS: {
  
        return {
          ...state,
          experiences: state.experiences.map((experience) => {
             if ( experience.id === action.data.id) {
               return action.data
             }
  
             return experience
           }),
          loading: false,
          error: "",
        };
  
      }
      case UPDATE_EXPERIENCE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }
      case DELETE_EXPERIENCE_LOADING: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case DELETE_EXPERIENCE_SUCCESS: {
  
        return {
          ...state,
          experiences: state.experiences.filter((experience) => {
             if ( experience.id !== action.data) {
               return true
             }
  
             return false
           }),
          loading: false,
          error: "",
        };
  
      }
      case DELETE_EXPERIENCE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }
      case LOGOUT_EXPERIENCE: {
        return {
          ...state,
          loaded: false,
          experiences: []
        }
      }
      default: {
        return state;
      }
    }
  };
  export default experienceReducer;
  