import Api from "./api.js"
import { 
    LOAD_POSTINGS_LOADING, 
    LOAD_POSTINGS_SUCCESS, 
    LOAD_POSTINGS_ERROR,
    INSERT_POSTING_LOADING,
    INSERT_POSTING_SUCCESS,
    INSERT_POSTING_ERROR,
    UPDATE_POSTING_LOADING,
    UPDATE_POSTING_SUCCESS,
    UPDATE_POSTING_ERROR,
    DELETE_POSTING_LOADING,
    DELETE_POSTING_SUCCESS,
    DELETE_POSTING_ERROR,
    REGISTER_USER_LOADING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_LOADING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER_LOADING,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
} from "./actionTypes"

export const fetchPostings = () => dispatch => {
   dispatch({ type: LOAD_POSTINGS_LOADING });
   Api.getPostings()
       .then(response => response.json())
       .then(
           data => dispatch({ type: LOAD_POSTINGS_SUCCESS, data }),
           error => dispatch({ type: LOAD_POSTINGS_ERROR, error: error.message || 'Unexpected Error!!!' })
       )
};

export const insertPosting = ( posting, callback ) => dispatch => {
    dispatch({ type: INSERT_POSTING_LOADING });
    Api.insertPosting( posting )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: INSERT_POSTING_SUCCESS, data });
                callback();
            },
            error => dispatch({ type: INSERT_POSTING_ERROR, error: error.message || 'Unexpected Error!!!' })
        )
};

export const updatePosting = ( posting, callback ) => dispatch => {
        
    dispatch({ type: UPDATE_POSTING_LOADING });

    Api.updatePosting( posting )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: UPDATE_POSTING_SUCCESS, data });
                callback();
            },
            error => dispatch({ type: UPDATE_POSTING_ERROR, error: error.message || 'Unexpected Error!!!' })
        )
}

export const deletePosting = ( posting ) => dispatch => {
        
    dispatch({ type: DELETE_POSTING_LOADING });

    Api.deletePosting( posting )
        .then(response => response.json())
        .then(
            data => dispatch({ type: DELETE_POSTING_SUCCESS, data }),
            error => dispatch({ type: DELETE_POSTING_ERROR, error: error.message || 'Unexpected Error!!!' })
        )
}

export const registerUser = ( user, callback) => dispatch => {
        
    dispatch({ type: REGISTER_USER_LOADING });

    Api.registerUser( user )
        .then(response => response.json())
        .then(
            data => {
                dispatch({ type: REGISTER_USER_SUCCESS, data })
                callback();
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