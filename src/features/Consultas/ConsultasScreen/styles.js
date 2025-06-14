import { StyleSheet } from 'react-native';
import VARS from '../../../styles/variables'; // Importa VARS do arquivo central

const consultasScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: VARS.spacingMd,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: VARS.primaryColor,
    marginBottom: VARS.spacingMd,
  },
  btnAdd: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: VARS.spacingMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  btnAddText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: VARS.spacingMd,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
    fontSize: 12,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  tableRowCell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
    fontSize: 12,
  },
  actionsCell: {
    flex: 1,
    flexDirection: 'column', // Botões um abaixo do outro
    justifyContent: 'center',
    alignItems: 'center', // Centraliza os botões
    paddingHorizontal: 2,
  },
  btnAction: {
    paddingVertical: 6, // Aumentado para melhor toque
    paddingHorizontal: 10, // Aumentado para melhor toque
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2, // Espaçamento vertical entre os botões
    minWidth: 60, // Adicionar largura mínima para os botões
  },
  btnActionText: { 
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  btnEdit: {
    backgroundColor: '#2563eb', // Azul
  },
  btnDelete: {
    backgroundColor: '#dc2626', // Vermelho
  },
  emptyTableText: {
    textAlign: 'center',
    padding: 20,
    color: VARS.textMedium,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: VARS.textMedium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export { consultasScreenStyles };