import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://zssn-backend-example.herokuapp.com/api/'
})