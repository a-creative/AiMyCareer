import {
    SKILL_LOADING,
    SKILL_ABORT,

    LOAD_SKILLS_SUCCESS,
    INSERT_SKILL_SUCCESS,
    UPDATE_SKILL_SUCCESS,
    DELETE_SKILL_SUCCESS,
    
    LOGOUT_SKILL,
  } from "./con.skill";
  
  const initial_state = {
    loaded: false,
    loading: false,
    skills: [],
  };
  
  const skillReducer = ( state = initial_state, action ) => {
    switch (action.type) {
      case SKILL_LOADING: {
        return {
          ...state,
          loading: true
        };
      }
      case SKILL_ABORT: {
        return {
          ...state,
          loading: false
        };
      }
      case LOAD_SKILLS_SUCCESS: {
        return {
          ...state,
          loaded: true,
          skills: action.data,
          loading: false,
        };
      }
      case INSERT_SKILL_SUCCESS: {
  
        let skills = [
          ...state.skills,
          action.data
        ]
  
        return {
          skills: skills,
          loading: false
        };
      }
      case UPDATE_SKILL_SUCCESS: {
  
        return {
          ...state,
          skills: state.skills.map((skill) => {
             if ( skill.id === action.data.id) {
               return action.data
             }
  
             return skill
           }),
          loading: false
        };
  
      }
      case DELETE_SKILL_SUCCESS: {
  
        return {
          ...state,
          skills: state.skills.filter((skill) => {
             if ( skill.id !== action.data) {
               return true
             }
  
             return false
           }),
          loading: false
        };
  
      }
      case LOGOUT_SKILL: {
        return {
          ...state,
          loaded: false,
          skills: []
        }
      }
      default: {
        return state;
      }
    }
  };
  export default skillReducer;
  