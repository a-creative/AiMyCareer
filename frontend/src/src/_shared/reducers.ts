import { combineReducers } from 'redux'
import postingReducer from 'posting/_store/red.posting'
import authReducer from 'auth/_store/red.auth'
import experienceReducer from 'experience/_store/red.experience';


const rootReducer = combineReducers({
    posting : postingReducer,
    auth: authReducer,
    experience: experienceReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;