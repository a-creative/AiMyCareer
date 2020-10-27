const API_BASE_ADDRESS = 'http://localhost:5002/api';
export default class Api {

    static getTokenFrom( loggedIn ) {
        return loggedIn.token.key;
    }

    static getOptions( baseOptions = {}, formData, token ) {


        baseOptions.headers = {};

        if ( formData ) {
            baseOptions.body = formData;
        }

        if ( token ) {
            baseOptions.headers.Authorization = 'Bearer ' + token;
        }

        baseOptions.headers = {
            'Accept': 'application/json',
        };

        return baseOptions;
    }

    static put( uri, formData ) {
        formData.append('_method','PUT');
        return this.post( uri, formData );

    }

    static post( uri, formData, token ) {
        return fetch( uri, this.getOptions({ method : 'post' }, formData, token ) );
    }

    static delete(uri){
        return fetch( uri, this.getOptions({ method : 'delete' } ) );
    }

    static get(uri){
        return fetch( uri, this.getOptions({ method : 'get' } ) );
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
        return this.get( API_BASE_ADDRESS + "/job-postings")
    }

    static insertPosting( posting ) {
        return this.post( API_BASE_ADDRESS + "/job-postings", this.assignPostingToFormData( posting ) )
    }

    static updatePosting( posting ) {
        return this.put( API_BASE_ADDRESS + "/job-postings/" + posting.id,this.assignPostingToFormData( posting ) )
    }

    static deletePosting( posting ) {
        return this.delete( API_BASE_ADDRESS + "/job-postings/" + posting.id );
    }

    static getLogin( user ) {
        var formData = new FormData();
        formData.append('email', user.email);
        formData.append('password', user.password );

        return this.post( API_BASE_ADDRESS + "/auth/login", formData )
    }

    static logout( loggedIn ) {
        return this.post( API_BASE_ADDRESS + "/auth/logout", null, this.getTokenFrom( loggedIn ) )
    }

    static registerUser( user ) {
        var formData = new FormData();
        for ( var attr in user ) {
            formData.append(attr, user[attr]);
        }
        formData.append('password_confirmation', user.passwordConfirmation );

        return this.post( API_BASE_ADDRESS + "/auth/register", formData )
    }

    
}