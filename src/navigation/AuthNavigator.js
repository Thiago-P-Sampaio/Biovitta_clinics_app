import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../features/Auth/Login';
import Register from '../features/Auth/Register';

const AuthStack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}