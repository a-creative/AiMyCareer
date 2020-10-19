import Api from "./api.js"
import { 
    LOAD_POSTINGS_LOADING, 
    LOAD_POSTINGS_SUCCESS, 
    LOAD_POSTINGS_ERROR,
    INSERT_POSTING_INSERTING,
    INSERT_POSTING_SUCCESS,
    INSERT_POSTING_ERROR,
    UPDATE_POSTING_UPDATING,
    UPDATE_POSTING_SUCCESS,
    UPDATE_POSTING_ERROR,
    DELETE_POSTING_DELETING,
    DELETE_POSTING_SUCCESS,
    DELETE_POSTING_ERROR,
} from "./action_types"

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
    dispatch({ type: INSERT_POSTING_INSERTING });
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
        
    dispatch({ type: UPDATE_POSTING_UPDATING });

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
        
    dispatch({ type: DELETE_POSTING_DELETING });

    Api.deletePosting( posting )
        .then(response => response.json())
        .then(
            data => dispatch({ type: DELETE_POSTING_SUCCESS, data }),
            error => dispatch({ type: DELETE_POSTING_ERROR, error: error.message || 'Unexpected Error!!!' })
        )
}