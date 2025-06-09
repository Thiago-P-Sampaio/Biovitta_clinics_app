// src/features/Medicos/MedicoDetalhesModal/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Usando FontAwesome5
import api from '../../../services/api';
import { medicoDetalhesModalStyles } from './styles'; // Caminho corrigido

export default function MedicoDetalhesModal({ isOpen, onClose, medico }) {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    async function fetchEspecialidades() {
      if (!medico || !medico.crm) {
        setEspecialidades([]);
        return;
      }
      try {
        const res = await api.get(`/api/medicos/${medico.crm}/especialidades`);
        setEspecialidades(Array.isArray(res.data.especialidadesLista) ? res.data.especialidadesLista : []);
      } catch (error) {
        console.error('Erro ao carregar especialidades do médico', error);
        Alert.alert('Erro', 'Não foi possível carregar as especialidades do médico.');
        setEspecialidades([]);
      }
    }
    if (isOpen && medico) fetchEspecialidades();
  }, [isOpen, medico]);

  if (!isOpen || !medico) return null;

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose} style={medicoDetalhesModalStyles.modalOverlay}>
      <View style={medicoDetalhesModalStyles.modalContent}>
        <TouchableOpacity onPress={onClose} style={medicoDetalhesModalStyles.modalCloseButton} accessibilityLabel="Fechar">
          <Icon name="times" style={medicoDetalhesModalStyles.modalCloseIcon} />
        </TouchableOpacity>

        <Text style={medicoDetalhesModalStyles.modalTitle}>Detalhes do Médico</Text>
        
        <View style={medicoDetalhesModalStyles.medicoDetailsHeader}>
          <Image
            source={{ uri: medico.imgUrl || 'https://via.placeholder.com/150/6a1b9a/ffffff?text=Médico' }}
            accessibilityLabel={`Foto de ${medico.nome}`}
            style={medicoDetalhesModalStyles.medicoDetailsImage}
          />
          <Text style={medicoDetalhesModalStyles.medicoDetailsName}>{medico.nome}</Text>
        </View>

        <View style={medicoDetalhesModalStyles.medicoDetailsBody}>
          <Text style={medicoDetalhesModalStyles.medicoDetailItem}>
            <Text style={medicoDetalhesModalStyles.medicoDetailLabel}>CRM:</Text> {medico.crm}
          </Text>
          <Text style={medicoDetalhesModalStyles.medicoDetailItem}>
            <Icon name="envelope" style={medicoDetalhesModalStyles.medicoDetailIcon} />
            <Text style={medicoDetalhesModalStyles.medicoDetailLabel}>Email:</Text> {medico.email}
          </Text>
          <Text style={medicoDetalhesModalStyles.medicoDetailItem}>
            <Icon name="phone" style={medicoDetalhesModalStyles.medicoDetailIcon} />
            <Text style={medicoDetalhesModalStyles.medicoDetailLabel}>Telefone:</Text> {medico.telefone}
          </Text>
          <Text style={[medicoDetalhesModalStyles.medicoDetailItem, medicoDetalhesModalStyles.medicoDetailItemLast]}>
            <Icon name="tags" style={medicoDetalhesModalStyles.medicoDetailIcon} />
            <Text style={medicoDetalhesModalStyles.medicoDetailLabel}>Especialidades:</Text> {especialidades.map(e => e.nome).join(', ') || 'Nenhuma'}
          </Text>
        </View>

        <View style={medicoDetalhesModalStyles.modalActions}>
          <TouchableOpacity onPress={onClose} style={medicoDetalhesModalStyles.btnConfirmClose}>
            <Text style={medicoDetalhesModalStyles.btnConfirmCloseText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}