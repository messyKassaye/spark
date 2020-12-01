import {FETCH_POSTS} from '../usersConstant'

const initialState = {
    post:[],
    loading:true
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_POSTS:
            return {
                ...state,
                loading:false,
                post:action.payload
            }

            default:
                return state
    }
}