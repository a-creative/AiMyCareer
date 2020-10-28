import Api from '_shared/Api'

export default class ApiAuth {
    
    static getLogin( user ) {
        var formData = new FormData();
        formData.append('email', user.email);
        formData.append('password', user.password );

        return Api.post( "/auth/login", formData )
    }

    static logout( loggedIn ) {
        return Api.post( "/auth/logout", null, Api.getTokenFrom( loggedIn ) )
    }

    static registerUser( user ) {
        var formData = new FormData();
        for ( var attr in user ) {
            formData.append(attr, user[attr]);
        }
        formData.append('password_confirmation', user.passwordConfirmation );

        return Api.post( "/auth/register", formData )
    }

    
}