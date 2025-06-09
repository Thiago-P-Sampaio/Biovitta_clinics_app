// src/features/Pacientes/PacienteDetalhesModal/index.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { pacienteDetalhesModalStyles } from './styles'; // Caminho corrigido

export default function PacienteDetalhesModal({ isOpen, onClose, paciente }) {
  if (!isOpen || !paciente) return null;

  const formattedDataNascimento = paciente.dataNascimento
    ? new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')
    : 'N/A';

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.6} // Controla a opacidade do fundo escurecido
      transparent={true} // Garante que o Modal de react-native-modal seja transparente por padrão
      style={pacienteDetalhesModalStyles.overlay} // O estilo para a View interna que centraliza o conteúdo
    >
      <View style={pacienteDetalhesModalStyles.modalContent}>
        <TouchableOpacity onPress={onClose} style={pacienteDetalhesModalStyles.modalCloseButton} accessibilityLabel="Fechar">
          <Icon name="times" style={pacienteDetalhesModalStyles.modalCloseIcon} />
        </TouchableOpacity>

        <Text style={pacienteDetalhesModalStyles.modalTitle}>Detalhes do Paciente</Text>
        
        <View style={pacienteDetalhesModalStyles.pacienteDetailsHeader}>
          <Image
            source={{ uri: paciente.imgUrl || 'https://via.placeholder.com/150/6a1b9a/ffffff?text=Paciente' }}
            accessibilityLabel={`Foto de ${paciente.nome}`}
            style={pacienteDetalhesModalStyles.pacienteDetailsImage}
          />
          <Text style={pacienteDetalhesModalStyles.pacienteDetailsName}>{paciente.nome}</Text>
        </View>

        <View style={pacienteDetalhesModalStyles.pacienteDetailsBody}>
          <Text style={pacienteDetalhesModalStyles.pacienteDetailItem}>
            <Text style={pacienteDetalhesModalStyles.pacienteDetailLabel}>ID:</Text> <Text>{paciente.pacienteId || paciente.id}</Text>
          </Text>
          <Text style={pacienteDetalhesModalStyles.pacienteDetailItem}>
            <Icon name="envelope" style={pacienteDetalhesModalStyles.pacienteDetailIcon} />
            <Text style={pacienteDetalhesModalStyles.pacienteDetailLabel}>Email:</Text> <Text>{paciente.email}</Text>
          </Text>
          <Text style={pacienteDetalhesModalStyles.pacienteDetailItem}>
            <Icon name="phone" style={pacienteDetalhesModalStyles.pacienteDetailIcon} />
            <Text style={pacienteDetalhesModalStyles.pacienteDetailLabel}>Telefone:</Text> <Text>{paciente.telefone}</Text>
          </Text>
          <Text style={[pacienteDetalhesModalStyles.pacienteDetailItem, pacienteDetalhesModalStyles.pacienteDetailItemLast]}>
            <Icon name="calendar-alt" style={pacienteDetalhesModalStyles.pacienteDetailIcon} />
            <Text style={pacienteDetalhesModalStyles.pacienteDetailLabel}>Nascimento:</Text> <Text>{formattedDataNascimento}</Text>
          </Text>
        </View>

        <View style={pacienteDetalhesModalStyles.modalActions}>
          <TouchableOpacity onPress={onClose} style={pacienteDetalhesModalStyles.btnConfirmClose}>
            <Text style={pacienteDetalhesModalStyles.btnConfirmCloseText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}