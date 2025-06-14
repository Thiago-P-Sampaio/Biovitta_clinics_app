import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { medicoModalStyles } from './styles';

export default function MedicoModal({ isOpen, onClose, onSubmit, initialData, isEdit }) {
  const [form, setForm] = useState({
    crm: '',
    nome: '',
    email: '',
    telefone: '',
    imgUrl: '',
    senha: '',
    especialidades: '' // Agora é uma string
  });

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
          especialidades: initialData.especialidades || '' // Define a especialidade como string
        });
      } else {
        setForm({
          crm: '',
          nome: '',
          email: '',
          telefone: '',
          imgUrl: '',
          senha: '',
          especialidades: ''
        });
      }
    }
  }, [isOpen, initialData]);

  // Removemos o useEffect para buscar especialidades da API, pois agora é um input de texto

  function handleChange(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleCloseAndReset() {
    onClose();
  }

  function handleSubmit() {
    if (!form.crm || !form.nome || !form.email || !form.telefone || (!isEdit && !form.senha) || !form.especialidades) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios (CRM, Nome, Email, Telefone, Senha (se novo), e Especialidade).');
      return;
    }
    onSubmit(form);
  }

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

            <Text style={medicoModalStyles.label}>Especialidade*</Text>
            {/* Campo de texto para a especialidade */}
            <TextInput
              style={medicoModalStyles.input}
              name="especialidades"
              value={form.especialidades}
              onChangeText={(text) => handleChange('especialidades', text)}
              placeholder="Ex: Cardiologista, Pediatra"
              placeholderTextColor="#999"
            />
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