interface IPosting {
    key: number,
    id: number,
    job_title: string,
    employer: string,
    ext_link : string,
    posted_date : Date,
    deadline_date: Date,
    location_postal_code : string,
    location_city: string,
    contact_name: string,
    contact_job_title: string,
    contact_details: string,
    content_raw : string
}

type PostingState = {
    loading : boolean,
    error: string,
    postings: IPosting[]
}

type PostingAction = {
    type: string
    posting: IPosting
}

type DispatchType = (args: PostingAction) => PostingAction

declare namespace JSX {
    interface IntrinsicElements {
        fieldset, div, title,tr,td,th,thead,tbody, h1,h2,h3: any;

    }
}