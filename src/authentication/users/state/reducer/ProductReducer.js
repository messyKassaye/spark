import {FETCH_PRODUCTS,SHOW_PRODUCTS} from '../usersConstant'

const initialState = {
    products:[],
    loading:true,
    showLoading:true,
    product:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                ...state,
                products:action.payload,
                loading:false
            }

            case SHOW_PRODUCTS:
                return {
                    ...state,
                    product:action.payload,
                    showLoading:false
                }

            default:
                return state
    }
}