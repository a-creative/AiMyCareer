import { combineReducers } from 'redux'
import postingReducer from 'posting/_store/red.posting'
import authReducer from 'auth/_store/red.auth'


const rootReducer = combineReducers({
    posting : postingReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;