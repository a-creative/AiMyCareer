import { combineReducers } from 'redux'
import posting_reducer from './store/reducers/posting'

const root_reducer = combineReducers({
    posting : posting_reducer
});

export type RootState = ReturnType<typeof root_reducer>;
export default root_reducer;