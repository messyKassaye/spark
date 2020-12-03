import {
    ME,CHANGE_PROFILE_PICTURE,SHOW_USER
   
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
    },
    chatUser:{},
    chatLoading:true
    
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
            case SHOW_USER:
                return {
                    ...state,
                    chatUser:action.payload,
                    chatLoading:false
                }
        default:
            return  state
    }
}
