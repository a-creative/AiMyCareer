//import * as action_types from "./action_types"

const initial_state: PostingState = {
    postings: [
      {
        id: 1,
        position: "Senior Frontend Udvikler med fokus på detaljen	",
        employer: "Norlys"
      },
      {
        id: 2,
        position: "IT-Supporter",
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