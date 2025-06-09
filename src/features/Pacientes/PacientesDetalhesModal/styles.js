// src/features/Pacientes/PacienteDetalhesModal/styles.js
import { StyleSheet } from 'react-native';
import VARS from '../../../styles/variables';

const pacienteDetalhesModalStyles = StyleSheet.create({

  overlay: {
    flex: 1,
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 15,
    maxHeight: '90%',
    overflow: 'hidden',
    position: 'relative', // CORREÇÃO: Crucial para o posicionamento absoluto do botão X
  },
  modalCloseButton: {
    position: 'absolute',
    top: VARS.spacingSm, // CORREÇÃO: Ajustado para ser mais perto do topo
    right: VARS.spacingSm, // CORREÇÃO: Ajustado para ser mais perto da direita
    zIndex: 10,
    padding: VARS.spacingXs,
    backgroundColor: 'transparent', // CORREÇÃO: Garante que não tenha fundo que esconda
  },
  modalCloseIcon: {
    fontSize: 24,
    color: VARS.textLight,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: VARS.primaryColor,
    textAlign: 'center',
    marginBottom: VARS.spacingMd,
    paddingRight: VARS.spacingLg + VARS.spacingSm, // CORREÇÃO: Adicionado padding para o texto do título não sobrepor o botão X
  },
  pacienteDetailsHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: VARS.spacingMd,
  },
  pacienteDetailsImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: VARS.secondaryColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: VARS.spacingSm,
  },
  pacienteDetailsName: {
    fontSize: 22,
    fontWeight: '600',
    color: VARS.textDark,
    textAlign: 'center',
    marginBottom: VARS.spacingMd,
    marginHorizontal: VARS.spacingSm,
  },
  pacienteDetailsBody: {
    backgroundColor: VARS.bgLight,
    borderRadius: VARS.spacingSm,
    padding: VARS.spacingMd,
    marginBottom: VARS.spacingMd,
  },
  pacienteDetailItem: {
    fontSize: 16,
    color: VARS.textDark,
    marginBottom: VARS.spacingXs,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  pacienteDetailItemLast: {
    marginBottom: 0,
  },
  pacienteDetailLabel: {
    color: VARS.primaryColor,
    fontWeight: 'bold',
    marginRight: VARS.spacingSm / 2,
  },
  pacienteDetailIcon: {
    color: VARS.secondaryColor,
    fontSize: 18,
    marginRight: VARS.spacingSm / 2,
  },
  modalActions: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: VARS.spacingSm,
    borderTopWidth: 1,
    borderTopColor: VARS.borderLight,
    paddingTop: VARS.spacingMd,
  },
  btnConfirmClose: {
    backgroundColor: VARS.primaryColor,
    borderRadius: VARS.spacingSm,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  btnConfirmCloseText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export { pacienteDetalhesModalStyles };