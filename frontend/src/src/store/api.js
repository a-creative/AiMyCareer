const API_BASE_ADDRESS = 'http://localhost:5002/api';
export default class Api {

    static getOptions( baseOptions, includeCredentials, formData ) {
        if ( typeof formData !== 'undefined' ) {
            baseOptions.body = formData;
        }

        if ( typeof includeCredentials === 'undefined' ) {
            includeCredentials = true;
        }

        if ( includeCredentials ) {
            baseOptions.credentials = 'include';
        }

        baseOptions.headers = {
            'Accept': 'application/json',
        };

        return baseOptions;
    }

    static put( uri, includeCredentials, formData ) {
        formData.append('_method','PUT');
        return this.post( uri, includeCredentials,formData );

    }

    static post(uri, includeCredentials, formData ) {
        return fetch( uri, this.getOptions({ method : 'post' }, includeCredentials, formData ) );
    }

    static delete(uri, includeCredentials){
        return fetch( uri, this.getOptions({ method : 'delete' }, includeCredentials ) );
    }

    static get(uri, includeCredentials){
        return fetch( uri, this.getOptions({ method : 'get' }, includeCredentials ) );
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
        return this.get( API_BASE_ADDRESS + "/job-postings", false)
    }

    static insertPosting( posting ) {
        return this.post( API_BASE_ADDRESS + "/job-postings", false, this.assignPostingToFormData( posting ) )
    }

    static updatePosting( posting ) {
        return this.put( API_BASE_ADDRESS + "/job-postings/" + posting.id, false, this.assignPostingToFormData( posting ) )
    }

    static deletePosting( posting ) {
        return this.delete( API_BASE_ADDRESS + "/job-postings/" + posting.id, false );
    }

    static getAccessToken( user ) {
        var formData = new FormData();
        formData.append('username', user.username);
        formData.append('password', user.password );

        return this.post( API_BASE_ADDRESS + "/auth/getAccessToken", false, formData )
    }

    static authUser( user ) {
        var formData = new FormData();
        formData.append('username', user.username);
        formData.append('password', user.password )

        return this.post( API_BASE_ADDRESS + "/users/auth", true, formData )
    }

    static registerUser( user ) {
        var formData = new FormData();
        for ( var attr in user ) {
            formData.append(attr, user[attr]);
        }
        formData.append('password_confirmation', user.passwordConfirmation );

        return this.post( API_BASE_ADDRESS + "/auth/register", false, formData )
    }

    
}