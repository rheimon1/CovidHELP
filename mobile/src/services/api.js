import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rest-api-fsiproject.herokuapp.com'
});

//https://rest-api-fsiproject.herokuapp.com:80

export default api;