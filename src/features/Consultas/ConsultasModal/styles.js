// src/features/Consultas/ConsultaModal/styles.js
import { StyleSheet } from 'react-native';
import VARS from '../../../styles/variables'; // Importa VARS do arquivo central

const consultaModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: VARS.borderRadiusBase,
    padding: VARS.spacingLg,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 10,
    maxHeight: '90%', // Permite que o modal ocupe até 90% da altura da tela
    overflow: 'hidden', // Importante para o borderRadius do modal funcionar
    position: 'relative', // Essencial para posicionar o botão de fechar (X)
    flexDirection: 'column', // Garante que o título, ScrollView e actions se organizem em coluna
  },
  modalCloseButton: { // Estilo para o botão de fechar (X)
    position: 'absolute',
    top: VARS.spacingSm,
    right: VARS.spacingSm,
    zIndex: 10,
    padding: VARS.spacingXs,
    backgroundColor: 'transparent',
  },
  modalCloseIcon: {
    fontSize: 24,
    color: VARS.textLight,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: VARS.spacingMd,
    textAlign: 'center',
    color: VARS.primaryColor,
    paddingRight: VARS.spacingLg + VARS.spacingSm, // Para não sobrepor o botão de fechar
  },
  scrollView: { // Estilo para a ScrollView dentro do modal
    flex: 1, // Crucial para a ScrollView se expandir e permitir rolagem
    width: '100%',
  },
  form: { // contentContainerStyle da ScrollView
    flexGrow: 1, // Permite que o conteúdo do formulário empurre o footer para baixo
    paddingBottom: VARS.spacingLg * 2, // Espaçamento inferior generoso para a ScrollView não cortar
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: VARS.textDark,
    marginBottom: 4,
    marginTop: VARS.spacingSm,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: VARS.textDark,
    marginBottom: VARS.spacingSm,
    minHeight: 45,
    justifyContent: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    minHeight: 40,
    justifyContent: 'center',
    marginBottom: VARS.spacingSm,
  },
  picker: {
    width: '100%',
    height: 40,
    color: VARS.textDark,
  },
  modalActions: {
    marginTop: VARS.spacingMd,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: VARS.spacingSm,
    borderTopWidth: 1,
    borderTopColor: VARS.borderLight,
    paddingTop: VARS.spacingMd,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    backgroundColor: '#eee',
  },
  btnCancelText: {
    color: VARS.textDark,
    fontWeight: '600',
  },
  btnSave: {
    backgroundColor: '#2563eb',
  },
  btnSaveText: {
    color: 'white',
    fontWeight: '600',
  },
});

export { consultaModalStyles };