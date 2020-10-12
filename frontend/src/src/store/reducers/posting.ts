//import * as action_types from "./action_types"

const initial_state: PostingState = {
    postings: [],
  }

  const posting_reducer = ( state: PostingState = initial_state, action: any ) : PostingState => {

    if ( action.type === 'SET_POSTINGS' ) {
      const new_state: PostingState = { postings : [] };

      return Object.assign(new_state,state, {
        postings: action.postings
      })
    }

    return state;
  }
  export default posting_reducer;