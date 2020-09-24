import axios from 'axios'

const api = axios.create({
  baseURL: 'https://covid-app-sm-api.herokuapp.com/api'
})

export default api