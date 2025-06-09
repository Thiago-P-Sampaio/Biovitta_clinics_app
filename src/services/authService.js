import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import api from './api';

export const login = async (usuario, senha) => {
  const response = await api.post('/auth/login', { usuario, senha });
  const { token } = response.data;
  await AsyncStorage.setItem('token', token); // Salva o token no AsyncStorage
  return response.data;
};

export const registerPaciente = async (dadosPaciente) => {
  const response = await api.post('/auth/register', dadosPaciente);
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token'); 
 
};