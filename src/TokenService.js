import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
const TOKEN ='token'


export const set = (token_data)=>{
    localStorage.setItem(TOKEN,token_data)
}

export const get = () => {
    return localStorage.getItem(TOKEN)
}

export const setRefreshToken = (token)=>{
    localStorage.setItem('referesh_token',token)
}

export const getRefreshToken = ()=>{
    localStorage.getItem('referesh_token')
}

export const removeToken = ()=>{
    localStorage.removeItem('token')
}

export const logout = ()=>{
    if(localStorage.clear()){
        return true
    }
    return  false
}

export const setRole = (role)=>{
    localStorage.setItem('role',role)
}

export  const isAuthenticated = ()=>{
    if(localStorage.getItem('token')){
        return true
    }
    return  false
}

export const setData =(data)=>{
    localStorage.setItem("data",JSON.stringify(data));
}

export const getData = ()=>{
    return JSON.parse(localStorage.getItem("data"));
}
export const getRole = ()=>{
    return localStorage.getItem('role')
}

export const isExpired = ()=>{
    const decodedToken=jwt_decode(get())
    const dateNow = new Date();
    if(decodedToken.exp*1000 < dateNow.getTime()){
        return true
    }else {
        return  false
    }
}

export const advertProfile = (id,clicked)=>{
    localStorage.setItem(id,clicked);
}

export const getAdvertProfile = (id)=>{
    localStorage.getItem(id);
}
