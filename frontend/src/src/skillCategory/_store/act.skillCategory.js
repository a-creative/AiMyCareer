import Api from "./api.skillCategory.js"
import { 
    SKILL_CATEGORY_LOADING, 
    SKILL_CATEGORY_ABORT,

    LOAD_SKILL_CATEGORIES_SUCCESS,
    INSERT_SKILL_CATEGORY_SUCCESS,
    UPDATE_SKILL_CATEGORY_SUCCESS,
    DELETE_SKILL_CATEGORY_SUCCESS
} from "./con.skillCategory"

import {
    REGISTER_ERROR
} from "error/_store/con.error"

const handleError = ( dispatch, error ) => {
    dispatch({ type: SKILL_CATEGORY_ABORT })
    dispatch({ type: REGISTER_ERROR, message: error.message })
}

export const fetchSkillCategories = ( { loggedIn } = {} ) => dispatch => {
    dispatch({ type: SKILL_CATEGORY_LOADING });
    Api.getSkillCategories( loggedIn )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOAD_SKILL_CATEGORIES_SUCCESS, data })
            },
            error => handleError( dispatch, error )
        );
 };
 
 export const insertSkillCategory = ( skill, loggedIn, callback ) => dispatch => {
     dispatch({ type: SKILL_CATEGORY_LOADING });
     Api.insertSkillCategory( skill, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: INSERT_SKILL_CATEGORY_SUCCESS, data });
                 callback();
             },
             error => handleError( dispatch, error )
         )
 };
 
 export const updateSkillCategory = ( skill, loggedIn, callback ) => dispatch => {
         
     dispatch({ type: SKILL_CATEGORY_LOADING });
 
     Api.updateSkillCategory( skill, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: UPDATE_SKILL_CATEGORY_SUCCESS, data });
                 callback();
             },
             error => handleError( dispatch, error )
         )
 }
 
 export const deleteSkillCategory = ( skill, loggedIn ) => dispatch => {
         
     dispatch({ type: SKILL_CATEGORY_LOADING });
 
     Api.deleteSkillCategory( skill, loggedIn )
         .then(response => response.json())
         .then(
             data => dispatch({ type: DELETE_SKILL_CATEGORY_SUCCESS, data }),
             error => handleError( dispatch, error )
         )
 }