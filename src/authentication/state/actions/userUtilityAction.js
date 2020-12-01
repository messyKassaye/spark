import {STORE_USER_UTILITY} from '../authConstants/authConstants'
import axios from 'axios'
import { API_URL } from '../../../constants/constants'

const PATH = 'utility'
export const storeUtitlity = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_USER_UTILITY,
        payload:res
    }))
}