import {combineReducers} from "redux";
import commonReducer from '../commons/state/commonReducer'
import usersReducer from "../users/state/usersReducer";
import userUtilityReducer from "./reducers/userUtilityReducer";
export default combineReducers({
  commonReducer:commonReducer,
  usersReducer:usersReducer,
  utilityReducer:userUtilityReducer
})
