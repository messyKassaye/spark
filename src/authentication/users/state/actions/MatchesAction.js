import {FETCH_MATCHES, SEND_MATCHES} from '../usersConstant'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'matches'

export const matches = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_MATCHES,
        payload:res.data
    }))
}

export const sendMatches = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SEND_MATCHES,
        payload:res
    }))
}