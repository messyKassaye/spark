import {ADD_MEDIA,FETCH_MEDIA} from '../usersConstant'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'medias'

export const indexMedia = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_MEDIA,
        payload:res
    }))
}

export const uploadMedia = (data)=>dispatch=>{
        axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:ADD_MEDIA,
            payload:res
        }))
}
