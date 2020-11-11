import {
    SKILL_CATEGORY_LOADING,
    SKILL_CATEGORY_ABORT,

    LOAD_SKILL_CATEGORIES_SUCCESS,
    INSERT_SKILL_CATEGORY_SUCCESS,
    UPDATE_SKILL_CATEGORY_SUCCESS,
    DELETE_SKILL_CATEGORY_SUCCESS,
    
    LOGOUT_SKILL_CATEGORY,
  } from "./con.skillCategory";
  
  const initial_state = {
    loaded: false,
    loading: false,
    skillCategories: [],
  };
  
  const skillCategoryReducer = ( state = initial_state, action ) => {
    switch (action.type) {
      case SKILL_CATEGORY_LOADING: {
        return {
          ...state,
          loading: true
        };
      }
      case SKILL_CATEGORY_ABORT: {
        return {
          ...state,
          loading: false
        };
      }
      case LOAD_SKILL_CATEGORIES_SUCCESS: {
        return {
          ...state,
          loaded: true,
          skillCategories: action.data,
          loading: false,
        };
      }
      case INSERT_SKILL_CATEGORY_SUCCESS: {
  
        let skillCategories = [
          ...state.skillCategories,
          action.data
        ]
  
        return {
          skillCategories: skillCategories,
          loading: false
        };
      }
      case UPDATE_SKILL_CATEGORY_SUCCESS: {
  
        return {
          ...state,
          skillCategories: state.skillCategories.map((skillCategory) => {
             if ( skillCategory.id === action.data.id) {
               return action.data
             }
  
             return skillCategory
           }),
          loading: false
        };
  
      }
      case DELETE_SKILL_CATEGORY_SUCCESS: {
  
        return {
          ...state,
          skillCategories: state.skillCategories.filter((skillCategory) => {
             if ( skillCategory.id !== action.data) {
               return true
             }
  
             return false
           }),
          loading: false
        };
  
      }
      case LOGOUT_SKILL_CATEGORY: {
        return {
          ...state,
          loaded: false,
          skillCategories: []
        }
      }
      default: {
        return state;
      }
    }
  };
  export default skillCategoryReducer;
  