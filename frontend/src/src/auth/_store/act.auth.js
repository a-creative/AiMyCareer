import Api from "./api.auth"
import { 

    USER_LOADING,
    USER_ABORT,

    REGISTER_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
} from "./con.auth"

import {
    REGISTER_ERROR
} from "error/_store/con.error"

import { LOGOUT_EXPERIENCE} from 'experience/_store/con.experience';
import { LOGOUT_POSTING} from 'posting/_store/con.posting';
import { LOGOUT_SKILL} from 'skill/_store/con.skill';
import { LOGOUT_SKILL_CATEGORY } from "skillCategory/_store/con.skillCategory";


const handleError = ( dispatch, error )  => {
    dispatch({ type: USER_ABORT })
    dispatch({ type: REGISTER_ERROR, message: error.message })
}

export const registerUser = ( user, callback) => dispatch => {
        
    dispatch({ type: USER_LOADING });
    Api.registerUser( user )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: REGISTER_USER_SUCCESS, data })
                callback( data );
            },
            error => handleError( dispatch,  error )
        )
}

export const loginUser = ( user, callback) => dispatch => {
    
    dispatch({ type: USER_LOADING });
    Api.getLogin( user )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOGIN_USER_SUCCESS, data });
                callback(data)
            },
            error => handleError( dispatch, error )
        );
    
}

export const logout = ( loggedIn, callback ) => dispatch => {

    dispatch({ type: USER_LOADING });
    Api.logout( loggedIn )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOGOUT_USER_SUCCESS });
                dispatch({ type: LOGOUT_EXPERIENCE } );
                dispatch({ type: LOGOUT_POSTING } );
                dispatch({ type: LOGOUT_SKILL } );
                dispatch({ type: LOGOUT_SKILL_CATEGORY } );
                callback()
            },
            error => handleError( dispatch,  error )
    );

}