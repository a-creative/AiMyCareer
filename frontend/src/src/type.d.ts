interface IPosting {
    key: number,
    id: number,
    job_title: string,
    employer: string,
}

type PostingState = {
    postings: IPosting[]
}

type PostingAction = {
    type: string
    posting: IPosting
}

type DispatchType = (args: PostingAction) => PostingAction

declare namespace JSX {
    interface IntrinsicElements {
        fieldset, div, title,tr,td,th,thead,tbody: any;

    }
}