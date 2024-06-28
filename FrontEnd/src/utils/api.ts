import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

api.interceptors.request.use((config) => {
  
  if (config.url === '/registro' || config.url === '/autenticar') {
    return config;
  }

  const session_id = localStorage.getItem('session_id');
  if (session_id) {
    config.headers['X-UUID-SESSION']= session_id;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;