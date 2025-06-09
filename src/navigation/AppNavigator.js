import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Para sub-navegação em cada item do drawer
import { useAuth } from '../context/AuthContext'; // Importar useAuth
import CustomDrawerContent from './DrawerContent'; // Componente customizado do drawer

// Importar as telas/screens
import ConsultasScreen from '../features/Consultas/ConsultasScreen';
import MedicosScreen from '../features/Medicos/MedicosScreen';
import PacientesScreen from '../features/Pacientes/PacientesScreen';
import RelatoriosScreen from '../features/Relatorios/RelatoriosScreen';
import HomeScreen from '../pages/Home';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Criar um Stack Navigator para cada item do Drawer, se necessário, para ter header e navegação interna
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function PacientesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Pacientes" component={PacientesScreen} />
    </Stack.Navigator>
  );
}

function MedicosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Medicos" component={MedicosScreen} />
    </Stack.Navigator>
  );
}

function ConsultasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Consultas" component={ConsultasScreen} />
    </Stack.Navigator>
  );
}

function RelatoriosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
    </Stack.Navigator>
  );
}


export default function AppNavigator() {
  const { user } = useAuth(); // Obter usuário para controle de permissões
  const role = user?.role?.toLowerCase();

  const canAccessMedicos = role === 'admin' || role === 'medico' || role === 'paciente';
  const canAccessRelatorios = role === 'admin' || role === 'medico';

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Oculta o header padrão das telas, a CustomDrawerContent pode adicionar um header
        drawerStyle: {
          backgroundColor: '#6a1b9a',
          width: 250,
        },
        drawerActiveBackgroundColor: '#7c4dff',
        drawerInactiveBackgroundColor: '#6a1b9a',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen name="HomeDrawer" component={HomeStack} options={{ drawerLabel: 'Home' }} />
      <Drawer.Screen name="PacientesDrawer" component={PacientesStack} options={{ drawerLabel: 'Pacientes' }} />
      {canAccessMedicos && (
        <Drawer.Screen name="MedicosDrawer" component={MedicosStack} options={{ drawerLabel: 'Médicos' }} />
      )}
      <Drawer.Screen name="ConsultasDrawer" component={ConsultasStack} options={{ drawerLabel: 'Consultas' }} />
      {canAccessRelatorios && (
        <Drawer.Screen name="RelatoriosDrawer" component={RelatoriosStack} options={{ drawerLabel: 'Relatórios' }} />
      )}
    </Drawer.Navigator>
  );
}