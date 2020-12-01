import {combineReducers} from "redux";
import usersReducer from '../src/authentication/state/reducers/usersReducer'
import authReducer from '../src/authentication/state/authReducer'
import homeReducer from "./home/state/homeReducer";
export default combineReducers({
    userData: usersReducer,
    authReducer:authReducer,
    homeReducer:homeReducer
})