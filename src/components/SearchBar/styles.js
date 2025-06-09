import { StyleSheet } from 'react-native';

const VARS = {
  primaryColor: '#6a1b9a',
  secondaryColor: '#7c4dff',
  textDark: '#222',
  borderRadiusBase: 12,
  spacingXs: 4,
  spacingSm: 8,
  spacingMd: 16,
  spacingLg: 24,
};

const searchBarStyles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    maxWidth: 400, // Máx. largura, mas em mobile pode ser 100%
    marginBottom: VARS.spacingLg, // 24px
    alignSelf: 'center', // Para centralizar em telas maiores
  },
  searchInput: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#ccc',
    fontSize: 16, // 1rem
    color: VARS.textDark,
  },

});

export { searchBarStyles, VARS };

