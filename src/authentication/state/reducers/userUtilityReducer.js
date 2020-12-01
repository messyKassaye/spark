import {STORE_USER_UTILITY} from '../authConstants/authConstants'

const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
        switch(action.type){
            case STORE_USER_UTILITY:
                return {
                    ...state,
                    response:action.payload
                }

                default:
                    return state
        }
}