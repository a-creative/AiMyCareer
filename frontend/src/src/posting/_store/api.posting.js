import Api from '_shared/Api'

export default class ApiPosting {

    static assignPostingToFormData( posting ) {
        var formData = new FormData();
    
        formData = Api.appendFormData(formData, 'jobTitle', posting.jobTitle);
        formData = Api.appendFormData(formData, 'employer', posting.employer);
        formData = Api.appendFormData(formData, 'extLink', posting.extLink);
        formData = Api.appendFormData(formData, 'postedDate', posting.postedDate);
        formData = Api.appendFormData(formData, 'appliedDate', posting.appliedDate);
        formData = Api.appendFormData(formData, 'deadlineDate', posting.deadlineDate);
        formData = Api.appendFormData(formData, 'earliestFeedbackDate', posting.earliestFeedbackDate);
        formData = Api.appendFormData(formData, 'earliestStartingDate', posting.earliestStartingDate);
        formData = Api.appendFormData(formData, 'locationCity', posting.locationCity);
        formData = Api.appendFormData(formData, 'locationPostalCode', posting.locationPostalCode);
        formData = Api.appendFormData(formData, 'contactName', posting.contactName);
        formData = Api.appendFormData(formData, 'contactJobTitle', posting.contactJobTitle);
        formData = Api.appendFormData(formData, 'contactDetails', posting.contactDetails);
        formData = Api.appendFormData(formData, 'contentRaw', posting.contentRaw);
        
        return formData;

    }

    static getPostings( loggedIn ) {
        return Api.get("/auth/job-postings", undefined, Api.getTokenFrom( loggedIn ))
    }

    static insertPosting( posting, loggedIn ) {
        return Api.post("/auth/job-postings", this.assignPostingToFormData( posting ), Api.getTokenFrom( loggedIn ) )
    }

    static updatePosting( posting, loggedIn ) {
        return Api.put("/auth/job-postings/" + posting.id,this.assignPostingToFormData( posting ), Api.getTokenFrom( loggedIn )  )
    }

    static deletePosting( posting, loggedIn ) {
        return Api.delete("/auth/job-postings/" + posting.id, Api.getTokenFrom( loggedIn ) );
    }
    
}