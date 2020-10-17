//import * as action_types from "./action_types"

const initial_state: PostingState = {
    postings: [
      {
        "id" : 1,
        "key" : 1,
        "job_title" : "Job title 1",
        "employer" : "Employer 1",
        "ext_link" : "https://link",
        "posting_date" : new Date(2020,10,17),
        "deadline_date" : new Date(2020, 10, 31),
        "location_postal_code" : "1234",
        "location_city" : "City name",
        "contact_name" : "Name of contact",
        "contact_job_title" :"Title of contact",
        "contact_details" : "mailbox@tld.comm",
        "content_raw": "the raw text"
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