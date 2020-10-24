import moment from 'moment-timezone'
import React from 'react';

export const formatNormalizedDate = function( inputDate, outputFormat ) {

    if ( !inputDate ) {
        return null;
    } else {
        var date = moment.tz( inputDate.date, inputDate.timezone);
        return date.format( outputFormat );
    }
    
}

export const formValidate = function( { 
    component,
    serverData, 
    onSuccess, 
    onFailure 
} = {} ) {

    let errors = serverData.errors;
    if ( errors ) {

        Object.keys(errors).forEach(function( field_name ) {
            
            if ( typeof errors[field_name] !== 'undefined' ) {
                const { t } = component.props;
                let state = { ...component.state };
                state[ field_name + 'Invalid' ] = true;
                state[ field_name + 'InvalidMessage' ] = 
                    errors[field_name].map( function( error ) { 
                        return t( error ); 
                    }).join('<br>');
                component.setState(state)
            }
            
        });

        if ( typeof onFailure === 'function') {
            onFailure( errors );
        }

    } else if ( typeof onSuccess === 'function' ) {
        onSuccess();
    }

}
