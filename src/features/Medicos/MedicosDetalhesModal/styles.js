// src/features/Medicos/MedicoDetalhesModal/styles.js
import { StyleSheet } from 'react-native';
import VARS from '../../../styles/variables'; // Importa VARS do arquivo central

const medicoDetalhesModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: VARS.borderRadiusBase,
    padding: VARS.spacingLg,
    width: '90%', // Ocupa 90% da largura da tela
    maxWidth: 400, // Ajusta o máximo, mas 450px no design original era um pouco grande
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 15,
    maxHeight: '90%', // Limita a altura para que ocupe no máximo 90% da tela
    overflow: 'hidden',
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: VARS.spacingMd,
    right: VARS.spacingMd,
    zIndex: 10,
    padding: VARS.spacingSm,
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
    paddingRight: VARS.spacingLg, // Espaço para o botão de fechar
  },
  medicoDetailsHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: VARS.spacingMd,
  },
  medicoDetailsImage: {
    width: 120, // Reduzido para ser um pouco menor e mais proporcional
    height: 120,
    borderRadius: 60, // Metade de 120 para círculo perfeito
    borderWidth: 4,
    borderColor: VARS.secondaryColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: VARS.spacingSm,
  },
  medicoDetailsName: {
    fontSize: 22, // Um pouco menor para caber melhor
    fontWeight: '600',
    color: VARS.textDark,
    textAlign: 'center', // Garante que o nome centralize se quebrar linha
    marginBottom: VARS.spacingMd,
    marginHorizontal: VARS.spacingSm, // Adiciona margem horizontal para não colar
  },
  medicoDetailsBody: {
    backgroundColor: VARS.bgLight,
    borderRadius: VARS.spacingSm,
    padding: VARS.spacingMd,
    marginBottom: VARS.spacingMd, // Adicionado margem inferior para separar do botão
  },
  medicoDetailItem: {
    fontSize: 16,
    color: VARS.textDark,
    marginBottom: VARS.spacingXs, // Espaçamento menor entre os itens de detalhe
    flexDirection: 'row',
    alignItems: 'center',
    // gap: VARS.spacingSm, // Removido para usar flexWrap e evitar quebras indesejadas
    flexWrap: 'wrap', // Permite que o texto quebre a linha dentro do item se for muito longo
  },
  medicoDetailItemLast: {
    marginBottom: 0,
  },
  medicoDetailLabel: {
    color: VARS.primaryColor,
    fontWeight: 'bold',
    // minWidth: 80, // Removido, pode empurrar o texto em telas pequenas
    marginRight: VARS.spacingSm / 2, // Pequeno espaçamento entre label e valor
  },
  medicoDetailIcon: {
    color: VARS.secondaryColor,
    fontSize: 18,
    marginRight: VARS.spacingSm / 2, // Espaçamento entre ícone e texto
  },
  modalActions: {
    marginTop: 0, // Removido o marginTop já que o body tem marginBottom
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

export { medicoDetalhesModalStyles }; // Removido VARS do export, pois agora é importado diretamente