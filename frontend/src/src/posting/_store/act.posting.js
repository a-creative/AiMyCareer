import Api from "./api.posting.js"
import { 
    POSTING_LOADING, 
    POSTING_ABORT,

    LOAD_POSTINGS_SUCCESS,
    INSERT_POSTING_SUCCESS,
    UPDATE_POSTING_SUCCESS,
    DELETE_POSTING_SUCCESS
} from "./con.posting"

import {
    REGISTER_ERROR
} from "error/_store/con.error"

const handleError = ( dispatch, error ) => {
    dispatch({ type: POSTING_ABORT })
    dispatch({ type: REGISTER_ERROR, message: error.message })
}

export const fetchPostings = ( { loggedIn } = {} ) => dispatch => {
    dispatch({ type: POSTING_LOADING });
    Api.getPostings( loggedIn )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOAD_POSTINGS_SUCCESS, data })
            },
            error => handleError( dispatch, error )
        );
 };
 
 export const insertPosting = ( posting, loggedIn, callback ) => dispatch => {
     dispatch({ type: POSTING_LOADING });
     Api.insertPosting( posting, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: INSERT_POSTING_SUCCESS, data });
                 callback();
             },
             error => handleError( dispatch, error )
         )
 };
 
 export const updatePosting = ( posting, loggedIn, callback ) => dispatch => {
         
     dispatch({ type: POSTING_LOADING });
 
     Api.updatePosting( posting, loggedIn )
         .then(response => response.json())
         .then(
             data => {
                 dispatch({ type: UPDATE_POSTING_SUCCESS, data });
                 callback();
             },
             error => handleError( dispatch, error )
         )
 }
 
 export const deletePosting = ( posting, loggedIn ) => dispatch => {
         
     dispatch({ type: POSTING_LOADING });
 
     Api.deletePosting( posting, loggedIn )
         .then(response => response.json())
         .then(
             data => dispatch({ type: DELETE_POSTING_SUCCESS, data }),
             error => handleError( dispatch, error )
         )
 }