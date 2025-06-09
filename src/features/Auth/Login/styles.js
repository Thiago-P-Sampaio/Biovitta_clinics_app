// src/features/Auth/Login/styles.js
import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  bgGradient: {
    flex: 1, // Garante que o gradiente ocupe toda a tela
    width: '100%',
    height: '100%',
  },
  centeredContent: { // NOVO ESTILO: Para centralizar o authBox
    flex: 1, // Permite que ocupe todo o espaço disponível dentro do LinearGradient
    justifyContent: 'center', // Centraliza o conteúdo (authBox) verticalmente
    alignItems: 'center', // Centraliza o conteúdo (authBox) horizontalmente
    padding: 20, // Um pouco de padding para garantir que não cole nas bordas
  },
  authBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fundo semitransparente
    padding: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    width: '100%', // Ocupa 100% da largura do seu parent (centeredContent), mas limitado pelo maxWidth
    maxWidth: 360, // Limita a largura máxima da caixa
    alignItems: 'center', // Centraliza o conteúdo dentro da caixa
  },
  title: {
    fontSize: 28, // Ajustado para ser maior
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#6a1b9a', // Usando cor primária
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16, // Reduzido ligeiramente para melhor espaçamento entre inputs
    borderWidth: 1.8,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    color: '#222',
    minHeight: 45, // Altura mínima para o input
  },
  loginBtnWrapper: { // Estilo para o TouchableOpacity que envolve o gradiente do botão
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden', // Importante para o borderRadius funcionar no LinearGradient
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginBtn: { // O LinearGradient vai usar este estilo para preencher o TouchableOpacity
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  registerLink: {
    marginTop: 10,
  },
  registerLinkText: {
    color: '#7c4dff',
    fontWeight: '600',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  error: {
    color: '#d32f2f',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export { loginStyles };