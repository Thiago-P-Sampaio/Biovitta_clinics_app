import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';
import { CommonActions, useNavigation } from '@react-navigation/native'; // Voltar para useNavigation

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigation = useNavigation(); // Hook para navegação do react-navigation

  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyToken() {
      setLoading(true);
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken || '');

        if (storedToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          const decodedToken = jwtDecode(storedToken);
          const usuario = decodedToken.sub;

          const response = await api.get(`/auth/usuario/${encodeURIComponent(usuario)}`);
          const userData = {
            ...response.data,
            role: response.data.role?.toLowerCase() || '',
            // Adicione aqui outros IDs relevantes do usuário, como crm para médico e pacienteId para paciente
            pacienteId: response.data.pacienteId,
            medicoId: response.data.crm,
          };
          setUser(userData);
        } else {
          delete api.defaults.headers.common['Authorization'];
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao validar token ou buscar dados do usuário:', error);
        setUser(null);
        setToken('');
        await AsyncStorage.removeItem('token');
        // Redireciona para o login se o token for inválido
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }], // Nome da rota de Login no RootStack
        }));
      } finally {
        setLoading(false);
      }
    }
    verifyToken();
  }, [token]); // Dependência do token para revalidação quando ele muda (login/logout)


  async function login(usuario, senha) {
    try {
      const response = await api.post('/auth/login', { usuario, senha });
      const { token: jwtToken } = response.data;
      await AsyncStorage.setItem('token', jwtToken);
      setToken(jwtToken); // Isso vai disparar o useEffect acima
      // Após o login, navegue para a área principal do app
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainApp' }], // Nome da rota principal no RootStack
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro no login');
    }
  }

  async function logout() {
    try {
      setToken('');
      setUser(null);
      await AsyncStorage.removeItem('token');
      // Redireciona para a tela de login
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Nome da rota de Login no RootStack
      }));
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setToken('');
      setUser(null);
      await AsyncStorage.removeItem('token');
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }));
    }
  }

  const value = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Renderiza children apenas depois que o loading inicial terminar */}
    </AuthContext.Provider>
  );
}