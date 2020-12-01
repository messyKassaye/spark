import {FETCH_PASSION,ADD_PASSION} from '../usersConstant'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'passions'

export const indexPassion = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_PASSION,
        payload:res
    }))
}

export const storePassion = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:ADD_PASSION,
        payload:res
    }))
}