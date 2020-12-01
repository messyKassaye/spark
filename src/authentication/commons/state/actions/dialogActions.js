import {SHOW_MAIN_DIALOG} from "../commonConstants";

export const showMainDialog = (data)=>dispatch=>{
    dispatch({
        type:SHOW_MAIN_DIALOG,
        payload:data
    })
}
