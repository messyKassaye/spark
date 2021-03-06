import {
    ME, CHANGE_PROFILE_PICTURE,SHOW_USER
} from "../authConstants/authConstants";
import axios from 'axios'
import {API_AUTH_URL, API_URL} from "../../../constants/constants";

const PATH ='users'
export const me = ()=>dispatch=>{
    axios.get(`${API_AUTH_URL}me`)
        .then(response => response.data)
        .then(res =>dispatch({
            type:ME,
            payload: res.data
        }))
}

export const changeProfilePicture = (data)=>dispatch=>{
    axios.post(`${API_URL}change_profile`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:CHANGE_PROFILE_PICTURE,
        payload:res
    }))
}

export const showUser = (id)=>dispatch=>{
    console.log('called')
    axios.get(`${API_URL}user/${id}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_USER,
        payload:res.data
    }))
}


