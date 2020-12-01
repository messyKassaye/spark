import {UPLOAD_FILE} from '../homeConstants'
import axios from 'axios'
import { API_URL } from '../../../constants/constants'

const PATH = 'file_upload'

export const uploadFile = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:UPLOAD_FILE,
        payload:res
    }))

}