import Api from '_shared/Api'

export default class ApiExperience {

    static assignExperienceToFormData( experience ) {
        var formData = new FormData();
    
        formData = Api.appendFormData(formData, 'jobTitle', experience.jobTitle);
        formData = Api.appendFormData(formData, 'employer', experience.employer);
        formData = Api.appendFormData(formData, 'startedDate', experience.startedDate);
        formData = Api.appendFormData(formData, 'endedDate', experience.endedDate);
        
        return formData;

    }

    static getExperiences( loggedIn ) {
        return Api.get("/auth/job-experiences", undefined, Api.getTokenFrom( loggedIn ))
    }

    static insertExperience( experience, loggedIn ) {
        return Api.post("/auth/job-experiences", this.assignExperienceToFormData( experience ), Api.getTokenFrom( loggedIn ) )
    }

    static updateExperience( experience, loggedIn ) {
        return Api.put("/auth/job-experiences/" + experience.id,this.assignExperienceToFormData( experience ), Api.getTokenFrom( loggedIn )  )
    }

    static deleteExperience( experience, loggedIn ) {
        return Api.delete("/auth/job-experiences/" + experience.id, Api.getTokenFrom( loggedIn ) );
    }
    
}