import moment from 'moment-timezone'

export const formatNormalizedDate = function( input_date : any, output_format: string ) {

    if ( input_date === undefined ) {
        return null;
    } else {
        var date:any = moment.tz( input_date.date, input_date.timezone);
        return date.format( output_format );
    }
    
}