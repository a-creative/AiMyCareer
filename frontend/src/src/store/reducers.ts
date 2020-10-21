import { combineReducers } from 'redux'
import postingReducer from './reducers/posting'
import userReducer from './reducers/user'


const rootReducer = combineReducers({
    posting : postingReducer,
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;