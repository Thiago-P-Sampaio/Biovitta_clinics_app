import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Usando FontAwesome5
import { medicoDetalhesModalStyles } from './styles'; // Caminho corrigido

export default function MedicoDetalhesModal({ isOpen, onClose, medico }) {
  // Não há mais necessidade de um estado para especialidades nem de um useEffect para buscá-las,
  // pois a especialidade já vem como string no objeto medico.

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
            <Text style={medicoDetalhesModalStyles.medicoDetailLabel}>Especialidade:</Text> {medico.especialidades || 'Nenhuma'}
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