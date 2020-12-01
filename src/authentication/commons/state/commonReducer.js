import {combineReducers} from "redux";
import dialogReducer from './reducers/dialogReducers'

export default combineReducers({
    dialogReducers:dialogReducer,
})