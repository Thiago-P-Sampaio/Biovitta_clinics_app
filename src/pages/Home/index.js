// src/pages/Home/index.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; // Importar ScrollView
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { homeStyles } from './styles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const displayName = user?.nome || user?.usuario || user?.sub || '';
  const role = user?.role?.toLowerCase();

  return (
    // CORREÇÃO: Usar ScrollView como container principal para permitir rolagem
    <ScrollView contentContainerStyle={homeStyles.container}>
      <Text style={homeStyles.welcomeText}>
        Bem-vindo{displayName ? `, ${displayName}` : ''}!
      </Text>
      <Text style={homeStyles.instructionText}>
        Use o menu lateral para acessar pacientes, consultas, médicos e relatórios.
      </Text>
      <View style={homeStyles.cardContainer}>
        {/* CORREÇÃO: Passar o nome da rota do Drawer (ex: 'Pacientes')
                     Isso depende de como você nomeou as rotas no src/components/Layout/index.js */}
        <AtalhoCard title="Pacientes" screenName="Pacientes" navigation={navigation} />
        {(role === 'admin' || role === 'medico' || role === 'paciente') && (
          <AtalhoCard title="Médicos" screenName="Medicos" navigation={navigation} />
        )}
        <AtalhoCard title="Consultas" screenName="Consultas" navigation={navigation} />
        {(role === 'admin' || role === 'medico') && (
          <AtalhoCard title="Relatórios" screenName="Relatorios" navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

function AtalhoCard({ title, screenName, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screenName)} // Navega para o nome da tela como definido no Drawer.Screen
      style={homeStyles.atalhoCard}
    >
      <Text style={homeStyles.atalhoCardText}>{title}</Text>
    </TouchableOpacity>
  );
}