const baseUrl = 'http://127.0.0.1:8000/api'

import axios from "axios"

const instance = axios.create({
    baseURL: baseUrl,
  
})

export default instance