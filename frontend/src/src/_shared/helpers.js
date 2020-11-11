import moment from 'moment-timezone'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const formatNormalizedDate = ( inputDate, outputFormat ) => {

    if ( !inputDate ) {

        // If undefined, return null
        return null;
    } else if (!inputDate.date) {

        // If already normalized, return as is
        return inputDate;
    } else {

        // Otherwise, normalize
        var date = moment.tz( inputDate.date, inputDate.timezone);
        return date.format( outputFormat );
    }
    
}

export const formatNormalizedPeriod = ( inputFromDate, inputToDate, t ) => {

    let fromDate = moment.tz( inputFromDate.date, inputFromDate.timezone);
    let toDate = moment.tz( inputToDate.date, inputToDate.timezone);

    let diffMonths = toDate.diff(fromDate, 'months')

    if ( fromDate.get('year') === toDate.get('year') ) {

        if ( diffMonths >= 6 ) {
            
            return <span>{fromDate.format('YYYY')}</span>

        } else {

            return <span>{t(fromDate.format('MMM')+'Abbr')} {fromDate.format('YYYY')}<br />{diffMonths} {t('monthsAbbr.')}</span>
        }


    } else {

        let fromDateStr, toDateStr;

        if ( fromDate.get('month') >=6 ) {
            
            fromDateStr = t(fromDate.format('MMM')) + ' ' + fromDate.format('YYYY')
            
        } else {
            fromDateStr = fromDate.format('YYYY')
        }

        if ( toDate.get('month') >=6 ) {
            
            toDateStr = toDate.format('YYYY')
            
        } else {
            toDateStr = t(toDate.format('MMM')) + ' ' + toDate.format('YYYY')
        }

        if ( (fromDateStr.length + toDateStr.length) > 8 ) {
            return <span>{fromDateStr}-<br />{toDateStr}</span>;
        } else {
            return <span>{fromDateStr}-{toDateStr}</span>;
        }

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

export const getAwesomeIconFromString = ( text, iconString, foregroundColorHex, backgroundColorHex ) => {
    if ( iconString && foregroundColorHex && backgroundColorHex ) {
        let icon_parts = iconString.split(':');
        if ( icon_parts.length > 1 ) {

            if ( icon_parts[ 0 ] === 'text') {
                return <span className="skill" style={{ color: foregroundColorHex, backgroundColor: backgroundColorHex}}>
                {text} {icon_parts[ 1 ]}
            </span> 
            } else {
                return <span className="skill" style={{ color: foregroundColorHex, backgroundColor: backgroundColorHex}}>
                {text} <FontAwesomeIcon icon={[icon_parts[ 0 ], icon_parts[ 1 ]]} />
            </span> 
            }

        } else {
            return <span className="skill" style={{ color: foregroundColorHex, backgroundColor: backgroundColorHex}}>
                {text} <FontAwesomeIcon icon={['fas', icon_parts[ 0 ]]} />
            </span>
        }
        
    } else {
        return <span className="skill" style={{ color: 'Black', backgroundColor: 'Yellow'}}>
            <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
        </span>
    }

}