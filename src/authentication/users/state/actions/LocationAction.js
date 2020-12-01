import {UPDATE_LOCATION} from '../usersConstant'
import axios from 'axios'

const IPIFY_PATH = 'https://api.ipify.org/?format=json'
const IPSTAK_PATH = ''

export const getLocation = ()=>dispatch=>{
    console.log('called')
    axios.get(IPIFY_PATH)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:UPDATE_LOCATION,
        payload:res
    }))
}