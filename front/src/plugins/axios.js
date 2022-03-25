"use strict";

import Vue from 'vue';
import axios from "axios";
// import globalApi from './api'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.headers['Accept'] = 'application/json, */*'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['Accept-Language'] = 'fr, en,q=0.9; en-US,q=0.8; en-GB,q=0.7;'

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  responseType: 'json',
  timeout: 60 * 1000,
  withCredentials: true
}

const client = axios.create(config)

client.interceptors.request.use(
  function(config) {
    // config.headers['Authorization'] = `Token ${'something'}`
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  function(response) {
    if (response.status === 401) {
      // Do something here
    }
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

window.axios = client

Vue.use({
  install: (Vue) => {
    Vue.prototype.$axios = client
  }
})

export default client
