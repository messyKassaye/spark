import {FETCH_CHATS,STORE_CHATS} from '../usersConstant'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'chats'

export const storeChats = (data)=>dispatch=>{
  axios.post(`${API_URL}${PATH}`,data)
  .then(response=>response.data)
  .then(res=>dispatch({
    type:STORE_CHATS,
    payload:res
  }))
}
export const showChats = (receiver)=>dispatch=>{
  axios.get(`${API_URL}${PATH}/${receiver}`)
  .then(response=>response.data)
  .then(res=>dispatch({
      type:FETCH_CHATS,
      payload:res
  }))
}