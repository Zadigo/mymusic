"use strict";

// import Vue from 'vue';
import axios from "axios";
// import globalApi from './api'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  headers: { 
    'Accept': 'application/json, */*',
    'Content-Type': 'application/json' 
  },
  responseType: 'json',
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000,
  withCredentials: true
}

const _axios = axios.create(config)

// _axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     return config
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error)
//   }
// );

// // Add a response interceptor
// _axios.interceptors.response.use(
//   function(response) {
//     // Do something with response data
//     return response
//   },
//   function(error) {
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )

// Plugin.install = function(Vue, options) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     },
//   });
// };

// Vue.use(Plugin)

// export default Plugin;

window.axios = _axios

export default _axios
