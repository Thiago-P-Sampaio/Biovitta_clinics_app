// src/features/Auth/Register/styles.js
import { StyleSheet } from 'react-native';

const registerStyles = StyleSheet.create({
  bgGradient: {
    flex: 1, // Garante que o gradiente ocupe toda a tela
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center', // Centraliza o conteúdo da ScrollView verticalmente
    alignItems: 'center', // Centraliza o authBox horizontalmente
    paddingVertical: 20, // Padding vertical para o conteúdo scrollável
  },
  authBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    width: '85%',
    maxWidth: 360,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#6a1b9a',
  },
  label: { // Estilo para o label da Data de Nascimento
    width: '100%', // Ocupa a largura total para alinhar o texto
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    marginTop: 10,
  },
  input: { // Usado tanto para TextInput quanto para o TouchableOpacity da data
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16, // Espaçamento entre os campos
    borderWidth: 1.8,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    color: '#222',
    justifyContent: 'center', // Centraliza o texto verticalmente para TouchableOpacity
    minHeight: 45, // Altura mínima para o input e TouchableOpacity
  },
  registerBtnWrapper: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registerBtn: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  error: {
    color: '#d32f2f',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 10,
  },
  loginLink: {
    marginTop: 10,
  },
  loginLinkText: {
    color: '#7c4dff',
    fontWeight: '600',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export { registerStyles };