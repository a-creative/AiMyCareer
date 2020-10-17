
import {LOAD_POSTINGS_ERROR, LOAD_POSTINGS_LOADING, LOAD_POSTINGS_SUCCESS} from "../action_types";

const initial_state: PostingState = {
    loading : false,
    error : '',
    postings: [],
  }

  const posting_reducer = ( state: PostingState = initial_state, action: any ) : PostingState => {

    switch (action.type) {
      case LOAD_POSTINGS_LOADING: {
          return {
              ...state,
              loading: true,
              error:''
          };
      }
      case LOAD_POSTINGS_SUCCESS: {

          return {
              ...state,
              postings: action.data.posting.postings,
              loading: false
          }
      }
      case LOAD_POSTINGS_ERROR: {
          return {
              ...state,
              loading: false,
              error: action.error
          };
      }
      default: {
          return state;
      }
  }
  }
  export default posting_reducer;