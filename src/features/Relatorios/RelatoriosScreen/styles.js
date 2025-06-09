import { StyleSheet } from 'react-native';

const VARS = {
  primaryColor: '#6a1b9a',
  secondaryColor: '#7c4dff',
  textDark: '#333',
  textMedium: '#555',
  textLight: '#888',
  borderRadiusBase: 12,
  spacingXs: 4,
  spacingSm: 8,
  spacingMd: 16,
  spacingLg: 24,
};

const relatoriosScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: VARS.spacingLg,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: VARS.primaryColor,
    marginBottom: VARS.spacingMd,
  },
  infoText: {
    fontSize: 16,
    color: VARS.textDark,
    marginBottom: VARS.spacingSm,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: VARS.spacingMd,
    color: VARS.primaryColor,
  },
  downloadButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: VARS.primaryColor,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: VARS.spacingLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: VARS.spacingMd,
    textAlign: 'center',
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
});

export { relatoriosScreenStyles, VARS };