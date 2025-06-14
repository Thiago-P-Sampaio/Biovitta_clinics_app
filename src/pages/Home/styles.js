// src/pages/Home/styles.js
import { StyleSheet } from "react-native";
import VARS from '../../styles/variables'; // CORREÇÃO: Importa VARS do arquivo central como default

const homeStyles = StyleSheet.create({
  // O container agora é o contentContainerStyle da ScrollView
  container: {
    flexGrow: 1, // Permite que o conteúdo cresça e seja rolável
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: VARS.primaryColor, // Usando VARS
    marginBottom: 16,
  },
  instructionText: {
    marginTop: 16,
    color: '#666',
    fontSize: 18,
    marginBottom: 32,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24, // Este `gap` funciona em RN 0.71+

  },
  atalhoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3, // Sombra para Android
    padding: 24,
    width: '45%', // Aproximadamente 2 por linha, com espaço para gap.
    minWidth: 150, // Garante um tamanho mínimo
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  atalhoCardText: {
    color: VARS.primaryColor, // Usando VARS
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export { homeStyles };