//import * as action_types from "./action_types"

const initial_state: PostingState = {
    postings: [
      {
        "id" : 1,
        "key" : 1,
        "employer" : "Employer 1",
        "job_title" : "Job title 1"
      },
      {
        "id" : 2,
        "key" : 2,
        "employer" : "Employer 2",
        "job_title" : "Job title 2"
      }  
    ],
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