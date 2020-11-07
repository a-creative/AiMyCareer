import { 
    ACK_ALL_ERRORS
} from "./con.error"

export const acknowledgeAllErrors = () => dispatch => {

    dispatch({ type: ACK_ALL_ERRORS });

}