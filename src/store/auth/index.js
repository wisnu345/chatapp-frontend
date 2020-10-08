import axios from 'axios'
const { url } = require('../../helper/env')

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/user/login`, payload)
        .then((response) => {
        //   console.log(response.data)
          if (response.data.code === 200) {
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('refreshToken', response.data.data.refreshToken)
          }
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  register (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/user/register`, payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  refreshToken (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/refreshtoken`, payload)
        .then((response) => {
          // console.log(response)
          localStorage.setItem('token', response.data.token)
          resolve(response.message)
        })
    })
  },
  resetPassword (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/user/reset-confirm`, payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters
}
