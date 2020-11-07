import Api from "./api.experience.js"
import { 
    EXPERIENCE_LOADING,
    EXPERIENCE_LOADED,
    EXPERIENCE_ABORT, 
     
    LOAD_EXPERIENCES_SUCCESS,
    INSERT_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_SUCCESS,

    RESET_EXPERIENCE
} from "./con.experience"

import {
    REGISTER_ERROR
} from "error/_store/con.error"

const handleError = ( dispatch, error ) => {
    dispatch({ type: EXPERIENCE_ABORT })
    dispatch({ type: REGISTER_ERROR, message: error.message })
}

export const fetchExperiences = ( { loggedIn } = {} ) => dispatch => {
    dispatch({ type: EXPERIENCE_LOADING });
    Api.getExperiences( loggedIn )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOAD_EXPERIENCES_SUCCESS, data })
            },
            error => handleError( dispatch, error )
        );
 };
 
 export const insertExperience = ( experience, loggedIn, callback ) => dispatch => {
     dispatch({ type: EXPERIENCE_LOADING });
     Api.insertExperience( experience, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: INSERT_EXPERIENCE_SUCCESS, data });
                 callback();
             },
             error => handleError( dispatch, error )
         )
 };
 
 export const updateExperience = ( experience, loggedIn, callback ) => dispatch => {

    // Filter empty/invalid tasks
    experience.tasks = experience.tasks.filter( ( task ) => {
        return ( task.description && task.weightPct)
    });
         
    dispatch({ type: EXPERIENCE_LOADING });
 
    Api.updateExperience( experience, loggedIn )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: UPDATE_EXPERIENCE_SUCCESS, data });
                callback();
            },
            error => handleError( dispatch, error )
        )
 }
 
 export const deleteExperience = ( experience, loggedIn ) => dispatch => {
         
     dispatch({ type: EXPERIENCE_LOADING });
 
     Api.deleteExperience( experience, loggedIn )
         .then(response => response.json())
         .then(
             data => dispatch({ type: DELETE_EXPERIENCE_SUCCESS, data }),
             error => handleError( dispatch, error )
         )
 }

 export const resetExperience = ( experienceId, initExperience, onSuccess ) => dispatch => {
     dispatch( {
         type: RESET_EXPERIENCE,
         experienceId : experienceId,
         experience : initExperience
     });
     onSuccess();
 }

 export const experienceLoading = () => dispatch => {
    dispatch({ type: EXPERIENCE_LOADING })
 }
 export const experienceLoaded = () => dispatch => {
    dispatch({ type: EXPERIENCE_LOADED })
 }

 export const experienceHandleError = ( error ) => dispatch => {
    this.handleError( dispatch, error )
 }
 