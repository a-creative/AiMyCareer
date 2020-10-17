import Api from "./api.js"
import { LOAD_POSTINGS_LOADING, LOAD_POSTINGS_SUCCESS, LOAD_POSTINGS_ERROR } from "./action_types"

export const fetchPostings = () => dispatch => {
   dispatch({ type: LOAD_POSTINGS_LOADING });
   Api.getPostings()
       .then(response => response.json())
       .then(
           data => dispatch({ type: LOAD_POSTINGS_SUCCESS, data }),
           error => dispatch({ type: LOAD_POSTINGS_ERROR, error: error.message || 'Unexpected Error!!!' })
       )
};