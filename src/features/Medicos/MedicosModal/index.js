// src/features/Medicos/MedicoModal/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native'; // Removido Platform
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../../../services/api';
import { medicoModalStyles } from './styles';

export default function MedicoModal({ isOpen, onClose, onSubmit, initialData, isEdit }) {
  const [form, setForm] = useState({
    crm: '',
    nome: '',
    email: '',
    telefone: '',
    imgUrl: '',
    senha: '',
    especialidadesIds: []
  });

  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    if (isOpen) { // Apenas reage quando o modal está aberto
      if (initialData) {
        setForm({
          crm: initialData.crm,
          nome: initialData.nome,
          email: initialData.email,
          telefone: initialData.telefone,
          imgUrl: initialData.imgUrl,
          senha: '',
          especialidadesIds: initialData.especialidades?.map(e => e.especialidade_id) || []
        });
      } else {
        setForm({
          crm: '',
          nome: '',
          email: '',
          telefone: '',
          imgUrl: '',
          senha: '',
          especialidadesIds: []
        });
      }
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    async function fetchEspecialidades() {
      try {
        const res = await api.get('/api/especialidades/get/all');
        setEspecialidades(res.data);
      } catch (error) {
        console.error('Erro ao carregar especialidades', error);
        Alert.alert('Erro', 'Não foi possível carregar as especialidades.');
      }
    }
    fetchEspecialidades();
  }, []);

  function handleChange(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleEspecialidadeSelection(selectedId) {
    const numericSelectedId = Number(selectedId); 
    
    let updatedIds;
    if (form.especialidadesIds.includes(numericSelectedId)) {
      updatedIds = form.especialidadesIds.filter(id => id !== numericSelectedId);
    } else {
      updatedIds = [...form.especialidadesIds, numericSelectedId];
    }
    setForm(prev => ({ ...prev, especialidadesIds: updatedIds }));
  }

  function handleCloseAndReset() {
    onClose();
  }

  function handleSubmit() {
    if (!form.crm || !form.nome || !form.email || !form.telefone || (!isEdit && !form.senha) || form.especialidadesIds.length === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios (CRM, Nome, Email, Telefone, Senha (se novo), e Especialidades).');
      return;
    }
    onSubmit(form);
  }

  const selectedEspecialidadesNames = form.especialidadesIds
    .map(id => especialidades.find(e => e.especialidade_id === id)?.nome)
    .filter(Boolean)
    .join(', ');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleCloseAndReset}
    >
      <View style={medicoModalStyles.modalOverlay}>
        <View style={medicoModalStyles.modalContent}>
          {/* Botão de fechar (X) - Garantindo que está visível */}
          <TouchableOpacity onPress={handleCloseAndReset} style={medicoModalStyles.modalCloseButton} accessibilityLabel="Fechar">
            <Icon name="times" style={medicoModalStyles.modalCloseIcon} />
          </TouchableOpacity>

          <Text style={medicoModalStyles.modalTitle}>{isEdit ? 'Editar Médico' : 'Adicionar Médico'}</Text>
          
          {/* ScrollView para garantir que todo o formulário seja visível e rolagem funcione */}
          <ScrollView contentContainerStyle={medicoModalStyles.medicoForm}>
            <Text style={medicoModalStyles.label}>CRM*</Text>
            <TextInput
              style={medicoModalStyles.input}
              name="crm"
              value={form.crm}
              onChangeText={(text) => handleChange('crm', text)}
              editable={!isEdit}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <Text style={medicoModalStyles.label}>Nome*</Text>
            <TextInput
              style={medicoModalStyles.input}
              name="nome"
              value={form.nome}
              onChangeText={(text) => handleChange('nome', text)}
              placeholderTextColor="#999"
            />

            <Text style={medicoModalStyles.label}>Email*</Text>
            <TextInput
              style={medicoModalStyles.input}
              name="email"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />

            <Text style={medicoModalStyles.label}>Telefone*</Text>
            <TextInput
              style={medicoModalStyles.input}
              name="telefone"
              value={form.telefone}
              onChangeText={(text) => handleChange('telefone', text)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />

            <Text style={medicoModalStyles.label}>URL da Foto</Text>
            <TextInput
              style={medicoModalStyles.input}
              name="imgUrl"
              value={form.imgUrl}
              onChangeText={(text) => handleChange('imgUrl', text)}
              keyboardType="url"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />

            {!isEdit && (
              <>
                <Text style={medicoModalStyles.label}>Senha*</Text>
                <TextInput
                  style={medicoModalStyles.input}
                  name="senha"
                  value={form.senha}
                  onChangeText={(text) => handleChange('senha', text)}
                  secureTextEntry
                  placeholderTextColor="#999"
                />
              </>
            )}

            <Text style={medicoModalStyles.label}>Especialidades*</Text>
            {/* Exibe especialidades selecionadas como texto simples */}
            {selectedEspecialidadesNames.length > 0 && (
                <Text style={medicoModalStyles.selectedSpecialtiesText}>
                    Selecionado: {selectedEspecialidadesNames}
                </Text>
            )}
            
            {/* O Picker para seleção de especialidades */}
            <View style={medicoModalStyles.pickerContainer}>
              <Picker
                selectedValue={form.especialidadesIds.length > 0 ? form.especialidadesIds[form.especialidadesIds.length - 1] : ''}
                onValueChange={handleEspecialidadeSelection}
                style={medicoModalStyles.picker}
                mode="dropdown" // Ou 'dialog' para iOS/Android dialog
              >
                <Picker.Item label="Toque para adicionar/remover especialidades" value="" />
                {especialidades.map(e => (
                  <Picker.Item key={e.especialidade_id} label={e.nome} value={e.especialidade_id} />
                ))}
              </Picker>
            </View>
          </ScrollView>

          <View style={medicoModalStyles.modalActions}>
            <TouchableOpacity onPress={handleCloseAndReset} style={[medicoModalStyles.btn, medicoModalStyles.btnCancel]}>
              <Text style={medicoModalStyles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[medicoModalStyles.btn, medicoModalStyles.btnSave]}>
              <Text style={medicoModalStyles.btnSaveText}>{isEdit ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}