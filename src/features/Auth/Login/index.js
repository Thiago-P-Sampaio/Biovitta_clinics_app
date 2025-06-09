// src/features/Auth/Login/index.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Importar LinearGradient
import { useAuth } from '../../../context/AuthContext';
import { loginStyles } from './styles'; // Importar os estilos

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setError('');
    try {
      await login(usuario, senha);
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro de Login', err.message);
    }
  };

  return (
    <LinearGradient
      colors={['#6a1b9a', '#7c4dff']} // Suas cores de gradiente
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={loginStyles.bgGradient}
    >
      {/* Usar a View que já tem flex:1 e centraliza o conteúdo.
          A imagem que você mandou sugere que não há ScrollView no login,
          então o authBox precisa ser centralizado diretamente aqui. */}
      <View style={loginStyles.centeredContent}> {/* Nova View para centralizar */}
        <View style={loginStyles.authBox}>
          <Text style={loginStyles.title}>Login</Text>
          <TextInput
            placeholder="Email"
            value={usuario}
            onChangeText={setUsuario}
            style={loginStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            style={loginStyles.input}
            secureTextEntry
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={handleSubmit} style={loginStyles.loginBtnWrapper}>
            <LinearGradient
              colors={['#6a1b9a', '#7c4dff']} // Gradiente do botão
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={loginStyles.loginBtn}
            >
              <Text style={loginStyles.loginBtnText}>Entrar</Text>
            </LinearGradient>
          </TouchableOpacity>
          {error ? <Text style={loginStyles.error}>{error}</Text> : null}
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={loginStyles.registerLink}>
            <Text style={loginStyles.registerLinkText}>Registrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}