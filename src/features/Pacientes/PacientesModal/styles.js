import { StyleSheet } from 'react-native';

const VARS = {
  primaryColor: '#6a1b9a',
  secondaryColor: '#7c4dff',
  textDark: '#333',
  textMedium: '#555',
  textLight: '#888',
  borderLight: '#eee',
  borderRadiusBase: 12,
  spacingXs: 4,
  spacingSm: 8,
  spacingMd: 16,
  spacingLg: 24,
};

const pacienteModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: VARS.borderRadiusBase,
    padding: VARS.spacingLg,
    width: '90%', // Ajuste para ocupar a largura da tela
    maxWidth: 400, // Máximo de 400px de largura
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 10,
    maxHeight: '90%', // Para que o modal não ocupe toda a altura
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: VARS.spacingMd,
    textAlign: 'center',
    color: VARS.primaryColor,
  },
  form: {
    gap: 12, // Espaçamento entre os campos
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: VARS.textDark,
    marginBottom: 4,
  },
    modalCloseIcon: {
    fontSize: 24,
    color: VARS.textLight, // Cor do X
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: VARS.textDark,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: VARS.spacingSm,
    marginTop: VARS.spacingMd,
    borderTopWidth: 1,
    borderTopColor: VARS.borderLight,
    paddingTop: VARS.spacingMd,
  },
  cancelButton: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: VARS.textDark,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export { pacienteModalStyles, VARS };