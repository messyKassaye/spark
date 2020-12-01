import {FETCH_MATCHES,SEND_MATCHES} from '../usersConstant'

const initialState = {
    likes:[],
    loading:true,
    response:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_MATCHES:
            return {
                ...state,
                likes:action.payload,
                loading:false
            }

            case SEND_MATCHES:
                return {
                    ...state,
                    response:action.payload
                }

            default:
                    return state
    }
}