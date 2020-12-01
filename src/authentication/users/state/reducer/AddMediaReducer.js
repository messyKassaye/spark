import {ADD_MEDIA,FETCH_MEDIA} from '../usersConstant'

const initialState = {
    medias:[],
    loading:true,
    response:{
        status:false,
        path:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_MEDIA:
            return {
                ...state,
                medias:action.payload,
                loading:false
            }
            case ADD_MEDIA:
                return {
                    ...state,
                    response:action.payload
                }

        default:
                return state
    }
}