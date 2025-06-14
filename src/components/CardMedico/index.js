import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Usando FontAwesome5
import { cardMedicoStyles } from './styles';

export default function CardMedico({ medico, onView, onEdit, onDelete }) {
  // A especialidade agora é uma string diretamente no objeto medico, sem necessidade de mapear ou cortar.

  return (
    <TouchableOpacity onPress={onView} style={cardMedicoStyles.cardMedico}>
      <View style={cardMedicoStyles.cardMedicoImageContainer}>
        <Image
          source={{ uri: medico.imgUrl || 'https://via.placeholder.com/150/6a1b9a/ffffff?text=Médico' }}
          accessibilityLabel={`Foto de ${medico.nome}`} // Adicionado para acessibilidade
          style={cardMedicoStyles.cardMedicoImg}
        />
      </View>

      <Text style={cardMedicoStyles.cardMedicoName}>{medico.nome}</Text>
      <Text style={cardMedicoStyles.cardMedicoDetail}>
        <Icon name="envelope" style={cardMedicoStyles.cardMedicoIcon} />
        {medico.email}
      </Text>
      <Text style={cardMedicoStyles.cardMedicoDetail}>
        <Icon name="phone" style={cardMedicoStyles.cardMedicoIcon} />
        <Text>Telefone: {medico.telefone}</Text>
      </Text>
      {/* Exibe a especialidade diretamente como uma string */}
      {medico.especialidades && (
        <Text style={cardMedicoStyles.cardMedicoSpecialties}>
          <Icon name="tags" style={cardMedicoStyles.cardMedicoIcon} />
          <Text style={cardMedicoStyles.cardMedicoLabel}>Especialidade:</Text> {medico.especialidades}
        </Text>
      )}

      <View style={cardMedicoStyles.cardMedicoActions}>
        {typeof onEdit === 'function' && (
          <TouchableOpacity
            onPress={() => onEdit(medico)}
            style={[cardMedicoStyles.cardMedicoButton, cardMedicoStyles.cardMedicoEditButton]}
            accessibilityLabel={`Editar médico ${medico.nome}`} // Adicionado para acessibilidade
          >
            <Text style={{ color: 'white' }}>Editar</Text>
          </TouchableOpacity>
        )}

        {typeof onDelete === 'function' && (
          <TouchableOpacity
            onPress={() => onDelete(medico)}
            style={[cardMedicoStyles.cardMedicoButton, cardMedicoStyles.cardMedicoDeleteButton]}
            accessibilityLabel={`Excluir médico ${medico.nome}`} // Adicionado para acessibilidade
          >
            <Text style={{ color: 'white' }}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}