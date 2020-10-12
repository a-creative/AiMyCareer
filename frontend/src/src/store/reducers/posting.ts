//import * as action_types from "./action_types"

const initial_state: PostingState = {
    postings: [
      {
        id: 1,
        job_title: "Senior Frontend Udvikler med fokus på detaljen	",
        employer: "Norlys"
      },
      {
        id: 2,
        job_title: "IT-Supporter",
        employer: "Itadel",
      },
    ],
  }

  const posting_reducer = (
    state: PostingState = initial_state,
    action: PostingAction
  ) : PostingState => {

    // handle actions here

    return state;
  }
  export default posting_reducer;