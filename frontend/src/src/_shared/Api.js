export default class Api {

    static getTokenFrom( loggedIn ) {
        if ( loggedIn ) {
            return loggedIn.token.key;
        } else if ( localStorage.getItem('token') ) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
         
    }
    
    static getOptions( baseOptions = {}, formData, token ) {


        baseOptions.headers = {
            'Accept': 'application/json'
        };

        if ( formData ) {
            baseOptions.body = formData;
        }

        if ( token ) {
            baseOptions.headers.Authorization = 'Bearer ' + token;
        }

        return baseOptions;
    }

    static put( uri, formData, token ) {
        formData.append('_method','PUT');
        return this.post( uri, formData, token );

    }

    static post( uri, formData, token ) {
        return fetch( process.env.REACT_APP_BACKEND_API_URL + uri, this.getOptions({ method : 'post' }, formData, token ) );
    }

    static delete(uri, token){
        return fetch( process.env.REACT_APP_BACKEND_API_URL + uri, this.getOptions({ method : 'delete' }, undefined, token ) );
    }

    static get(uri,formData, token){
        return fetch( process.env.REACT_APP_BACKEND_API_URL + uri, this.getOptions({ method : 'get' }, formData, token ) );
    }

    static appendFormData( formData, key, value ) {
        if ( value ) {
            formData.append(key, value);
        }
        return formData;
    }

}