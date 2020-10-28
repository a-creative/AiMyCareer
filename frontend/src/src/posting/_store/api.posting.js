import Api from '_shared/Api'

export default class ApiPosting {

    static assignPostingToFormData( posting ) {
        var formData = new FormData();
    
        formData = Api.appendFormData(formData, 'jobTitle', posting.jobTitle);
        formData = Api.appendFormData(formData, 'employer', posting.employer);
        formData = Api.appendFormData(formData, 'extLink', posting.extLink);
        formData = Api.appendFormData(formData, 'postedDate', posting.postedDate);
        formData = Api.appendFormData(formData, 'deadlineDate', posting.deadlineDate);
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

    static insertPosting( posting ) {
        return Api.post("/job-postings", this.assignPostingToFormData( posting ) )
    }

    static updatePosting( posting ) {
        return Api.put("/job-postings/" + posting.id,this.assignPostingToFormData( posting ) )
    }

    static deletePosting( posting ) {
        return Api.delete("/job-postings/" + posting.id );
    }
    
}