import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import ConsultaModal from '../ConsultasModal/index'; // Caminho corrigido
import { consultasScreenStyles } from './styles';
import VARS from '../../../styles/variables'; // Importa VARS do arquivo central como default
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importar Icon para o botão

export default function ConsultasScreen() {
  const { user } = useAuth();

  const [consultas, setConsultas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  function normalizeString(str) {
    return str?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() || '';
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchMedicos();
      if (user.role === 'admin' || user.role === 'medico') {
        fetchPacientes();
      }
      fetchConsultas();
      return () => {
        // Limpeza opcional
      };
    }, [user.role, user.pacienteId, user.medicoId])
  );

  async function fetchMedicos() {
    try {
      const response = await api.get('/api/medicos/get/all');
      setMedicos(response.data);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error.response?.data || error.message || error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de médicos.');
    }
  }

  async function fetchPacientes() {
    try {
      const response = await api.get('/api/usuario/paciente/get/all');
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error.response?.data || error.message || error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de pacientes.');
    }
  }

  async function fetchConsultas() {
    try {
      setLoading(true);
      const response = await api.get('/api/consulta/get/all');
      let dados = response.data;

      if (user.role === 'paciente' && user.pacienteId) {
        dados = dados.filter(c => c.pacienteId === user.pacienteId); 
      } else if (user.role === 'medico' && user.medicoId) {
        dados = dados.filter(c => c.medicoId === user.medicoId); 
      }

      setConsultas(dados);
      setError('');
    } catch (error) {
      console.error('Erro ao carregar consultas:', error.response?.data || error.message || error);
      setError('Erro ao carregar consultas.');
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    setSelectedConsulta(null);
    setIsEdit(false);
    setModalOpen(true);
  }

  function handleEdit(consulta) {
    setSelectedConsulta(consulta);
    setIsEdit(true);
    setModalOpen(true);
  }

  async function handleDelete(consulta) {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir a consulta nº ${consulta.consultaId}?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await api.delete(`/api/consulta/dell/${consulta.consultaId}`);
              setConsultas(prev => prev.filter(c => c.consultaId !== consulta.consultaId));
              fetchConsultas(); 
              Alert.alert('Sucesso!', 'Consulta excluída com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir consulta:', error.response?.data || error.message || error);
              Alert.alert('Erro', error.response?.data?.message || 'Erro ao excluir consulta.');
            }
          }
        }
      ]
    );
  }

  async function handleSubmit(data) {
    try {
      const dataToSend = {
        dataConsulta: data.dataConsulta, 
        medicoId: data.medicoId,
        pacienteId: user.role === 'paciente' ? user.pacienteId : data.pacienteId,
      };

      console.log("Dados enviados para a API:", dataToSend); 

      if (isEdit) {
        dataToSend.consultaId = selectedConsulta.consultaId;
        await api.put(`/api/consulta/edit/${dataToSend.consultaId}`, dataToSend);
        Alert.alert('Sucesso!', 'Consulta atualizada com sucesso!');
      } else {
        await api.post('/api/consulta/add', dataToSend);
        Alert.alert('Sucesso!', 'Consulta adicionada com sucesso!');
      }
      fetchConsultas();
      setModalOpen(false);
      setSelectedConsulta(null);
    } catch (err) {
      console.error('Erro ao salvar consulta:', err.response?.data || err.message || err);
      const errorMessage = err.response?.data?.message || 'Erro ao salvar consulta. Verifique os dados e tente novamente.';
      Alert.alert('Erro', errorMessage);
    }
  }

  if (loading) {
    return (
      <View style={consultasScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={VARS.primaryColor} />
        <Text style={consultasScreenStyles.loadingText}>Carregando consultas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={consultasScreenStyles.errorContainer}>
        <Text style={consultasScreenStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={consultasScreenStyles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={consultasScreenStyles.title}>Consultas</Text>
      <TouchableOpacity style={consultasScreenStyles.btnAdd} onPress={handleAdd}>
        <Icon name="plus-circle" size={20} color="white" style={{ marginRight: 5 }} />
        <Text style={consultasScreenStyles.btnAddText}>Adicionar Consulta</Text>
      </TouchableOpacity>

      <View style={consultasScreenStyles.tableContainer}>
        <View style={consultasScreenStyles.tableHeader}>
          <Text style={consultasScreenStyles.tableHeaderCell}>Nº</Text>
          <Text style={consultasScreenStyles.tableHeaderCell}>Paciente</Text>
          <Text style={consultasScreenStyles.tableHeaderCell}>Médico</Text>
          <Text style={consultasScreenStyles.tableHeaderCell}>Data da Consulta</Text>
          <Text style={consultasScreenStyles.tableHeaderCell}>Ações</Text>
        </View>
        {consultas.length === 0 ? (
          <Text style={consultasScreenStyles.emptyTableText}>Nenhuma consulta encontrada.</Text>
        ) : (
          consultas.map((consulta) => (
            <View key={consulta.consultaId} style={consultasScreenStyles.tableRow}>
              <Text style={consultasScreenStyles.tableRowCell}>{consulta.consultaId}</Text>
              <Text style={consultasScreenStyles.tableRowCell}>{consulta.paciente}</Text>
              <Text style={consultasScreenStyles.tableRowCell}>{consulta.medico}</Text>
              <Text style={consultasScreenStyles.tableRowCell}>
                {new Date(consulta.dataConsulta).toLocaleString('pt-BR')}
              </Text>
              <View style={consultasScreenStyles.actionsCell}>
                {/* Botões um abaixo do outro com ícones */}
                <TouchableOpacity
                  style={[consultasScreenStyles.btnAction, consultasScreenStyles.btnEdit]}
                  onPress={() => handleEdit(consulta)}
                >
                  <Icon name="edit" size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[consultasScreenStyles.btnAction, consultasScreenStyles.btnDelete]}
                  onPress={() => handleDelete(consulta)}
                >
                  <Icon name="trash-alt" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {modalOpen && (
        <ConsultaModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedConsulta}
          medicos={medicos}
          pacientes={pacientes}
          isEdit={isEdit}
          userRole={user.role}
        />
      )}
    </ScrollView>
  );
}