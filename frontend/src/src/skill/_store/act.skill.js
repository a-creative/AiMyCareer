import Api from "./api.skill.js"
import { 
    SKILL_LOADING, 
    SKILL_ABORT,

    LOAD_SKILLS_SUCCESS,
    INSERT_SKILL_SUCCESS,
    UPDATE_SKILL_SUCCESS,
    DELETE_SKILL_SUCCESS
} from "./con.skill"

import {
    REGISTER_ERROR
} from "error/_store/con.error"

const handleError = ( dispatch, error ) => {
    dispatch({ type: SKILL_ABORT })
    dispatch({ type: REGISTER_ERROR, message: error.message })
}

export const fetchSkills = ( { loggedIn } = {} ) => dispatch => {
    dispatch({ type: SKILL_LOADING });
    Api.getSkills( loggedIn )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOAD_SKILLS_SUCCESS, data })
            },
            error => handleError( dispatch, error )
        );
 };
 
 export const insertSkill = ( skill, loggedIn, callback ) => dispatch => {
     dispatch({ type: SKILL_LOADING });
     Api.insertSkill( skill, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: INSERT_SKILL_SUCCESS, data });
                 callback();
             },
             error => handleError( dispatch, error )
         )
 };
 
 export const updateSkill = ( skill, loggedIn, callback ) => dispatch => {
         
     dispatch({ type: SKILL_LOADING });
 
     Api.updateSkill( skill, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: UPDATE_SKILL_SUCCESS, data });
                 callback();
             },
             error => handleError( dispatch, error )
         )
 }
 
 export const deleteSkill = ( skill, loggedIn ) => dispatch => {
         
     dispatch({ type: SKILL_LOADING });
 
     Api.deleteSkill( skill, loggedIn )
         .then(response => response.json())
         .then(
             data => dispatch({ type: DELETE_SKILL_SUCCESS, data }),
             error => handleError( dispatch, error )
         )
 }