import {useEffect, useState} from 'react'
import axios from 'axios'
import {get, removeToken, set} from "../TokenService";
import {API_AUTH_URL} from "../constants/constants";


function Interceptor() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + get();
    return axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
      
        const originalRequest = error.config;
      
        if (error.response.status === 401 && !originalRequest._retry) {
      
          originalRequest._retry = true;
      
          return axios.post(`${API_AUTH_URL}refresh`, { token:get()})
            .then(({data}) => {
              set(data.token)
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
              originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
              return axios(originalRequest);
            });
        }
      
        return Promise.reject(error);
      });
}

export default Interceptor
