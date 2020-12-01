import {UPDATE_LOCATION} from '../usersConstant'

const initialState = {
    ipifyResponse:{},
    loading:true
}

export default function(state=initialState,action){
    switch(action.type){
        case UPDATE_LOCATION:
            return {
                ...state,
                ipifyResponse:action.payload,
                loading:false
            }

            default:
                return state
    }
}