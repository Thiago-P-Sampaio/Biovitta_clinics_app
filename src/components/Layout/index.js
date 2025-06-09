import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawerContent from '../../navigation/DrawerContent'; // Caminho para o DrawerContent
import { useAuth } from '../../context/AuthContext'; // Para permissões

// Importar todas as telas do aplicativo principal
import HomeScreen from '../../pages/Home/index';
import PacientesScreen from '../../features/Pacientes/PacientesScreen/index';
import MedicosScreen from '../../features/Medicos/MedicosScreen/index';
import ConsultasScreen from '../../features/Consultas/ConsultasScreen/index';
import RelatoriosScreen from '../../features/Relatorios/RelatoriosScreen/index';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Helper para criar um Stack Navigator para cada item do Drawer,
// permitindo um header e navegação interna se necessário.
const createScreenStack = (ScreenComponent, title) => {
  return () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={title} component={ScreenComponent} />
    </Stack.Navigator>
  );
};

// Crie as "Stack Screens" para cada item do Drawer
const HomeStack = createScreenStack(HomeScreen, 'Home');
const PacientesStack = createScreenStack(PacientesScreen, 'Pacientes');
const MedicosStack = createScreenStack(MedicosScreen, 'Médicos');
const ConsultasStack = createScreenStack(ConsultasScreen, 'Consultas');
const RelatoriosStack = createScreenStack(RelatoriosScreen, 'Relatórios');

export default function MainLayout() { // Renomeado de Layout para MainLayout para clareza
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  const canAccessMedicos = role === 'admin' || role === 'medico' || role === 'paciente';
  const canAccessRelatorios = role === 'admin' || role === 'medico';

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true, // Mostra o cabeçalho padrão para cada tela do Drawer
        headerStyle: {
          backgroundColor: '#6a1b9a', // Cor do cabeçalho
        },
        headerTintColor: '#fff', // Cor dos ícones e título do cabeçalho
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#6a1b9a',
          width: 250,
        },
        drawerActiveBackgroundColor: '#7c4dff',
        drawerInactiveBackgroundColor: 'transparent', // 'transparent' para manter o fundo do drawer e só o item mudar
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} options={{ title: 'Início' }} />
      <Drawer.Screen name="Pacientes" component={PacientesStack} options={{ title: 'Pacientes' }} />
      {canAccessMedicos && (
        <Drawer.Screen name="Medicos" component={MedicosStack} options={{ title: 'Médicos' }} />
      )}
      <Drawer.Screen name="Consultas" component={ConsultasStack} options={{ title: 'Consultas' }} />
      {canAccessRelatorios && (
        <Drawer.Screen name="Relatorios" component={RelatoriosStack} options={{ title: 'Relatórios' }} />
      )}
    </Drawer.Navigator>
  );
}