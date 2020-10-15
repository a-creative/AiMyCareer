function setPostings( postings : IPosting[] ) {
    return { type: 'SET_POSTINGS', postings: postings };
};

export { setPostings };