import { StyleSheet } from 'react-native';
import VARS from '../../../styles/variables';

const medicosScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: VARS.spacingMd,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: VARS.primaryColor,
    marginBottom: VARS.spacingMd,
  },
  addButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: VARS.spacingLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  grid: {
    paddingBottom: VARS.spacingLg,
  },
  emptyListText: {
    textAlign: 'center',
    width: '100%',
    color: VARS.textMedium,
    fontSize: 16,
    marginTop: VARS.spacingLg,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export { medicosScreenStyles }