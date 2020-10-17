export const formatToLocalDate = function( date? : Date ) {

    return (
        date !== undefined ? 
                    date.getFullYear()
            + '-' + date.getMonth()
            + '-' + (date.getDate() + '').padStart(2,'0') 
        : ''
    );
}