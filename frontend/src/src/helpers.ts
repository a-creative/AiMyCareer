import moment from 'moment-timezone'

export const formatNormalizedDate = function( inputDate : any, outputFormat: string ) {

    if ( !inputDate ) {
        return null;
    } else {
        var date:any = moment.tz( inputDate.date, inputDate.timezone);
        return date.format( outputFormat );
    }
    
}