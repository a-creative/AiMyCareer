import Api from "./api.auth"
import { 
    REGISTER_USER_LOADING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_LOADING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER_LOADING,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
} from "./con.auth"

export const registerUser = ( user, callback) => dispatch => {
        
    dispatch({ type: REGISTER_USER_LOADING });

    Api.registerUser( user )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: REGISTER_USER_SUCCESS, data })
                callback( data );
            },
            error => dispatch({ type: REGISTER_USER_ERROR, error: error.message || 'Unexpected Error!!!' })
        )
}

export const loginUser = ( user, callback) => dispatch => {
    dispatch({ type: LOGIN_USER_LOADING });
    Api.getLogin( user )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOGIN_USER_SUCCESS, data });
                callback(data)
            },
            error => {
                dispatch({ type: LOGIN_USER_ERROR, error: error.message || 'Unexpected Error!!!' })
            }
        );
    
}


export const logout = ( loggedIn, callback ) => dispatch => {

    dispatch({ type: LOGOUT_USER_LOADING });
    Api.logout( loggedIn )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: LOGOUT_USER_SUCCESS });
                callback()
            },
            error => {
                dispatch({ type: LOGOUT_USER_ERROR, error: error.message || 'Unexpected Error!!!' })
            }
    );

}