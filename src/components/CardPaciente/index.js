import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Usando FontAwesome5
import { cardPacienteStyles } from './styles';

export default function CardPaciente({ paciente, onView, onEdit, onDelete }) {
  const formattedDataNascimento = paciente.dataNascimento
    ? new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')
    : 'N/A';

  return (
    <TouchableOpacity onPress={onView} style={cardPacienteStyles.cardPaciente}>
      <View style={cardPacienteStyles.cardPacienteImageContainer}>
        <Image
          source={{ uri: paciente.imgUrl || 'https://via.placeholder.com/150/6a1b9a/ffffff?text=Paciente' }}
          // alt={`Foto de ${paciente.nome}`} // REMOVIDO: 'alt' não existe em Image do RN
          accessibilityLabel={`Foto de ${paciente.nome}`} // Adicionado para acessibilidade
          style={cardPacienteStyles.cardPacienteImg}
        />
      </View>

      <Text style={cardPacienteStyles.cardPacienteName}>{paciente.nome}</Text>
      <Text style={cardPacienteStyles.cardPacienteDetail}>
        <Icon name="envelope" style={cardPacienteStyles.cardPacienteIcon} />
        {paciente.email}
      </Text>
      <Text style={cardPacienteStyles.cardPacienteDetail}>
        <Icon name="phone" style={cardPacienteStyles.cardPacienteIcon} />
        <Text>Telefone: {paciente.telefone}</Text>
      </Text>
      <Text style={cardPacienteStyles.cardPacienteDetail}>
        <Icon name="calendar-alt" style={cardPacienteStyles.cardPacienteIcon} />
        <Text>Nascimento: {formattedDataNascimento}</Text>
      </Text>

      <View style={cardPacienteStyles.cardPacienteActions}>
        {onEdit && (
          <TouchableOpacity
            onPress={() => onEdit(paciente)}
            style={[cardPacienteStyles.cardPacienteButton, cardPacienteStyles.cardPacienteEditButton]}
            accessibilityLabel={`Editar paciente ${paciente.nome}`} // Adicionado para acessibilidade
          >
            <Text style={{ color: 'white' }}>Editar</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(paciente)}
            style={[cardPacienteStyles.cardPacienteButton, cardPacienteStyles.cardPacienteDeleteButton]}
            accessibilityLabel={`Excluir paciente ${paciente.nome}`} // Adicionado para acessibilidade
          >
            <Text style={{ color: 'white' }}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}