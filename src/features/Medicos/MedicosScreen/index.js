import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../../services/api';
import CardMedico from '../../../components/CardMedico';
import MedicoModal from '../../Medicos/MedicosModal/index'; // Caminho corrigido
import MedicoDetalhesModal from '../MedicosDetalhesModal/index'; // Caminho corrigido
import { useAuth } from '../../../context/AuthContext';
import SearchBar from '../../../components/SearchBar';
import { medicosScreenStyles } from './styles'; // Caminho corrigido
import { VARS } from '../../../components/CardMedico/styles'; // Importa VARS de um local central
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native'; // Para recarregar dados ao focar na tela

export default function MedicosScreen() { // Renomeado para MedicosScreen
  const { user } = useAuth();

  const [medicos, setMedicos] = useState([]);
  const [filteredMedicos, setFilteredMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [detalhesModalOpen, setDetalhesModalOpen] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Use useFocusEffect para recarregar os dados quando a tela entrar em foco
  useFocusEffect(
    React.useCallback(() => {
      fetchMedicos();
      return () => {
        // Opcional: limpeza quando a tela perde o foco
      };
    }, [])
  );

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (searchQuery.length > 0) {
      const filtered = medicos.filter(medico =>
        (medico.nome && medico.nome.toLowerCase().includes(lowerCaseQuery)) ||
        (medico.email && medico.email.toLowerCase().includes(lowerCaseQuery)) ||
        (medico.crm && medico.crm.toLowerCase().includes(lowerCaseQuery)) ||
        (medico.telefone && medico.telefone.toLowerCase().includes(lowerCaseQuery)) ||
        (medico.especialidades && medico.especialidades.toLowerCase().includes(lowerCaseQuery)) // Adaptação para string
      );
      setFilteredMedicos(filtered);
    } else {
      setFilteredMedicos(medicos);
    }
  }, [medicos, searchQuery]);

  // Permite acesso apenas para admin, medico e paciente
  if (!user || !['admin', 'medico', 'paciente'].includes(user.role)) {
    return (
      <View style={medicosScreenStyles.errorContainer}>
        <Text style={medicosScreenStyles.errorText}>Acesso negado. Você não tem permissão para acessar esta página.</Text>
      </View>
    );
  }

  async function fetchMedicos() {
    try {
      setLoading(true);
      const response = await api.get('/api/medicos/get/all');
      setMedicos(response.data);
      setError('');
    } catch (err) {
      console.error("Erro ao carregar médicos: ", err);
      setError('Erro ao carregar médicos.');
      setMedicos([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  function handleAdd() {
    if (user.role !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para adicionar médicos.');
      return;
    }
    setSelectedMedico(null);
    setIsEdit(false);
    setModalOpen(true);
  }

  function handleEdit(medico) {
    if (user.role !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para editar médicos.');
      return;
    }
    setSelectedMedico(medico);
    setIsEdit(true);
    setModalOpen(true);
  }

  function handleView(medico) {
    setSelectedMedico(medico);
    setDetalhesModalOpen(true);
  }

  async function handleDelete(medico) {
    if (user.role !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para excluir médicos.');
      return;
    }
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir ${medico.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await api.delete(`/api/medicos/dell/${medico.crm}`);
              fetchMedicos();
              Alert.alert('Sucesso', 'Médico excluído com sucesso!');
            } catch (err) {
              console.error("Erro ao excluir médico: ", err);
              Alert.alert('Erro', 'Erro ao excluir médico.');
            }
          },
        },
      ]
    );
  }

  async function handleSubmit(data) {
    if (user.role !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para salvar médicos.');
      return;
    }
    try {
      if (isEdit) {
        await api.put(`/api/medicos/edit/${data.crm}`, data);
        Alert.alert('Sucesso', 'Médico atualizado com sucesso!');
      } else {
        await api.post('/api/usuario/medico/add', data);
        Alert.alert('Sucesso', 'Médico adicionado com sucesso!');
      }
      fetchMedicos();
      setModalOpen(false);
      setSelectedMedico(null);
    } catch (err) {
      console.error("Erro ao salvar médico: ", err);
      Alert.alert('Erro', 'Erro ao salvar médico.');
    }
  }

  if (loading) {
    return (
      <View style={medicosScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={VARS.primaryColor} />
        <Text style={medicosScreenStyles.loadingText}>Carregando médicos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={medicosScreenStyles.errorContainer}>
        <Text style={medicosScreenStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={medicosScreenStyles.container}>
      <Text style={medicosScreenStyles.headerTitle}>Médicos</Text>

      {user.role === 'admin' && (
        <TouchableOpacity onPress={handleAdd} style={medicosScreenStyles.addButton}>
          <Icon name="plus-circle" size={20} color="white" style={medicosScreenStyles.addButtonIcon} />
          <Text style={medicosScreenStyles.addButtonText}>Adicionar Médico</Text>
        </TouchableOpacity>
      )}

      <SearchBar onSearchChange={handleSearchChange} />

      <FlatList
        data={filteredMedicos}
        keyExtractor={(item) => item.crm.toString()} // Assumindo CRM é único
        numColumns={1} // Uma coluna para melhor visualização em mobile
        contentContainerStyle={medicosScreenStyles.grid}
        ListEmptyComponent={() => (
          <Text style={medicosScreenStyles.emptyListText}>
            {searchQuery.length > 0 ? 'Nenhum médico encontrado com esta busca.' : 'Nenhum médico cadastrado.'}
          </Text>
        )}
        renderItem={({ item }) => (
          <CardMedico
            medico={item}
            onView={() => handleView(item)}
            onEdit={user.role === 'admin' ? () => handleEdit(item) : undefined}
            onDelete={user.role === 'admin' ? () => handleDelete(item) : undefined}
          />
        )}
      />

      <MedicoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedMedico}
        isEdit={isEdit}
      />

      {detalhesModalOpen && selectedMedico && (
        <MedicoDetalhesModal
          isOpen={detalhesModalOpen}
          onClose={() => setDetalhesModalOpen(false)}
          medico={selectedMedico}
        />
      )}
    </View>
  );
}