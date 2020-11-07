import {
    EXPERIENCE_LOADING,
    EXPERIENCE_LOADED,
    EXPERIENCE_ABORT,

    LOAD_EXPERIENCES_SUCCESS,
    INSERT_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_SUCCESS,

    LOGOUT_EXPERIENCE,
    RESET_EXPERIENCE
  } from "./con.experience";
  
  const initial_state = {
    loaded: false,
    loading: false,
    experiences: [],
  };
  
  const experienceReducer = ( state = initial_state, action ) => {
    switch (action.type) {
      case EXPERIENCE_LOADING: {
        return {
          ...state,
          loading: true
        };
      }
      case EXPERIENCE_LOADED:
      case EXPERIENCE_ABORT: {
        return {
          ...state,
          loading: false
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
      case INSERT_EXPERIENCE_SUCCESS: {
  
        let experiences = [
          ...state.experiences,
          action.data
        ]
  
        return {
          experiences: experiences,
          loading: false
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
          loading: false
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
          loading: false
        };
  
      }
      case LOGOUT_EXPERIENCE: {
        return {
          ...state,
          loaded: false,
          experiences: []
        }
      }
      case RESET_EXPERIENCE : {
        return {
          ...state,
          experiences: state.experiences.map((experience) => {
          
            if ( experience.id === action.experienceId) {
              return action.experience
            }
            return experience
          })
        };    
      }
      default: {
        return state;
      }
    }
  };
  export default experienceReducer;
  