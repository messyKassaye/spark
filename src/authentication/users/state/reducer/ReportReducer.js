import {FETCH_REPORT} from '../usersConstant'

const initialState = {
    reports:[],
    loading:true
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_REPORT:
            return {
                ...state,
                reports:action.payload,
                loading:false
            }

            default:
                return state
    }
}