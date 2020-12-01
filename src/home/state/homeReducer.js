import {combineReducers} from "redux";
import FileUploadReducer from "./reducers/FileUploadReducer";


export default combineReducers({
    fileUploadReducer:FileUploadReducer
})