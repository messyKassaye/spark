import {FETCH_CHATS, STORE_CHATS} from '../usersConstant'

const initialState = {
    prevChats:[],
    loading:true,
    response:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_CHATS:
            return {
                ...state,
                prevChats:action.payload,
                loading:false
            }
            case STORE_CHATS:
                return {
                    ...state,
                    response:action.payload
                }

            default:
                return state
    }
}