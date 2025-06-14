import { StyleSheet, Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const consultaModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    maxWidth: 450,
    maxHeight: screenHeight * 0.85, // Evita ultrapassar a tela
    minHeight: screenHeight * 0.5,  // Garante altura mínima
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'column',
    flex: 1, // Permite expansão dentro do modalOverlay
    justifyContent: 'space-between', // Mantém espaçamento visual entre título, conteúdo e ações
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#6A1B9A',
    paddingRight: 30,
    paddingTop: 15,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  formContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 24,
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
    height: 80,
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
    paddingHorizontal: 24,
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
