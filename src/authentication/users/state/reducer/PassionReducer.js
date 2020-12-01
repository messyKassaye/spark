import {ADD_PASSION, FETCH_PASSION} from '../usersConstant'

const initialState = {
    passions:[],
    loading:true,
    response:{
        status:false,
        message:'Adding your passions...'
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_PASSION:
            return {
                ...state,
                passions:action.payload,
                loading:false
            }

        case ADD_PASSION:
            return {
                ...state,
                response:action.payload
            }

            default:
                return state
    }
}