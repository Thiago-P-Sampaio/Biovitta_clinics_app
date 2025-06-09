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

const cardPacienteStyles = StyleSheet.create({
  cardPaciente: {
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
  cardPacienteImageContainer: {
    width: '100%',
    height: 160,
    marginTop: -VARS.spacingMd,
    marginHorizontal: -VARS.spacingMd,
    marginBottom: VARS.spacingMd,
    overflow: 'hidden',
    borderTopLeftRadius: VARS.borderRadiusBase,
    borderTopRightRadius: VARS.borderRadiusBase,
  },
  cardPacienteImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Equivalente a 'object-fit: cover'
  },
  cardPacienteName: {
    fontWeight: '700',
    fontSize: 22.4, // 1.4rem * 16px (base) = 22.4px
    marginBottom: VARS.spacingSm,
    color: VARS.primaryColor,
    lineHeight: 22.4 * 1.2,
  },
  cardPacienteDetail: {
    fontSize: 15.2, // 0.95rem * 16px = 15.2px
    color: VARS.textMedium,
    marginBottom: VARS.spacingXs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: VARS.spacingSm,
  },
  cardPacienteIcon: {
    color: VARS.secondaryColor,
    fontSize: 16, // 1rem * 16px = 16px
  },
  cardPacienteActions: {
    marginTop: 'auto',
    paddingTop: VARS.spacingMd,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: VARS.spacingSm,
  },
  cardPacienteButton: {
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
  cardPacienteEditButton: {
    backgroundColor: '#2563eb',
  },
  cardPacienteDeleteButton: {
    backgroundColor: '#dc2626',
  },
});

export { cardPacienteStyles, VARS };