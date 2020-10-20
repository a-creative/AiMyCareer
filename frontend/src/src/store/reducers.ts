import { combineReducers } from 'redux'
import postingReducer from './reducers/posting'

const rootReducer = combineReducers({
    posting : postingReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;