import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext'; // Puxe de src
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Importar as telas de autenticação e o Layout principal
import LoginScreen from './src/features/Auth/Login/index'; // Importar tela de login
import RegisterScreen from './src/features/Auth/Register/index'; // Importar tela de registro
import MainLayout from './src/components/Layout/index'; // Importar o MainLayout

const RootStack = createNativeStackNavigator();

function AppRoutes() {
  const { user, loading, token } = useAuth(); // Pega o estado de autenticação

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
        // Se autenticado, mostre a área principal do app (com Drawer/Tabs se implementado)
        <RootStack.Screen name="MainApp" component={MainLayout} />
      ) : (
        // Se não autenticado, mostre as telas de autenticação
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