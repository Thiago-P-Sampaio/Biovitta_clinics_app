import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importar ícones
import { useAuth } from '../context/AuthContext';

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuth();

  // Se o usuário não estiver logado, não renderiza o drawer (a navegação de login fará o redirect)
  if (!user) {
    return null;
  }

  const role = user?.role?.toLowerCase();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={drawerStyles.container}>
      <View style={drawerStyles.header}>
        <Icon name="user-circle" size={50} color="#fff" />
        <Text style={drawerStyles.headerText}>{user.nome || user.usuario}</Text>
        <Text style={drawerStyles.headerRole}>{role.charAt(0).toUpperCase() + role.slice(1)}</Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity onPress={logout} style={drawerStyles.logoutButton}>
        <Icon name="sign-out-alt" size={20} color="#fff" style={drawerStyles.logoutIcon} />
        <Text style={drawerStyles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a1b9a', // Cor de fundo do sidebar
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerRole: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginTop: 'auto', // Empurra para o final
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});