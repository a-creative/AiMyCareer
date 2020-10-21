const API_BASE_ADDRESS = 'http://localhost:5002/api';
export default class Api {

    static put( uri, formData ) {
        formData.append('_method','PUT');
        return this.post( uri, formData );

    }

    static post(uri, formData ) {
        return fetch(uri, {
            method: 'post',
            body: formData
        });
    }

    static delete(uri){
        return fetch(uri, {
            method: 'delete',
        });
    }

    static get(uri){
        return fetch(uri, {
            method: 'get'
        });
    }

    static appendFormData( formData, key, value ) {
        if ( value ) {
            formData.append(key, value);
        }
        return formData;
    }

    static assignPostingToFormData( posting ) {
        var formData = new FormData();
    
        formData = this.appendFormData(formData, 'jobTitle', posting.jobTitle);
        formData = this.appendFormData(formData, 'employer', posting.employer);
        formData = this.appendFormData(formData, 'extLink', posting.extLink);
        formData = this.appendFormData(formData, 'postedDate', posting.postedDate);
        formData = this.appendFormData(formData, 'deadlineDate', posting.deadlineDate);
        formData = this.appendFormData(formData, 'locationCity', posting.locationCity);
        formData = this.appendFormData(formData, 'locationPostalCode', posting.locationPostalCode);
        formData = this.appendFormData(formData, 'contactName', posting.contactName);
        formData = this.appendFormData(formData, 'contactJobTitle', posting.contactJobTitle);
        formData = this.appendFormData(formData, 'contactDetails', posting.contactDetails);
        formData = this.appendFormData(formData, 'contentRaw', posting.contentRaw);
        
        return formData;

    }

    static getPostings() {
        return this.get( API_BASE_ADDRESS + "/job-postings" )
    }

    static insertPosting( posting ) {
        return this.post( API_BASE_ADDRESS + "/job-postings", this.assignPostingToFormData( posting ) )
    }

    static updatePosting( posting ) {
        return this.put( API_BASE_ADDRESS + "/job-postings/" + posting.id, this.assignPostingToFormData( posting ) )
    }

    static deletePosting( posting ) {
        return this.delete( API_BASE_ADDRESS + "/job-postings/" + posting.id );
    }

    static authUser( username, password ) {
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password )

        return this.post( API_BASE_ADDRESS + "/users/auth", formData )
    }

    static registerUser( user ) {
        var formData = new FormData();
        for ( var attr in user ) {
            formData.append(attr, user[attr]);
        }

        return this.post( API_BASE_ADDRESS + "/users", formData )
    }

    
}