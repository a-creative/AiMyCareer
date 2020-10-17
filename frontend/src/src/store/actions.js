import Api from "./api.js"
export const LOAD_POSTINGS_LOADING = 'REDUX_THUNK_LOAD_POSTINGS_LOADING';
export const LOAD_POSTINGS_SUCCESS = 'REDUX_THUNK_LOAD_POSTINGS_SUCCESS';
export const LOAD_POSTINGS_ERROR = 'REDUX_THUNK_LOAD_POSTINGS_ERROR';
export const loadPostings = () => dispatch => {
   dispatch({ type: LOAD_POSTINGS_LOADING });
   Api.getPostings()
       .then(response => response.json())
       .then(
           data => dispatch({ type: LOAD_POSTINGS_SUCCESS, data }),
           error => dispatch({ type: LOAD_POSTINGS_ERROR, error: error.message || 'Unexpected Error!!!' })
       )
};