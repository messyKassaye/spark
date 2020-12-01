import {FETCH_PRODUCTS,SHOW_PRODUCTS} from '../usersConstant'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'products'

export const indexProducts = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_PRODUCTS,
        payload:res.data
    }))
}

export const showProduct = (id)=>dispatch=>{
    axios.get(`${API_URL}${PATH}/${id}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_PRODUCTS,
        payload:res.data
    }))
}