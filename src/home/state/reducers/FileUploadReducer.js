import {UPLOAD_FILE} from '../homeConstants'

const initialState = {
    response:{
        status:false,
        message:'',
        path:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case UPLOAD_FILE:
            return {
                ...state,
                response:action.payload
            }

            default:
                return state
    }
}