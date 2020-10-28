const API_BASE_ADDRESS = 'http://localhost:5002/api';
export default class Api {

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
        return fetch( API_BASE_ADDRESS + uri, this.getOptions({ method : 'post' }, formData, token ) );
    }

    static delete(uri){
        return fetch( API_BASE_ADDRESS + uri, this.getOptions({ method : 'delete' } ) );
    }

    static get(uri){
        return fetch( API_BASE_ADDRESS + uri, this.getOptions({ method : 'get' } ) );
    }

    static appendFormData( formData, key, value ) {
        if ( value ) {
            formData.append(key, value);
        }
        return formData;
    }

}