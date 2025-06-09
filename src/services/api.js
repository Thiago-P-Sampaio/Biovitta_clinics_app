import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import axios from 'axios';

// ENDEREÇO LOCAL: http://192.168.1.170:8080/biovitta
const api = axios.create({
  baseURL: 'http://192.168.1.170:8080/biovitta', 
});

// Interceptor para adicionar o token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;