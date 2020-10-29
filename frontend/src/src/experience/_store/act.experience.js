import Api from "./api.experience.js"
import { 
    LOAD_EXPERIENCES_LOADING, 
    LOAD_EXPERIENCES_SUCCESS, 
    LOAD_EXPERIENCES_ERROR,
    INSERT_EXPERIENCE_LOADING,
    INSERT_EXPERIENCE_SUCCESS,
    INSERT_EXPERIENCE_ERROR,
    UPDATE_EXPERIENCE_LOADING,
    UPDATE_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_ERROR,
    DELETE_EXPERIENCE_LOADING,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_ERROR
} from "./con.experience"

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const fetchExperiences = ( { loggedIn } = {} ) => dispatch => {
    dispatch({ type: LOAD_EXPERIENCES_LOADING });
    Api.getExperiences( loggedIn )
        .then(handleErrors)
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOAD_EXPERIENCES_SUCCESS, data })
            }
        ).catch( error => {
            dispatch({ type: LOAD_EXPERIENCES_ERROR, error: error || 'Unexpected Error!!!' })
        })
 };
 
 export const insertExperience = ( experience, loggedIn, callback ) => dispatch => {
     dispatch({ type: INSERT_EXPERIENCE_LOADING });
     Api.insertExperience( experience, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: INSERT_EXPERIENCE_SUCCESS, data });
                 callback();
             },
             error => dispatch({ type: INSERT_EXPERIENCE_ERROR, error: error.message || 'Unexpected Error!!!' })
         )
 };
 
 export const updateExperience = ( experience, loggedIn, callback ) => dispatch => {
         
     dispatch({ type: UPDATE_EXPERIENCE_LOADING });
 
     Api.updateExperience( experience, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: UPDATE_EXPERIENCE_SUCCESS, data });
                 callback();
             },
             error => dispatch({ type: UPDATE_EXPERIENCE_ERROR, error: error.message || 'Unexpected Error!!!' })
         )
 }
 
 export const deleteExperience = ( experience, loggedIn ) => dispatch => {
         
     dispatch({ type: DELETE_EXPERIENCE_LOADING });
 
     Api.deleteExperience( experience, loggedIn )
         .then(response => response.json())
         .then(
             data => dispatch({ type: DELETE_EXPERIENCE_SUCCESS, data }),
             error => dispatch({ type: DELETE_EXPERIENCE_ERROR, error: error.message || 'Unexpected Error!!!' })
         )
 }