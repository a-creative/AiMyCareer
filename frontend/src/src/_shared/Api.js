export default class Api {

    static getTokenFrom( loggedIn ) {
        return loggedIn.token.key;
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

    static put( uri, formData ) {
        formData.append('_method','PUT');
        return this.post( uri, formData );

    }

    static post( uri, formData, token ) {
        return fetch( process.env.REACT_APP_BACKEND_API_URL + uri, this.getOptions({ method : 'post' }, formData, token ) );
    }

    static delete(uri){
        return fetch( process.env.REACT_APP_BACKEND_API_URL + uri, this.getOptions({ method : 'delete' } ) );
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