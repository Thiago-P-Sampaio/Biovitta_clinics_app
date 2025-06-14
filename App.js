// App.js (main entry point of your React Native application)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from './src/context/AuthContext'; // Path to AuthContext
import LoginScreen from './src/features/Auth/Login/index'; // Path to LoginScreen
import RegisterScreen from './src/features/Auth/Register/index'; // Path to RegisterScreen
import MainLayout from './src/components/Layout/index'; // Path to MainLayout (which contains Drawer Navigator)

const RootStack = createNativeStackNavigator();

function AppRoutes() {
  const { user, loading } = useAuth(); // Get authentication state from AuthContext

  if (loading) {
    return (
      <View style={appStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a1b9a" />
        <Text style={appStyles.loadingText}>Carregando...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // If authenticated, show the main app area (MainLayout with Drawer Navigator)
        <RootStack.Screen name="MainApp" component={MainLayout} />
      ) : (
        // If not authenticated, show the authentication screens
        <RootStack.Group>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
}

const appStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
});