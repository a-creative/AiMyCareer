interface IPosting {
    key: number,
    id: number,
    jobTitle: string,
    employer: string,
    extLink : string,
    postedDate : Date,
    deadlineDate: Date,
    locationPostalCode : string,
    locationCity: string,
    contactName: string,
    contactJobTitle: string,
    contactDetails: string,
    contentRaw : string
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