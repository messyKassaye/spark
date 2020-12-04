import {combineReducers} from "redux";
import PostReducer from "./reducer/PostReducer";
import MatchesReducer from './reducer/MatchesReducer'
import ProductReducer from './reducer/ProductReducer'
import LocationReducer from "./reducer/LocationReducer";
import AddMediaReducer from "./reducer/AddMediaReducer";
import PassionReducer from "./reducer/PassionReducer";
import ReportReducer from "./reducer/ReportReducer";
import ChatReducer from "./reducer/ChatReducer";
export default combineReducers({
    postReducer:PostReducer,
    MatchesReducer:MatchesReducer,
    ProductReducer:ProductReducer,
    locationReducer:LocationReducer,
    addMediaReducer:AddMediaReducer,
    passionReducer:PassionReducer,
    reportReducer:ReportReducer,
    chatReducer:ChatReducer
})