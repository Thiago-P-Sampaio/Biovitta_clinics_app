import { StyleSheet } from 'react-native';

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Cor de fundo do conteúdo
  },
  content: {
    flexGrow: 1, // Permite que o conteúdo cresça
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export { layoutStyles };