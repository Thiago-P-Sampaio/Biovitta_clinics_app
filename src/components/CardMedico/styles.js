import { StyleSheet } from 'react-native';

const VARS = {
  primaryColor: '#6a1b9a',
  secondaryColor: '#7c4dff',
  textDark: '#222',
  textMedium: '#555',
  textLight: '#888',
  borderRadiusBase: 12,
  spacingXs: 4,
  spacingSm: 8,
  spacingMd: 16,
  spacingLg: 24,
};

const cardMedicoStyles = StyleSheet.create({
  cardMedico: {
    backgroundColor: 'white',
    borderRadius: VARS.borderRadiusBase,
    shadowColor: '#000', // para iOS
    shadowOffset: { width: 0, height: 6 }, // para iOS
    shadowOpacity: 0.08, // para iOS
    shadowRadius: 20, // para iOS
    elevation: 8, // para Android
    padding: VARS.spacingMd,
    flexDirection: 'column',
    width: 280,
    marginBottom: VARS.spacingMd, // Adiciona margem inferior para espaçamento na lista
    overflow: 'hidden',
  },
  cardMedicoImageContainer: {
    width: '100%',
    height: 160,
    marginTop: -VARS.spacingMd,
    marginHorizontal: -VARS.spacingMd,
    marginBottom: VARS.spacingMd,
    overflow: 'hidden',
    borderTopLeftRadius: VARS.borderRadiusBase,
    borderTopRightRadius: VARS.borderRadiusBase,
  },
  cardMedicoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Equivalente a 'object-fit: cover'
  },
  cardMedicoName: {
    fontWeight: '700',
    fontSize: 22.4, // 1.4rem * 16px (base) = 22.4px
    marginBottom: VARS.spacingSm,
    color: VARS.primaryColor,
    lineHeight: 22.4 * 1.2,
  },
  cardMedicoDetail: {
    fontSize: 15.2, // 0.95rem * 16px = 15.2px
    color: VARS.textMedium,
    marginBottom: VARS.spacingXs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: VARS.spacingSm,
  },
  cardMedicoIcon: {
    color: VARS.secondaryColor,
    fontSize: 16, // 1rem * 16px = 16px
  },
  cardMedicoLabel: {
    fontWeight: '600',
    color: VARS.textDark,
  },
  cardMedicoSpecialties: {
    fontSize: 14.4, // 0.9rem * 16px = 14.4px
    color: VARS.textMedium,
    marginTop: VARS.spacingSm,
    marginBottom: VARS.spacingMd,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: VARS.spacingSm,
    lineHeight: 14.4 * 1.4,
  },
  cardMedicoMoreSpecialties: {
    fontSize: 12.8, // 0.8rem * 16px = 12.8px
    color: VARS.textLight,
    marginLeft: 4,
  },
  cardMedicoActions: {
    marginTop: 'auto',
    paddingTop: VARS.spacingMd,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: VARS.spacingSm,
  },
  cardMedicoButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 0, // No border para botões
    color: 'white',
    fontSize: 16, // 1rem * 16px = 16px
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Para Android
  },
  cardMedicoEditButton: {
    backgroundColor: '#2563eb',
  },
  cardMedicoDeleteButton: {
    backgroundColor: '#dc2626',
  },
});

export { cardMedicoStyles, VARS };