import React from 'react'
import axios from 'axios'
import {FETCH_REPORT} from '../usersConstant'
import { API_URL } from '../../../../constants/constants'
const PATH = 'reports'

export const indexReport = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_REPORT,
        payload:res
    }))
}