// src/features/Medicos/MedicoModal/styles.js
import { StyleSheet } from 'react-native';
import VARS from '../../../styles/variables'; // Importa VARS do arquivo central

const medicoModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: VARS.borderRadiusBase,
    padding: VARS.spacingLg, // Padding interno do modal
    width: '90%', // Ocupa 90% da largura da tela
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 10,
    maxHeight: '90%', // Permite que o modal ocupe até 90% da altura da tela
    overflow: 'hidden', // Importante para o borderRadius funcionar no Modal
    position: 'relative', // Essencial para posicionar o botão de fechar
  },
  modalCloseButton: {
    position: 'absolute',
    top: VARS.spacingSm, // Ajustado para ser mais perto do topo
    right: VARS.spacingSm, // Ajustado para ser mais perto da direita
    zIndex: 10, // Garante que o botão esteja acima de outros elementos
    padding: VARS.spacingXs, // Área de toque menor para o X
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
  medicoForm: {
    flexGrow: 1, // Permite que o conteúdo do formulário se expanda dentro da ScrollView
    paddingBottom: VARS.spacingLg, // Espaçamento inferior generoso para a ScrollView não cortar
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: VARS.textDark,
    marginBottom: 4,
    marginTop: VARS.spacingSm, // Adicionado um pouco de margem superior para labels
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: VARS.textDark,
    marginBottom: VARS.spacingSm, // Espaçamento entre inputs
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    minHeight: 40,
    justifyContent: 'center',
    marginBottom: VARS.spacingSm, // Espaçamento abaixo do Picker
  },
  picker: {
    width: '100%',
    height: 40,
    color: VARS.textDark,
  },
  selectedSpecialtiesText: {
    fontSize: 14,
    color: VARS.textMedium,
    marginBottom: VARS.spacingXs,
    paddingHorizontal: 5,
    marginTop: VARS.spacingXs, // Espaçamento acima do texto de especialidades selecionadas
  },
  modalActions: {
    marginTop: VARS.spacingMd, // Margem superior para separar dos campos
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

export { medicoModalStyles };