import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../../services/api'; // Caminho ajustado
import PacienteModal from '../../Pacientes/PacientesModal/index'; // Caminho ajustado
import PacienteDetalhesModal from '../PacientesDetalhesModal/index'; // Caminho ajustado
import CardPaciente from '../../../components/CardPaciente'; // Caminho ajustado
import SearchBar from '../../../components/SearchBar'; // Caminho ajustado
import { useAuth } from '../../../context/AuthContext'; // Caminho ajustado
import { VARS } from '../../../components/CardPaciente/styles'; // Importa as variáveis de estilo globais
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native'; // Para recarregar dados ao focar na tela
import { pacientesStyles } from './styles'

export default function PacientesScreen() { // Renomeado para PacientesScreen
  const { user } = useAuth();

  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [detalhesModalOpen, setDetalhesModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Use useFocusEffect para recarregar os dados quando a tela entrar em foco
  useFocusEffect(
    React.useCallback(() => {
      fetchPacientes();
      return () => {
        // Opcional: limpeza quando a tela perde o foco
      };
    }, [])
  );

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (lowerCaseQuery.length > 0) {
      const filtered = pacientes.filter(paciente =>
        (paciente.nome && paciente.nome.toLowerCase().includes(lowerCaseQuery)) ||
        (paciente.email && paciente.email.toLowerCase().includes(lowerCaseQuery)) ||
        (paciente.telefone && paciente.telefone.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredPacientes(filtered);
    } else {
      setFilteredPacientes(pacientes);
    }
  }, [pacientes, searchQuery]);

  async function fetchPacientes() {
    try {
      setLoading(true);
      let response;
      if (user.role === 'paciente') {
        response = await api.get(`/auth/buscar/${encodeURIComponent(user.usuario)}`);
        setPacientes([response.data]);
        setFilteredPacientes([response.data]);
      } else {
        response = await api.get('/api/usuario/paciente/get/all');
        setPacientes(response.data);
        setFilteredPacientes(response.data);
      }
      setError('');
    } catch (err) {
      console.error("Erro ao carregar pacientes: ", err.response?.data || err.message || err);
      setError('Erro ao carregar pacientes.');
      setPacientes([]);
      setFilteredPacientes([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  function handleAdd() {
    if (user.role !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para adicionar pacientes.');
      return;
    }
    setSelectedPaciente(null);
    setIsEdit(false);
    setModalOpen(true);
  }

  function handleEdit(paciente) {
    if (user.role !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para editar pacientes.');
      return;
    }
    setSelectedPaciente(paciente);
    setIsEdit(true);
    setModalOpen(true);
  }

  function handleView(paciente) {
    setSelectedPaciente(paciente);
    setDetalhesModalOpen(true);
  }

  async function handleDelete(paciente) {
    if (user.role !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para excluir pacientes.');
      return;
    }
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir ${paciente.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await api.delete(`/api/usuario/paciente/dell/${paciente.pacienteId || paciente.id}`);
              fetchPacientes();
              Alert.alert('Sucesso', 'Paciente excluído com sucesso!');
            } catch (err) {
              console.error("Erro ao excluir paciente: ", err.response?.data || err.message || err);
              Alert.alert('Erro', 'Erro ao excluir paciente. Verifique o console para mais detalhes.');
            }
          },
        },
      ]
    );
  }

  async function handleSubmit(data) {
    if (user.role !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para salvar pacientes.');
      return;
    }
    try {
      if (isEdit) {
        console.log("Enviando PUT para /api/usuario/paciente/edit/", selectedPaciente.pacienteId || selectedPaciente.id, "com dados:", data);
        await api.put(`/api/usuario/paciente/edit/${selectedPaciente.pacienteId || selectedPaciente.id}`, data);
        Alert.alert('Sucesso', 'Paciente atualizado com sucesso!');
      } else {
        console.log("Enviando POST para /api/usuario/paciente/add com dados:", data);
        await api.post('/api/usuario/paciente/add', data);
        Alert.alert('Sucesso', 'Paciente adicionado com sucesso!');
      }
      fetchPacientes();
      setModalOpen(false);
      setSelectedPaciente(null);
    } catch (err) {
      console.error("Erro ao salvar paciente: ", err.response?.data || err.message || err);
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao salvar paciente. Verifique os dados e o console.');
    }
  }

  if (loading) {
    return (
      <View style={pacientesStyles.loadingContainer}>
        <ActivityIndicator size="large" color={VARS.primaryColor} />
        <Text style={pacientesStyles.loadingText}>Carregando pacientes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={pacientesStyles.errorContainer}>
        <Text style={pacientesStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={pacientesStyles.container}>
      <Text style={pacientesStyles.headerTitle}>Pacientes</Text>

      {user.role === 'admin' && (
        <TouchableOpacity onPress={handleAdd} style={pacientesStyles.addButton}>
          <Icon name="plus-circle" size={20} color="white" style={pacientesStyles.addButtonIcon} />
          <Text style={pacientesStyles.addButtonText}>Adicionar Paciente</Text>
        </TouchableOpacity>
      )}

      <SearchBar onSearchChange={handleSearchChange} />

      <FlatList
        data={filteredPacientes}
        keyExtractor={(item) => (item.pacienteId || item.id).toString()}
        numColumns={1}
        contentContainerStyle={pacientesStyles.grid}
        ListEmptyComponent={() => (
          <Text style={pacientesStyles.emptyListText}>
            {searchQuery.length > 0 ? 'Nenhum paciente encontrado com esta busca.' : 'Nenhum paciente cadastrado.'}
          </Text>
        )}
        renderItem={({ item }) => (
          <CardPaciente
            paciente={item}
            onEdit={user.role === 'admin' ? () => handleEdit(item) : undefined}
            onDelete={user.role === 'admin' ? () => handleDelete(item) : undefined}
            onView={() => handleView(item)}
          />
        )}
      />

      <PacienteModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPaciente(null);
        }}
        initialValues={selectedPaciente}
        onSubmit={handleSubmit}
        isEdit={isEdit}
      />

      {detalhesModalOpen && selectedPaciente && (
        <PacienteDetalhesModal
          isOpen={detalhesModalOpen}
          onClose={() => setDetalhesModalOpen(false)}
          paciente={selectedPaciente}
        />
      )}
    </View>
  );
}