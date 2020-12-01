import {
    ME,CHANGE_PROFILE_PICTURE
   
} from "../authConstants/authConstants";

const  initialState = {
    loading:true,
    user:{},
    update:{},
    showUser:{},
    showLoading:true,
    response:{
        status:false,
        message:'changing your profile picture'
    }
}

export default function (state=initialState,action) {
    switch (action.type) {

        case ME:
            return {
                ...state,
                loading:false,
                user : action.payload
            }
            case CHANGE_PROFILE_PICTURE:
                return {
                    ...state,
                    response:action.payload
                }
        default:
            return  state
    }
}
