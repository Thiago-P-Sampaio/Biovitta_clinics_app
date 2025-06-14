import { StyleSheet, Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const consultaModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 450,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    // Remover maxHeight e deixar o flexbox determinar a altura com base no conteúdo e no ScrollView
    // maxHeight: screenHeight * 0.85, // Manter um limite de altura baseado na tela
    maxHeight: '85%', // Tentar com porcentagem novamente, ou um valor fixo (ex: 600) se ainda houver problemas
    overflow: 'hidden', // Manter hidden para o borderRadius funcionar no Modal
    position: 'relative',
    flexDirection: 'column',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5,
    backgroundColor: 'transparent',
  },
  modalCloseIcon: {
    fontSize: 24,
    color: '#888',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6A1B9A',
    paddingRight: 30, 
  },
  scrollView: {
    flex: 1, // **CRUCIAL**: Permite que a ScrollView se expanda e ocupe o espaço restante
    width: '100%',
    // Para debug visual: backgroundColor: 'lightblue',
  },
  formContentContainer: { // Renomeado de 'form' para 'formContentContainer'
    flexGrow: 1, // Permite que o conteúdo do formulário se estenda e role
    paddingBottom: 20, // Espaçamento inferior para evitar que o último input seja cortado
    // Para debug visual: backgroundColor: 'lightgreen',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    minHeight: 50,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 50,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#333',
  },
  modalActions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
    width: '100%',
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    backgroundColor: '#ccc',
  },
  btnCancelText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 16,
  },
  btnSave: {
    backgroundColor: '#6A1B9A',
  },
  btnSaveText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export { consultaModalStyles };