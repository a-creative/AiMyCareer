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

export const validateFormByLaravelResponse = ({
    component,
    responseData,
    onSuccess,
    stateSelectorId = 'fields',
    onFailure
} = {} ) => { 

    let errors = responseData.errors;

    if ( errors ) {

        const { t } = component.props;

        let state = {validated : false, ...component.state };

        state.errors = state.errors || {};

        let formState = component.state[ stateSelectorId ];
        let formFieldNames = Object.keys( formState );
        let errorFieldNames = Object.keys( errors );

        // Removed fixed errors from error state
        formFieldNames.forEach( function( fieldName ) {

            if ( ( state.errors[ fieldName ] ) && ( errorFieldNames.indexOf( fieldName ) === -1 ) ) {

                // If we have a previous shown error on this field 
                // AND the error is not in the response data any more

                // Then remove the error on this field
                delete( state.errors[ fieldName ] );
            } 
        })

        // Add new error to error state 
        errorFieldNames.forEach( ( errorFieldName ) => {

            let error_text = errors[ errorFieldName ]
                .map( ( error ) => { 
                
                    let translated;
                    if ( typeof error === 'object' ) {
                        translated = t( error[0], error[1])
                    } else {
                        translated = t( error )
                    }

                    return <div>- {translated}</div>; 
                
                });

            state.errors[ errorFieldName ] = error_text;
        });

        component.setState( state );

        if ( typeof onFailure === 'function') {
            onFailure( errors );
        }

    } else {

        let state = { validated: true, ...component.state };
        state.errors = {};
        component.setState( state );

        onSuccess();
    }

}
